from .base import *

DEBUG = True

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS.append("debug_toolbar")
INSTALLED_APPS.append("drf_spectacular")
MIDDLEWARE.append("debug_toolbar.middleware.DebugToolbarMiddleware")
INTERNAL_IPS = "127.0.0.1"

REST_FRAMEWORK["DEFAULT_SCHEMA_CLASS"] = "drf_spectacular.openapi.AutoSchema"

SPECTACULAR_SETTINGS = {
    "TITLE": "Schedula",
    "DESCRIPTION": "A meeting scheduling API built with Django REST Framework",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}
