# Firebase Kurulum Rehberi

## Adım 1: Firebase Projesi Oluştur

1. https://console.firebase.google.com/ adresine git
2. Google hesabınla giriş yap
3. "Add project" veya "Proje ekle" butonuna tıkla
4. Proje adı: **NoCasino** veya **LastGamble**
5. Google Analytics'i istersen aktif et (opsiyonel)
6. "Create project" tıkla ve projenin oluşmasını bekle

## Adım 2: Web Uygulaması Ekle

1. Firebase Console'da projenin ana sayfasında
2. "</>" (Web) ikonuna tıkla
3. App nickname: **NoCasino Web**
4. "Also set up Firebase Hosting" kutusunu işaretle
5. "Register app" butonuna tıkla

## Adım 3: Firebase Configuration Kopyala

1. Ekranda gösterilen `firebaseConfig` objesini kopyala
2. `firebase-config.js` dosyasını aç
3. Kopyaladığın bilgileri ilgili yerlere yapıştır:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",  // Buraya kendi API key'ini yapıştır
    authDomain: "nocasino-xxxxx.firebaseapp.com",
    projectId: "nocasino-xxxxx",
    storageBucket: "nocasino-xxxxx.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:xxxxx"
};
```

## Adım 4: Authentication'ı Aktif Et

1. Sol menüden **Build** > **Authentication** tıkla
2. "Get started" butonuna tıkla
3. **Sign-in method** sekmesine git
4. **Email/Password** seçeneğini aktif et:
   - Email/Password satırına tıkla
   - "Enable" toggle'ını aç
   - "Save" butonuna tıkla

## Adım 5: Firestore Database Oluştur

1. Sol menüden **Build** > **Firestore Database** tıkla
2. "Create database" butonuna tıkla
3. **Start in production mode** seç (güvenlik için)
4. Location: **europe-west** (Avrupa sunucusu - Türkiye'ye yakın)
5. "Enable" butonuna tıkla

## Adım 6: Firestore Güvenlik Kuralları

1. Firestore Database sayfasında **Rules** sekmesine git
2. Aşağıdaki kuralları yapıştır:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar sadece kendi verilerini okuyabilir/yazabilir
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Ödeme kayıtları sadece okunabilir
    match /payments/{paymentId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if false; // Sadece backend yazabilir
    }
  }
}
```

3. "Publish" butonuna tıkla

## Adım 7: Email Şablonlarını Özelleştir (Opsiyonel)

1. **Authentication** > **Templates** sekmesine git
2. Email doğrulama, şifre sıfırlama şablonlarını Türkçeleştirebilirsin
3. Sender name: **Last Gamble**
4. Sender email: **noreply@nocasino.com** (veya Firebase'in verdiği)

## Adım 8: Test Et

1. `firebase-config.js` dosyasını kaydet
2. Web siteni aç (localhost veya GitHub Pages)
3. "Üyelik Oluştur" butonuna tıkla
4. Test kullanıcısı oluştur
5. Firebase Console > Authentication > Users bölümünde kullanıcıyı görebilmelisin

## Adım 9: GitHub'a Yükle

```bash
cd kumar-birakma-web
git add .
git commit -m "Firebase authentication system added"
git push
```

## Önemli Notlar

⚠️ **GÜVENLİK:**
- `firebase-config.js` dosyasındaki bilgiler public olabilir (GitHub'da görünür)
- Güvenlik Firestore Rules ile sağlanır
- API key'i gizlemeye gerek yok (zaten client-side)

✅ **KVKK Uyumlu:**
- Kullanıcı verileri şifreli saklanır
- Sadece kullanıcı kendi verilerini görebilir
- Email doğrulama zorunlu

📱 **Mobil Uygulama:**
- Aynı Firebase projesini mobil uygulamada da kullanabilirsin
- Android/iOS için ayrı configuration gerekir

## Sorun Giderme

**Hata: "Firebase not defined"**
- Internet bağlantını kontrol et
- Firebase SDK script'lerinin yüklendiğinden emin ol

**Hata: "Permission denied"**
- Firestore Rules'u kontrol et
- Kullanıcı giriş yapmış mı kontrol et

**Email gelmiyor:**
- Spam klasörünü kontrol et
- Firebase Console > Authentication > Templates'den email ayarlarını kontrol et

## Sonraki Adımlar

1. ✅ Firebase kurulumu tamamlandı
2. ⏳ iyzico ödeme entegrasyonu (backend gerekli)
3. ⏳ Premium özellikleri ekle
4. ⏳ Mobil uygulamayı güncelle
