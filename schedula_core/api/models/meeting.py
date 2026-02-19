from django.conf import settings
from django.db import models


class Meeting(models.Model):
    name = models.CharField(max_length=256)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    participants = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL
    )
