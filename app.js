// Motivasyon mesajları
const motivations = [
    "Her gün kumar oynamadan geçirdiğin bir gün, özgürlüğe doğru atılmış bir adımdır! 💪",
    "Bugün kumar oynamadın ve bu harika! Yarın da oynamayacaksın! 🌟",
    "Paranı kumar yerine kendine ve sevdiklerine harca. Buna değersin! ❤️",
    "Kumar geçici bir heyecan, özgürlük kalıcı bir mutluluk! 🎯",
    "Her direniş, seni daha güçlü yapıyor! 💎",
    "Bugün kazandığın para, yarın için bir umut! 🌈",
    "Kumar seni kontrol etmesine izin verme. Sen kontrolü ele al! 🔥",
    "Ailene ve kendine verdiğin sözü hatırla! 👨‍👩‍👧‍👦",
    "Bu yolculukta yalnız değilsin. Devam et! 🤝",
    "Her temiz gün, yeni bir başlangıç! 🌅",
    "Güçlü ol, kumar senden daha güçlü değil! 💪",
    "Hayallerini kumar masasında bırakma, gerçekleştir! ✨",
    "Bugün kazandığın zafer, yarının gücü! 🏆",
    "Kumar bağımlılığı bir hastalık, iyileşmek bir seçim! 🌱",
    "Her 'hayır' dediğin an, özgürlüğe bir adım daha yaklaşıyorsun! 🚶",
    "Paranı değil, hayatını kazan! 🎯",
    "Kumar geçici, pişmanlık kalıcı. Doğru seçimi yap! ⚖️",
    "Bugün kumar oynamadın, bu bir başarı! Kutla! 🎉",
    "Ailene sarıl, kumara değil! 🤗",
    "Her gün bir fırsat, her an bir seçim! ⏰",
    "Kumar seni yıkamaz, sen kumara yıkılmazsın! 🛡️",
    "Güçlü kal, dirençli ol, özgür yaşa! 🦅",
    "Bugün tasarruf ettiğin para, yarın mutluluğun! 💰",
    "Kumar değil, hayat kazandırır! 🌍",
    "Her temiz gün, bir zafer anıtı! 🗿",
    "Kendine inan, kumar bağımlılığını yen! 💫",
    "Bugün kumar oynamadın, yarın da oynamayacaksın! 📅",
    "Özgürlük, kumar masasında değil kalbinde! ❤️",
    "Her direniş, karakterini güçlendirir! 🏋️",
    "Kumar geçici zevk, özgürlük kalıcı huzur! ☮️",
    "Bugün kazandığın para, yarın hayallerini gerçekleştirir! 🌠",
    "Kumar seni kontrol etmesin, sen hayatını kontrol et! 🎮",
    "Her 'hayır' dediğin an, özgürlüğe bir adım! 👣",
    "Güçlü ol, kumar senden daha güçlü olamaz! 💪",
    "Bugün kumar oynamadın, bu bir mucize! ✨",
    "Ailene zaman ayır, kumara değil! ⏳",
    "Her gün bir şans, her an bir umut! 🌈",
    "Kumar seni yıkmaz, sen kumara yıkılmazsın! 🏔️",
    "Güçlü kal, dirençli ol, mutlu yaşa! 😊",
    "Bugün tasarruf ettiğin para, yarın özgürlüğün! 🕊️",
    "Kumar değil, sevgi kazandırır! 💕",
    "Her temiz gün, bir başarı hikayesi! 📖",
    "Kendine güven, kumar bağımlılığını yen! 🎯",
    "Bugün kumar oynamadın, yarın da oynamayacaksın! 🚫",
    "Özgürlük, kumar masasında değil ruhunda! 🌟",
    "Her direniş, ruhunu güçlendirir! 🧘",
    "Kumar geçici heyecan, özgürlük kalıcı mutluluk! 😄",
    "Bugün kazandığın para, yarın geleceğini inşa eder! 🏗️",
    "Kumar seni yönetmesin, sen hayatını yönet! 🧭",
    "Her 'hayır' dediğin an, özgürlüğe bir adım daha! 🚶‍♂️",
    "Güçlü ol, kumar senden asla güçlü olamaz! 🦁",
    "Bugün kumar oynamadın, bu bir zafer! 🏅",
    "Ailene değer ver, kumara değil! 👪",
    "Her gün bir hediye, her an bir nimet! 🎁",
    "Kumar seni yenmez, sen kumara yenilmezsin! ⚔️",
    "Güçlü kal, dirençli ol, özgür yaşa! 🦋",
    "Bugün tasarruf ettiğin para, yarın mutluluğunu alır! 🛍️",
    "Kumar değil, aşk kazandırır! 💗",
    "Her temiz gün, bir gurur kaynağı! 🌺",
    "Kendine inan, kumar bağımlılığını yenebilirsin! 💪",
    "Bugün kumar oynamadın, yarın da oynamayacaksın! 🔒",
    "Özgürlük, kumar masasında değil kalbinde yaşar! 💓",
    "Her direniş, iradenin gücünü gösterir! 🔥",
    "Kumar geçici, pişmanlık ebedi. Doğru seçimi yap! ✅",
    "Bugün kazandığın para, yarın hayallerini süsler! 🎨",
    "Kumar seni esir almasın, sen özgür ol! 🗽",
    "Her 'hayır' dediğin an, özgürlüğe bir adım daha yakın! 🎯",
    "Güçlü ol, kumar senden hiçbir zaman güçlü olamaz! 🐯",
    "Bugün kumar oynamadın, bu bir başarı öyküsü! 📚",
    "Ailene sevgini göster, kumara değil! 💝",
    "Her gün bir mucize, her an bir fırsat! 🌟",
    "Kumar seni alt edemez, sen kumara alt edilmezsin! 🛡️",
    "Güçlü kal, dirençli ol, huzurlu yaşa! 🕊️",
    "Bugün tasarruf ettiğin para, yarın özgürlüğünü satın alır! 🔑",
    "Kumar değil, umut kazandırır! 🌈",
    "Her temiz gün, bir zafer anısı! 🏆",
    "Kendine güven, kumar bağımlılığını mutlaka yeneceksin! 💫",
    "Bugün kumar oynamadın, yarın da oynamayacaksın! 🚷",
    "Özgürlük, kumar masasında değil hayatında! 🌍",
    "Her direniş, karakterini inşa eder! 🏛️",
    "Kumar geçici zevk, özgürlük kalıcı huzur! 🧘‍♀️",
    "Bugün kazandığın para, yarın mutluluğunu getirir! 🎊",
    "Kumar seni yönetmesin, sen kendi hayatının patronu ol! 👑",
    "Her 'hayır' dediğin an, özgürlüğe bir adım daha atıyorsun! 🚀",
    "Güçlü ol, kumar senden asla daha güçlü değil! 🦸",
    "Bugün kumar oynamadın, bu bir dönüm noktası! 🔄",
    "Ailene zaman ayır, kumara harcama! ⏰",
    "Her gün bir armağan, her an bir lütuf! 🎀",
    "Kumar seni yenemez, sen kumara yenilmezsin! ⚡",
    "Güçlü kal, dirençli ol, mutlu yaşa! 🌻",
    "Bugün tasarruf ettiğin para, yarın hayallerini gerçekleştirir! 🌠",
    "Kumar değil, sevgi ve umut kazandırır! 💖",
    "Her temiz gün, bir başarı madalyası! 🥇",
    "Kendine inan, kumar bağımlılığını kesinlikle yeneceksin! 🎯",
    "Bugün kumar oynamadın, yarın da oynamayacaksın! 🔐",
    "Özgürlük, kumar masasında değil ruhunda yaşar! ✨",
    "Her direniş, geleceğini inşa eder! 🏗️",
    "Kumar geçici, özgürlük kalıcı! 🌟"
];

