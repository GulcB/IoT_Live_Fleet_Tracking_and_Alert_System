import json
from channels.generic.websocket import AsyncWebsocketConsumer

class TelemetryConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.vehicle_id = self.scope["url_route"]["kwargs"]["vehicle_id"]
        self.group_name = f"telemetry_{self.vehicle_id}"

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

        await self.send(text_data=json.dumps({
            "type": "connected",
            "vehicle_id": self.vehicle_id
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    # group_send ile gelecek event handler
    async def telemetry_message(self, event):
        # event = {"type": "telemetry_message", "payload": {...}}
        await self.send(text_data=json.dumps(event["payload"]))
