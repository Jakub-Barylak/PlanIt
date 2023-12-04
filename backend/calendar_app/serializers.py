from rest_framework import serializers
from .models import (
    User, Event, Calendar, SharedCalendarUser,
    Notification, EventTemplate, EventsCategory,
    JoinEventCategory, JoinTemplateCategory
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar']

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
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['username']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        
        user.set_password(password)
        user.save()
        return user