// Hedefler
const milestones = [
    { days: 1, name: "İlk Gün", emoji: "🌱" },
    { days: 3, name: "3 Gün", emoji: "🌿" },
    { days: 7, name: "1 Hafta", emoji: "🌳" },
    { days: 14, name: "2 Hafta", emoji: "🎋" },
    { days: 30, name: "1 Ay", emoji: "🏆" },
    { days: 60, name: "2 Ay", emoji: "🥇" },
    { days: 90, name: "3 Ay", emoji: "👑" },
    { days: 180, name: "6 Ay", emoji: "💎" },
    { days: 365, name: "1 Yıl", emoji: "🌟" }
];

// Acil durum mesajları - 6 farklı kombinasyon
const emergencyCombinations = [
    {
        title: "Nefes Egzersizi",
        messages: [
            "Gözlerini kapat ve derin bir nefes al",
            "4 saniye içeri çek, 4 saniye tut, 4 saniye dışarı ver",
            "Bu nefes egzersizini 5 kez tekrarla",
            "Vücudundaki gerginliği hisset ve bırak",
            "Şu anda güvendesin, her şey yolunda"
        ]
    },
    {
        title: "Farkındalık Meditasyonu",
        messages: [
            "Şu anda neredesin? Etrafına bak",
            "5 şey gör, 4 şey duy, 3 şey hisset",
            "Bu his geçici, sen kalıcısın",
            "Kumar oynamak istemek normal, ama oynamak zorunda değilsin",
            "Bu anı geçir, güçlü ol"
        ]
    },
    {
        title: "Beden Taraması",
        messages: [
            "Ayaklarından başla, kaslarını gevşet",
            "Bacaklarını, karnını, göğsünü rahatla",
            "Omuzlarını indir, çeneni gevşet",
            "Tüm vücudun rahat ve huzurlu",
            "Kumar isteği sadece bir düşünce, geçecek"
        ]
    },
    {
        title: "Olumlu Düşünce",
        messages: [
            "Ben güçlüyüm, kumar benden güçlü değil",
            "Her geçen gün daha da güçleniyorum",
            "Ailem ve sevdiklerim için bunu yapıyorum",
            "Özgürlük, kumar masasında değil kalbimde",
            "Bugün kumar oynamayacağım ve gurur duyacağım"
        ]
    },
    {
        title: "Dikkat Dağıtma",
        messages: [
            "Hemen şimdi bir bardak su iç",
            "Sevdiğin birini ara ve sohbet et",
            "Dışarı çık, 10 dakika yürü",
            "Müzik aç ve dans et",
            "Bir şey yap, harekete geç!"
        ]
    },
    {
        title: "Gerçeklik Kontrolü",
        messages: [
            "Kumar oynarsan ne kaybedersin? Düşün",
            "Şimdiye kadar ne kadar yol kat ettin?",
            "Bugün kumar oynamazsan yarın nasıl hissedersin?",
            "Ailene ne söyleyeceksin?",
            "5 dakika bekle, bu his geçecek"
        ]
    }
];

