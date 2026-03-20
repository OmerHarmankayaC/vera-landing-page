# Özel Auth E-posta Sistemi (Postmark) Geçiş Rehberi

Bu belge, Firebase'in varsayılan e-posta sisteminden Postmark'a geçiş yapılması için gerekli tüm talimatları içerir. İlk bölümü doğrudan Uygulama Geliştirici Yapay Zeka (App-Developer AI) ajanına iletebilirsiniz.

---

## BÖLÜM 1: App-Developer AI İçin Teknik Talimatlar
*(Aşağıdaki metni kopyalayıp doğrudan diğer AI'a verebilirsin)*

**CONTEXT:** We are migrating our Firebase Authentication email flow (Email Verification & Password Reset) from Firebase's default templates to custom emails sent via Postmark. The web destination (`https://vera.staticorbit.dev/verify`) is already fully developed and configured to handle standard Firebase `oobCode` parameters natively. Do NOT make any changes to the web handling logic.

**YOUR OBJECTIVES:**
1. Stop using the client-side Firebase Auth email triggers (`sendEmailVerification` and `sendPasswordResetEmail`).
2. Build two Firebase Cloud Functions (HTTPS Callable) to act as custom mail delegates.
3. Update the Mobile App (client) to call these new functions instead.

**IMPLEMENTATION STEPS:**
1. **Setup Postmark in Cloud Functions:**
   - Install dependencies: `npm install postmark firebase-admin`
   - Initialize the Postmark client with the server token: `1a4de378-5a37-4110-b873-848a6fd2269f`

2. **Create Cloud Functions (`requestVerificationEmail`, `requestPasswordReset`):**
   - For both functions, accept the user's `email` as a parameter.
   - Define `actionCodeSettings`:
     ```javascript
     const actionCodeSettings = {
       url: 'https://vera.staticorbit.dev/verify', // MUST be exactly this
       handleCodeInApp: true,
       iOS: { bundleId: 'com.staticorbit.verafinance' },
       android: { packageName: 'com.staticorbit.verafinance', installApp: true, minimumVersion: '12' },
       dynamicLinkDomain: 'verafinance.page.link' // If applicable
     };
     ```
   - Generate the secure link via the Firebase Admin SDK:
     - `const link = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);`
     - `const link = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);`
   - Send the email via Postmark template API using `postmarkClient.sendEmailWithTemplate()`.
   - Pass the generated `link` into the template model (e.g., as `action_url`).

3. **Update Mobile Client Auth Flow:**
   - Locate where the app triggers resend verification or password reset.
   - Replace the legacy Firebase Client SDK calls.
   - Call the new Firebase Callable Functions (`requestVerificationEmail`, `requestPasswordReset`) passing the user's email.
   - Handle loading states and display success/error dialogs based on the Callable Function response.

---

## BÖLÜM 2: Ömer Harmankaya (Kurucu) İçin Yapılacaklar Listesi

App-Developer AI arka uç kodlamasını yaparken, senin Postmark tarafında tasarımı hazırlaman gerekiyor. Adımlar oldukça basit:

1. **Postmark Gönderici Doğrulaması:**
   - Postmark paneline gir ve "Sender Signatures" bölümünden e-posta göndereceğin adresi (örn: `destek@vera.staticorbit.dev` veya `noreply@vera.staticorbit.dev`) doğrula.

2. **Şablonları (Templates) Oluştur:**
   - Postmark panelinden "Templates" kısmına gir. İki farklı e-posta tasarımı oluştur:
     - *E-posta Doğrulama (Welcome / Verify)*
     - *Şifre Sıfırlama (Password Reset)*
   - Tasarımların için daha önceden hazırlattığın profesyonel HTML kodlarını kullanabilirsin.

3. **Buton Değişkenini (Variable) Ayarla:**
   - E-posta tasarımlarındaki "E-postamı Doğrula" ve "Şifremi Sıfırla" **butonlarının URL/Link kısımlarına** tam olarak şu değişkeni yaz: `{{action_url}}`
   - *Cloud Function, Firebase'in ürettiği uzun ve güvenli şifreleme linkini alıp e-posta gönderilirken doğrudan bu `{{action_url}}` değişkeninin içine yerleştirecek.*

4. **Şablon Alias'larını AI'a İlet:**
   - Tasarımlarını kaydettikten sonra Postmark sana her şablon için bir **"Template Alias"** (örn: `password-reset`, `welcome-email`) verecek.
   - Bu Alias isimlerini App-Developer AI'a söyleyerek kod içerisindeki `TemplateAlias` kısmına yazmasını iste.

Tüm bu adımlar tamamlandığında, uygulamanız tamamen sizin tasarımınızla e-posta atacak ve kullanıcı linke tıkladığında bizim hazırladığımız `vera.staticorbit.dev/verify` sayfasına düşerek işlemini pürüzsüzce tamamlayacaktır.
