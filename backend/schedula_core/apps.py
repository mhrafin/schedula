from django.apps import AppConfig


class SchedulaCoreConfig(AppConfig):
    name = "schedula_core"

    def ready(self):
        import schedula_core.api.signals.send_email