// Sayfa yüklendiğinde
window.onload = function() {
    loadData();
    updateCounter();
    getNewMotivation();
    updateMilestones();
    
    // Her gün güncelle
    setInterval(updateCounter, 60000);
};

// Veri yükleme
function loadData() {
    const startDate = localStorage.getItem('startDate');
    const dailySpending = localStorage.getItem('dailySpending');
    
    if (startDate) {
        document.getElementById('startDate').value = startDate;
        document.getElementById('setupCard').style.display = 'none';
    }
    
    if (dailySpending) {
        document.getElementById('dailySpending').value = dailySpending;
    }
}

// Başlangıç tarihi kaydetme
function setStartDate() {
    const startDate = document.getElementById('startDate').value;
    
    if (!startDate) {
        alert('Lütfen bir tarih seçin!');
        return;
    }
    
    localStorage.setItem('startDate', startDate);
    document.getElementById('setupCard').style.display = 'none';
    updateCounter();
    updateMilestones();
}

// Gün sayacını güncelleme
function updateCounter() {
    const startDate = localStorage.getItem('startDate');
    
    if (!startDate) {
        document.getElementById('dayCounter').textContent = '0';
        return;
    }
    
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    document.getElementById('dayCounter').textContent = diffDays;
    updateMilestones();
}

