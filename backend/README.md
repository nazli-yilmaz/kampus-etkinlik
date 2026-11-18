# Kampüs Etkinlikleri REST API

## Proje Hakkında

Bu proje, Kampüs Etkinlikleri uygulaması için Node.js, Express.js ve MongoDB / Mongoose kullanılarak geliştirilmiş bir REST API'dir. Etkinlikleri listeleme, kategoriye göre filtreleme, ID'ye göre görüntüleme ve yeni etkinlik oluşturma işlemlerini destekler.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- MongoDB & Mongoose
- CORS
- dotenv

## Kurulum

Backend klasöründe aşağıdaki komut çalıştırılır:

```bash
npm install
```

## Ortam Değişkenleri

`backend` klasöründe `.env.example` dosyası örnek alınarak `.env` dosyası oluşturulur.

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/kampus?retryWrites=true&w=majority
```

## Veritabanı Tohumlama (Seed)

Veritabanını 6 temel kampüs etkinliği ile doldurmak / yenilemek için:

```bash
npm run seed
```

## Çalıştırma

```bash
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

## API Endpointleri

### 1. GET /health

API'nin çalışır durumda olduğunu kontrol eder.

Örnek yanıt (200 OK):

```json
{
  "status": "ok",
  "time": "2026-11-18T12:00:00.000Z",
  "student": "2311012070"
}
```

### 2. GET /events

Tüm etkinlikleri listeler.

Örnek istek:

```http
GET /events
```

### 3. GET /events/:id

Belirtilen MongoDB ObjectId'sine sahip etkinliği getirir.

Örnek istek:

```http
GET /events/6afd4e416cbf5332d813b706
```

Etkinlik bulunamazsa veya geçersiz ID girilirse (404 Not Found):

```json
{
  "error": {
    "message": "Event not found"
  }
}
```

### 4. GET /events?category=Seminer

Belirtilen kategoriye ait etkinlikleri listeler.

Örnek istek:

```http
GET /events?category=Seminer
```

### 5. POST /events

Yeni etkinlik oluşturur.

Örnek istek gövdesi:

```json
{
  "title": "Yeni Etkinlik",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30,
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı",
  "description": "Örnek etkinlik açıklaması."
}
```

Başarılı yanıt: `201 Created`

Zorunlu alanlar (`title`, `category`, `date`) eksikse veya validasyon hatası varsa:

```json
{
  "error": {
    "message": "title, category and date are required"
  }
}
```

Yanıt kodu: `400 Bad Request`

## Hata Kodları

| HTTP Kodu | Açıklama |
|---|---|
| 200 | İstek başarılı |
| 201 | Etkinlik başarıyla oluşturuldu |
| 400 | Zorunlu alan eksik veya geçersiz veri (ValidationError / CastError) |
| 404 | Etkinlik bulunamadı veya geçersiz ID formatı |

## Postman Koleksiyonu

API test istekleri `requests/kampus-api.json` dosyasında bulunmaktadır.

## Öğrenci Bilgisi

Öğrenci Numarası: **2311012070**
