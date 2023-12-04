"""
URL configuration for calendar_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from calendar_app.views import (
    UserViewSet, EventViewSet, CalendarViewSet,
    SharedCalendarUserViewSet, NotificationViewSet,
    EventTemplateViewSet, EventsCategoryViewSet,
    JoinEventCategoryViewSet, JoinTemplateCategoryViewSet,
    RegistrationView
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
router.register(r'notifications', NotificationViewSet, basename='notifications')
router.register(r'event_templates', EventTemplateViewSet, basename='event_templates')
router.register(r'event_categories', EventsCategoryViewSet, basename='event_categories')
router.register(r'join_event_categories', JoinEventCategoryViewSet, basename='join_event_categories')
router.register(r'join_template_categories', JoinTemplateCategoryViewSet, basename='join_template_categories')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', RegistrationView.as_view(), name='signup'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls))
]
