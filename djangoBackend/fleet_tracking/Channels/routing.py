from django.urls import re_path
from .consumer import TelemetryConsumer

websocket_urlpatterns = [
    re_path(r"ws/telemetry/(?P<vehicle_id>[^/]+)/$", TelemetryConsumer.as_asgi()),
]
