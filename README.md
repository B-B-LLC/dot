# Diş kliniği site şablonu

Kliniklere gösterilmek üzere hazırlanmış, tek bir yapılandırma dosyasından
kişiselleştirilebilen çok sayfalı klinik sitesi. Next.js (App Router) üzerine
kurulu; sayfalar önceden üretilir, tarayıcıya dolu HTML gider.

Görünüm Verdant Dental tasarım sisteminden (`954de0fa`) gelir.

## Çalıştırma

```bash
npm install
```

```bash
npm run dev
```

Ardından `http://localhost:3000`.

## Yeni klinik demosu çıkarma

Tek yapılacak iş `site.config.ts` dosyasının **KLİNİĞE ÖZEL** bölümünü
düzenlemek. Uygulama koduna dokunulmaz.

| Ne değişir | Nerede |
| --- | --- |
| Klinik adı, marka, telefon, e-posta, adres, ruhsat | `klinik` |
| Çalışma saatleri | `saatler` |
| Hekim listesi | `hekimler` |
| Hasta kabul edilen dallar ve metinleri | `tedaviler` |
| Ulaşım notları | `ulasimNotlari` |

Aynı dosyanın **ORTAK METİNLER** bölümü (sterilizasyon adımları, koruyucu
bilgiler, sık sorulan sorular) şablon metnidir; kliniğe göre değişmesi gerekmez.

`tedaviler` dizisinden bir kalem silindiğinde ilgili sayfa, adres ve menü girdisi
de kaybolur. Yeni kalem eklendiğinde sayfası kendiliğinden oluşur — `id` alanı
hem adresi (`/tedaviler/<id>`) hem de kart ikonunu belirler.

## Sayfalar

| Adres | İçerik |
| --- | --- |
| `/` | Hero, tedavi kartları, klinik, hekimler, bilgi, SSS, ulaşım ve randevu formu |
| `/tedaviler/<id>` | Tedavi sayfası: giriş, aşamalar, süreç notları, sorular |
| `/hekimler` | Hekim kadrosu |
| `/iletisim` | Adres, ulaşım, çalışma saatleri, randevu formu |
| `/kvkk`, `/cerez` | Yasal metinler (arama motorlarına kapalı) |
| `/api/randevu` | Randevu formunun gönderim ucu |

## Randevu formu

Talepler **hiçbir yere kaydedilmez.** Gelen veri doğrulanır, e-posta olarak
kliniğe iletilir ve bellekten düşer. Veri tabanı yoktur, günlüğe kişisel veri
yazılmaz. `yasal.config.ts` içindeki KVKK metni bu davranışı anlatır — davranış
değişirse metin de güncellenmelidir.

Çalışması için `.env.local` gerekir; örnek değerler `.env.ornek` dosyasındadır.

| Değişken | Açıklama |
| --- | --- |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys |
| `RANDEVU_ALICI` | Taleplerin düşeceği e-posta adresi |
| `RANDEVU_GONDEREN` | Gönderen adresi |

Resend'de alan adı doğrulanmadan yalnızca hesabın açıldığı adrese gönderim
yapılabilir ve gönderen olarak `onboarding@resend.dev` kullanılır. Gerçek
klinikte kliniğin kendi alan adı doğrulanmalıdır.

Kötüye kullanıma karşı: görünmeyen bot tuzağı (dolduran istemci başarılı yanıt
alır ama e-posta gönderilmez), IP başına dakikada beş istek sınırı, sunucu
tarafında alan doğrulaması ve uzunluk sınırları, e-posta başlığına enjeksiyon
koruması.

Hız sınırı sunucu belleğinde tutulur; sunucu örneği yeniden başladığında
sıfırlanır. Kalıcı koruma için CAPTCHA (örneğin Cloudflare Turnstile) eklenmelidir.

## Dosya düzeni

