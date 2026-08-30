/* ==========================================================================
   YAYIN ÖNCESİ KONTROL

   `npm run build` bu betiği çalıştırmadan derlemeye geçmez. Tek bir şeyi
   engellemek için var: şablondan kalan yer tutucuların gerçek bir kliniğin
   yayınına sızması. Unutulan bir alanın bedeli sessizdir — site aylarca
   arama motoruna kapalı kalır ya da ziyaretçi çalışmayan bir numarayı arar.

   Kip `site.config.ts` içindeki `demoModu` alanından sürülür; ayrı bir bayrak
   tutmak gerekmez, çünkü yayına geçişin kendisi zaten o satırdır:

     demoModu: true   → demo derlemesi. Yer tutucu beklenen durumdur.
                        Yalnız yapısal hatalar derlemeyi durdurur; yayın
                        öncesi kapatılacaklar liste olarak yazılır.
     demoModu: false  → yayın derlemesi. Yer tutucuların hepsi hatadır.

   Çevre değişkeniyle kip zorlanabilir:

     KONTROL=yayin    demoModu true iken de yayın denetimini çalıştırır —
                      bayrağı çevirmeden "yayına ne kaldı" listesi.
     KONTROL=demo     yayın denetimini gevşetir (acil çıkış).

   Betik `site.config.ts`i doğrudan içe aktarır (Node'un tip soyma özelliği,
   >= 22.18). Metni ayrıştırmak yerine gerçek değerleri okur; dosya yeniden
   biçimlendirilse de denetim bozulmaz.
   ========================================================================== */

import { readFile, access } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const kok = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = path.join(kok, 'site.config.ts');

/* --- Yer tutucular --------------------------------------------------------
   Şablonun kendi örnek değerlerinden kalan izler. Yeni müşteri kurulumunda
   hepsi değişir; değişmeyen bir tanesi bile yayında hatadır. Liste alan alan
   değil parça parça tutulur, böylece config'e yeni bir alan eklendiğinde
   burayı güncellemek gerekmez — tarama bütün kimlik alanlarını gezer. */
const YER_TUTUCULAR = [
  { parca: '.example', ad: 'örnek e-posta alan adı' },
  { parca: 'mesepoliklinik', ad: 'şablonun örnek klinik adı' },
  { parca: '0000/000', ad: 'örnek ruhsat numarası' },
  { parca: '902320000000', ad: 'örnek telefon numarası' },
  { parca: '000 00 00', ad: 'örnek telefon numarası' },
  { parca: 'zenithras.online', ad: 'şablonun demo alan adı' }
];

/* Taranan kimlik alanları. Tedavi metinleri bilerek dışarıda: onlar içeriktir,
   kliniğin kimliği değil, ve içlerinde geçen sayılar yanlış alarm üretir. */
const TARANAN = ['site', 'olcum', 'klinik', 'hekimler', 'gorseller'];

/* --- Bulgu toplama -------------------------------------------------------- */

const bulgular = [];

/** yayina: yalnız yayın derlemesini ilgilendirir; demoda hatırlatma olarak yazılır.
    iz: kaynakta aranacak metin — bulguya satır numarası iliştirmek için. */
function ekle(duzey, alan, baslik, aciklama, { yayina = false, iz = null } = {}) {
  bulgular.push({ duzey, alan, baslik, aciklama, yayina, iz });
}

/* --- Kaynak metin: bulguya satır numarası iliştirmek için ------------------ */

const kaynak = await readFile(CONFIG, 'utf8');
const satirlar = kaynak.split('\n');

/* Önce değerin kendisi aranır — aynı yer tutucu birden çok alanda geçtiği için
   parçayı aramak hep ilk alanı gösteriyordu. Değer boşsa `alan:` biçimi aranır;
   iki nokta şart, yoksa tip tanımındaki `alan?: string` satırı önce geliyor. */
function satirBul(iz) {
  if (!iz) return null;
  const i = satirlar.findIndex((s) => s.toLowerCase().includes(iz.toLowerCase()));
  return i === -1 ? null : i + 1;
}

