from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.http import JsonResponse

def test_push(request, vehicle_id):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"telemetry_{vehicle_id}",
        {
            "type": "telemetry_message",
            "payload": {
                "vehicle_id": vehicle_id,
                "speed_kmh": 42.1,
                "gps": {"latitude": 41.01562, "longitude": 28.97988},
                "cabin_temp_c": 22.4,
            },
        },
    )
    return JsonResponse({"ok": True})
