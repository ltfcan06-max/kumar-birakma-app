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
    "Her temiz gün, yeni bir başlangıç! 🌅"
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

// Acil durum mesajları
const emergencyMessages = [
    "5 dakika bekle. Bu his geçecek!",
    "Sevdiğin birini ara ve konuş.",
    "Dışarı çık, yürüyüşe git.",
    "Şimdiye kadar ne kadar yol kat ettiğini düşün!",
    "Kumar oynarsan kaybettiğin parayı düşün.",
    "Derin nefes al: 4 saniye içeri, 4 saniye tut, 4 saniye dışarı.",
    "Bir bardak su iç ve 10'a kadar say."
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
    
    let html = '<p style="font-size: 1.3em; color: #dc3545; font-weight: bold;">Şu anda kumar oynamak istiyorsun ama YAPMA!</p>';
    html += '<ul>';
    
    emergencyMessages.forEach(msg => {
        html += `<li>💡 ${msg}</li>`;
    });
    
    html += '</ul>';
    html += '<p style="margin-top: 20px; font-weight: bold;">Bu his geçici! Sen daha güçlüsün! 💪</p>';
    
    content.innerHTML = html;
    modal.style.display = 'block';
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
