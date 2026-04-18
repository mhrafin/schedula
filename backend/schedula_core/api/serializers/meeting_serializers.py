from datetime import datetime

from rest_framework import serializers

from schedula_core.api.models.meeting import Meeting
from schedula_core.api.services.conflict import detect_participant_conflict


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

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if self.instance:
            participants = attrs.get("participants", self.instance.participants.all())
            date = attrs.get("date", self.instance.date)
            start_time = attrs.get("start_time", self.instance.start_time)
            end_time = attrs.get("end_time", self.instance.end_time)
        else:
            participants = attrs.get("participants", [])
            date = attrs.get("date")
            start_time = attrs.get("start_time")
            end_time = attrs.get("end_time")

        exclude_id = self.instance.id if self.instance else None

        if participants and date and start_time and end_time:
            conflicts = detect_participant_conflict(
                participants=participants,
                date=date,
                start_time=start_time,
                end_time=end_time,
                exclude_meeting_id=exclude_id,
            )
            if conflicts.exists():
                conflicting_meetings = ", ".join(str(m.name) for m in conflicts)
                raise serializers.ValidationError(
                    f"One or more participants have scheduling conflicts: {conflicting_meetings}"
                )

        return attrs
