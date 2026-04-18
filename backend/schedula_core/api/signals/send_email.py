from django.core.mail import send_mail
from django.db.models.signals import m2m_changed
from django.dispatch import receiver

from schedula_core.api.models.meeting import Meeting


@receiver(m2m_changed, sender=Meeting.participants.through)
def send_email_to_participants(sender, instance, action, **kwargs):
    if action:
        list_of_emails = []
        for p in instance.participants.all():
            list_of_emails.append(p.email)
        send_mail(
            f"Invitation: {instance.name}",
            f"{instance.description}",
            "no-reply@schedula.com",
            list_of_emails,
            fail_silently=False,
        )
