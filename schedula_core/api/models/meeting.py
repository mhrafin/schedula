from django.conf import settings
from django.db import models
from django.utils import timezone


class Meeting(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(null=True, blank=True)
    participants = models.ManyToManyField(
        settings.AUTH_USER_MODEL, null=True, blank=True
    )
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
