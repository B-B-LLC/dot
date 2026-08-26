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
| Fotoğraflar | `gorseller` + hekimlerdeki `gorsel` |

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
| `/kvkk`, `/gizlilik`, `/cerez` | Yasal metinler (arama motorlarına kapalı) |
| `/api/randevu` | Randevu formunun gönderim ucu |
| `/sitemap.xml`, `/robots.txt` | Config'ten üretilir |

## Fotoğraflar

Görsel dosyaları `public/gorseller/` klasörüne konur, `site.config.ts` içinde
yolu yazılır. Yol her zaman eğik çizgiyle başlar:

```
public/gorseller/bekleme-alani.jpg   →   '/gorseller/bekleme-alani.jpg'
```

| Nerede görünür | Alan |
| --- | --- |
| Ana sayfada başlığın yanındaki büyük kart | `gorseller.hero` |
| Klinik bölümündeki üç mekân kartı | `gorseller.mekanlar.bekleme` / `.muayene` / `.cocuk` |
| Hekim kartlarındaki portreler | `hekimler[].gorsel` |

Her alan boş bırakılabilir: yol yazılmayan yerde tasarımın çizim yer tutucusu
görünmeye devam eder, yani görsellerin hepsi hazır olmadan da site bozulmaz.

`alt` metni görmeyen ziyaretçiye ve arama motoruna karenin içeriğini anlatır;
kısa ve düz yazılır. Hekim portrelerinde ayrıca yazılmaz, hekimin adı ve
unvanından üretilir.

Fotoğraflar kart oranına göre ortadan kırpılır (`object-fit: cover`), esnetilmez.
Önemli ayrıntıyı karenin ortasında bırakın; hero kartının alt kenarına saat
kartı biner. Portrelerde kırpma merkezi yüz hizası için yukarı çekilidir.

Görseller `next/image` üzerinden servis edilir: kaynak dosya kaç megabayt
olursa olsun ziyaretçiye kartın ölçüsünde ve WebP/AVIF olarak iner. Yine de
kaynağı gereksiz büyük tutmayın; 2500 pikselden geniş dosya kazanç getirmez.

Hasta fotoğrafı ve tedavi öncesi-sonrası görseli mevzuat gereği kullanılamaz.

## Demo modu

`site.config.ts` içindeki `site.demoModu` varsayılan olarak `true`. Bu hâldeyken
`robots.txt` tüm taramayı kapatır ve sayfalar `noindex` işaretlenir.

Böyle olmasının nedeni: aynı metinle birden çok klinik demosu yayınlandığında
bunlar birbirinin kopyası sayılır; ayrıca demo alan adı arama motoruna "diş
kliniği" olarak kaydedilirse sonradan düzeltmesi zaman alır.

Gerçek bir kliniğin sitesi yayına alınırken `demoModu` `false` yapılır ve
`site.adres` kliniğin alan adına çevrilir. `canonical`, `sitemap` ve OG
etiketlerinin tamamı bu iki değerden beslenir.

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
| `public/gorseller/` | Kliniğin fotoğrafları |
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

- **İşlem sayfalarının çoğu yazılmadı.** Menüdeki kırk iki kalemin on üçünün
  içeriği hazır ve `/tedaviler/<slug>` sayfası oluşuyor; kalan yirmi dokuz
  kalem düz metin olarak listede duruyor. Bir kalemin içeriği yazılıp
  `site.config.ts` içinde nesneye çevrildiğinde sayfası, site haritası kaydı ve
  paylaşım görseli kendiliğinden oluşur. Sayfaların birbirine benzemesi arama
  motorunda "ince içerik" sayıldığı için her işlemin kendine ait metni olmalıdır.
- **Yasal metinler şablondur.** `yasal.config.ts` yayına alınmadan önce bir
  hukukçu tarafından gözden geçirilmelidir; saklama süresi ve kullanılan üçüncü
  taraf hizmetler kliniğe göre değişir.
- **Örnek veriler gerçek değil:** telefon `0232 000 00 00`, ruhsat numarası
  `0000/000`, e-posta ve `site.adres` yer tutucudur. Demo için bilinçli tercih;
  gerçek klinikte hepsi değiştirilmelidir.
- **Demodaki fotoğraflar başka kliniklere ait.** Mekân ve hekim kartlarındaki
  görsellerde başka klinik markaları (duvar logoları) ve hekim formalarında
  başka adlar okunuyor; hekim kadrosu bu adlara göre yazıldı. Yalnızca demo
  içindir, gerçek bir klinik sitesinde kliniğin kendi fotoğraflarıyla
  değiştirilmelidir. Hero kartının fotoğrafı henüz eklenmedi, orada yer tutucu
  duruyor (bkz. *Fotoğraflar*).
- **CAPTCHA yok.** Bot tuzağı ve hız sınırı var; hız sınırı sunucu belleğinde
  tutulduğu için birden çok sunucu örneğinde zayıflar. Site herkese açık
  yayına girmeden önce Cloudflare Turnstile eklenmelidir.
- **`/hekimler` ve `/iletisim` ana sayfa bölümlerini yeniden kullanır**; bu
  sayfalar ana sayfa modülünü de yükler. Ayrıştırılabilir.
- **Eski statik sürüm depoda duruyor** (`index.html`, `assets/`, `support.js`,
  `tools/serve.js`, `Klinik Sitesi.dc.html`). Karşılaştırma için tutuluyor;
  yayına giren sürüme dâhil değil.
