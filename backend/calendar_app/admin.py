# admin.py

from django.contrib import admin
from .models import User, Event, Calendar, SharedCalendarUser, Notification, EventTemplate, EventsCategory, JoinEventCategory, JoinTemplateCategory

admin.site.register(User)
admin.site.register(Event)
admin.site.register(Calendar)
admin.site.register(SharedCalendarUser)
admin.site.register(Notification)
admin.site.register(EventTemplate)
admin.site.register(EventsCategory)
admin.site.register(JoinEventCategory)
admin.site.register(JoinTemplateCategory)
