import os
import paho.mqtt.client as mqtt

WORKER_HOST = os.getenv("MQTT_HOST", "sutlac-mosquitto")
WORKER_PORT = int(os.getenv("MQTT_PORT", "1883"))
SUB_TOPIC = "fleet/TR34/vehicle/VEH-0001/telemetry"

def on_connect(client, userdata, flags, rc):
    print("CONNECTED rc =", rc)
    client.subscribe(SUB_TOPIC)
    print("SUBSCRIBED:", SUB_TOPIC)

def on_message(client, userdata, msg):
    print("MESSAGE RECEIVED")
    print("topic:", msg.topic)
    print("payload:", msg.payload.decode())

client = mqtt.Client(protocol=mqtt.MQTTv311)
client.on_connect = on_connect
client.on_message = on_message

print("CONNECTING TO:", WORKER_HOST, WORKER_PORT)
client.connect(WORKER_HOST, WORKER_PORT, 60)
client.loop_forever()