import os, json, time, random
from datetime import datetime, timezone
from multiprocessing import Process
import paho.mqtt.client as mqtt

MQTT_HOST = os.getenv("MQTT_HOST", "localhost")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))
HZ = float(os.getenv("HZ", "1"))

ISTANBUL_LOCATIONS = {
    "Beşiktaş": (41.0422, 29.0094),
    "Kadıköy": (40.9904, 29.0285),
    "Taksim": (41.0370, 28.9857),
    "Yenikapı": (41.0053, 28.9550),
    "Şişli": (41.0603, 28.9863),
    "Üsküdar": (41.0227, 29.0074),
    "Bakırköy": (40.9822, 28.8662),
    "Kartal": (40.8983, 29.1836),
    "Pendik": (40.8789, 29.2324),
    "Maltepe": (40.9335, 29.1417),
    "Ataşehir": (40.9826, 29.1226),
    "Sarıyer": (41.1712, 29.0532),
    "Fatih": (41.0192, 28.9497),
    "Beyoğlu": (41.0343, 28.9779),
    "Gaziosmanpaşa": (41.0658, 28.9087),
    "Eyüp": (41.0459, 28.9341),
    "Zeytinburnu": (41.0030, 28.9021),
    "Esenler": (41.0423, 28.8742),
    "Sultangazi": (41.1046, 28.8669),
    "Bayrampaşa": (41.0447, 28.9087),
    "Güngören": (41.0223, 28.8753),
    "Bağcılar": (41.0371, 28.8375),
    "Küçükçekmece": (41.0166, 28.7761),
    "Avcılar": (40.9774, 28.7214),
    "Esenyurt": (41.0289, 28.6767),
    "Bahçelievler": (41.0007, 28.8565),
    "Kağıthane": (41.0778, 28.9735),
    "Beykoz": (41.1355, 29.0981),
    "Çekmeköy": (41.0323, 29.1873),
    "Sancaktepe": (41.0044, 29.2168),
    "Sultanbeyli": (40.9664, 29.2659),
    "Tuzla": (40.8301, 29.3014),
    "Şile": (41.1764, 29.6113),
    "Silivri": (41.0740, 28.2467),
    "Çatalca": (41.1412, 28.4611),
    "Arnavutköy": (41.1853, 28.7318),
    "Başakşehir": (41.0806, 28.8096),
    "Beylikdüzü": (40.9899, 28.6414),
    "Büyükçekmece": (41.0217, 28.5847),
    "Ümraniye": (41.0170, 29.1104),
    "Eminönü": (41.0178, 28.9706),
    "Mecidiyeköy": (41.0704, 28.9959),
}

