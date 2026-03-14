# Vera Finance — Gizlilik Politikası / Privacy Policy

**Son Güncelleme / Last Updated: March 2026**

---

## TÜRKÇE

### 1. Veri Sorumlusu

Vera Finance uygulaması, **Static Orbit** markası altında bağımsız geliştirici **Ömer Harmankaya** tarafından sunulmaktadır.

İletişim: destek@staticorbit.dev
Destek: [SUPPORT URL]

---

### 2. Toplanan Veriler ve İşleme Amaçları

#### 2.1 Hesap Bilgileri
Uygulamaya kayıt olurken yalnızca **e-posta adresiniz ve şifreniz** toplanır. Bu veriler **Google Firebase Authentication** altyapısı üzerinde saklanır. Şifreler hiçbir zaman düz metin olarak depolanmaz.

#### 2.2 Finansal Veriler
Harcama kayıtlarınız, bütçeleriniz, hedefleriniz ve portföy bilgileriniz **yalnızca cihazınızın yerel hafızasında (AsyncStorage)** saklanır. Bu veriler sunucularımıza aktarılmaz.

#### 2.3 Fiş Tarama (OCR)
Faturalarınızı taramayı seçtiğinizde, görüntü analiz amacıyla **Google Gemini API**'ye iletilir. Görüntüler yalnızca işleme tabi tutulur; tarafımızdan saklanmaz ve Google tarafından API çağrısının ötesinde tutulmaz.

#### 2.4 Tarama Kotası
Haftalık fiş tarama limitinizi takip edebilmek için kota sayacınız **Google Firestore** veritabanında kullanıcı kimliğinizle ilişkili olarak tutulur. Yalnızca `weekly_ai_scan_count` ve `last_scan_reset_date` alanları saklanır.

#### 2.5 Abonelik Bilgileri
Premium aboneliğinizin durumu **RevenueCat** ve **Google Firebase** altyapısı aracılığıyla işlenir. RevenueCat, cihaz kimliğinizi ve satın alma geçmişinizi kendi gizlilik politikası kapsamında işler.

#### 2.6 Pazar Fiyatları
Hisse senedi, kripto para ve döviz fiyatları **CollectAPI** üzerinden alınmaktadır. Bu veriler kişiselleştirilmemiş sistematik piyasa verisidir; sizinle ilişkilendirilmez.

#### 2.7 Reklamlar
Ücretsiz plan kullanıcılarına **Google AdMob** aracılığıyla reklam gösterilebilir. AdMob, reklam kişiselleştirmek için cihaz tanımlayıcılarını ve kullanım verilerini işleyebilir. Bu konuda KVKK/GDPR kapsamında ayrı bir onay alınacaktır.

---

### 3. Üçüncü Taraflar ve Veri Paylaşımı

| Hizmet | Amaç | Gizlilik Politikası |
|--------|------|---------------------|
| Google Firebase Authentication | Kimlik doğrulama | policies.google.com/privacy |
| Google Firestore | Tarama kotası | policies.google.com/privacy |
| Google Firebase Realtime Database | Pazar fiyatları | policies.google.com/privacy |
| Google Gemini API | Fiş OCR | policies.google.com/privacy |
| RevenueCat | Abonelik yönetimi | revenuecat.com/privacy |
| CollectAPI | Finansal pazar verileri | collectapi.com/privacy |
| Google AdMob | Reklam gösterimi | policies.google.com/privacy |

Verileriniz satılmaz, kiralanmaz veya yukarıdaki hizmetlerin dışında üçüncü taraflarla paylaşılmaz.

---

### 4. Veri Saklama Süreleri

- **Hesap bilgileri (e-posta):** Hesabınızı silene kadar saklanır.
- **Firestore tarama kotası:** 30 günlük kayan pencere ile yenilenir; hesap silindiğinde kalıcı olarak kaldırılır.
- **Yerel finansal veriler:** Uygulamayı kaldırana veya "Tüm Verileri Sil" / "Hesabı Sil" işlemini gerçekleştirene kadar cihazınızda saklanır.
- **Fiş görüntüleri:** Saklanmaz. Sadece işlem anında Google Gemini'ye iletilir.

---

### 5. Hesap ve Veri Silme

Uygulama içindeki **Ayarlar → Hesabı Sil** butonu aracılığıyla:
- Firebase Authentication hesabınız kalıcı olarak silinir
- Firestore üzerindeki kullanıcı kaydınız kaldırılır
- Cihazınızdaki tüm yerel veriler temizlenir

Yazılı talep için: destek@staticorbit.dev

---

### 6. KVKK Kapsamındaki Haklarınız (Madde 11)

6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca aşağıdaki haklara sahipsiniz:

1. Kişisel verilerinizin işlenip işlenmediğini öğrenme
2. Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme
3. Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme
4. Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme
5. Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme
6. Kişisel verilerinizin silinmesini veya yok edilmesini isteme
7. Kişisel verilerinizin düzeltilmesi, silinmesi veya yok edilmesi işlemlerinin üçüncü kişilere bildirilmesini isteme
8. İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme
9. Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme

