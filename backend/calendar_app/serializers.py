from rest_framework import serializers
from .models import (
    User, Event, Calendar, SharedCalendarUser,
    
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
    class Meta:
        model = Calendar
        fields = ['id', 'name', 'color', 'owner', 'events']
    
    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return Calendar.objects.create(**validated_data)

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
