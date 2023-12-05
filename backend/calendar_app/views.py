from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .models import (
    User, Event, Calendar, SharedCalendarUser,
    Notification, EventTemplate, EventsCategory,
    JoinEventCategory, JoinTemplateCategory
)
from .serializers import (
    UserSerializer, EventSerializer, CalendarSerializer,
    SharedCalendarUserSerializer, NotificationSerializer,
    EventTemplateSerializer, EventsCategorySerializer,
    JoinEventCategorySerializer, JoinTemplateCategorySerializer,
    RegistrationSerializer, LoginSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class CalendarViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CalendarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Calendar.objects.filter(owner=user)

class SharedCalendarUserViewSet(viewsets.ModelViewSet):
    queryset = SharedCalendarUser.objects.all()
    serializer_class = SharedCalendarUserSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class EventTemplateViewSet(viewsets.ModelViewSet):
    queryset = EventTemplate.objects.all()
    serializer_class = EventTemplateSerializer

class EventsCategoryViewSet(viewsets.ModelViewSet):
    queryset = EventsCategory.objects.all()
    serializer_class = EventsCategorySerializer

class JoinEventCategoryViewSet(viewsets.ModelViewSet):
    queryset = JoinEventCategory.objects.all()
    serializer_class = JoinEventCategorySerializer

class JoinTemplateCategoryViewSet(viewsets.ModelViewSet):
    queryset = JoinTemplateCategory.objects.all()
    serializer_class = JoinTemplateCategorySerializer


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
