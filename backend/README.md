# Kampüs Etkinlikleri REST API

## Proje Hakkında
Bu proje, Kampüs Etkinlikleri uygulaması için Express.js kullanılarak geliştirilmiş bir REST API'dir.

## Kullanılan Teknolojiler
- Node.js
- Express.js
- CORS
- dotenv

## Kurulum

```bash
npm install
```

## Çalıştırma

```bash
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.

## API Endpointleri

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | /health | API sağlık kontrolü |
| GET | /events | Tüm etkinlikleri listeler |
| GET | /events/:id | ID'ye göre etkinlik getirir |
| GET | /events?category=Seminer | Kategoriye göre filtreler |
| POST | /events | Yeni etkinlik oluşturur |

## Hata Kodları
- 400: Eksik veya geçersiz zorunlu veri
- 404: Etkinlik bulunamadı
- 201: Etkinlik başarıyla oluşturuldu

## Öğrenci Bilgisi
Öğrenci Numarası: 2311012070