| Yol | İçerik |
| --- | --- |
| `site.config.ts` | Klinik bilgileri ve tüm site metinleri |
| `yasal.config.ts` | KVKK aydınlatma metni ve çerez politikası |
| `app/layout.tsx` | Ortak iskelet, meta etiketleri, JSON-LD, yazı tipleri |
| `app/klinik-app.js` | Ana sayfa bölümleri |
| `app/_ortak/temel.js` | Paylaşılan stiller, yardımcılar, görünüm sabitleri |
| `app/_ortak/cerceve.js` | Üst gezinme, altbilgi, mobil çubuk, sayfa çerçevesi |
| `app/_ortak/yasal-sayfa.js` | Yasal metin sayfalarının ortak düzeni |
| `app/api/randevu/route.ts` | Randevu gönderim ucu |
| `ds/` | **Üretilmiş** — tasarım sistemi modülü ve jetonları |
| `tools/gen-ds-module.mjs` | `ds/` klasörünü üreten betik |
| `_ds/verdant-dental-…/` | Tasarım sisteminin kaynak paketi |

### `ds/` klasörü elle düzenlenmez

Tasarım sistemi paketi `window` üzerine yazan bir IIFE olarak dağıtılıyor.
`tools/gen-ds-module.mjs` bunu sahte bir `window` nesnesine sararak içe
aktarılabilir bir modüle çevirir ve 17 bileşeni dışa aktarır. Paket
güncellendiğinde:

```bash
npm run gen:ds
```

## Yayına alma (Vercel)

`vercel.json` yalnızca `framework: "nextjs"` belirtir; gerisini Vercel algılar.
`.env.local` içindeki değerler Vercel'de **Settings → Environment Variables**
bölümüne ayrıca girilmelidir.

## Yapı notları

- **Sayfalar önceden üretilir.** Tarayıcıya dolu HTML gider; içerik JavaScript
  beklemeden görünür. Yalnızca `/api/randevu` istek anında çalışır.
- **Dışarıdan kaynak yüklenmez.** Yazı tipleri `next/font` ile kendi sunucumuzdan
  gelir (Türkçe karakterler için `latin-ext` alt kümesi dâhil).
- **İkon kütüphanesi tembel yüklenir.** Tasarım sisteminin `Icon` bileşeni
  kullanılmadığı sürece `lucide` paketi sayfaya hiç girmez.
- **Çalışma saatleri tek kaynaktan gelir.** `saatler` hem hero'daki canlı saat
  kartını, hem ulaşım kartını, hem altbilgiyi besler. Açık/kapalı durumu istemci
  saatine göre hesaplanır.
- **Renk, boşluk, yuvarlaklık ve gölge değerleri jetonlardan okunur** (`var(--…)`).
  Sabit renk kodu yazmaktan kaçının.
- **Dar ekranda üst gezinme sadeleşir.** Tasarım sisteminin `NavBar` bileşeni
  68 px sabit yüksekliktedir ve beş bağlantı 375 px'e sığmaz. 860 px altında
  bağlantı listesi gizlenir, gezinme alttaki sabit eylem çubuğuna bırakılır.
- **Gezinme bağlama göre davranır.** Ana sayfadaki bölümlere kaydırılır, ayrı
  sayfalara adres üzerinden gidilir.

## Bilinen eksikler

- **Yasal metinler şablondur.** `yasal.config.ts` yayına alınmadan önce bir
  hukukçu tarafından gözden geçirilmelidir; saklama süresi ve kullanılan üçüncü
  taraf hizmetler kliniğe göre değişir.
- **Örnek veriler gerçek değil:** telefon `0232 000 00 00`, ruhsat numarası
  `0000/000`, e-posta ve `canonical` adresi yer tutucudur.
- **Fotoğraflar yer tutucu.** Hero kartı, mekân kartları ve hekim portreleri
  soyut şekillerle temsil ediliyor.
- **Gizlilik politikası sayfası yok.**
- **404 sayfasının kendi başlığı yok**; site başlığını gösterir.
- **`sitemap.xml` ve `robots.txt` eklenmedi.**
- **Eski statik sürüm depoda duruyor** (`index.html`, `assets/`, `support.js`,
  `tools/serve.js`, `Klinik Sitesi.dc.html`). Karşılaştırma için tutuluyor;
  yayına giren sürüme dâhil değil.
