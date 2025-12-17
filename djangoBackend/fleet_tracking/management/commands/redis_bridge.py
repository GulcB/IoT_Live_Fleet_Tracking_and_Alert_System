import json
import os
import redis

from django.core.management.base import BaseCommand
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class Command(BaseCommand):
    help = "Redis Pub/Sub -> Django Channels bridge"

    def handle(self, *args, **options):
        redis_host = os.getenv("REDIS_HOST", "127.0.0.1")
        redis_port = int(os.getenv("REDIS_PORT", "6379"))

        r = redis.Redis(host=redis_host, port=redis_port, decode_responses=True)
        pubsub = r.pubsub()
        pubsub.psubscribe("fleet.telemetry*") # fleet.telemetry ve fleet.telemetry.<vehicle_id>
        channel_layer = get_channel_layer()
        self.stdout.write(self.style.SUCCESS(
            f"Bridge başladı. Redis: {redis_host}:{redis_port} | Pattern: fleet.telemetry*"
        ))

        for msg in pubsub.listen():
            if msg.get("type") != "pmessage":
                continue
            redis_channel = msg["channel"]
            payload = msg["data"]
            try:
                data = json.loads(payload)
            except Exception:
                data = {"raw": payload}
            parts = redis_channel.split(".")
            vehicle_id = parts[-1] if len(parts) >= 3 else "unknown"
            group_name = f"telemetry_vehicle_{vehicle_id}"
            async_to_sync(channel_layer.group_send)(
                group_name,
                {"type": "telemetry.message", "data": data}
            )
