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
- `app/klinik-app.js` — ana sayfa bölümleri; `HekimlerBolumu` ve `UlasimBolumu`
  dışa aktarılır ve `/hekimler` ile `/iletisim` sayfaları bunları yeniden kullanır

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
