from rest_framework import serializers
from .models import (
    User, Event, Calendar, SharedCalendarUser,
    Notification, EventTemplate, EventsCategory,
    JoinEventCategory, JoinTemplateCategory
)
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name','username', 'email', 'avatar']

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
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'name', 'password', 'password2', 'email')  # Including 'email' if you want it as part of registration

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            name=validated_data['name'],
            email=validated_data.get('email', '')  # Optional: include only if email is part of your user model and registration process
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

