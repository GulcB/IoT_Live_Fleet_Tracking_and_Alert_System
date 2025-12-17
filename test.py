import os, json, time, random
from datetime import datetime, timezone
import paho.mqtt.client as mqtt

MQTT_HOST = os.getenv("MQTT_HOST", "localhost")          # docker içinden: sutlac-mosquitto
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
TOPIC = os.getenv("MQTT_TOPIC", "fleet/TR34/vehicle/VEH-0001/telemetry")

VEHICLE_ID = os.getenv("VEHICLE_ID", "VEH-0001")
HZ = float(os.getenv("HZ", "1"))

# İstanbul civarı başlangıç
lat = float(os.getenv("START_LAT", "41.01562"))
lon = float(os.getenv("START_LON", "28.97988"))
alt = float(os.getenv("START_ALT", "35.2"))

speed = float(os.getenv("START_SPEED", "42.1"))
temp = float(os.getenv("START_TEMP", "22.4"))

def iso_now():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

def gen_payload():
    global lat, lon, alt, speed, temp

    # GPS'i küçük adımlarla oynat (araç hareketi simülasyonu)
    lat += random.uniform(-0.00015, 0.00015)
    lon += random.uniform(-0.00015, 0.00015)

    # hız ve sıcaklıkta ufak dalgalanma
    speed = max(0.0, min(140.0, speed + random.uniform(-3.5, 3.5)))
    temp = max(-10.0, min(45.0, temp + random.uniform(-0.3, 0.3)))

    gps_fix = random.random() > 0.02  # %98 fix var

    return {
        "timestamp": iso_now(),
        "vehicle_id": VEHICLE_ID,
        "gps": {
            "latitude": round(lat, 5),
            "longitude": round(lon, 5),
            "altitude_m": round(alt + random.uniform(-0.3, 0.3), 1),
            "gps_fix": gps_fix
        },
        "speed_kmh": round(speed, 1),
        "cabin_temp_c": round(temp, 1)
    }

def main():
    client = mqtt.Client(protocol=mqtt.MQTTv311)
    client.connect(MQTT_HOST, MQTT_PORT, 60)
    client.loop_start()

    interval = 1.0 / HZ
    try:
        while True:
            payload = gen_payload()
            msg = json.dumps(payload, ensure_ascii=False)
            client.publish(TOPIC, msg, qos=0, retain=False)
            print("PUB", TOPIC, msg, flush=True)
            time.sleep(interval)
    except KeyboardInterrupt:
        pass
    finally:
        client.loop_stop()
        client.disconnect()

if __name__ == "__main__":
    main()
