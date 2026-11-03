# Kampüs Etkinlikleri

Üniversite öğrencilerinin kampüs etkinliklerini görüntüleyebildiği, arayabildiği ve etkinlikler hakkında detaylı bilgi alabildiği React tabanlı web uygulaması.

## Kullanılan Teknolojiler

- React
- TypeScript
- Vite
- React Router
- Context API
- CSS

## Kurulum

Projeyi bilgisayarınıza indirdikten sonra frontend klasörüne girin:

```bash
cd frontend
```

Gerekli paketleri yükleyin:

```bash
npm install
```

Projeyi geliştirme modunda başlatın:

```bash
npm run dev
```

Üretim sürümünü oluşturmak için:

```bash
npm run build
```

## Sayfalar ve Rotalar

| Sayfa | Rota |
|---|---|
| Ana Sayfa | `/` |
| Etkinlikler | `/etkinlikler` |
| Etkinlik Detayı | `/etkinlik/:id` |
| Yönetim Paneli | `/admin` |
| Etkinlik Ekle | `/etkinlik-ekle` |
| Etkinlik Düzenle | `/etkinlik-duzenle/:id` |
| Giriş Yap | `/giris` |
| Kayıt Ol | `/kayit` |
| Şifremi Unuttum | `/sifremi-unuttum` |
| Bulunamadı | `*` |

## Özellikler

- Etkinlikleri listeleme ve detaylarını görüntüleme
- Yeni etkinlik ekleme
- Etkinlikleri düzenleme ve silme
- Silme işlemi öncesinde onay isteme
- Etkinlikleri arama
- Kategoriye göre filtreleme
- Form doğrulama
- Context API ile merkezi etkinlik yönetimi
- Mobil uyumlu arayüz

## Canlı Uygulama

[https://kampus-etkinlik-seven.vercel.app/](https://kampus-etkinlik-seven.vercel.app/)

## GitHub

[https://github.com/nazli-yilmaz/kampus-etkinlik](https://github.com/nazli-yilmaz/kampus-etkinlik)

