from datetime import datetime

from rest_framework import serializers

from schedula_core.api.models.meeting import Meeting


class MeetingModelSerializer(serializers.ModelSerializer):
    organizer = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Meeting
        fields = "__all__"
        read_only_fields = ["organizer", "created_at", "modified_at"]

    def validate_end_time(self, value):
        if value:
            st_time = self.initial_data.get("start_time")
            if str(value) < st_time:
                raise serializers.ValidationError(
                    "End time cannot be before Start time."
                )

        return value

    def validate_date(self, value):
        if value:
            now = datetime.today().date()
            if value < now:
                raise serializers.ValidationError("Date cannot be in the past.")
        return value
