from rest_framework import serializers
from .models import (
    User, Event, Calendar, SharedCalendarUser, TodoList,
    EventTemplate
    
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
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    shared = serializers.SerializerMethodField()
    coworked = serializers.SerializerMethodField()
    class Meta:
        model = Calendar
        fields = ['id', 'name', 'color', 'owner', 'events', 'shared', 'coworked']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return Calendar.objects.create(**validated_data)
    
    def get_shared(self, obj):
        # Check if the calendar is shared with the current user (and not owned by them)
        request = self.context.get('request')
        if request and request.user != obj.owner:
            return SharedCalendarUser.objects.filter(calendar=obj, user=request.user).exists()
        return False

    def get_coworked(self, obj):
        # Check coworked status for the current user
        request = self.context.get('request')
        if request:
            shared_calendar_user = SharedCalendarUser.objects.filter(calendar=obj, user=request.user).first()
            return shared_calendar_user.coworked if shared_calendar_user else False
        return False
    


class SharedCalendarUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    coworked = serializers.BooleanField()

    class Meta:
        model = SharedCalendarUser
        fields = ['username', 'coworked']

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


class UserCalendarsSerializer(serializers.ModelSerializer):
    shared_users = SharedCalendarUserSerializer(many=True, read_only=True)
    class Meta:
        model = Calendar
        fields = ['id', 'name', 'color', 'owner', 'shared_users']

class TodoListSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = TodoList
        fields = '__all__'
    
class EventTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventTemplate
        fields = '__all__'