// Tasarruf hesaplama
function calculateSavings() {
    const dailySpending = parseFloat(document.getElementById('dailySpending').value);
    const startDate = localStorage.getItem('startDate');
    
    if (!dailySpending || dailySpending <= 0) {
        alert('Lütfen geçerli bir miktar girin!');
        return;
    }
    
    if (!startDate) {
        alert('Lütfen önce başlangıç tarihini ayarlayın!');
        return;
    }
    
    localStorage.setItem('dailySpending', dailySpending);
    
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const totalSavings = (diffDays * dailySpending).toFixed(2);
    
    document.getElementById('savingsResult').innerHTML = `
        <div>Toplam Tasarruf</div>
        <div style="font-size: 2em; margin-top: 10px;">${totalSavings} TL</div>
        <div style="font-size: 0.9em; margin-top: 10px; opacity: 0.8;">
            ${diffDays} gün × ${dailySpending} TL
        </div>
    `;
}

// Yeni motivasyon mesajı
function getNewMotivation() {
    const randomIndex = Math.floor(Math.random() * motivations.length);
    document.getElementById('motivationText').textContent = motivations[randomIndex];
}

// Hedefleri güncelleme
function updateMilestones() {
    const startDate = localStorage.getItem('startDate');
    
    if (!startDate) {
        document.getElementById('milestones').innerHTML = '<p>Başlangıç tarihini ayarlayın.</p>';
        return;
    }
    
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const currentDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    let html = '';
    
    milestones.forEach(milestone => {
        const achieved = currentDays >= milestone.days;
        const status = achieved ? '✅' : '⏳';
        const className = achieved ? 'milestone achieved' : 'milestone';
        
        html += `
            <div class="${className}">
                <span class="milestone-name">${milestone.emoji} ${milestone.name}</span>
                <span class="milestone-status">${status}</span>
            </div>
        `;
    });
    
    document.getElementById('milestones').innerHTML = html;
}

// Acil durum modalı
function showEmergency() {
    const modal = document.getElementById('emergencyModal');
    const content = document.getElementById('emergencyContent');
    
    // Rastgele bir kombinasyon seç
    const randomIndex = Math.floor(Math.random() * emergencyCombinations.length);
    const combination = emergencyCombinations[randomIndex];
    
    let html = '<p style="font-size: 1.3em; color: #dc3545; font-weight: bold;">🛑 DUR! ' + combination.title + '</p>';
    html += '<ul>';
    
    combination.messages.forEach(msg => {
        html += `<li>💡 ${msg}</li>`;
    });
    
    html += '</ul>';
    html += '<p style="margin-top: 20px; font-weight: bold;">Bu his geçici! Sen daha güçlüsün! 💪</p>';
    
    content.innerHTML = html;
    modal.style.display = 'flex';
}

function closeEmergency() {
    document.getElementById('emergencyModal').style.display = 'none';
}

// Modal dışına tıklanınca kapat
window.onclick = function(event) {
    const modal = document.getElementById('emergencyModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}


// Tarihi sıfırlama
function resetDate() {
    if (confirm('Başlangıç tarihini sıfırlamak istediğinize emin misiniz? Tüm ilerlemeniz silinecek!')) {
        localStorage.removeItem('startDate');
        localStorage.removeItem('dailySpending');
        document.getElementById('setupCard').style.display = 'block';
        document.getElementById('dayCounter').textContent = '0';
        document.getElementById('startDate').value = '';
        document.getElementById('dailySpending').value = '';
        document.getElementById('savingsResult').innerHTML = '';
        updateMilestones();
        alert('Başlangıç tarihi sıfırlandı. Yeni bir başlangıç yapabilirsiniz!');
    }
}


// Menü toggle
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    menu.classList.toggle('open');
}

// Üyelik oluştur
function showRegister() {
    alert('Üyelik sistemi yakında aktif olacak!');
    toggleMenu();
}

// Üye girişi
function showLogin() {
    alert('Giriş sistemi yakında aktif olacak!');
    toggleMenu();
}
