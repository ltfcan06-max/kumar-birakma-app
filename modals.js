// Modal İşlemleri

// Kayıt Modal'ını Göster
function showRegister() {
    toggleMenu();
    
    const modal = document.createElement('div');
    modal.id = 'registerModal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content auth-modal">
            <span class="close" onclick="closeRegisterModal()">&times;</span>
            <h2>🎯 Üyelik Oluştur</h2>
            <p style="margin-bottom: 20px; opacity: 0.9;">Kumar bırakma yolculuğuna başla!</p>
            
            <form id="registerForm" onsubmit="handleRegister(event)">
                <div class="form-group">
                    <label>Ad Soyad</label>
                    <input type="text" id="regFullName" required placeholder="Adınız Soyadınız">
                </div>
                
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="regEmail" required placeholder="ornek@email.com">
                </div>
                
                <div class="form-group">
                    <label>Şifre</label>
                    <input type="password" id="regPassword" required placeholder="En az 6 karakter" minlength="6">
                </div>
                
                <div class="form-group">
                    <label>Şifre Tekrar</label>
                    <input type="password" id="regPasswordConfirm" required placeholder="Şifrenizi tekrar girin" minlength="6">
                </div>
                
                <div class="form-group" style="flex-direction: row; align-items: center; gap: 10px;">
                    <input type="checkbox" id="regTerms" required style="width: auto; margin: 0;">
                    <label for="regTerms" style="margin: 0; font-size: 0.9em;">
                        <a href="terms.html" target="_blank" style="color: white; text-decoration: underline;">Kullanım Şartları</a> ve 
                        <a href="privacy.html" target="_blank" style="color: white; text-decoration: underline;">Gizlilik Politikası</a>'nı kabul ediyorum
                    </label>
                </div>
                
                <button type="submit" class="btn-primary" style="width: 100%; margin-top: 10px;">Kayıt Ol</button>
            </form>
            
            <p style="text-align: center; margin-top: 20px; font-size: 0.9em;">
                Zaten üye misin? <a href="#" onclick="closeRegisterModal(); showLoginModal();" style="color: white; text-decoration: underline; font-weight: bold;">Giriş Yap</a>
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    if (modal) modal.remove();
}

function handleRegister(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('regFullName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    const terms = document.getElementById('regTerms').checked;
    
    if (password !== passwordConfirm) {
        alert('Şifreler eşleşmiyor!');
        return;
    }
    
    if (!terms) {
        alert('Kullanım şartlarını kabul etmelisiniz!');
        return;
    }
    
    register(email, password, fullName);
}

// Giriş Modal'ını Göster
function showLoginModal() {
    const modal = document.createElement('div');
    modal.id = 'loginModal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content auth-modal">
            <span class="close" onclick="closeLoginModal()">&times;</span>
            <h2>🔐 Üye Girişi</h2>
            <p style="margin-bottom: 20px; opacity: 0.9;">Hesabına giriş yap</p>
            
            <form id="loginForm" onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="loginEmail" required placeholder="ornek@email.com">
                </div>
                
                <div class="form-group">
                    <label>Şifre</label>
                    <input type="password" id="loginPassword" required placeholder="Şifreniz">
                </div>
                
                <div style="text-align: right; margin-bottom: 15px;">
                    <a href="#" onclick="closeLoginModal(); showForgotPassword();" style="color: white; text-decoration: underline; font-size: 0.9em;">Şifremi Unuttum</a>
                </div>
                
                <button type="submit" class="btn-primary" style="width: 100%;">Giriş Yap</button>
            </form>
            
            <p style="text-align: center; margin-top: 20px; font-size: 0.9em;">
                Hesabın yok mu? <a href="#" onclick="closeLoginModal(); showRegister();" style="color: white; text-decoration: underline; font-weight: bold;">Kayıt Ol</a>
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.remove();
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    login(email, password);
}

// Şifremi Unuttum Modal
function showForgotPassword() {
    const modal = document.createElement('div');
    modal.id = 'forgotModal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content auth-modal">
            <span class="close" onclick="closeForgotModal()">&times;</span>
            <h2>🔑 Şifremi Unuttum</h2>
            <p style="margin-bottom: 20px; opacity: 0.9;">Email adresine şifre sıfırlama linki göndereceğiz</p>
            
            <form id="forgotForm" onsubmit="handleForgotPassword(event)">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="forgotEmail" required placeholder="ornek@email.com">
                </div>
                
                <button type="submit" class="btn-primary" style="width: 100%;">Şifre Sıfırlama Linki Gönder</button>
            </form>
            
            <p style="text-align: center; margin-top: 20px; font-size: 0.9em;">
                <a href="#" onclick="closeForgotModal(); showLoginModal();" style="color: white; text-decoration: underline;">Giriş Sayfasına Dön</a>
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeForgotModal() {
    const modal = document.getElementById('forgotModal');
    if (modal) modal.remove();
}

function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgotEmail').value;
    resetPassword(email);
    closeForgotModal();
}

// Profil Modal
function showProfile() {
    toggleMenu();
    
    const user = auth.currentUser;
    if (!user) {
        alert('Lütfen önce giriş yapın!');
        return;
    }
    
    db.collection('users').doc(user.uid).get().then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            
            const modal = document.createElement('div');
            modal.id = 'profileModal';
            modal.className = 'modal';
            modal.style.display = 'flex';
            modal.innerHTML = `
                <div class="modal-content auth-modal">
                    <span class="close" onclick="closeProfileModal()">&times;</span>
                    <h2>👤 Profilim</h2>
                    
                    <div class="profile-info">
                        <div class="profile-item">
                            <strong>Ad Soyad:</strong>
                            <span>${user.displayName || 'Belirtilmemiş'}</span>
                        </div>
                        
                        <div class="profile-item">
                            <strong>Email:</strong>
                            <span>${user.email}</span>
                        </div>
                        
                        <div class="profile-item">
                            <strong>Üyelik Durumu:</strong>
                            <span>${userData.subscription === 'premium' ? '⭐ Premium Üye' : '🆓 Ücretsiz Üye'}</span>
                        </div>
                        
                        <div class="profile-item">
                            <strong>Kayıt Tarihi:</strong>
                            <span>${userData.createdAt ? new Date(userData.createdAt.toDate()).toLocaleDateString('tr-TR') : 'Bilinmiyor'}</span>
                        </div>
                        
                        ${userData.subscription === 'premium' && userData.subscriptionEndDate ? `
                        <div class="profile-item">
                            <strong>Premium Bitiş:</strong>
                            <span>${new Date(userData.subscriptionEndDate.toDate()).toLocaleDateString('tr-TR')}</span>
                        </div>
                        ` : ''}
                    </div>
                    
                    ${userData.subscription !== 'premium' ? `
                    <button onclick="closeProfileModal(); showSubscription();" class="btn-primary" style="width: 100%; margin-top: 20px;">
                        ⭐ Premium'a Geç
                    </button>
                    ` : ''}
                </div>
            `;
            
            document.body.appendChild(modal);
        }
    });
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) modal.remove();
}