/* --- Config'i yükle -------------------------------------------------------
   Node bir .ts dosyasını içe aktarırken package.json'da `type` yazmadığı için
   MODULE_TYPELESS_PACKAGE_JSON uyarısı basıyor. Depoya `"type": "module"`
   eklemek tek çözüm değil ve CommonJS betiklerini (tools/serve.js) kırardı;
   uyarı buraya özgü ve zararsız olduğu için yalnız o susturulur. */
const uyariYazici = process.listeners('warning');
process.removeAllListeners('warning');
process.on('warning', (u) => {
  if (u.code === 'MODULE_TYPELESS_PACKAGE_JSON') return;
  for (const yazici of uyariYazici) yazici(u);
});

let cfg;
try {
  cfg = await import(pathToFileURL(CONFIG).href);
} catch (hata) {
  console.error('\nsite.config.ts okunamadı — derleme durduruldu.\n');
  console.error(hata instanceof Error ? hata.message : hata);
  console.error(
    "\nBu betik Node'un tip soyma özelliğini kullanır; Node 22.18 veya üstü gerekir.\n" +
      `Kullanılan sürüm: ${process.version}\n`
  );
  process.exit(1);
}

const { site, klinik, olcum, altyapi } = cfg;

/* --- Kip ------------------------------------------------------------------ */

const istek = (process.env.KONTROL || '').trim().toLowerCase();
if (istek && istek !== 'yayin' && istek !== 'demo') {
  console.error(`\nKONTROL değeri tanınmadı: "${istek}" — 'yayin' ya da 'demo' bekleniyor.\n`);
  process.exit(1);
}
const yayinKipi = istek ? istek === 'yayin' : site.demoModu !== true;

/* --- Yardımcılar ---------------------------------------------------------- */

/** Kimlik alanlarındaki bütün metinleri `alan yolu → değer` olarak gezer. */
function* kimlikMetinleri() {
  for (const ad of TARANAN) yield* gez(cfg[ad], ad);
}

function* gez(deger, yol) {
  if (typeof deger === 'string') {
    if (deger.trim()) yield [yol, deger];
    return;
  }
  if (Array.isArray(deger)) {
    for (let i = 0; i < deger.length; i++) yield* gez(deger[i], `${yol}[${i}]`);
    return;
  }
  if (deger && typeof deger === 'object') {
    for (const [k, v] of Object.entries(deger)) yield* gez(v, `${yol}.${k}`);
  }
}

function kisalt(metin) {
  return metin.length > 72 ? `${metin.slice(0, 69)}…` : metin;
}

/* --- Yapısal denetimler (her kipte hata) ---------------------------------- */

const adres = typeof site.adres === 'string' ? site.adres.trim() : '';

if (!adres) {
  ekle(
    'hata',
    'site.adres',
    'Site adresi boş',
    [
      'canonical, sitemap.xml, robots.txt ve paylaşım görselinin tam adresi bu',
      'alandan üretilir. Boşken hiçbiri doğru çıkmaz.'
    ],
    { iz: 'adres:' }
  );
} else {
  if (!adres.startsWith('https://')) {
    ekle(
      'hata',
      'site.adres',
      'Site adresi https:// ile başlamıyor',
      [`Bulunan: ${adres}`, 'Arama motoruna ve paylaşım kartlarına giden mutlak adres budur.'],
      { iz: 'adres:' }
    );
  }
  if (adres.endsWith('/')) {
    ekle(
      'hata',
      'site.adres',
      'Site adresi eğik çizgiyle bitiyor',
      [`Bulunan: ${adres}`, 'Alt sayfaların adresi çift eğik çizgiyle üretilir. Sondaki / silinmeli.'],
      { iz: 'adres:' }
    );
  }
}

/* Site haritasındaki lastModified bu alandan gelir; biçim tutmazsa tarih
   sessizce derleme anına düşer ve alanın anlamı kaybolur. */
