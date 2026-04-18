from rest_framework.routers import DefaultRouter
from django.urls import path

from schedula_core.api.views.meeting_views import (
    ExportSingleMeetingAPIView,
    MeetingModelVS,
)

default_router = DefaultRouter()
default_router.register(r"meetings", MeetingModelVS)

urlpatterns = [
    path(
        "meetings/<int:pk>/export/",
        ExportSingleMeetingAPIView.as_view(),
        name="Export single meeting",
    )
] + default_router.urls
