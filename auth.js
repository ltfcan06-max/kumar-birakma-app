// Kullanıcı Authentication İşlemleri

// Kayıt Ol
async function register(email, password, fullName) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await user.updateProfile({
            displayName: fullName
        });

        await user.sendEmailVerification();

        await db.collection('users').doc(user.uid).set({
            fullName: fullName,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            subscription: 'free',
            subscriptionEndDate: null,
            startDate: null,
            dailySpending: 0
        });

        alert('Kayıt başarılı! Email adresinize doğrulama linki gönderildi.');
        closeRegisterModal();
        showLoginModal();
        
    } catch (error) {
        console.error('Kayıt hatası:', error);
        let errorMessage = 'Kayıt sırasında bir hata oluştu.';
        
        switch(error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Bu email adresi zaten kullanımda.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Geçersiz email adresi.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Şifre en az 6 karakter olmalıdır.';
                break;
        }
        
        alert(errorMessage);
    }
}

// Giriş Yap
async function login(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            alert('Lütfen önce email adresinizi doğrulayın. Doğrulama linki email adresinize gönderildi.');
            await user.sendEmailVerification();
            return;
        }

        alert('Giriş başarılı! Hoş geldiniz.');
        closeLoginModal();
        loadUserData();
        
    } catch (error) {
        console.error('Giriş hatası:', error);
        let errorMessage = 'Giriş sırasında bir hata oluştu.';
        
        switch(error.code) {
            case 'auth/user-not-found':
                errorMessage = 'Bu email adresi ile kayıtlı kullanıcı bulunamadı.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Hatalı şifre.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Geçersiz email adresi.';
                break;
        }
        
        alert(errorMessage);
    }
}

// Çıkış Yap
async function logout() {
    try {
        await auth.signOut();
        alert('Çıkış yapıldı.');
        location.reload();
    } catch (error) {
        console.error('Çıkış hatası:', error);
        alert('Çıkış sırasında bir hata oluştu.');
    }
}

// Şifremi Unuttum
async function resetPassword(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        alert('Şifre sıfırlama linki email adresinize gönderildi.');
    } catch (error) {
        console.error('Şifre sıfırlama hatası:', error);
        let errorMessage = 'Şifre sıfırlama sırasında bir hata oluştu.';
        
        switch(error.code) {
            case 'auth/user-not-found':
                errorMessage = 'Bu email adresi ile kayıtlı kullanıcı bulunamadı.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Geçersiz email adresi.';
                break;
        }
        
        alert(errorMessage);
    }
}

// Kullanıcı verilerini yükle
async function loadUserData() {
    const user = auth.currentUser;
    
    if (!user) {
        loadData();
        return;
    }

    try {
        const doc = await db.collection('users').doc(user.uid).get();
        
        if (doc.exists) {
            const userData = doc.data();
            
            if (userData.startDate) {
                localStorage.setItem('startDate', userData.startDate);
                document.getElementById('startDate').value = userData.startDate;
                document.getElementById('setupCard').style.display = 'none';
            }
            
            if (userData.dailySpending) {
                localStorage.setItem('dailySpending', userData.dailySpending);
                document.getElementById('dailySpending').value = userData.dailySpending;
            }
            
            updateCounter();
            updateMilestones();
            updateUserMenu(user, userData);
        }
    } catch (error) {
        console.error('Veri yükleme hatası:', error);
    }
}

// Kullanıcı verilerini kaydet
async function saveUserData() {
    const user = auth.currentUser;
    
    if (!user) {
        return;
    }

    try {
        const startDate = localStorage.getItem('startDate');
        const dailySpending = localStorage.getItem('dailySpending');
        
        await db.collection('users').doc(user.uid).update({
            startDate: startDate,
            dailySpending: parseFloat(dailySpending) || 0,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Veri kaydetme hatası:', error);
    }
}

// Kullanıcı menüsünü güncelle
function updateUserMenu(user, userData) {
    const menu = document.getElementById('sideMenu');
    
    // Mevcut menü içeriğini temizle
    const existingUserInfo = menu.querySelector('.user-info');
    if (existingUserInfo) {
        existingUserInfo.remove();
    }
    
    const existingLinks = menu.querySelectorAll('a');
    existingLinks.forEach(link => link.remove());
    
    // Kullanıcı bilgisi ekle
    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    userInfo.style.cssText = 'padding: 15px 30px; color: white; border-bottom: 2px solid rgba(255,255,255,0.2); margin-bottom: 20px;';
    userInfo.innerHTML = `
        <p style="margin: 5px 0; font-size: 0.9em; opacity: 0.8;">Hoş geldin,</p>
        <p style="margin: 5px 0; font-weight: bold;">${user.displayName || 'Kullanıcı'}</p>
        <p style="margin: 5px 0; font-size: 0.85em; opacity: 0.7;">${userData.subscription === 'premium' ? '⭐ Premium Üye' : '🆓 Ücretsiz Üye'}</p>
    `;
    
    menu.querySelector('h2').after(userInfo);
    
    // Menü linklerini ekle
    const profileLink = document.createElement('a');
    profileLink.href = '#';
    profileLink.textContent = '👤 Profilim';
    profileLink.onclick = showProfile;
    userInfo.after(profileLink);
    
    const subscriptionLink = document.createElement('a');
    subscriptionLink.href = '#';
    subscriptionLink.textContent = '⭐ Premium Ol';
    subscriptionLink.onclick = showSubscription;
    profileLink.after(subscriptionLink);
    
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = '🚪 Çıkış Yap';
    logoutLink.onclick = logout;
    subscriptionLink.after(logoutLink);
}

// Auth state değişikliklerini dinle
auth.onAuthStateChanged((user) => {
    if (user) {
        loadUserData();
    } else {
        loadData();
    }
});
