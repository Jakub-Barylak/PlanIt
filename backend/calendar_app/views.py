import json
from calendar import monthrange
from datetime import datetime, timedelta

from dateutil.parser import parse
from dateutil.relativedelta import relativedelta
from django.contrib.auth import authenticate
from django.utils import timezone
from django.utils.dateparse import parse_datetime, parse_date
from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from .models import (
    User, Event, Calendar, SharedCalendarUser,
    SharedEventUser, TodoList, EventTemplate
)
from .serializers import (
    UserSerializer, EventSerializer, CalendarSerializer,
    SharedCalendarUserSerializer,
    RegistrationSerializer, LoginSerializer,
    UserCalendarsSerializer, TodoListSerializer,
    EventTemplateSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CalendarViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CalendarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Calendar.objects.filter(owner=user)

class SharedCalendarUserViewSet(viewsets.ModelViewSet):
    queryset = SharedCalendarUser.objects.all()
    serializer_class = SharedCalendarUserSerializer


### Registration ###
class RegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = {
            'username': request.data.get('username'),  # use 'username' field as username
            'password': request.data.get('password'),
            'name': request.data.get('name'),  # Include the 'name' field
            'email': request.data.get('email'),
        }
        serializer = RegistrationSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            # Serialize user data
            user_data = UserSerializer(user).data

            # Include the JWT token in the response
            user_data['refresh'] = str(refresh)
            user_data['access'] = str(refresh.access_token)

            return Response(user_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        

### Login ###
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            print(user)

            if user is not None:
                print(user)
                # Create JWT tokens
                refresh = RefreshToken.for_user(user)

                # Serialize user data
                user_data = UserSerializer(user).data

                # Include the JWT tokens in the response
                user_data['refresh'] = str(refresh)
                user_data['access'] = str(refresh.access_token)

                return Response(user_data, status=status.HTTP_200_OK)

            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

### User Calendars ###
class UserCalendarsView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, *args, **kwargs):
        user_id = request.user.id
        calendars = Calendar.objects.filter(owner_id=user_id).prefetch_related('shared_users')
        serializer = UserCalendarsSerializer(calendars, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CalendarSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            calendar = serializer.save()
            return Response(CalendarSerializer(calendar).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

### User Events ###
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        repeated = request.data.get('repeated')
        if repeated:
            return self.create_repeated_event(request)
        else:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='get-events')
    def get_events(self, request, *args, **kwargs):
        # Method for listing events based on the request body
        try:
            data = json.loads(request.body)
            calendar_id = data.get('calendarId')
            start_date_str = data.get('startDate')
            end_date_str = data.get('endDate')
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate received data
        if not calendar_id or not start_date_str or not end_date_str:
            return Response({"error": "Missing required parameters: 'calendarId', 'startDate', 'endDate'."}, status=status.HTTP_400_BAD_REQUEST)

        # Convert date strings to datetime objects
        try:
            start_date = parse(start_date_str)
            end_date = parse(end_date_str)
        except ValueError:
            return Response({"error": "Invalid date format."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure calendar_id is an integer
        try:
            calendar_id = int(calendar_id)
        except ValueError:
            return Response({"error": "Invalid 'calendarId'. It must be an integer."}, status=status.HTTP_400_BAD_REQUEST)

        self.check_and_generate_events(request.user, end_date)

        # Filter the events based on the calendar ID and date range
        events = self.queryset.filter(
            calendar_id=calendar_id,
            begin_date__gte=start_date, 
            end_date__lte=end_date
        )

        # Serialize and return the events
        response_data = self.get_serializer(events, many=True).data
        return Response(response_data)

    @action(methods=['delete'], detail=False, url_path='delete-event')
    def delete_event(self, request, *args, **kwargs):
        event_id = request.data.get('eventId')
        repeated = request.data.get('repeated', False)

        if not event_id:
            return Response({"error": "Missing 'eventId' in request."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if repeated:
                # Find the event and get its associated template
                event = Event.objects.get(id=event_id, calendar__owner=request.user)
                event_template = event.template
                if event_template:
                    # Delete the template and all future events generated from this template
                    event_template.delete()
                    message = "Recurring event and associated template deleted successfully."
                else:
                    return Response({"error": "Event template not found for the given event."}, status=status.HTTP_404_NOT_FOUND)
            else:
                # Delete single event instance
                event = Event.objects.get(id=event_id, calendar__owner=request.user)
                event.delete()
                message = "Event instance deleted successfully."

            return Response({"message": message}, status=status.HTTP_204_NO_CONTENT)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
    def update(self, request, pk=None, *args, **kwargs):
        try:
            event = Event.objects.get(pk=pk, calendar__owner=request.user)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

        repeated = request.data.get('repeated')
        if repeated and event.template:
            return self.update_repeated_event(request, event)
        else:
            # Standard update logic for a non-repeated event
            serializer = self.get_serializer(event, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def update_repeated_event(self, request, event, *args, **kwargs):
        event_template = event.template
        template_serializer = EventTemplateSerializer(event_template, data=request.data)
        
        if template_serializer.is_valid():
            updated_template = template_serializer.save()

            # Delete all future events associated with this template
            self.delete_future_events(updated_template)

            # Reset the generation_date to now
            updated_template.generation_date = timezone.now()
            updated_template.save()

            # Determine the until_date based on the template frequency
            if updated_template.every == 'month':
                until_date = updated_template.generation_date + relativedelta(years=1)
            elif updated_template.every == 'year':
                until_date = updated_template.generation_date + relativedelta(years=2)
            else:
                until_date = updated_template.generation_date + timedelta(days=30)

            # Generate new events from the updated template
            self.generate_events_from_template(updated_template, until_date)

            return Response(template_serializer.data)
        else:
            return Response(template_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




    def has_pattern_changed(self, original_data, updated_template):
        # Check if any of the pattern-related fields have changed
        return any([
            original_data['every'] != updated_template.every,
            original_data['weekday'] != updated_template.weekday,
            original_data['month_day'] != updated_template.month_day,
            original_data['month'] != updated_template.month
        ])

    def delete_future_events(self, event_template):
        current_date = timezone.now().date()
        future_events = Event.objects.filter(
            template=event_template,
            begin_date__gte=current_date
        )
        future_events.delete()

    def check_and_generate_events(self, user, until_date):
        # Ensure until_date is timezone-aware
        if timezone.is_naive(until_date):
            until_date = timezone.make_aware(until_date)

        # Fetch all event templates for the calendars owned by the given user that need to generate more events
        event_templates = EventTemplate.objects.filter(calendar__owner=user, generation_date__lt=until_date)
        for template in event_templates:
            if template.generation_date <= until_date:
                # Generate events from the template if needed
                self.generate_events_from_template(template, until_date)



    def create_event(self, event_template, date):
        event = Event(
            calendar=event_template.calendar,
            name=event_template.name,
            description=event_template.description,
            all_day=event_template.all_day,
            begin_date=date,
            end_date=date + (event_template.end_date - event_template.begin_date),
            template=event_template
        )
        event.save()

        # Now set the categories using the set() method
        if event_template.categories.exists():
            categories_ids = event_template.categories.values_list('id', flat=True)
            event.categories.set(categories_ids)
        return event

    
    def increment_date(self, every, current_date, event_template=None):
        new_date = None
        if every == 'day':
            new_date = current_date + timedelta(days=1)
        elif every == 'week':
            new_date = current_date + timedelta(weeks=1)
        elif every == 'month':
            # Handle monthly increment
            if event_template and event_template.month_day:
                year, month = current_date.year, current_date.month
                days_in_month = monthrange(year, month)[1]  # Get the number of days in the month
                next_month = current_date + relativedelta(months=1)
                # Adjust for the number of days in the month
                day = min(event_template.month_day, days_in_month)
                new_date = current_date.replace(year=next_month.year, month=next_month.month, day=day)
            else:
                new_date = current_date + relativedelta(months=1)
        elif every == 'year':
            # Handle yearly increment
            if event_template and event_template.month and event_template.month_day:
                next_year = current_date + relativedelta(years=1)
                new_date = current_date.replace(year=next_year.year, month=event_template.month, day=event_template.month_day)
            else:
                new_date = current_date + relativedelta(years=1)

        # Ensure the new_date is timezone-aware if current_date was
        if timezone.is_aware(current_date) and timezone.is_naive(new_date):
            new_date = timezone.make_aware(new_date, timezone.get_default_timezone())

        return new_date
        
    def is_event_day(self, event_template, date):
        if event_template.every == 'day':
            return True
        elif event_template.every == 'week' and date.weekday() == event_template.weekday:
            return True
        elif event_template.every == 'month' and date.day == event_template.month_day:
            return True
        elif event_template.every == 'year' and date.month == event_template.month and date.day == event_template.month_day:
            return True
        return False

    def generate_events_from_template(self, event_template, until_date):
        # Ensure current_date is timezone-aware
        current_date = event_template.generation_date
        if timezone.is_naive(current_date):
            current_date = timezone.make_aware(current_date)

        # Ensure until_date is also timezone-aware
        if timezone.is_naive(until_date):
            until_date = timezone.make_aware(until_date)

        # Debugging: Print current_date and until_date with timezone info
        print("current_date:", current_date, "Timezone:", current_date.tzinfo)
        print("until_date:", until_date, "Timezone:", until_date.tzinfo)

        events = []

        while current_date <= until_date:
            # Additional Debugging: Check values in each iteration
            print("Loop current_date:", current_date, "Timezone:", current_date.tzinfo)
            print("Loop until_date:", until_date, "Timezone:", until_date.tzinfo)

            if self.is_event_day(event_template, current_date):
                event = self.create_event(event_template, current_date)
                events.append(event)
            current_date = self.increment_date(event_template.every, current_date, event_template)

        # Update the generation_date of the event_template to avoid regenerating these events
        event_template.generation_date = until_date
        event_template.save()

        return events




    def create_repeated_event(self, request):
        template_serializer = EventTemplateSerializer(data=request.data)
        if template_serializer.is_valid():
            template = template_serializer.save()

            # Determine the until_date based on the frequency
            if template.every == 'month':
                # Set until_date to one year from now
                until_date = template.generation_date + relativedelta(years=1)  # Corrected to datetime.now()
            elif template.every == 'year':
                # Set until_date to two years from now
                until_date = template.generation_date + relativedelta(years=2)  # Corrected to datetime.now()
            else:
                # Default to 30 days for other frequencies
                until_date = template.generation_date + timedelta(days=30)  # Corrected to datetime.now()

            self.generate_events_from_template(template, until_date)
            return Response(template_serializer.data, status=status.HTTP_201_CREATED)
        return Response(template_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


### User Calendars Events ###
class UserCalendarsEventsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        start_date = request.data.get('begin_date')
        end_date = request.data.get('end_date')

        if not start_date or not end_date:
            return Response(
                {"error": "Both 'begin_date' and 'end_date' are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        calendars = Calendar.objects.filter(owner=user)
        serialized_calendars = CalendarSerializer(calendars, many=True).data

        for calendar in serialized_calendars:
            events = Event.objects.filter(calendar_id=calendar['id'], begin_date__gte=start_date, end_date__lte=end_date)
            serialized_events = EventSerializer(events, many=True).data
            calendar['events'] = serialized_events

        return Response(serialized_calendars)
    

### Custom token refresh view ###
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh = RefreshToken(request.data.get('refresh'))
        data = {'access': str(refresh.access_token)}

        # Rotate the refresh token
        refresh.set_jti()
        refresh.set_exp()
        data['refresh'] = str(refresh)

        return Response(data, status=status.HTTP_200_OK)



class DeleteCalendarView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        calendar_id = request.data.get('calendarId')
        if not calendar_id:
            return Response({"error": "Calendar ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            calendar = Calendar.objects.get(id=calendar_id, owner=request.user)
            calendar.delete()
            return Response({"message": "Calendar deleted successfully"}, status=status.HTTP_200_OK)
        except Calendar.DoesNotExist:
            return Response({"message": "Calendar not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UserInformationView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_data = UserSerializer(user).data
        return Response(user_data, status=status.HTTP_200_OK)
    
class TodoListViewSet(viewsets.ModelViewSet):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Method for creating a new event
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_queryset(self):
        user = self.request.user
        return TodoList.objects.filter(user=user)
    
    def destroy(self, request, *args, **pk):
        try:
            todo_item = self.get_object()
            # Additional custom checks can be placed here (if needed)

            # Ensure the todo item belongs to the user
            if todo_item.user != request.user:
                return Response({"error": "You do not have permission to delete this item."},
                                status=status.HTTP_403_FORBIDDEN)

            todo_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except NotFound:
            # You can customize the NotFound error if you want
            return Response({"error": "Todo item not found."},
                            status=status.HTTP_404_NOT_FOUND)