# Araçlar için rota atamaları (daha uzun mesafeler)
VEHICLE_ROUTES = [
    ("Sarıyer", "Tuzla"),           # Kuzey-Güneydoğu (uzun)
    ("Silivri", "Şile"),             # Batı-Doğu (çok uzun)
    ("Çatalca", "Sultanbeyli"),      # Kuzeybatı-Güneydoğu (uzun)
    ("Avcılar", "Pendik"),           # Batı-Doğu (uzun)
    ("Sarıyer", "Kartal"),           # Kuzey-Güney (uzun)
    ("Beylikdüzü", "Beykoz"),        # Batı-Kuzeydoğu (uzun)
    ("Esenyurt", "Çekmeköy"),        # Batı-Doğu (uzun)
    ("Silivri", "Sultanbeyli"),      # Batı-Güneydoğu (çok uzun)
    ("Arnavutköy", "Tuzla"),         # Kuzeybatı-Güneydoğu (çok uzun)
    ("Büyükçekmece", "Pendik"),      # Batı-Güneydoğu (uzun)
    ("Başakşehir", "Maltepe"),       # Batı-Güneydoğu (uzun)
    ("Küçükçekmece", "Ümraniye"),    # Batı-Doğu (uzun)
    ("Bağcılar", "Kartal"),          # Batı-Güneydoğu (uzun)
    ("Esenler", "Tuzla"),            # Batı-Güneydoğu (uzun)
    ("Gaziosmanpaşa", "Kadıköy"),    # Kuzey-Güney (orta)
    ("Sarıyer", "Bakırköy"),         # Kuzey-Güneybatı (uzun)
    ("Çatalca", "Üsküdar"),          # Kuzeybatı-Doğu (çok uzun)
    ("Beylikdüzü", "Ataşehir"),      # Batı-Doğu (uzun)
    ("Silivri", "Kadıköy"),          # Batı-Merkez (çok uzun)
    ("Arnavutköy", "Maltepe"),       # Kuzeybatı-Güneydoğu (çok uzun)
    # Truck routes (en uzun mesafeler)
    ("Silivri", "Tuzla"),            # Batı-Güneydoğu (maksimum)
    ("Çatalca", "Şile"),             # Kuzeybatı-Kuzeydoğu (maksimum)
    ("Silivri", "Beykoz"),           # Batı-Kuzeydoğu (maksimum)
    ("Çatalca", "Pendik"),           # Kuzeybatı-Güneydoğu (maksimum)
    ("Arnavutköy", "Sultanbeyli"),   # Kuzeybatı-Güneydoğu (maksimum)
    ("Büyükçekmece", "Tuzla"),       # Batı-Güneydoğu (maksimum)
    ("Silivri", "Çekmeköy"),         # Batı-Doğu (maksimum)
    ("Beylikdüzü", "Şile"),          # Güneybatı-Kuzeydoğu (maksimum)
    ("Çatalca", "Kartal"),           # Kuzeybatı-Güneydoğu (maksimum)
    ("Esenyurt", "Sultanbeyli"),     # Batı-Güneydoğu (maksimum)
    # Van routes (uzun mesafeler)
    ("Avcılar", "Ümraniye"),         # Batı-Doğu (uzun)
    ("Bakırköy", "Ataşehir"),        # Güneybatı-Doğu (uzun)
    ("Bahçelievler", "Kadıköy"),     # Batı-Güney (orta)
    ("Esenler", "Maltepe"),          # Batı-Güneydoğu (uzun)
    ("Sultangazi", "Pendik"),        # Kuzey-Güneydoğu (uzun)
    ("Küçükçekmece", "Beykoz"),      # Batı-Kuzeydoğu (uzun)
    ("Güngören", "Kartal"),          # Batı-Güneydoğu (uzun)
    ("Zeytinburnu", "Ümraniye"),     # Güneybatı-Doğu (uzun)
    ("Bayrampaşa", "Tuzla"),         # Batı-Güneydoğu (çok uzun)
    ("Kağıthane", "Sultanbeyli"),    # Kuzey-Güneydoğu (uzun)
    # Bus routes (orta-uzun mesafeler)
    ("Taksim", "Kartal"),            # Merkez-Güneydoğu (uzun)
    ("Beşiktaş", "Pendik"),          # Merkez-Güneydoğu (uzun)
    ("Şişli", "Maltepe"),            # Kuzey-Güneydoğu (uzun)
    ("Fatih", "Tuzla"),              # Merkez-Güneydoğu (çok uzun)
    ("Beyoğlu", "Sultanbeyli"),      # Merkez-Güneydoğu (çok uzun)
    ("Sarıyer", "Kadıköy"),          # Kuzey-Güney (uzun)
    ("Eminönü", "Ataşehir"),         # Merkez-Doğu (uzun)
    ("Mecidiyeköy", "Kartal"),       # Kuzey-Güneydoğu (uzun)
    ("Eyüp", "Pendik"),              # Kuzey-Güneydoğu (çok uzun)
    ("Başakşehir", "Kadıköy"),       # Batı-Güney (uzun)
]

def iso_now():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

