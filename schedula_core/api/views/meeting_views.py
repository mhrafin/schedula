from datetime import datetime

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from icalendar import Calendar, Event, vCalAddress, vText
from rest_framework import viewsets
from rest_framework.views import APIView

from schedula_core.api.models.meeting import Meeting
from schedula_core.api.serializers.meeting_serializers import MeetingModelSerializer


class MeetingModelVS(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingModelSerializer

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)


class ExportSingleMeetingAPIView(APIView):
    def get(self, request, pk):
        meeting = get_object_or_404(Meeting.objects.all(), pk=pk)
        export_format = request.query_params.get("export-format", "ics").lower()
        if export_format == "ics":
            start_datetime = datetime.combine(meeting.date, meeting.start_time)
            end_datetime = datetime.combine(meeting.date, meeting.end_time)

            if timezone.is_aware(timezone.now()):
                current_tz = timezone.get_current_timezone()
                start_datetime = timezone.make_aware(start_datetime, current_tz)
                end_datetime = timezone.make_aware(end_datetime, current_tz)

            cal = Calendar()
            cal.add("prodid", "-//Schedula//Schedula//EN")
            cal.add("version", "2.0")

            event = Event()
            event.add("summary", meeting.description)
            event.add("dtstart", start_datetime)
            event.add("dtend", end_datetime)
            event.add("dtstamp", timezone.now())

            organizer = vCalAddress(f"MAILTO:{meeting.organizer.email}")
            organizer.params["cn"] = vText(meeting.organizer.first_name)

            event["organizer"] = organizer
            event["location"] = vText(meeting.location)
            event["uid"] = meeting.id

            cal.add_component(event)

            response = HttpResponse(cal.to_ical(), content_type="text/calendar")
            response["Content-Disposition"] = 'attachment; filename="event.ics"'

            return response