Bu haklarınızı kullanmak için: destek@staticorbit.dev

---

### 7. Yaş Sınırı

Bu uygulama **13 yaş ve üzeri** kullanıcılar için tasarlanmıştır. 13 yaşın altındaki çocuklardan bilerek kişisel veri toplanmamaktadır. Böyle bir durumun farkına varırsak, söz konusu verileri derhal sileriz.

---

### 8. Politika Değişiklikleri

Bu politikada yapılacak önemli değişiklikler, güncelleme tarihi değiştirilerek ve/veya uygulama içi bildirimle kullanıcılara duyurulacaktır.

---

### 9. İletişim

**E-posta:** destek@staticorbit.dev
**Destek:** [SUPPORT URL]

---
---

## ENGLISH

### 1. Data Controller

The Vera Finance application is provided by independent developer **Ömer Harmankaya** under the **Static Orbit** brand.

Contact: destek@staticorbit.dev
Support: [SUPPORT URL]

---

### 2. Data We Collect and Why

#### 2.1 Account Information
When you register, only your **email address and password** are collected. These are stored on **Google Firebase Authentication** infrastructure. Passwords are never stored in plain text.

#### 2.2 Financial Data
Your expense records, budgets, goals, and portfolio data are stored **exclusively on your device's local storage (AsyncStorage)**. This data is never transmitted to our servers.

#### 2.3 Receipt Scanning (OCR)
When you choose to scan a receipt, the image is transmitted to the **Google Gemini API** for analysis. Images are processed only and are not stored by us, nor retained by Google beyond the API call.

#### 2.4 Scan Quota
To track your weekly receipt scan limit, a quota counter is stored in **Google Firestore** linked to your user ID. Only the fields `weekly_ai_scan_count` and `last_scan_reset_date` are stored.

#### 2.5 Subscription Information
Your premium subscription status is processed through **RevenueCat** and **Google Firebase** infrastructure. RevenueCat processes your device identifier and purchase history under its own privacy policy.

#### 2.6 Market Prices
Stock, cryptocurrency, and currency prices are fetched from **CollectAPI**. This data is non-personalized systematic market data and is not linked to you personally.

#### 2.7 Advertising
Free plan users may be shown advertisements through **Google AdMob**. AdMob may process device identifiers and usage data to personalise ads. A separate consent prompt will be shown in compliance with GDPR/KVKK requirements.

---

### 3. Third Parties and Data Sharing

| Service | Purpose | Privacy Policy |
|---------|---------|----------------|
| Google Firebase Authentication | Authentication | policies.google.com/privacy |
| Google Firestore | Scan quota tracking | policies.google.com/privacy |
| Google Firebase Realtime Database | Market price data | policies.google.com/privacy |
| Google Gemini API | Receipt OCR | policies.google.com/privacy |
| RevenueCat | Subscription management | revenuecat.com/privacy |
| CollectAPI | Financial market data | collectapi.com/privacy |
| Google AdMob | Ad delivery | policies.google.com/privacy |

Your data is never sold, rented, or shared with third parties outside the services listed above.

---

### 4. Data Retention

- **Account information (email):** Retained until you delete your account.
- **Firestore scan quota:** Resets on a 30-day rolling window; permanently deleted when the account is deleted.
- **Local financial data:** Stored on your device until you uninstall the app or use "Delete All Data" / "Delete Account".
- **Receipt images:** Not stored. Transmitted to Google Gemini at processing time only.

---

### 5. Account and Data Deletion

Using the **Settings → Delete Account** button in the app:
- Your Firebase Authentication account is permanently deleted
- Your Firestore user record is removed
- All local data on your device is cleared

For written requests: destek@staticorbit.dev

---

### 6. Your Rights Under GDPR / KVKK

You have the following rights regarding your personal data:

1. The right to access your personal data
2. The right to rectification of inaccurate data
3. The right to erasure ("right to be forgotten")
4. The right to restriction of processing
5. The right to data portability
6. The right to object to processing
7. The right to know if data has been disclosed to third parties
8. The right not to be subject to automated decision-making
9. The right to lodge a complaint with a supervisory authority (Turkey: KVKK Board — kvkk.gov.tr)

To exercise these rights: destek@staticorbit.dev

---

### 7. Age Restriction

This application is designed for users **13 years of age or older**. We do not knowingly collect personal data from children under 13. If we become aware of such data, we will delete it immediately.

---

### 8. Policy Changes

Material changes to this policy will be communicated by updating the date on this page and/or via an in-app notification.

---

### 9. Contact

**Email:** destek@staticorbit.dev
**Support:** [SUPPORT URL]

---

> **Note for publisher:** Replace `[SUPPORT URL]` with `https://vera.staticorbit.dev/support` once the page is live.
