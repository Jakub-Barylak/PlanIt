from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from calendar_app.views import (
    UserViewSet, EventViewSet, CalendarViewSet,
    SharedCalendarUserViewSet, 
    RegistrationView, LoginView, UserCalendarsView,
    UserCalendarsEventsView, CustomTokenRefreshView,
    DeleteCalendarView, UserInformationView,
    TodoListViewSet
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'calendars', CalendarViewSet, basename='calendars')
router.register(r'shared_calendars', SharedCalendarUserViewSet, basename='shared_calendars')
router.register(r'events', EventViewSet, basename='events')  # Registering EventViewSet
router.register(r'todo_lists', TodoListViewSet, basename='todo_lists')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', RegistrationView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CustomTokenRefreshView.as_view(), name='custom_token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('user_calendars/', UserCalendarsView.as_view(), name='user_calendars'),
    path('user_calendars_events/', UserCalendarsEventsView.as_view(), name='user_calendars_events'),
    path('delete_calendar/', DeleteCalendarView.as_view(), name='delete_calendar'),
    path('user_information/', UserInformationView.as_view(), name='user_information'),
    path('', include(router.urls))  # This includes all the router generated URLs
]
