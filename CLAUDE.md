# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dil

Depo tamamen Türkçedir: dosya adları, değişken/fonksiyon adları, yorumlar ve
commit mesajları Türkçe yazılır. Yeni kod da bu düzene uyar.

## Bu dosyayı güncel tut

Bir değişiklik bu dosyadaki bilgiyi yanlışa düşürüyorsa veya burada anlatılması
gereken yeni bir yapı getiriyorsa, `CLAUDE.md` **aynı iş sırasında** güncellenir;
ayrıca `/init` çalıştırılması beklenmez. Tetikleyen tipik durumlar: `package.json`
betikleri, `site.config.ts` şeması, rota ve dosya düzeni, üretilmiş `ds/` akışı,
`.tsx` sunucu / `.js` istemci ayrımı gibi mimari kurallar. Rutin içerik ve üslup
düzeltmeleri bu dosyayı eskitmez — onlarda dokunulmaz.

## Komutlar

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # üretim derlemesi (tip denetimi de burada yapılır)
npm start
npx tsc --noEmit       # yalnız tip denetimi
npm run gen:ds         # ds/ klasörünü _ds/ paketinden yeniden üretir
node tools/serve.js 4173   # depodaki eski statik sürümü açar (index.html)
```

Test paketi ve linter yoktur. `.claude/launch.json` her iki sunucuyu da tanımlar
(`next`, `eski-site`).

Randevu formunun çalışması için `.env.local` gerekir; alanlar `.env.ornek`
dosyasında açıklanmıştır (`RESEND_API_KEY`, `RANDEVU_ALICI`, `RANDEVU_GONDEREN`).

## Mimari

Next.js 16 App Router. Sayfalar önceden üretilir; istek anında çalışan tek yer
`/api/randevu`. Ayrıntılı kullanım anlatımı `README.md` dosyasındadır — burada
yalnızca birden çok dosyayı okumadan görülmeyen yapı özetlenir.

### İçerik tek dosyadan gelir

Yeni bir klinik için nelerin değiştirileceği alan alan `YENI-MUSTERI.txt`
dosyasında listelidir; config şeması veya kurulum adımları değişirse o dosya da
güncellenir.

`site.config.ts` kliniğe ait her şeyi (bilgiler, metinler, görsel yolları) ve
`yasal.config.ts` yasal metinleri tutar. Uygulama kodunda sabit metin, telefon,
adres veya klinik adı yazılmaz — yeni bir klinik demosu yalnız config
düzenlenerek çıkarılır.

`tedaviler[]` dizisi türetilmiş bir yapıdır: her kalem `/tedaviler/<id>` sayfasını
(`generateStaticParams`), kart ikonunu, menüyü, sitemap'i ve JSON-LD'deki hizmet
listesini besler. Bir kalemi silmek ilgili sayfayı da yok eder.

Aynı şekilde `saatler[]` tek kaynaktır: hero'daki canlı saat kartı, ulaşım kartı,
altbilgi ve `layout.tsx` içindeki `openingHoursSpecification` hep oradan okur.

### `.tsx` sunucu / `.js` istemci ayrımı

Rota dosyaları (`app/**/page.tsx`) sunucu bileşenidir ve neredeyse yalnız
`metadata` üretir; görünümü aynı klasördeki `*-icerik.js` istemci bileşenine
devreder. `_ortak/` altındaki paylaşılan parçalar da `'use client'`tir.

`.js` bileşenlerinde JSX kullanılmaz; `h` (yani `React.createElement`)
`_ortak/temel.js`ten içe aktarılır ve hook'lar `var useState = React.useState`
biçiminde yerelleştirilir. Bu üsluba uyun.

- `app/_ortak/temel.js` — `h`, `BOLUMLER`, `MEKANLAR`, `KapakGorseli`,
  `tedaviSimgesi`, saat yardımcıları (`durum`, `hafta`, `gununKurali`), `useDar`

Kırılma noktaları medya sorgusuyla değil `useDar(esik)` kancasıyla kurulur:
eşiksiz çağrı 860 px (`DAR_ESIK`; mobil eylem çubuğu ve sadeleşen NavBar), kendi
eşiği olanlar sayı geçirir (saat kartı 560 px altında iki sütunu alt alta alır).
Kanca sunucuda `false` döner ve mount anında düzeltir, yani dar ekranda ilk kare
geniş düzenle çizilir.
- `app/_ortak/cerceve.js` — `SayfaCercevesi`: üst gezinme, altbilgi, mobil çubuk
- `app/_ortak/tedavi-menusu.js` — gezinmedeki "Tedaviler" açılır menüsü
- `app/klinik-app.js` — ana sayfa bölümleri; `HekimlerBolumu` ve `UlasimBolumu`
  dışa aktarılır ve `/hekimler` ile `/iletisim` sayfaları bunları yeniden kullanır

#### Her sayfada tek `h1`

Bölüm başlıklarını `BolumBasligi` basar ve varsayılan etiketi `h2`'dir; ana
sayfanın `h1`'i hero'daki tanıtım cümlesidir. Bir bölüm kendi sayfasında tek
başına durduğunda o sayfanın `h1`'i olmalıdır — bunun için `seviye: 'h1'`
geçilir. Paylaşılan bölümlerde seçim çağıran tarafındadır: `HekimlerBolumu` ve
`UlasimBolumu` `seviye`'yi dışarıdan alır, ana sayfada `h2` kalır,
`/hekimler` ile `/iletisim` sayfalarında `h1` olur. Stil iki durumda da
`S.h2`'dir: değişen yalnız etikettir. Yeni bir sayfa açarken `h1`'ini
vermeyi unutmayın.

### Tedaviler açılır menüsü (`app/_ortak/tedavi-menusu.js`)

`site.config.ts`teki `tedaviMenusu`, `tedaviler[]`ten ayrı bir listedir: orada
altı dalın kendi sayfası vardır, menüde kliniğin işlemleri dal dal sayılır.
Paneldeki "42 Tedavi / 9 Kategori" o listeden hesaplanır. Kalem düz metinse
bağlantı değil `span` basılır; `{ ad, adres }` biçimine çevrildiğinde `a` olur —
sayfalar açıldıkça config'e adres yazmak yeter.

Menü geniş ekranda fareyle, dar ekranda dokunuşla açılır ve tek durumdan
sürülür (`useTedaviMenusu`). İki nokta kolay bozulur:

- DS'in `NavBar`ı bağlantı düğmesine tutamak vermez, yalnız `label` düğümüne.
  Fare olayları bu yüzden etikettedir ve etiket negatif kenar boşluğuyla
  düğmenin iç boşluğuna kadar genişletilir; yoksa imleç kenardan girince menü
  açılmaz. Panelin üstündeki saydam `paddingTop` de fare yolunun parçasıdır ve
  kapanma `KAPANMA_GECIKMESI` kadar ertelenir.
- Dar ekranda çubuk yalnız "Tedaviler" bağlantısını taşır (açılır menünün tek
  tutamağı odur) ve `NavBar`a daraltılmış `style` geçilir; kendi ölçüleriyle
  marka + başlık + randevu düğmesi 375 px'e sığmaz.

Panel opaktır (`--grad-cream`), çünkü arkasından sayfa metni geçince kırk iki
kalemlik liste okunmaz oluyor. Perde yalnız dar ekranda çizilir; negatif
z-index'i onu çubuğun altına, sayfa içeriğinin üstüne koyar.

### Tasarım sistemi: `ds/` üretilmiştir

`ds/bundle.js`, `ds/styles.css` ve `ds/tokens/` elle düzenlenmez.
`tools/gen-ds-module.mjs`, `_ds/verdant-dental-…/_ds_bundle.js` içindeki
`window` tabanlı IIFE'yi sahte bir `window` nesnesine sararak ES modülüne çevirir
ve 17 bileşeni dışa aktarır (`NavBar`, `Card`, `Button`, `Field`, `Input`,
`Checkbox`, `Icon`, …). Betik ayrıca `lucide` ikon kümesini tembel yüklemeye
bağlar ve paketin Google Fonts `@import` satırını boşaltır (fontlar
`next/font` ile `app/layout.tsx`ten gelir). Paket değişirse `npm run gen:ds`.

Stiller satır içi `style` nesneleriyle yazılır ve değerler token'lardan okunur
(`var(--emerald-700)`, `var(--radius-blob)`, `var(--dur-base)`). Sabit renk kodu
yazmayın. Satır içiyle ifade edilemeyenler (`:hover`, medya sorgusu, akordiyon,
yazdırma) `app/globals.css` içindedir.

### Görseller

Fotoğraflar `public/gorseller/` altında durur, yol `site.config.ts`e yazılır.
`KapakGorseli(yol, alt, secenek)` yol boşsa `null` döner ve çağıran taraf çizim
yer tutucusunu gösterir — yani eksik fotoğraf siteyi bozmaz. `next/image` ile
`objectFit: cover` kullanılır; `secenek.olcu` (sizes) yanlış verilirse gereksiz
büyük dosya iner.

Tedavi kartı ikonları `app/_ortak/tedavi-ikonlari.js` içinde 104×104 saydam PNG
veri adresi olarak gömülüdür; anahtarlar `Tedavi.id` ile birebir aynıdır. Bir
anahtar silinirse `temel.js` o dal için çizgi simgeye (`TEDAVI_SIMGE_YOLLARI`,
ortodonti ayrı fonksiyon) geri döner.

İkonlar kartta 26 px kutuda gösterilir; 104 px bunun 4 katıdır, yoğun piksel
yoğunluklu ekranlar için. Yenisi üretilirken kaynak tek renk çizgi ve saydam
olduğu için renk kanalı sabit tutulup yalnızca alfa ölçeklenir (küçültmede kenar
halkası oluşmasın diye) ve ince çizgiler solmasın diye alfaya gama 0.85 kazancı
uygulanır. Uzun kenar 40/48 oranında kareye ortalanır.

### Paylaşım görselleri üretilir

`app/opengraph-image.tsx` ile `app/tedaviler/[id]/opengraph-image.tsx`, ortak
düzeni `app/_ortak/og-duzen.tsx`ten alıp derleme sırasında 1200×630 PNG üretir.
Bu dosyaların varlığı yeter: Next hem `og:image` hem `twitter:image`
etiketlerini kendisi basar, alt sayfalar kökteki görseli devralır. Metinler
`site.config.ts`ten geldiği için klinik değişince görsel de değişir.

Görsel PNG'ye çevrildiğinden orada CSS çalışmaz ve `var(--emerald-900)`
çözülmez. Sabit renk kodu yazmamak için `app/_ortak/token-renk.ts`,
`ds/tokens/colors.css` dosyasını derleme anında okuyup `var()` zincirini çözer;
`renk('--surface-inverse')` biçiminde kullanılır. Yazı tipi marka fontu değil,
`next/og`un varsayılanıdır.

Düzen ortalanır ve yazılar `GUVENLI_EN` (560 px) genişliğiyle sınırlanır, çünkü
WhatsApp dar kartta görseli şerit olarak değil ortasından kesilmiş kare küçük
resim olarak gösterir: 1200 pikselin yalnız ortadaki 630'u görünür. Sola
yaslanmış bir başlık orada ikiye bölünür. `puntoAyarla` da bu genişliğe göre
kısar; satır sonundan bölünemediği için en çok küçülen tek uzun kelimedir.

`site.adres` yer tutucu kalırsa `metadataBase` yanlış olur ve `og:image`
çözülmeyen bir alan adına işaret eder — görsel üretilmiş olsa bile önizlemede
çıkmaz.

### Tedavi çarkı (`TedaviCarki`, `app/klinik-app.js`)

01 numaralı bölüm ızgara değil, kaydırmaya bağlı dönen bir yaydır. Kartların
yeri merkeze uzaklıklarından (`d`, kart cinsinden) hesaplanır: `x = d × adım`,
`z = -derinlik × d²`, dönüş `= d × eğim`. Daire kullanılmamasının sebebi
pratiktir: dairede yatay açıklık ile kartlar arası boşluk aynı yarıçapa bağlıdır,
yayı genişletmek kartları da koparır. Üç ölçü ayrıdır — `--cark-adim`,
`--cark-derinlik` ve `CARK_EGIM`; aralık ya da kavis değişecekse bunlar
oynatılır. `d` ±n/2'de sarmalanır, orada kart zaten saydamlıkla silinmiştir.

Konumu üç şey sürer ve tek bir hedef açıda toplanır: sayfa kaydırma (bölüm
ekrandan geçerken `CARK_KAYDIRMA_ACI` = 420°, yani altı kart da görünür), boşta
yavaş dönüş ve kullanıcı (sürükleme, oklar, noktalar). Çizilen açı hedefe
yumuşayarak yaklaşır.

Buradaki başarım kuralları korunmalıdır, çünkü telefonda fark ederler:

- Kare döngüsü React durumuna dokunmaz; transform ve saydamlık doğrudan DOM'a
  yazılır, yalnız öndeki kart değişince bir kez `setState` çağrılır.
- Hareket kare sayısına değil geçen süreye bağlıdır (60 Hz ile 144 Hz aynı hız).
- Döngü yalnız bölüm ekrandayken (IntersectionObserver) ve sekme öndeyken
  çalışır; `prefers-reduced-motion` açıksa hiç çalışmaz.
- Kaydırma dinleyicisi pasiftir ve yalnız `scrollY` okur; bölümün kutusu
  önbellektedir, düzen yeniden hesaplanmaz.
- Ölçüler CSS değişkenlerinden gelir, JS yalnız birimsiz çarpanları verir.

Sahne `100vw` genişliğinde ve negatif kenar boşluğuyla bölümün dışına taşar; bu
yüzden `globals.css` içinde gövdeye `overflow-x: clip` konmuştur (`hidden`in
aksine kaydırma kutusu açmaz, yapışkan yerleşimi bozmaz). Ok ve nokta
düğmelerinin görünümü aynı dosyadaki `.cark-ok` / `.cark-nokta` sınıflarındadır.

Altı bağlantı her zaman DOM'dadır (sayfa haritası ve klavye erişimi için); bir
karta odaklanınca yay o karta döner ve kart bağlantılarında `draggable`
kapalıdır — açık kalırsa tarayıcının bağlantı sürükleme davranışı çarkı keser.

### Randevu ucu

`app/api/randevu/route.ts` gelen talebi doğrular, Resend ile e-posta olarak
gönderir ve **hiçbir yere kaydetmez** — veri tabanı yok, günlüğe kişisel veri
yazılmaz. Bot tuzağı, IP başına dakikada 5 istek sınırı (bellekte), alan uzunluk
sınırları ve e-posta başlığı enjeksiyon koruması vardır.

Bu davranış `yasal.config.ts` içindeki KVKK metninde anlatılır: uçun veri
işleyişi değişirse o metin de güncellenmelidir.

### Demo modu ve SEO

`site.demoModu` varsayılan `true`: `robots.txt` taramayı kapatır, sayfalar
`noindex` işaretlenir. `canonical`, `sitemap.xml` ve OG etiketlerinin tamamı
`site.adres` ile `site.demoModu` değerlerinden beslenir. Gerçek yayında ikisi de
değiştirilir.

### Depoda duran eski sürüm

`index.html`, `assets/`, `support.js`, `tools/serve.js` ve
`Klinik Sitesi.dc.html` Next.js öncesi statik sürümdür; karşılaştırma için
tutuluyor, derlemeye girmez (`tsconfig.json` bunları hariç tutar). Yeni
geliştirme bu dosyalara dokunmaz.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
