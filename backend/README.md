# Kampüs Etkinlikleri REST API

## Proje Hakkında

Bu proje, Kampüs Etkinlikleri uygulaması için Node.js, Express.js ve MongoDB / Mongoose kullanılarak geliştirilmiş tam CRUD özellikli bir REST API'dir (Sprint 9). Etkinlikleri listeleme, başlıkta arama (`search`), kategoriye göre filtreleme (`category`), yaklaşan etkinlikleri görüntüleme (`/upcoming`), ID'ye göre detay alma, yeni etkinlik ekleme, kısmi güncelleme (`PATCH`) ve silme (`DELETE`) işlemlerini destekler.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- MongoDB & Mongoose
- CORS
- dotenv
- Newman (Test otomasyonu)

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

Veritabanını 2'si geçmiş, 4'ü gelecekte olmak üzere toplam 6 özgün kampüs etkinliği ile doldurmak / yenilemek için:

```bash
npm run seed
```

## Çalıştırma

```bash
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

## API Sözleşmesi

| Method | Endpoint | Başarılı | Hata | Açıklama |
|---|---|---|---|---|
| GET | `/health` | 200 | — | Sağlık kontrolü ve öğrenci numarası |
| GET | `/events` | 200 | — | Tüm etkinlikleri listeler (tarihe göre sıralı) |
| GET | `/events?search=&category=` | 200 | — | Başlıkta arama ve kategori filtreleme |
| GET | `/events/upcoming` | 200 | — | Bugün ve gelecekteki etkinlikler (en yakın önce) |
| GET | `/events/:id` | 200 | 404 | Belirtilen ID'ye sahip etkinlik |
| POST | `/events` | 201 | 400 | Yeni etkinlik oluşturma |
| PATCH | `/events/:id` | 200 | 400, 404 | Sadece gönderilen alanları güncelleme |
| DELETE | `/events/:id` | 204 | 404 | Etkinliği silme (yanıt gövdesi boş) |

## Tarih Formatı (GG-AA-YYYY)

- API üzerinde tüm tarihler **GG-AA-YYYY** biçimindedir (Örn: `20-12-2026`).
- MongoDB veritabanında tarihler sorgulama ve kronolojik sıralama için gerçek `Date` tipinde saklanır.
- API yanıtlarında otomatik olarak `GG-AA-YYYY` biçimine dönüştürülerek sunulur.

## API Endpoint Detayları

### 1. GET /health
API'nin çalışır durumda olduğunu ve öğrenci numarasını doğrular.

Örnek yanıt (200 OK):
```json
{
  "status": "ok",
  "time": "2026-11-25T12:00:00.000Z",
  "student": "2311012070"
}
```

### 2. GET /events
Tüm etkinlikleri tarihe göre artan sırada listeler. `search` ve `category` query parametrelerini destekler.

- `GET /events?search=atölye` : Başlığında büyük/küçük harf duyarsız "atölye" geçenleri listeler.
- `GET /events?category=Atölye` : Sadece "Atölye" kategorisindekileri listeler.
- `GET /events?search=atölye&category=Atölye` : İki filtreyi birlikte uygular.

### 3. GET /events/upcoming
Bugün ve sonrasındaki etkinlikleri artan tarih ve saat sırasıyla listeler. Geçmiş tarihli etkinlikler bu listede yer almaz.

### 4. GET /events/:id
Belirtilen MongoDB ObjectId'sine sahip etkinliği döner. Geçersiz ID formatında veya kayıt bulunamadığında `404 Not Found` döner.

### 5. POST /events
Yeni etkinlik oluşturur. `title`, `category`, `date` zorunludur. `capacity` en az 1 olmalıdır.

Örnek İstek:
```json
{
  "title": "Yeni Etkinlik",
  "category": "Atölye",
  "date": "20-12-2026",
  "capacity": 30,
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı",
  "description": "Örnek etkinlik açıklaması."
}
```
Başarılı Yanıt: `201 Created`

### 6. PATCH /events/:id
Etkinliğin sadece gönderilen alanlarını günceller.
- Boş gövde (`{}`) gönderilirse `400 Bad Request` (`Body is empty`) döner.
- `_id`, `createdAt`, `updatedAt`, `__v` korunan alanları gönderilirse `400 Bad Request` döner.
- Schema validasyon kuralları güncellemede de geçerlidir (`runValidators: true`).
- Güncellenmiş kaydı döner (`returnDocument: "after"`).

### 7. DELETE /events/:id
Belirtilen etkinliği veritabanından siler.
- Başarılı silme işleminde `204 No Content` döner ve yanıt gövdesi boştur.
- Olmayan veya silinmiş ID için `404 Not Found` döner.

## Hata Formatı

Tüm hata yanıtları standart formatta döner:

```json
{
  "error": {
    "message": "Hata açıklaması"
  }
}
```

## Newman Testi

Projenin testleri Postman / Newman ile çalıştırılabilir:

```bash
newman run https://webdersi.vercel.app/test.json
```

Toplam 18 istek ve 45 test assertions içermektedir. Test sonuçları `backend/requests/run-results.json` dosyasında tutulmaktadır.

## Öğrenci Bilgisi

Öğrenci Numarası: **2311012070**
