from rest_framework import serializers

from schedula_core.api.models.meeting import Meeting


class MeetingModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = "__all__"
