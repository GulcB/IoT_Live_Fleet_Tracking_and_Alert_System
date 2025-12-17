import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from fleet_tracking.Channels.routing import websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoBackend.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(websocket_urlpatterns),
})