// Abonelik Modal
function showSubscription() {
    toggleMenu();
    
    const modal = document.createElement('div');
    modal.id = 'subscriptionModal';
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content auth-modal" style="max-width: 600px;">
            <span class="close" onclick="closeSubscriptionModal()">&times;</span>
            <h2>⭐ Premium Üyelik</h2>
            <p style="margin-bottom: 30px; opacity: 0.9;">Daha fazla özellik, daha fazla destek!</p>
            
            <div class="subscription-plans">
                <div class="plan-card">
                    <h3>🆓 Ücretsiz</h3>
                    <div class="plan-price">₺0<span>/ay</span></div>
                    <ul class="plan-features">
                        <li>✅ Gün sayacı</li>
                        <li>✅ Tasarruf hesaplayıcı</li>
                        <li>✅ Motivasyon mesajları</li>
                        <li>✅ Hedefler</li>
                        <li>✅ Acil yardım</li>
                        <li>❌ Kişisel danışman</li>
                        <li>❌ Detaylı istatistikler</li>
                        <li>❌ Özel içerikler</li>
                    </ul>
                    <button class="btn-secondary" disabled style="opacity: 0.5;">Mevcut Plan</button>
                </div>
                
                <div class="plan-card premium">
                    <div class="popular-badge">En Popüler</div>
                    <h3>⭐ Premium</h3>
                    <div class="plan-price">₺49<span>/ay</span></div>
                    <ul class="plan-features">
                        <li>✅ Tüm ücretsiz özellikler</li>
                        <li>✅ Kişisel danışman desteği</li>
                        <li>✅ Detaylı istatistikler</li>
                        <li>✅ Özel motivasyon içerikleri</li>
                        <li>✅ Haftalık ilerleme raporları</li>
                        <li>✅ Öncelikli destek</li>
                        <li>✅ Reklamsız deneyim</li>
                        <li>✅ Mobil uygulama senkronizasyonu</li>
                    </ul>
                    <button onclick="startPayment('monthly')" class="btn-primary">Premium'a Geç</button>
                </div>
            </div>
            
            <p style="text-align: center; margin-top: 20px; font-size: 0.85em; opacity: 0.7;">
                Güvenli ödeme için iyzico kullanılmaktadır. İstediğiniz zaman iptal edebilirsiniz.
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) modal.remove();
}

// Ödeme başlat
function startPayment(plan) {
    const user = auth.currentUser;
    
    if (!user) {
        alert('Lütfen önce giriş yapın!');
        closeSubscriptionModal();
        showLoginModal();
        return;
    }
    
    alert('Ödeme sistemi yakında aktif olacak! Firebase Functions ve iyzico entegrasyonu tamamlandıktan sonra çalışacak.');
}
