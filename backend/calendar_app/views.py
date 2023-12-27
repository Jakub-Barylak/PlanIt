import json
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenRefreshView
from datetime import datetime, timedelta
from dateutil.parser import parse
from django.utils.dateparse import parse_datetime, parse_date
from .models import (
    User, Event, Calendar, SharedCalendarUser,
    SharedEventUser
)
from .serializers import (
    UserSerializer, EventSerializer, CalendarSerializer,
    SharedCalendarUserSerializer,
    RegistrationSerializer, LoginSerializer,
    UserCalendarsSerializer
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
        # Method for creating a new event
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
        
        if not event_id:
            return Response({"error": "Missing 'eventId' in request."}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch the event and delete it
        try:
            event = Event.objects.get(id=event_id)
            event.delete()
            return Response({"message": "Event deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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