const icerikTarihi = new Date(`${site.icerikGuncelleme}T00:00:00Z`);
if (Number.isNaN(icerikTarihi.getTime())) {
  ekle(
    'hata',
    'site.icerikGuncelleme',
    'İçerik tarihi okunamıyor',
    [`Bulunan: ${site.icerikGuncelleme}`, "Biçim 'YYYY-AA-GG' olmalı (ör. '2026-08-29')."],
    { iz: 'icerikGuncelleme:' }
  );
} else if (icerikTarihi.getTime() > Date.now() + 86_400_000) {
  ekle(
    'uyari',
    'site.icerikGuncelleme',
    'İçerik tarihi gelecekte',
    ['Site haritası içeriğin henüz yazılmamış olduğunu bildirir.'],
    { iz: 'icerikGuncelleme:' }
  );
}

/* Görsel yolları: dosya yoksa sayfa hata vermez, sessizce çizim yer tutucusuna
   düşer. Sessiz olduğu için denetlenir. */
for (const [alan, deger] of kimlikMetinleri()) {
  if (!deger.startsWith('/gorseller/')) continue;
  try {
    await access(path.join(kok, 'public', deger));
  } catch {
    ekle(
      'hata',
      alan,
      'Görsel dosyası yok',
      [
        `Beklenen dosya: public${deger}`,
        'Yol yanlışsa sayfa hata vermez, sessizce çizim yer tutucusu gösterir.'
      ],
      { iz: deger }
    );
  }
}

/* --- Yayın denetimleri ---------------------------------------------------- */

if (site.demoModu === true) {
  ekle(
    'hata',
    'site.demoModu',
    'Demo modu açık',
    [
      'robots.txt bütün taramayı kapatıyor ve her sayfa noindex işaretleniyor.',
      'Gerçek müşteri yayına girerken false yapılır — yayın günü ilk iş budur.'
    ],
    { yayina: true, iz: 'demoModu:' }
  );
}

if (adres.includes('.vercel.app')) {
  ekle(
    'uyari',
    'site.adres',
    'Adres hâlâ vercel.app alt alanı',
    [`Bulunan: ${adres}`, 'Kliniğin kendi alan adı bağlandığında burası da güncellenmelidir.'],
    { yayina: true, iz: 'adres:' }
  );
}

/* Şablondan kalan yer tutucular. Bir alanda birden çok iz bulunabilir
   (örnek e-posta hem `.example` hem örnek klinik adı taşır); alan zaten
   baştan yazılacağı için ilk bulunan yeter, ikincisi satırı tekrarlar. */
for (const [alan, deger] of kimlikMetinleri()) {
  const bulunan = YER_TUTUCULAR.find((y) => deger.toLowerCase().includes(y.parca.toLowerCase()));
  if (!bulunan) continue;
  ekle(
    'hata',
    alan,
    `Şablondan kalan ${bulunan.ad}`,
    [`Bulunan: ${kisalt(deger)}`, `İçindeki "${bulunan.parca}" değiştirilmemiş.`],
    { yayina: true, iz: deger }
  );
}

/* Boş bırakıldığında site bozulmaz ama getirisi kaybolan alanlar. */
if (!(klinik.haritaKoordinat || '').trim()) {
  ekle(
    'uyari',
    'klinik.haritaKoordinat',
    'Harita koordinatı boş',
    [
      'Yol tarifi adres metnine göre konumlanıyor. Google Haritalar bina yerine',
      'sokağı gösterebilir; enlem,boylam yazmak bunu düzeltir.'
    ],
    { yayina: true, iz: 'haritaKoordinat:' }
  );
}

if (!(olcum.googleDogrulama || '').trim()) {
  ekle(
    'uyari',
    'olcum.googleDogrulama',
    'Search Console doğrulama kodu boş',
    [
      'Kod girilmeden hangi aramadan kaç ziyaretçi geldiği görülemez. Geriye',
      'dönük veri üretilemediği için yayın günü kurulmalıdır.'
    ],
    { yayina: true, iz: 'googleDogrulama:' }
  );
}

