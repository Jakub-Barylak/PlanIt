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
from django.db.models import Q
from django.utils.dateparse import parse_date
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

    @action(detail=False, methods=['get'])
    def list_events(self, request):
        # Get the calendar ID from the request
        calendar_id = request.query_params.get('calendarId')
        
        # Parse the start and end dates
        start_date_str = request.query_params.get('startDate')
        end_date_str = request.query_params.get('endDate')

        # Convert the date strings to date objects
        start_date = parse_date(start_date_str) if start_date_str else None
        end_date = parse_date(end_date_str) if end_date_str else None

        if not calendar_id or not start_date or not end_date:
            return Response({"error": "Missing required parameters: 'calendarId', 'startDate', 'endDate'."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure calendar_id is an integer
        try:
            calendar_id = int(calendar_id)
        except ValueError:
            return Response({"error": "Invalid 'calendarId'. It must be an integer."}, status=status.HTTP_400_BAD_REQUEST)

        # Filter the events based on the calendar ID and the date range
        events = Event.objects.filter(
            calendar_id=calendar_id,
            begin_date__gte=start_date, 
            end_date__lte=end_date
        )

        # Serialize and return the events
        response_data = EventSerializer(events, many=True).data
        return Response(response_data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
