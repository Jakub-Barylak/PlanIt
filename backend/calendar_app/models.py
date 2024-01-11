from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone

# User Model
class User(AbstractUser):
    name = models.CharField(max_length=150, blank=True)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username


# EventsCategory Model
class EventsCategory(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=7)

    def __str__(self):
        return self.name

# EventTemplate Model
class EventTemplate(models.Model):
    calendar = models.ForeignKey('Calendar', on_delete=models.CASCADE, related_name='event_templates')
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    all_day = models.BooleanField(default=False)
    every = models.CharField(max_length=50)  # day, week, month, year
    begin_date = models.DateTimeField()
    end_date = models.DateTimeField()
    weekday = models.IntegerField(null=True, blank=True)
    month_day = models.IntegerField(null=True, blank=True)
    month = models.IntegerField(null=True, blank=True)
    categories = models.ManyToManyField(EventsCategory, through='JoinTemplateCategory', related_name='templates')
    generation_date = models.DateField(null=False, default=timezone.now)

    def __str__(self):
        return self.name

# Calendar Model
class Calendar(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=7, null=True, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='calendars')

    def __str__(self):
        return self.name

# Event Model
class Event(models.Model):
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=50)
    begin_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description = models.TextField(blank=True, null=True)
    all_day = models.BooleanField(default=False)
    template = models.ForeignKey(EventTemplate, on_delete=models.SET_NULL, null=True, blank=True, related_name='events')
    categories = models.ManyToManyField(EventsCategory, through='JoinEventCategory', related_name='events')

    def __str__(self):
        return self.name

# SharedCalendarUser Model
class SharedCalendarUser(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='shared_calendars')
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE, related_name='shared_users')
    coworked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.calendar.name}"

# Notification Model
class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='notifications')
    notify_at = models.DateTimeField()

    def __str__(self):
        return f"Notification for {self.user.username} on {self.notify_at}"

class SharedRepeatedEventTemplate(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='shared_repeated_event_templates')
    template = models.ForeignKey(EventTemplate, on_delete=models.CASCADE, related_name='shared_users')
    coworked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.template.name}"

class SharedEventUser(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='shared_events')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='shared_users')
    coworked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.event.name}"
    

class TodoList(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='todo_lists')
    todo_element = models.CharField(max_length=100)
    done = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.event.name} - {self.todo}"

# Join Tables for ManyToMany relationships
class JoinEventCategory(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    category = models.ForeignKey(EventsCategory, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('event', 'category')


class JoinTemplateCategory(models.Model):
    template = models.ForeignKey(EventTemplate, on_delete=models.CASCADE)
    category = models.ForeignKey(EventsCategory, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('template', 'category')


