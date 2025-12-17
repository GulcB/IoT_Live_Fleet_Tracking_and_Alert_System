import os
import json
import redis
import paho.mqtt.client as mqtt

WORKER_HOST = os.getenv("MQTT_HOST", "")
WORKER_PORT = int(os.getenv("MQTT_PORT", ""))
SUB_TOPIC = "fleet/TR34/vehicle/+/telemetry"
REDIS_HOST = os.getenv("REDIS_HOST", "")
REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))
REDIS_DB   = int(os.getenv("REDIS_DB", "0"))

r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB, decode_responses=True)


def publish_telemetry(payload: dict):
    """ 
        - fleet.telemetry.<vehicle_id> : araç bazlı kanal
    """
    vehicle_id = payload.get("vehicle_id", "unknown")
    msg = json.dumps(payload, ensure_ascii=False)
    r.publish(f"fleet.telemetry.{vehicle_id}", msg)

def on_connect(client, userdata, flags, rc):
    client.subscribe(SUB_TOPIC)

def on_message(client, userdata, msg):
    try:
        data = json.loads(msg.payload.decode("utf-8"))
        data["topic"] = msg.topic
        publish_telemetry(data)
    except Exception as e:
        print("publish error:", e)

client = mqtt.Client(protocol=mqtt.MQTTv311)
client.on_connect = on_connect
client.on_message = on_message

print("CONNECTING TO:", WORKER_HOST, WORKER_PORT)
client.connect(WORKER_HOST, WORKER_PORT, 60)
client.loop_forever()