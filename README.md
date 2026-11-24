# Uludoğan Panjur — Web Sitesi

Seçkin Uludoğan için panjur, sineklik ve cam balkon tanıtım sitesi.
Tamamen statik (HTML + CSS + JS); derleme gerektirmez, GitHub Pages'te doğrudan çalışır.

## Bilgileri güncelleme

Telefon, WhatsApp, çalışma saatleri, hizmet bölgesi, e-posta ve Instagram bilgileri
**tek bir dosyadan** değiştirilir:

```
js/ayarlar.js
```

- `telefon`: aranacak numara, örn. `+905321234567`
- `telefonGorunen`: sitede görünen numara, örn. `0 (532) 123 45 67`
- `whatsapp`: WhatsApp numarası, örn. `905321234567`
- `bolge`: hizmet verilen şehir/ilçe
- `eposta`, `instagram`: boş bırakılırsa sitede gizlenir

> Not: `index.html` içinde de yer tutucu numara `0 (500) 000 00 00` yazılı. Bu yalnızca
> JavaScript kapalıyken görünür; isterseniz bul-değiştir ile gerçek numarayla değiştirin.

## GitHub Pages'te yayınlama

1. GitHub'da yeni bir depo oluşturun (ör. `uludogan-panjur`).
2. Bu klasördeki tüm dosyaları depoya yükleyin:
   ```bash
   git init
   git add .
   git commit -m "İlk sürüm"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADI/uludogan-panjur.git
   git push -u origin main
   ```
3. Depoda **Settings → Pages** bölümüne girin, **Source: Deploy from a branch**,
   **Branch: main / (root)** seçip kaydedin.
4. Birkaç dakika içinde site `https://KULLANICI_ADI.github.io/uludogan-panjur/` adresinde yayında olur.

Kendi alan adınızı (ör. `uludoganpanjur.com`) bağlamak için aynı sayfadaki **Custom domain** alanını kullanabilirsiniz.

## Yerelde önizleme

```bash
python -m http.server 5173
```

Ardından tarayıcıda `http://localhost:5173` adresini açın.

## Dosya yapısı

```
index.html          Ana sayfa
404.html            Bulunamadı sayfası
css/style.css       Tüm stiller (açık/koyu tema, mobil uyum, animasyonlar)
js/ayarlar.js       İletişim bilgileri
js/main.js          Tema, menü, sekmeler, galeri, WhatsApp formu
assets/img/         Fotoğraflar (WebP)
```

## Fotoğraflar

Görseller [Unsplash](https://unsplash.com/license) lisansıyla kullanılmıştır (ticari kullanım serbest).
Kendi iş fotoğraflarınızı `assets/img/` klasörüne aynı adla koyarak değiştirebilirsiniz.

| Dosya | Kaynak |
| --- | --- |
| hero-cephe.webp | https://unsplash.com/photos/RAdJsQhjVKU |
| panjur-beyaz.webp | https://unsplash.com/photos/LBwVPZtTDyM |
| panjur-yesil.webp | https://unsplash.com/photos/RCRl2sxkg48 |
| cephe-minimal.webp | https://unsplash.com/photos/HEVgXvfKl8Q |
| sineklik-deniz.webp | https://unsplash.com/photos/IQKuHc2lils |
| balkon-kapi.webp | https://unsplash.com/photos/72p7lxBQJPU |
| kepenk-deniz.webp | https://unsplash.com/photos/dfnCzWnHx10 |
| cam-balkon.webp | https://unsplash.com/photos/b-Rt2TpFePY |
| cam-cephe.webp | https://unsplash.com/photos/eWOgoFHlE8g |
| balkonlar.webp | https://unsplash.com/photos/ZMeYdUGeQO0 |
| ahsap-kepenk.webp | https://unsplash.com/photos/z5eHJ6iLVIk |
| montaj.webp | https://unsplash.com/photos/kP2_hVDqOzk |
| olcu.webp | https://unsplash.com/photos/L-h4SHggWtU |
| isik.webp | https://unsplash.com/photos/mnnAa1CBrM8 |
| balkon-deniz.webp | https://unsplash.com/photos/2b4zEV9_7jw |
