from rest_framework import viewsets

from schedula_core.api.models.meeting import Meeting
from schedula_core.api.serializers.meeting_serializers import MeetingModelSerializer


class MeetingModelVS(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingModelSerializer
