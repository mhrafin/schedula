from rest_framework.routers import DefaultRouter
from django.urls import path

from schedula_core.api.views.meeting_views import MeetingModelVS

default_router = DefaultRouter()
default_router.register(r"meetings", MeetingModelVS)

urlpatterns = [] + default_router.urls
