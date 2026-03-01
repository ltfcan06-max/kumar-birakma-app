// Firebase Configuration
// Bu dosyayı Firebase Console'dan aldığın bilgilerle doldur
// https://console.firebase.google.com/ > Project Settings > Your apps

const firebaseConfig = {
    apiKey: "BURAYA_API_KEY_GELECEK",
    authDomain: "BURAYA_AUTH_DOMAIN_GELECEK",
    projectId: "BURAYA_PROJECT_ID_GELECEK",
    storageBucket: "BURAYA_STORAGE_BUCKET_GELECEK",
    messagingSenderId: "BURAYA_MESSAGING_SENDER_ID_GELECEK",
    appId: "BURAYA_APP_ID_GELECEK"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Firebase servislerini al
const auth = firebase.auth();
const db = firebase.firestore();

// Türkçe dil ayarı
auth.languageCode = 'tr';
