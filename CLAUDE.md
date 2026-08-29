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
npm run build          # kontrol + üretim derlemesi (tip denetimi de burada)
npm start
npm run kontrol        # yalnız yayın öncesi kontrol (bkz. Yayın öncesi kontrol)
KONTROL=yayin npm run kontrol   # demo iken "yayına ne kaldı" listesi
node tools/icerik-olc.mjs        # işlem sayfalarının içerik derinliği tablosu
node tools/icerik-olc.mjs eksik  # yalnız hedefin altında kalanlar
npx tsc --noEmit       # yalnız tip denetimi
npm run gen:ds         # ds/ klasörünü _ds/ paketinden yeniden üretir
node tools/serve.js 4173   # depodaki eski statik sürümü açar (index.html)
```

`package.json` içindeki `engines.node` en az 22.18 ister: kontrol betiği
`site.config.ts`i Node'un tip soyma özelliğiyle doğrudan içe aktarıyor.

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

Tedavi içeriği iki katmandır ve ikisi de `/tedaviler/<...>` altında yayımlanır:

`tedaviler[]` altı **ana dalı** tutar. Her kalem `/tedaviler/<id>` sayfasını
(`generateStaticParams`), çarkın kartını, kart ikonunu, sitemap'i ve JSON-LD'deki
hizmet listesini besler. Bir kalemi silmek ilgili sayfayı da yok eder.

`tedaviMenusu.kategoriler[].kalemler[]` kliniğin tek tek **işlemlerini** tutar
(bkz. *Tedaviler açılır menüsü*). İçeriği yazılmış kalem `Islem` nesnesine
çevrilir; o an `/tedaviler/<slug>` sayfası, site haritası kaydı ve paylaşım
görseli kendiliğinden oluşur. Türetilmiş `islemler[]` dizisi bu nesneleri
kategorisiyle birlikte verir ve rota, sitemap, dizin sayfası oradan beslenir.

İki katman aynı adres alanını paylaştığı için `site.config.ts` derleme sırasında
slug çakışmasını denetler ve çakışma varsa hata atarak derlemeyi durdurur.

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
- `app/_ortak/kure.js` — hero'daki dönen küre (bkz. *Hero'daki dönen küre*)
- `app/_ortak/tedavi-menusu.js` — gezinmedeki "Tedaviler" açılır menüsü
- `app/_ortak/olcum.js` — ziyaretçi ölçümü: sağlayıcı betiği ve `olay()`
- `app/_ortak/sosyal.js` — altbilgideki sosyal medya düğmeleri
- `app/_ortak/ustveri.ts` — sayfa `metadata`sı (bkz. *Sayfa üstverisi*)
- `app/klinik-app.js` — ana sayfa bölümleri; `HekimlerBolumu` ve `UlasimBolumu`
  dışa aktarılır ve `/hekimler` ile `/iletisim` sayfaları bunları yeniden kullanır

#### Sayfa üstverisi (`app/_ortak/ustveri.ts`)

Ana sayfa dışındaki her rotanın `metadata`sı `ustveri()`den geçer. Elle
yazıldığında üç şey sessizce kaçıyordu, üçü de burada bir kez çözülür:

- **Başlık kalıbı `{Sayfa} | {Kısa ad}, {Şehir}`.** Kliniğin resmî tam adı
  arama sonucundaki ~60 karakterlik alanı tek başına dolduruyor ve asıl
  bilgiyi kesiyordu. Kuyruk `site.config.ts`teki `sayfaBasligi()`ten gelir,
  kısa ad `klinik.kisaAd` alanıdır. Şehir başlıkta durur çünkü hasta "izmir
  implant" diye arıyor. Yeni bir `kisaAd` seçerken en uzun işlem adıyla
  toplamın 60 karakteri aşmadığına bakın. Ana sayfa istisnadır: orada aranan
  şey kliniğin kendisi olduğu için `anaBaslik` (tam ad + semt) kullanılır.
- **`og:url`.** Next bunu `canonical`dan türetmez; `openGraph.url`
  yazılmadıkça hiç basılmaz.
- **`openGraph` kök düzeni ezer, birleştirmez.** Next üstveriyi *sığ*
  birleştirir, yani bir sayfa `openGraph` yazdığı anda kökteki bloğun tamamı
  düşer — `siteName` böyle kayboluyordu. `ustveri()` bloğu her seferinde
  bütün olarak kurar.

Kendi adresi olmayan ekranlar (`not-found.tsx`) bu yardımcıyı kullanmaz:
canonical ve `og:url` verilmemesi gerekir.

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
bağlantı değil `span` basılır; `Islem` nesnesine çevrildiğinde `a` olur ve adres
`slug`'ından türer. Yani menü hem gezinme listesi hem içerik kuyruğudur: düz
metin kalan kalemler yazılmayı bekleyenlerdir.

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

### Tedavi rotaları

`/tedaviler` dizin sayfası (`app/tedaviler/page.tsx`) iki katmanı birlikte
gösterir: üstte altı dalın kartı, altında dokuz kategori ve kırk iki kalem.
Sayfası yazılmamış kalem bağlantısız satır olarak durur — liste eksiksiz kalsın
diye — ve üstteki açıklama satırı bekleyen kalem kalmadığında kendiliğinden
görünmez olur. Gezinme menüsündeki "Tüm tedaviler" bağlantısı buraya gelir.

Sayfalar arası bağlantı kasten yoğundur, çünkü bir sayfaya kaç iç bağlantı
verildiği arama motoru için önem sinyalidir. Üç yol birden kurulur: dal sayfası
kendi altındaki işlemleri listeler (`DaldakiIslemler`), işlem sayfası hem dalına
hem kategori komşularına bağlanır (`Komsular`), altbilgideki "SAYFALAR" sütunu
`/tedaviler` ile `/hekimler`i her sayfadan bağlar. Bu sütun kaldırılırsa
`/hekimler` yeniden yetim kalır — kendi başına başka bağlantı almıyor.

`DaldakiIslemler` yalnız `dal` alanı yazılmış işlemleri gösterir. Altı dal
kliniğin işlemlerinin tamamını kapsamaz: protez, ağız-diş-çene cerrahisi ve
estetik başlıklarının dalı yoktur, o işlemlerde alan bilerek boş bırakılır.
Zorlama bir atama kırıntı gezinmeye yanlış bilgi yazar. Kategori (`kategori`)
ise kırk iki işlemin tamamını kapsar; komşu bağlantıları ondan sürülür.

`app/tedaviler/[id]` segmenti iki tür sayfayı taşır. `id` bir dal id'siyse
`tedavi-icerik.js` çizilir (aşamalı süreç), bir işlem slug'ıysa
`islem-icerik.js` (serbest başlıklı bölümler — süreç sırası olmayan işlemlerde
numaralı liste yanlış bilgi verir). `generateMetadata`, `generateStaticParams` ve
paylaşım görseli iki listeyi de kapsar.

Notlar, sık sorulanlar ve randevu kartı iki sayfada da aynı görünür:
ilk ikisi `tedavi-icerik.js`ten adla dışa aktarılır, randevu kartı
`app/_ortak/randevu-karti.js` dosyasındadır (dizin sayfası da onu kullanır).

#### İşlem sayfasındaki iki isteğe bağlı blok

`Islem` nesnesine iki alan daha verilebilir; ikisi de veriyle sürülür, yani
yeni bir sayfa için `islem-icerik.js`e dokunmak gerekmez.

`zamanCizelgesi[]` aşama şeridini çizer (`asama`, `sure`, `aciklama`).
Hastanın en çok sorduğu şey "ne kadar sürer" olduğu için bu bilgi metnin
içinde bırakılmaz. `sure` her zaman aralık ya da niteleyicidir ("Tek seans",
"Birkaç ay"); kesin gün sayısı yazılmaz. Tek seansta biten işlemde şerit
çizilmez — üç kutuluk bir şerit orada bilgi değil süs olur.

`karsilastirma` iki seçeneği ölçüt ölçüt karşılaştıran tabloyu çizer.
Yalnız **gerçek bir seçimin olduğu** sayfaya konur ve o seçimin yapıldığı
sayfaya konur: açık/kapalı sinüs lifting tablosu üç teknik sayfasında
tekrarlanmaz, karar sayfası olan genel `sinus-lifting`tedir. Tablo aynı
zamanda birbirine yakın başlıkların tekrara düşmesini engeller — sayfa
komşusundan farklı olduğunu iddia etmek yerine ölçütle gösterir.

İçerik derinliği `node tools/icerik-olc.mjs` ile ölçülür: sayfada gerçekten
görünen metni (giriş, bölümler, şerit, tablo, notlar, sorular) sayar ve en
inceden başlayarak sıralar. Hedefler sayfa başına 600+ kelime ve 4-5 sorudur;
kırk iki işlem sayfasının tamamı bugün bu eşiğin üstündedir. Bir sayfanın metni
elden geçirildiğinde o kaleme `guncelleme` tarihi yazılır; site haritası bunu
okur (bkz. *Demo modu ve SEO*).

Toplu içerik eklemek için `tools/icerik-ekle.mjs` vardır: bir kalemin
`bolumler`, `sorular`, `notlar` ya da `zamanCizelgesi` dizisinin sonuna hazır
satırlar yazar, mevcut metne dokunmaz. Config bir TS modülü olduğu için
ayrıştırıp yeniden yazdırmak yorumları ve satır kırımlarını kaybettirirdi;
bunun yerine bölge slug'a göre daraltılıp diziler köşeli parantez sayılarak
bulunur ve tırnak içindeki parantezler atlanır. Elle düzenlemede gerekmez,
onlarca sayfaya aynı yapıyı eklerken işe yarar.

Görünüm `globals.css`teki `.islem-cizelge` ve `.islem-tablo` kurallarındadır.
Tablo dar ekranda sütunlara bölünmez, kendi kutusunda yatay kaydırılır
(`.islem-tablo-kutu`): ölçütü iki değerinden ayırmak karşılaştırmayı okunmaz
hâle getiriyordu. Şerit ise dar ekranda alt alta iner.

### Tasarım sistemi: `ds/` üretilmiştir

`ds/bundle.js`, `ds/styles.css` ve `ds/tokens/` elle düzenlenmez.
`tools/gen-ds-module.mjs`, `_ds/verdant-dental-…/_ds_bundle.js` içindeki
`window` tabanlı IIFE'yi sahte bir `window` nesnesine sararak ES modülüne çevirir
ve 17 bileşeni dışa aktarır (`NavBar`, `Card`, `Button`, `Field`, `Input`,
`Checkbox`, `Icon`, …). Betik ayrıca `lucide` ikon kümesini tembel yüklemeye
bağlar ve paketin Google Fonts `@import` satırını boşaltır (fontlar
`next/font` ile `app/layout.tsx`ten gelir). Paket değişirse `npm run gen:ds`.

Kaynak LF'e normalleştirilerek okunur: paket Windows'ta CRLF ile açılıyor
(git `autocrlf`) ama depoda LF duruyor, aşağıdaki yama ise çok satırlı parça
arıyor.

#### `NavBar` bağlantı yaması

Üreteç bileşen gövdelerini olduğu gibi taşır; **tek istisna `NavBar`'dır**.
DS'in `NavBar`'ı her gezinme öğesini `<button>` olarak basar ve adres vermenin
yolu yoktur. Bunun bedeli ağırdı: o başlıklar sayfa haritasında bağlantı
sayılmadığı için `/hekimler` sitede hiçbir yerden bağlantı almıyordu ve
ziyaretçi hiçbir başlığı yeni sekmede açamıyordu. Düğmenin içine `<a>` koymak
çözüm değil — etkileşimli öğe içinde etkileşimli öğe geçersiz HTML'dir.

Bu yüzden `gen-ds-module.mjs` yalnız `NavBar` bölgesinde iki değişiklik yapar:
`adres` taşıyan kalem `<a href>`, taşımayan `<button>` olarak basılır; ve
`onNavigate` çağrısına tıklama olayı eklenir. Kırılma noktaları:

- **Yama paketin `NavBar.jsx` özetine bağlıdır** (`NAVBAR_OZETI`, paket
  başlığındaki `sourceHashes`). Paket güncellenip o dosya değişirse üretim hata
  vererek durur — yama sessizce uygulanmamış olmaz. Yeni sürümde `links.map`
  bloğu doğrulanıp özet güncellenir.
- **Aranan parçalar bölgeye kısıtlıdır**; `height: 36` gibi satırlar paketin
  başka bileşenlerinde de geçiyor. Her parça tam bir kez bulunmazsa hata verilir.
- **Olayı kullanan taraf `preventDefault` çağırmak zorundadır**, yoksa hem kod
  hem tarayıcı yönlendirir. `cerceve.js` bunu `duzTiklama()` ile yapar:
  değiştirici tuşlu ya da sol tuş dışındaki tıklama tarayıcıya bırakılır, yeni
  sekmede açma buradan çalışır.

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
etiketlerini kendisi basar, alt sayfalar kökteki görseli devralır.

Görselin ana öğesi yazı değil, krem daire içinde zümrüt bir diş: `Madalyon`.
Madalyon ve `DIS_YOLU` `app/_ortak/amblem.tsx` içindedir, çünkü aynı diş sekme
ikonlarında da kullanılır (bkz. *İkonlar ve manifest*). Diş tek bir SVG yolu
olarak çizilir, yani vektördür ve hangi boyda basılırsa basılsın kenarı nettir. Ana sayfa yalnız madalyonu basar;
tedavi sayfaları `baslik` geçerek altına dalın adını ekler.

Bütün ölçüler önizlemenin küçük gösterilmesinden doğar:

- **`GUVENLI_EN` (560 px).** WhatsApp dar kartta görseli şerit olarak değil,
  ortasından kesilmiş kare küçük resim olarak gösterir — 1200 pikselin yalnız
  ortadaki 630'u görünür. Düzen bu yüzden ortalanır; sola yaslanmış bir başlık
  orada ikiye bölünüyordu.
- **`OKUNUR_PUNTO` (46).** O kare ekranda ~160 piksel çizilir, yani görsel
  dörtte birine iner. Bu puntonun altındaki yazı bulanık şeride döner. Sığmayan
  bilgi küçültülerek eklenmez, çıkarılır.
- **Yazı yerine şekil.** WhatsApp küçük resmi hem küçültüp hem yeniden
  sıkıştırır; bundan en çok zarar gören şey harflerin ince kıvrımlarıdır, dolu
  bir siluet ise neredeyse etkilenmez. Kliniğin adı ve açıklaması kartın yanında
  zaten tam metin durduğu için görselde tekrar edilmez.

Görsel PNG'ye çevrildiğinden orada CSS çalışmaz ve `var(--emerald-900)`
çözülmez. Sabit renk kodu yazmamak için `app/_ortak/token-renk.ts`,
`ds/tokens/colors.css` dosyasını derleme anında okuyup `var()` zincirini çözer;
`renk('--sand-50')` biçiminde kullanılır. Yazı tipi marka fontu değil,
`next/og`un varsayılanıdır.

`site.adres` yer tutucu kalırsa `metadataBase` yanlış olur ve `og:image`
çözülmeyen bir alan adına işaret eder — görsel üretilmiş olsa bile önizlemede
çıkmaz.

### Hata ekranları

Üç ayrı ekran vardır ve hangisinin çizileceğini Next belirler:

- `app/not-found.tsx` — adres yok (404). Görünümü `_ortak/bulunamadi-icerik.js`
  verir; sunucu bileşenidir, yalnız `metadata` üretir.
- `app/error.tsx` — sayfa çizilirken hata çıktı. İstemci bileşenidir (kural) ve
  görünümü `_ortak/hata-icerik.js`ten alır: site çerçevesi, telefon düğmesi ve
  yeniden deneme. Next 16'da yeniden çizme prop'u `reset` değil **`retry`**dir.
- `app/global-error.tsx` — kök düzenin kendisi çöktü. `layout.tsx`in yerine
  geçtiği için kendi `<html>`, `<body>` ve stillerini getirir; gezinme, altbilgi
  ve next/font orada yoktur. Başlık `metadata` ile değil React'in `<title>`
  bileşeniyle verilir (istemci bileşeni `metadata` dışa aktaramaz).

Diş şeklinin sabiti `_ortak/dis-yolu.ts` içindedir: `amblem.tsx` token dosyası
okuduğu için yalnız sunucuda çalışır, oysa aynı yol `global-error.tsx`te
tarayıcıda çizilir.

`globals.css`teki font değişkenlerinde iç `var()`lara yedek verilmesi bu yüzden
şarttır (`var(--font-jakarta, ui-sans-serif)`): değişken tanımsızsa yalnız o
parça değil, `font-family` bildiriminin tamamı geçersiz olur ve yazı tarayıcının
serif varsayılanına düşer.

### İkonlar ve manifest

`app/icon.tsx`, `app/apple-icon.tsx` ve `app/manifest.ts` dosyalarının varlığı
yeter: Next `<link rel="icon">`, `apple-touch-icon` ve `manifest` etiketlerini
kendisi basar. Üçü de derleme sırasında PNG üretir, depoda ikon dosyası durmaz.

`icon.tsx` `generateImageMetadata` ile üç ölçü çıkarır — 32 (sekme), 192 ve 512
(manifest). `id` props'a **promise olarak** geçer, `await` edilmeden sayıya
çevrilemez. Ölçülerden biri silinirse `manifest.ts` içindeki `/icon/<ölçü>`
adresi de güncellenmelidir.

İkon, paylaşım görselinin tersini kullanır: orada krem daire içinde koyu diş,
ikonda koyu zemin üzerinde krem diş. Sebebi okunurluk — 32 pikselde açık zeminli
bir simge tarayıcının açık sekme şeridinde kayboluyor. `apple-icon` köşe
yuvarlaması taşımaz, çünkü iOS maskeyi kendisi uygular; yuvarlarsak köşelerde
saydam üçgenler kalır.

Manifest'te `display: 'browser'` bilerek seçilmiştir: site bir uygulama değil,
adres çubuğunu gizlemek ziyaretçiyi telefonda kilitlenmiş hissettiriyor.
Tema rengi hem burada hem `layout.tsx` içindeki `viewport`ta `renk()` ile
token'dan okunur.

### Hero'daki dönen küre (`app/_ortak/kure.js`)

Hero fotoğrafının sağ üstündeki krem baloncuk süs değil de canlı bir öğedir:
gövdesi (krem cam, `--radius-blob`, `--shadow-3` ve iç gölgeler) eski düz
baloncuğun aynısıdır, içinde beş konik degrade farklı hız ve yönde döner.
Renkler token'dan gelir (`--emerald-500`, `--amber-400`, `--emerald-300`) ve
`renkler` prop'uyla değiştirilebilir.

Degradeler ve keyframe satır içi yazılamaz, `globals.css` içindeki `.kure`
kurallarındadır. İki nokta kolay bozulur:

- **`@property --kure-aci` şart.** Konik degradenin açısı ancak tipi bilinen
  bir özel değişkenle canlandırılabilir; tanım silinirse tarayıcı açıyı düz
  metin sayar, ara değer üretemez ve küre sessizce durur. Destek olmayan
  tarayıcıda da aynı şey olur — küre durur ama bozulmaz, ayrı yedek gerekmez.
- **Bulanıklık ve kontrast ölçüye bağlıdır.** `kure.js` içindeki katsayılar
  (0.08 ve 0.003) degradeleri 96 px'te tek bir sedef hareketinde birleştirir;
  sabitlenirse büyük ölçüde dağılmış lekeye döner.
- **Keyframe bir tur değil on tur döner (3600°).** Degradelerin açısı
  `--kure-aci`'nin kesirli katıdır (×1.2, ×0.8, ×-1.5, ×2.1, ×-0.7); açı 360°de
  sarsaydı bu katlar tam tur tamamlamaz ve hepsi birden sıfıra sıçrardı —
  dönüş gözle görülür biçimde kesilirdi. 3600° hepsinde tam sayı tur eder.
  `globals.css`teki 3600 ile `kure.js`teki `DONGU_TURU` birlikte değişir.

Küre her karede yeniden boyanır — konik degrade derleyiciye devredilemez.
Çarktaki kuralın aynısı burada da geçerlidir: `IntersectionObserver` kutuyu
izler, ekrandan çıkınca `.kure--durgun` ile `animation-play-state: paused`
verilir; `prefers-reduced-motion` açıksa canlandırma hiç çalışmaz.

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

Kaydırma payı yalnız geniş ekranda sürer: `DAR_ESIK` altında sıfırlanır, çünkü
telefonda dikey kaydırma ile yatay sürükleme aynı açıyı sürüyor ve parmakla öne
getirilen kart sayfa birkaç piksel kayınca elden kaçıyordu. Orada çark
kullanıcının ve boştaki yavaş dönüşün elindedir. Eşik `matchMedia` ile izlenir
(React durumu değil, `darRef`) ve geçişte kaydırma payı kullanıcı payına
aktarılır, böylece öndeki kart yerinde kalır.

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

Altı bağlantı her zaman DOM'dadır (sayfa haritası ve klavye erişimi için) ve
kart bir bağlantı gibi davranır: tıklandığında önde olup olmadığına
bakılmaksızın kendi sayfasına gider. Çark yalnız sunumu değiştirir. Klavyeyle
odaklanınca yay o karta döner — ama yalnız `:focus-visible` iken, yoksa fare
tıklaması da odak verdiği için kart sayfa açılmadan önce boşuna bir tur atar.

Kart bağlantılarında `draggable` kapalıdır; açık kalırsa tarayıcının bağlantı
sürükleme davranışı çarkı keser.

**İşaretçi basılırken yakalanmaz.** `setPointerCapture` yalnız sürükleme eşiği
(4 px) aşıldığında kurulur. Basar basmaz kurulursa tarayıcı yalnız pointer
olaylarını değil ardından gelen `click`i de sahneye yönlendirir: kartın
bağlantısı olay yolunda hiç yer almaz, tıklama sessizce yutulur ve kart
masaüstünde tıklanamaz hâle gelir. Yakalamayı `pointerup`ta geri vermek
kurtarmaz, hedef o noktada belirlenmiştir. Dokunmada görülmez, çünkü orada
yakalama kendiliğinden basılan öğeye — kartın kendisine — kurulur.

### Randevu ucu

`app/api/randevu/route.ts` gelen talebi doğrular, Resend ile e-posta olarak
gönderir ve **hiçbir yere kaydetmez** — veri tabanı yok, günlüğe kişisel veri
yazılmaz. Bot tuzağı, IP başına dakikada 5 istek sınırı (bellekte), alan uzunluk
sınırları ve e-posta başlığı enjeksiyon koruması vardır.

Bu davranış `yasal.config.ts` içindeki KVKK metninde anlatılır: uçun veri
işleyişi değişirse o metin de güncellenmelidir.

### Sosyal medya düğmeleri (`app/_ortak/sosyal.js`)

Altbilgideki düğmeler ayrı bir listeden değil, `klinik.sosyal` dizisinden
gelir — yapısal veriye `sameAs` olarak yazılan dizinin aynısı. Hesap tek yere
yazılır, iki yer birden beslenir.

WhatsApp bunun istisnasıdır: adresini `klinik.whatsapp` alanından alır ve
satırın başında durur. `wa.me` bir kimlik sayfası değil iletişim bağlantısıdır,
`sameAs`'e yazılmaz; `rel`'inden de `me` düşürülür. Ölçümde de hesap değil
dönüşüm sayılır — belgeye asılı dinleyici onu `whatsapp` olayı olarak
kendiliğinden sayar (bkz. *Ölçüm*), `data-olcum-yer` yalnız kırılımını verir.
Bu düğme aynı zamanda WhatsApp'ın geniş ekrandaki tek girişidir: mobil eylem
çubuğu 860 px altında çizildiği için masaüstünde başka bağlantısı yoktu.

Dizi sosyal medya olmayan adres de taşıyabilir (Google işletme kaydı). Adresin
içinde ağın alan adı aranır; tanınmayan adres düğme basmaz ama `sameAs`
listesinde kalır. X'in eski alan adı da tanınır (`x.com`, `twitter.com`).
Sıra `AGLAR` dizisinden gelir, config'teki yazım sırasından değil: klinik
hesaplarını hangi sırayla yazarsa yazsın düğmeler aynı yerde durur. Hiç hesap
yoksa bileşen `null` döner, altbilgide boş satır kalmaz.

WhatsApp, Instagram ve Facebook sitedeki diğer ikonlarla aynı çizgi
ölçüsündedir (19 px, 1.75 kalınlık); WhatsApp'ın çizimi mobil çubuktakinin
birebir aynısıdır, aynı bağlantı iki yerde farklı görünmesin diye. X'in
markası dolu bir harf olduğu için tek istisnadır ve optik ağırlığı ötekilere
eşitlensin diye 16 px çizilir — aynı ölçüde çizilirse yanında kalın durur.

Görünüm `globals.css` içindeki `.sosyal-dugme` kurallarındadır: koyu zümrüt
gradyanlı cam disk, imleç değince kenar amber'a döner, içinden bir parlama
geçer ve düğme büyüyüp 2° yatar. Üç nokta kolay bozulur:

- **Parlamanın yarı saydam amber'ı `color-mix` ile jetondan türetilir.**
  Sabit renk kodu girilmez; marka rengi değişince parlama da değişir.
- **Süreler `--dur-*` jetonlarındandır.** "Hareketi azalt" ayarı açıkken
  hepsi 0ms olur: durum değişir ama hiçbir şey oynamaz, ayrı bir kural
  gerekmez.
- **`:focus-visible` kuralı ayrıca yazılmıştır.** Kökteki genel odak halkası
  düğmenin gölgesini silip yuvarlaklığını 8px'e düşürüyordu.

### Ölçüm (`app/_ortak/olcum.js`)

Sağlayıcı `site.config.ts` içindeki `olcum.saglayici` ile seçilir: `'vercel'`,
`'plausible'` veya `'yok'`. Kütüphane kullanılmaz — iki sağlayıcının da tek bir
yükleyici betiği ve `window` üzerinde bir kuyruğu vardır (`vaq`, `plausible.q`);
betik yüklenmeden gönderilen olay kuyruğa yazılır, yüklenince boşaltılır. Bu
yüzden `olay()` kuyruğu gerektiğinde kendisi kurar ve satır içi "shim" betiğine
gerek kalmaz.

`OlcumBetigi` `layout.tsx`ten çağrılır; betiği `next/script` ile koyar ve
belgeye tıklama dinleyicisi asar. Betik yalnız üretim derlemesinde yüklenir
(Vercel'in betiği localhost'ta 404 döner); geliştirmede olaylar konsola yazılır.
`global-error.tsx` kök düzenin yerine geçtiği için orada ölçüm yoktur; o ekrandaki
telefon tıklaması sayılmaz.

Telefon, WhatsApp ve harita bağlantılarına tek tek dinleyici asılmaz: tıklama
belgeden **yakalama aşamasında** yakalanır ve `href`'ine bakılarak sınıflanır
(`tel:` → telefon, `wa.me`/`whatsapp.com` → whatsapp, `google.com/maps`/
`maps.apple.com` → yol-tarifi). Aynı bağlantı on ayrı yerde geçtiği ve yenisi
eklendiğinde de sayılması gerektiği için böyledir. Bağlantıdaki
`data-olcum-yer` özniteliği olayın kırılımı olur; verilmezse `'sayfa'` yazılır.

Dördüncü olay elle gönderilir: randevu formunda **yalnız sunucu başarılı yanıt
verdiğinde** (`klinik-app.js`, `gonder()`). Doğrulama hatası ve bağlantı kopması
sayılmaz.

Ölçüm çerezsizdir, bu yüzden çerez onay bandı yoktur. `yasal.config.ts`
ölçüm maddelerini `olcum.saglayici` değerine göre metne katar ya da düşürür
(`olcumluysa()`); ölçüm davranışı değişirse o maddeler de güncellenmelidir.
`olcum.googleDogrulama` dolduğunda `layout.tsx` Search Console etiketini basar.

### Yapısal veri (`app/_ortak/yapisal-veri.tsx`)

Arama motorlarına gönderilen schema.org verisi tek bir yardımcıdan üretilir.
Klinik ve site kök düzende bir kez tarif edilir; sayfalar kendi düğümlerini
basar ve kliniği tekrar anlatmak yerine sabit kimliğine bağlanır
(`KLINIK_KIMLIK`). Aynı kimlik alan eklemeye de yarar: `/hekimler` yalnızca
`employee` yazar, kayıt kök düzendekiyle birleşir.

Sayfa başına ne basıldığı:

| Sayfa | Tür | Ek |
| --- | --- | --- |
| `/` | `WebPage` + `FAQPage` | sorular `mainEntity` |
| `/tedaviler` | `CollectionPage` | bütün sayfaların `ItemList`i |
| `/tedaviler/<id>` | `MedicalWebPage` + `FAQPage` | `about` → `MedicalProcedure` |
| `/hekimler` | `WebPage` | hekimler `Person`, klinik `employee` |
| `/iletisim` | `ContactPage` | — |
| yasal sayfalar | `WebPage` | yalnız kırıntı (sayfalar `noindex`) |

Uyulması gereken üç kural:

- **Kırıntı gezinme yalnız ekranda görünüyorsa basılır ve metni birebir aynı
  olur.** `/hekimler` ile `/iletisim` sayfalarında kırıntı çubuğu yoktur, veri
  de yoktur. Tedavi sayfalarındaki kırıntının ara basamağı `/tedaviler`dir —
  ekrandaki bağlantı da oraya gider.
- **Config'te boş kalan alan hiç basılmaz.** Koordinat, sosyal hesap, hekim
  fotoğrafı, mezuniyet biçimi tutmayan kayıt: hepsi koşulludur. Eksik alan
  sessizdir, uydurma alan zararlıdır.
- **Soru listesi olan sayfa iki türlüdür** (`['MedicalWebPage', 'FAQPage']`).
  `FAQPage` soruları `mainEntity`de ister, o yüzden dizin sayfalarındaki
  `ItemList` ile aynı alanı paylaşır ve ikisi bir arada verilmez.

Hekimler `Physician` değil `Person`dır: şemada `Physician` bir kuruluş
türüdür (muayenehane), buradaki hekimler ise klinikte çalışan kişilerdir
(`worksFor`).

### Demo modu ve SEO

`site.demoModu` varsayılan `true`: `robots.txt` taramayı kapatır, sayfalar
`noindex` işaretlenir. `canonical`, `sitemap.xml` ve OG etiketlerinin tamamı
`site.adres` ile `site.demoModu` değerlerinden beslenir. Gerçek yayında ikisi de
değiştirilir.

`sitemap.xml`teki `lastModified` derleme anından değil içerikten gelir:
sayfanın kendi `guncelleme` alanı (`Tedavi` ve `Islem` üzerinde, isteğe bağlı),
yoksa `site.icerikGuncelleme`. Derleme anı yazıldığında her yayın bütün
sayfaların değiştiğini iddia ediyordu; arama motoru bir süre sonra o alana
bakmayı bırakır. Bir sayfanın metnini elden geçirdiğinizde o sayfaya
`guncelleme` yazın.

### Yazı tipi ağırlıkları

`layout.tsx`teki `weight` listeleri sitede gerçekten kullanılanla sınırlıdır.
`next/font` orada sayılan her ağırlık × her stil × her alt küme için ayrı dosya
indirir — kullanılmayanı da. Jakarta'da 300 hiç geçmiyordu ve italik hiç
kullanılmıyor; ikisi düşünce yazı tipi dosyası sayısı 30'dan 14'e indi
(Jakarta 5 ağırlık × 2 alt küme, mono 2 × 2). Yeni bir ağırlık kullanacaksan
önce listeye eklemen gerekir, yoksa tarayıcı en yakınını sentezler ve harfler
kalınlaşmış görünür.

### Yayın öncesi kontrol (`tools/kontrol.mjs`)

`build` betiğinin başında çalışır ve şablondan kalan yer tutucuların gerçek bir
kliniğin yayınına sızmasını engeller. Bu hataların ortak yanı sessiz olmaları:
site derlenir, sayfa açılır, kimse fark etmez — ziyaretçi çalışmayan numarayı
arayana ya da müşteri "üç aydır Google'da yokuz" diye telefon edene kadar.

Kip ayrı bir bayrakla değil `site.demoModu` ile sürülür, çünkü yayına geçişin
kendisi zaten o satırdır:

- `demoModu: true` — demo derlemesi. Yer tutucu beklenen durumdur; yalnız
  yapısal hatalar derlemeyi durdurur, yayın öncesi kapatılacaklar liste olarak
  yazılır ve derleme sürer.
- `demoModu: false` — yayın derlemesi. Yer tutucuların hepsi hatadır ve derleme
  durur. Yani yer tutucuyla yayına çıkılamaz.

`KONTROL=yayin` bayrağı çevirmeden yayın denetimini çalıştırır (kalanları
görmek için), `KONTROL=demo` gevşetir.

Denetim iki türlüdür. **Yapısal** olanlar her kipte hatadır: `site.adres` boş
olamaz, `https://` ile başlar, eğik çizgiyle bitmez; config'te adı geçen her
`/gorseller/...` dosyası `public/` altında gerçekten durmalıdır (yolu yanlış
görsel hata vermez, sessizce çizim yer tutucusuna düşer). **Yayına özel**
olanlar `YER_TUTUCULAR` listesindeki izlerdir (`.example`, `mesepoliklinik`,
`0000/000`, örnek telefon, demo alan adı) ve boş kalan `haritaKoordinat` ile
`googleDogrulama`.

İki nokta kolay bozulur:

- **Yer tutucu taraması alan alan değil parça parçadır.** Betik `site`,
  `olcum`, `klinik`, `hekimler` ve `gorseller` nesnelerini özyinelemeli gezer,
  her metni `YER_TUTUCULAR` izlerine karşı arar. Config'e yeni bir alan
  eklendiğinde betiği güncellemek gerekmez. Tedavi metinleri kasten dışarıdadır:
  onlar içeriktir ve içlerinde geçen sayılar yanlış alarm üretir.
- **Betik `site.config.ts`i doğrudan içe aktarır**, metnini ayrıştırmaz — o
  yüzden dosya yeniden biçimlendirilse de denetim bozulmaz. Bunun bedeli Node
  22.18+ (tip soyma) ve `package.json`daki `engines.node` kaydıdır. Node bir
  `.ts` içe aktarımında `MODULE_TYPELESS_PACKAGE_JSON` uyarısı basar; depoya
  `"type": "module"` eklemek CommonJS betiklerini kıracağı için yalnız o uyarı
  susturulur (`u.code` ile — `u.name` her uyarıda `'Warning'`tir).

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
