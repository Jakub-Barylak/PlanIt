from rest_framework import serializers
from .models import (
    User, Event, Calendar, SharedCalendarUser,
    Notification, EventTemplate, EventsCategory,
    JoinEventCategory, JoinTemplateCategory
)
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'avatar']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class CalendarSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    class Meta:
        model = Calendar
        fields = ['id', 'name', 'color', 'owner', 'events']

class SharedCalendarUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedCalendarUser
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class EventTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventTemplate
        fields = '__all__'

class EventsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EventsCategory
        fields = '__all__'

class JoinEventCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinEventCategory
        fields = '__all__'

class JoinTemplateCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinTemplateCategory
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'name', 'email', 'avatar')  # Include 'name'

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            name=validated_data.get('name'),  # Set the 'name' field
            email=validated_data.get('email')  # Optionally handle 'email' here too
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)