/* Randevu talebi yurt dışındaki sunuculardan geçiyor ve aydınlatma metni bunu
   söylüyor; hangi dayanakla geçtiğini söylemiyor. Dayanağı şablon seçemez,
   klinik seçer — ama seçilmeden yayına çıkılamaz: eksik olan şey metnin
   kendisidir, bir tercih değil. */
if (!(altyapi.yurtDisiDayanak || '').trim()) {
  ekle(
    'hata',
    'altyapi.yurtDisiDayanak',
    'Yurt dışı aktarımın dayanağı yazılmamış',
    [
      `Site ${altyapi.barindirma} üzerinde duruyor ve form ${altyapi.epostaHizmeti} ile`,
      'gönderiliyor; randevu talebi bu sunuculardan geçiyor. Aydınlatma metni',
      'aktarımı bildiriyor, dayanağını bildirmiyor — KVKK m.9 dayanağı hukukçu',
      'tarafından yazılmalı ya da barındırma yurt içine taşınmalıdır.'
    ],
    { yayina: true, iz: 'yurtDisiDayanak:' }
  );
}

if (Array.isArray(klinik.sosyal) && klinik.sosyal.length === 0) {
  ekle(
    'uyari',
    'klinik.sosyal',
    'Sosyal hesap listesi boş',
    [
      'Altbilgideki düğme satırı çizilmez ve yapısal veriye sameAs yazılmaz.',
      'Kliniğin hesabı yoksa doğru durum budur; varsa eklenmelidir.'
    ],
    { yayina: true, iz: 'sosyal:' }
  );
}

/* --- Rapor ---------------------------------------------------------------- */

const renkli = !process.env.NO_COLOR;
const boya = (kod, metin) => (renkli ? `[${kod}m${metin}[0m` : metin);
const kirmizi = (m) => boya('31;1', m);
const sari = (m) => boya('33;1', m);
const yesil = (m) => boya('32;1', m);
const soluk = (m) => boya('2', m);

/* Demo kipinde yayına özel bulgular derlemeyi durdurmaz, hatırlatma olur. */
const durduran = bulgular.filter((x) => x.duzey === 'hata' && (yayinKipi || !x.yayina));
const yazilan = bulgular.filter((x) => !durduran.includes(x));

const kipNot = istek ? `KONTROL=${istek} ile zorlandı` : `site.demoModu: ${site.demoModu}`;
console.log(`\nYayın öncesi kontrol — ${yayinKipi ? 'yayın' : 'demo'} kipi ${soluk(`(${kipNot})`)}\n`);

function yaz(bulgu, zorunlu) {
  /* Aynı bulgu demoda "yayın öncesi kapatılacak", yayın kipinde "uyarı" okunur:
     ilkinde henüz sırası gelmemiştir, ikincisinde gelmiş ama derlemeyi kesmez. */
  const etiket = zorunlu ? kirmizi(' HATA ') : sari(bulgu.yayina && !yayinKipi ? ' YAYIN' : ' UYARI');
  const satir = satirBul(bulgu.iz);
  console.log(`${etiket}  ${bulgu.alan}  ${satir ? soluk(`site.config.ts:${satir}`) : ''}`);
  console.log(`        ${bulgu.baslik}`);
  for (const l of bulgu.aciklama) console.log(soluk(`        ${l}`));
  console.log('');
}

for (const x of durduran) yaz(x, true);
for (const x of yazilan) yaz(x, false);

if (durduran.length) {
  console.log(kirmizi(`${durduran.length} hata — derleme durduruldu.\n`));
  process.exit(1);
}

if (yazilan.length) {
  console.log(
    sari(
      yayinKipi
        ? `${yazilan.length} uyarı — derleme sürüyor.\n`
        : `${yazilan.length} madde yayın öncesi kapatılacak — demo derlemesi sürüyor.\n`
    )
  );
  if (!yayinKipi) console.log(soluk('Tam liste için: KONTROL=yayin npm run kontrol\n'));
} else {
  console.log(yesil('Temiz.\n'));
}
