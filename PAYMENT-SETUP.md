# iyzico Ödeme Entegrasyonu Rehberi

## Genel Bakış

iyzico entegrasyonu için **backend server** gereklidir. İki seçenek var:

### Seçenek 1: Firebase Functions (Önerilen - Kolay)
- Sunucu yönetimi yok
- Otomatik ölçeklendirme
- Ücretsiz başlangıç (aylık 2M istek)

### Seçenek 2: Node.js Server (Daha fazla kontrol)
- Kendi sunucun (VPS, Heroku, DigitalOcean)
- Daha fazla özelleştirme
- Aylık maliyet var

## Adım 1: iyzico Hesabı Oluştur

1. https://www.iyzico.com/ adresine git
2. "Üye Ol" butonuna tıkla
3. İşletme bilgilerini doldur:
   - İşletme adı: Last Gamble veya şirket adın
   - Vergi numarası
   - İletişim bilgileri
4. Hesap onayını bekle (1-2 gün sürebilir)

## Adım 2: iyzico API Anahtarlarını Al

1. iyzico Dashboard'a giriş yap
2. **Ayarlar** > **API Anahtarları** bölümüne git
3. **Test** ve **Canlı** API anahtarlarını kopyala:
   - API Key
   - Secret Key

⚠️ **ÖNEMLİ:** Bu anahtarları GİZLİ tut! GitHub'a yükleme!

## Adım 3: Firebase Functions Kurulumu

### 3.1. Firebase CLI Kur

```bash
npm install -g firebase-tools
```

### 3.2. Firebase'e Giriş Yap

```bash
firebase login
```

### 3.3. Firebase Functions Başlat

```bash
cd kumar-birakma-web
firebase init functions
```

Sorulara cevaplar:
- Use existing project: **NoCasino** (oluşturduğun proje)
- Language: **JavaScript**
- ESLint: **Yes**
- Install dependencies: **Yes**

### 3.4. iyzico Paketini Kur

```bash
cd functions
npm install iyzipay
```

### 3.5. Environment Variables Ayarla

```bash
firebase functions:config:set iyzico.api_key="SENIN_API_KEY" iyzico.secret_key="SENIN_SECRET_KEY"
```

## Adım 4: Payment Function Oluştur

`functions/index.js` dosyasını aç ve aşağıdaki kodu ekle:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Iyzipay = require('iyzipay');

admin.initializeApp();

// iyzico yapılandırması
const iyzipay = new Iyzipay({
    apiKey: functions.config().iyzico.api_key,
    secretKey: functions.config().iyzico.secret_key,
    uri: 'https://sandbox-api.iyzipay.com' // Test için, canlıda: https://api.iyzipay.com
});