def simulate_vehicle(vehicle_plate, route_idx):
    """Her araç için ayrı bir process ile telemetri gönder"""
    
    # Rota bilgisini al
    from_loc, to_loc = VEHICLE_ROUTES[route_idx % len(VEHICLE_ROUTES)]
    start_coords = ISTANBUL_LOCATIONS[from_loc]
    target_coords = ISTANBUL_LOCATIONS[to_loc]
    
    # Başlangıç pozisyonu
    lat, lon = start_coords[0], start_coords[1]
    alt = random.uniform(0, 150)
    
    # Araç tipine göre hız ve sıcaklık
    if "TRK" in vehicle_plate:  # Truck
        speed = random.uniform(50, 80)
        temp = random.uniform(18, 25)
    elif "BUS" in vehicle_plate:  # Bus
        speed = random.uniform(30, 60)
        temp = random.uniform(20, 26)
    elif "VAN" in vehicle_plate:  # Van
        speed = random.uniform(40, 70)
        temp = random.uniform(19, 24)
    else:  # Car
        speed = random.uniform(35, 90)
        temp = random.uniform(20, 25)
    
    # MQTT topic ve client
    normalized_plate = vehicle_plate.replace(" ", "")
    topic = f"fleet/TR34/vehicle/{normalized_plate}/telemetry"
    client = mqtt.Client(client_id=f"simulator_{normalized_plate}", protocol=mqtt.MQTTv311)
    
    try:
        client.connect(MQTT_HOST, MQTT_PORT, 60)
        client.loop_start()
        
        print(f"{vehicle_plate}: {from_loc} → {to_loc} (Topic: {topic})")
        
        interval = 1.0 / HZ
        
        while True:
            # Hedefe doğru hızlı hareket et (10x daha hızlı)
            lat += random.uniform(-0.001, 0.001) + (target_coords[0] - lat) * 0.002
            lon += random.uniform(-0.001, 0.001) + (target_coords[1] - lon) * 0.002
            
            # Hız ve sıcaklıkta küçük dalgalanmalar
            speed = max(0.0, min(140.0, speed + random.uniform(-4, 4)))
            temp = max(-10.0, min(45.0, temp + random.uniform(-0.5, 0.5)))
            
            gps_fix = random.random() > 0.02  # %98 GPS fix
            
            payload = {
                "timestamp": iso_now(),
                "vehicle_id": normalized_plate,
                "gps": {
                    "latitude": round(lat, 5),
                    "longitude": round(lon, 5),
                    "altitude_m": round(alt + random.uniform(-1, 1), 1),
                    "gps_fix": gps_fix
                },
                "speed_kmh": round(speed, 1),
                "cabin_temp_c": round(temp, 1)
            }
            
            msg = json.dumps(payload, ensure_ascii=False)
            client.publish(topic, msg, qos=0, retain=False)
            print(f"{vehicle_plate}: {lat:.5f},{lon:.5f} | {speed:.1f}km/h | {temp:.1f}°C", flush=True)
            
            time.sleep(interval)
            
    except KeyboardInterrupt:
        pass
    except Exception as e:
        print(f"{vehicle_plate} Error: {e}")
    finally:
        client.loop_stop()
        client.disconnect()

def main():
    # Araçları JSON'dan yükle
    vehicles_file = "vehicles_template.json"
    
    try:
        with open(vehicles_file, 'r', encoding='utf-8') as f:
            vehicles = json.load(f)
    except FileNotFoundError:
        print(f"{vehicles_file} bulunamadı!")
        return
    
    print(f"{len(vehicles)} araç için telemetri simülasyonu başlatılıyor...")
    print(f"MQTT Broker: {MQTT_HOST}:{MQTT_PORT}")
    print(f"Frekans: {HZ} Hz")
    print("=" * 70)
    
    processes = []
    for idx, vehicle in enumerate(vehicles):
        vehicle_plate = vehicle["vehicle_plate"]
        p = Process(target=simulate_vehicle, args=(vehicle_plate, idx))
        p.start()
        processes.append(p)
        time.sleep(0.1)
    try:
        for p in processes:
            p.join()
    except KeyboardInterrupt:
        print("\n⏹Simülasyon durduruluyor...")
        for p in processes:
            p.terminate()
            p.join()
        print("Tüm araçlar durduruldu.")

if __name__ == "__main__":
    main()
