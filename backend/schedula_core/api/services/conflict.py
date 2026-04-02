from schedula_core.api.models.meeting import Meeting


def detect_participant_conflict(
    participants, date, start_time, end_time, exclude_meeting_id=None
):
    conflicts = Meeting.objects.filter(
        participants__in=participants,
        date=date,
        start_time__lt=end_time,
        end_time__gt=start_time,
    )
    if exclude_meeting_id:
        conflicts = conflicts.exclude(id=exclude_meeting_id)

    return conflicts.distinct()