// Ödeme başlat
exports.createPayment = functions.https.onCall(async (data, context) => {
    // Kullanıcı kontrolü
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Kullanıcı giriş yapmamış');
    }

    const userId = context.auth.uid;
    const { plan, userInfo } = data;

    // Plan fiyatları
    const prices = {
        monthly: 49.00,
        yearly: 490.00
    };

    const price = prices[plan];
    if (!price) {
        throw new functions.https.HttpsError('invalid-argument', 'Geçersiz plan');
    }

    // Ödeme isteği oluştur
    const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: `${userId}-${Date.now()}`,
        price: price.toFixed(2),
        paidPrice: price.toFixed(2),
        currency: Iyzipay.CURRENCY.TRY,
        basketId: `basket-${userId}`,
        paymentGroup: Iyzipay.PAYMENT_GROUP.SUBSCRIPTION,
        callbackUrl: `https://ltfcan06-max.github.io/NoCasino/payment-callback`,
        enabledInstallments: [1],
        buyer: {
            id: userId,
            name: userInfo.name,
            surname: userInfo.surname,
            email: userInfo.email,
            identityNumber: '11111111111', // Test için
            registrationAddress: 'Türkiye',
            city: 'Istanbul',
            country: 'Turkey',
            zipCode: '34000'
        },
        shippingAddress: {
            contactName: `${userInfo.name} ${userInfo.surname}`,
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Türkiye',
            zipCode: '34000'
        },
        billingAddress: {
            contactName: `${userInfo.name} ${userInfo.surname}`,
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Türkiye',
            zipCode: '34000'
        },
        basketItems: [
            {
                id: `premium-${plan}`,
                name: `Last Gamble Premium - ${plan === 'monthly' ? 'Aylık' : 'Yıllık'}`,
                category1: 'Abonelik',
                itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                price: price.toFixed(2)
            }
        ]
    };

    try {
        const result = await new Promise((resolve, reject) => {
            iyzipay.checkoutFormInitialize.create(request, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (result.status === 'success') {
            // Ödeme kaydı oluştur
            await admin.firestore().collection('payments').add({
                userId: userId,
                plan: plan,
                amount: price,
                status: 'pending',
                token: result.token,
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });

            return {
                success: true,
                token: result.token,
                paymentPageUrl: result.paymentPageUrl
            };
        } else {
            throw new functions.https.HttpsError('internal', result.errorMessage);
        }
    } catch (error) {
        console.error('Ödeme hatası:', error);
        throw new functions.https.HttpsError('internal', 'Ödeme oluşturulamadı');
    }
});

// Ödeme callback
exports.paymentCallback = functions.https.onRequest(async (req, res) => {
    const { token } = req.body;

    try {
        const result = await new Promise((resolve, reject) => {
            iyzipay.checkoutForm.retrieve({ token }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
            // Ödeme başarılı - kullanıcıyı premium yap
            const paymentDoc = await admin.firestore()
                .collection('payments')
                .where('token', '==', token)
                .limit(1)
                .get();

            if (!paymentDoc.empty) {
                const payment = paymentDoc.docs[0];
                const userId = payment.data().userId;
                const plan = payment.data().plan;

                // Abonelik bitiş tarihini hesapla
                const endDate = new Date();
                if (plan === 'monthly') {
                    endDate.setMonth(endDate.getMonth() + 1);
                } else {
                    endDate.setFullYear(endDate.getFullYear() + 1);
                }

                // Kullanıcıyı güncelle
                await admin.firestore().collection('users').doc(userId).update({
                    subscription: 'premium',
                    subscriptionEndDate: admin.firestore.Timestamp.fromDate(endDate),
                    subscriptionPlan: plan
                });

                // Ödeme kaydını güncelle
                await payment.ref.update({
                    status: 'completed',
                    completedAt: admin.firestore.FieldValue.serverTimestamp()
                });
            }

            res.redirect('https://ltfcan06-max.github.io/NoCasino/?payment=success');
        } else {
            res.redirect('https://ltfcan06-max.github.io/NoCasino/?payment=failed');
        }
    } catch (error) {
        console.error('Callback hatası:', error);
        res.redirect('https://ltfcan06-max.github.io/NoCasino/?payment=error');
    }
});
```

## Adım 5: Functions'ı Deploy Et

```bash
firebase deploy --only functions
```

## Adım 6: Frontend'i Güncelle

`modals.js` dosyasındaki `startPayment` fonksiyonunu güncelle:

```javascript
async function startPayment(plan) {
    const user = auth.currentUser;
    
    if (!user) {
        alert('Lütfen önce giriş yapın!');
        closeSubscriptionModal();
        showLoginModal();
        return;
    }
    
    try {
        // Kullanıcı bilgilerini al
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        
        // İsim soyisim ayır
        const nameParts = (user.displayName || '').split(' ');
        const name = nameParts[0] || 'Ad';
        const surname = nameParts.slice(1).join(' ') || 'Soyad';
        
        // Firebase Function çağır
        const createPayment = firebase.functions().httpsCallable('createPayment');
        const result = await createPayment({
            plan: plan,
            userInfo: {
                name: name,
                surname: surname,
                email: user.email
            }
        });
        
        if (result.data.success) {
            // iyzico ödeme sayfasına yönlendir
            window.location.href = result.data.paymentPageUrl;
        } else {
            alert('Ödeme oluşturulamadı. Lütfen tekrar deneyin.');
        }
    } catch (error) {
        console.error('Ödeme hatası:', error);
        alert('Ödeme sırasında bir hata oluştu: ' + error.message);
    }
}
```

## Adım 7: Test Et

1. Test kartı bilgileri (iyzico sandbox):
   - Kart No: 5528790000000008
   - Son Kullanma: 12/30
   - CVV: 123
   - 3D Secure Şifre: Herhangi bir şey

2. Ödeme akışını test et:
   - Kayıt ol
   - Premium'a geç
   - Test kartıyla ödeme yap
   - Başarılı olursa kullanıcı premium olmalı

## Adım 8: Canlıya Al

1. iyzico hesabın onaylandıktan sonra
2. Canlı API anahtarlarını al
3. Firebase config'i güncelle:
```bash
firebase functions:config:set iyzico.api_key="CANLI_API_KEY" iyzico.secret_key="CANLI_SECRET_KEY"
```
4. `functions/index.js`'de URI'yi değiştir:
```javascript
uri: 'https://api.iyzipay.com' // Canlı
```
5. Deploy et:
```bash
firebase deploy --only functions
```

## Maliyet Hesabı

### Firebase Functions (Ücretsiz Plan)
- 2M çağrı/ay ücretsiz
- Sonrası: $0.40 / 1M çağrı

### iyzico Komisyonları
- Kredi kartı: %2.99 + 0.25 TL
- Banka kartı: %1.99 + 0.25 TL
- Örnek: 49 TL ödeme = ~1.70 TL komisyon

## Güvenlik Notları

✅ API anahtarları backend'de (güvenli)
✅ Ödeme iyzico'da işlenir (PCI-DSS uyumlu)
✅ Kullanıcı verileri şifreli
✅ KVKK uyumlu

## Sorun Giderme

**Hata: "Functions not deployed"**
- `firebase deploy --only functions` komutunu çalıştır

**Hata: "iyzico API error"**
- API anahtarlarını kontrol et
- Test/Canlı mod uyumunu kontrol et

**Ödeme başarılı ama kullanıcı premium olmadı:**
- Firestore Rules'u kontrol et
- Functions loglarını kontrol et: `firebase functions:log`
