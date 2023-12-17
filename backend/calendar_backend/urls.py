from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from calendar_app.views import (
    UserViewSet, EventViewSet, CalendarViewSet,
    SharedCalendarUserViewSet, 
    RegistrationView, LoginView, UserCalendarsView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'events', EventViewSet)
router.register(r'calendars', CalendarViewSet, basename='calendars')
router.register(r'shared_calendars', SharedCalendarUserViewSet, basename='shared_calendars')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', RegistrationView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('user_calendars/', UserCalendarsView.as_view(), name='user_calendars'),
    path('events/', EventViewSet.as_view({
        'get': 'list',
        'post': 'create'
    }), name='event-list'),
    path('', include(router.urls))
]
