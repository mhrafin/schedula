from djoser.serializers import UserSerializer
from rest_framework import serializers
from django.contrib.auth.models import User


class CustomUserSerializer(UserSerializer):
    class Meta:
        model = User
        exclude = ("password", "is_staff", "is_superuser", "user_permissions", "groups")
