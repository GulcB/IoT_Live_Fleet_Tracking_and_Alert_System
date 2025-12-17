# IoT Live Fleet Tracking and Alert System

## Proje Hakkında

Bu proje, araç filolarının gerçek zamanlı olarak izlenmesi, telemetri verilerinin toplanması ve analiz edilmesi için geliştirilmiş kapsamlı bir IoT sistemidir. Mikroservis mimarisi üzerine kurulu olan sistem, yüzlerce aracın eş zamanlı olarak konumunu, hızını, sıcaklık verilerini ve diğer sensör bilgilerini takip edebilme kapasitesine sahiptir.

Sistemin geliştirilmesi sırasında, gerçek dünya IoT senaryolarındaki zorluklar göz önünde bulundurulmuştur. MQTT protokolü ile hafif ve verimli veri iletişimi, Redis ile yüksek performanslı mesaj kuyruğu yönetimi, WebSocket ile anında veri aktarımı ve modern web teknolojileri ile kullanıcı dostu bir arayüz bir araya getirilmiştir. Proje, lojistik şirketleri, kargo firmaları, toplu taşıma sistemleri ve servis araçlarının yönetimi gibi birçok farklı sektörde kullanılabilecek esnekliğe sahiptir.

## Teknik Altyapı

Proje tamamen konteyner tabanlı bir mimari kullanır ve Docker Compose ile orkestrasyonu sağlanır. Backend tarafında Django ve Django Channels kullanılarak RESTful API ve WebSocket desteği sunulur. Frontend, React ve TypeScript ile geliştirilmiş olup, Leaflet kütüphanesi sayesinde interaktif harita özellikleri sağlar. Telemetri verileri MQTT broker (Eclipse Mosquitto) üzerinden toplanır, Redis'e yazılır ve Django tarafından işlenerek PostgreSQL veritabanına kaydedilir. Nginx reverse proxy olarak tüm servislerin trafiğini yönetir ve WebSocket bağlantılarını destekler.

Sistemin gerçek zamanlılığı, MQTT'nin yayın-abone modelini Redis'in pub/sub mekanizması ile birleştirerek sağlanır. Her araç, belirli bir topic'e telemetri verisi yayınlar, worker servisleri bu verileri dinler ve işler, ardından Django Channels aracılığıyla WebSocket üzerinden frontend'e iletilir. Bu sayede kullanıcılar, harita üzerinde araçların saniyeler içinde hareket ettiğini görebilir.

## Sistem Bileşenleri

**Backend Servisleri:** Django REST Framework ile API endpoint'leri, Django Channels ile WebSocket server, Redis bridge ile MQTT-Redis entegrasyonu, PostgreSQL veritabanı yönetimi.

**Frontend:** React 18 ile single-page application, Material-UI ile modern arayüz tasarımı, Leaflet ile interaktif harita görünümü, WebSocket client ile canlı veri akışı, Firebase authentication entegrasyonu.

**IoT Katmanı:** Eclipse Mosquitto MQTT broker, Python tabanlı telemetri simülatörü, Redis message queue, MQTT worker servisleri.

**Altyapı:** Docker ve Docker Compose ile konteynerizasyon, Nginx reverse proxy, Volume yönetimi ile veri persistency.

## Kurulum ve Çalıştırma

Projeyi çalıştırmak için öncelikle Docker ve Docker Compose'un sisteminizde kurulu olması gerekmektedir. Ardından, proje dizinine gidin ve gerekli konfigürasyon dosyalarını hazırlayın.

İlk olarak, `.env` dosyasını oluşturmalısınız. Proje kök dizininde `example.env` dosyasını `.env` olarak kopyalayın ve gerekli değişkenleri düzenleyin:

```bash
cp example.env .env
```

Ardından, Mosquitto için gerekli dizinleri oluşturun:

```bash
mkdir -p mosquitto/data mosquitto/log
```

Tüm servisleri başlatmak için Docker Compose kullanın:

```bash
docker-compose up --build
```

İlk başlatmada, Django migration'larının çalıştırılması ve veritabanının hazırlanması gerekir. Container'lar ayağa kalktıktan sonra, başka bir terminal penceresinde şu komutları çalıştırın:

```bash
docker exec -it django-backend python manage.py migrate
docker exec -it django-backend python manage.py createsuperuser
```

Araç verilerini veritabanına yüklemek için hazır script'i kullanabilirsiniz:

```bash
docker exec -it django-backend python manage.py import_vehicles
```

Veya doğrudan SQL ile veri ekleyebilirsiniz. `vehicles_template.json` dosyası 50 farklı araç bilgisi içerir ve sistem bu araçları otomatik olarak yükleyebilir.

## Telemetri Simülasyonu

Gerçek IoT cihazları olmadan sistemi test etmek için bir Python simülatörü geliştirilmiştir. Bu simülatör, 50 araç için eş zamanlı olarak telemetri verisi üretir ve MQTT broker'a yayınlar. Her araç, İstanbul'un farklı semtleri arasında gerçekçi rotalar izler ve araç tipine göre farklı hız aralıklarında hareket eder.

Simülatörü çalıştırmak için:

```bash
python3 test.py
```

Simülatör, her araç için ayrı bir process oluşturur ve paralel olarak veri gönderir. Araçlar, atanan rotalarına göre hedefe doğru ilerler ve her saniye GPS koordinatı, hız, sıcaklık gibi verileri paylaşır. Bu veriler MQTT üzerinden worker servislerine, oradan Redis'e, ardından Django backend'ine ve son olarak WebSocket ile frontend'e ulaşır.

## Arayüz Kullanımı

Tarayıcınızdan `http://localhost` adresine giderek uygulamaya erişebilirsiniz. Ana sayfada Dashboard, Live Map, Vehicles ve Alerts gibi bölümler bulunur.

**Dashboard:** Filonun genel durumu, toplam araç sayısı, aktif araçlar, ortalama hız ve diğer istatistikler görüntülenir.

**Live Map:** İnteraktif harita üzerinde tüm araçların gerçek zamanlı konumları gösterilir. Bir aracı tıkladığınızda, o aracın detaylı telemetri bilgileri yan panelde görünür. Araç seçimi yapıldığında, WebSocket bağlantısı kurulur ve o aracın verileri canlı olarak güncellenir.

**Vehicles:** Tüm araçların listelendiği, filtreleme ve arama yapılabilen tablo görünümü. Yeni araç ekleyebilir, mevcut araçları düzenleyebilir veya silebilirsiniz.

**Alerts:** Geofence ihlalleri, hız limiti aşımları ve diğer uyarıların listelendiği bölüm.

## Geliştirme Notları

Proje geliştirme aşamasında, performans ve ölçeklenebilirlik önemli öncelikler olmuştur. WebSocket bağlantılarının verimli yönetimi için Django Channels'ın async consumer yapısı kullanılmıştır. Frontend'de gereksiz render'ların önlenmesi için React hooks ve memoization teknikleri uygulanmıştır. MQTT QoS seviyeleri, veri kaybını minimize edecek şekilde yapılandırılmıştır.

Sistemin gerçek production ortamına alınması durumunda göz önünde bulundurulması gereken konular: HTTPS/WSS kullanımı, authentication ve authorization mekanizmalarının güçlendirilmesi, rate limiting uygulanması, Redis cluster yapılandırması, PostgreSQL read replica'larının eklenmesi, monitoring ve logging altyapısının kurulması.

## Lisans

Bu proje MIT lisansı altında sunulmaktadır. Detaylar için LICENSE dosyasına bakabilirsiniz.

## Katkıda Bulunma

Projeye katkıda bulunmak isterseniz, fork edip pull request gönderebilirsiniz. Büyük değişiklikler için önce bir issue açarak tartışmayı öneriyoruz.
