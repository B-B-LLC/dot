/* Tasarım sistemi paketini ES modülüne çevirir.
   Kaynak paket bileşenleri `window` üzerine yazan bir IIFE olarak dağıtılıyor.
   Burada paketin gövdesi, `window` yerine sahte bir nesne alan bir fonksiyona
   sarılır; böylece Next.js tarafında import edilebilir hale gelir.

   Paket güncellenirse: npm run gen:ds */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const kok = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PAKET = resolve(
  kok,
  '_ds/verdant-dental-design-system-954de0fa-109a-4f50-b8b1-f95e698d5e74'
);
const KAYNAK = resolve(PAKET, '_ds_bundle.js');
const HEDEF = resolve(kok, 'ds/bundle.js');

const BILESENLER = [
  'Badge', 'Button', 'Card', 'Icon', 'IconButton', 'Tag',
  'Dialog', 'Toast', 'Tooltip',
  'Checkbox', 'Field', 'Input', 'Radio', 'Select', 'Switch',
  'NavBar', 'Tabs'
];

const AD_ALANI = 'VerdantDentalDesignSystem_954de0';

/* Satır sonları LF'e çekilir. Paket Windows'ta CRLF ile açılıyor (git
   autocrlf) ama depoda LF duruyor; aşağıdaki yama çok satırlı parçalar
   aradığı için normalleştirilmeden Windows'ta tutmaz, Linux'ta tutardı. */
const ham = readFileSync(KAYNAK, 'utf8').replace(/\r\n/g, '\n');

/* --- NavBar yaması --------------------------------------------------------

   DS'in NavBar'ı her gezinme öğesini `<button>` olarak basar ve düğmeye adres
   vermenin yolu yoktur. Bunun iki bedeli var: sayfa haritasında o başlıklar
   bağlantı sayılmaz (bu yüzden /hekimler sitede hiçbir yerden bağlantı
   almıyordu) ve ziyaretçi başlığı Ctrl+tık ile yeni sekmede açamaz.

   Düğmenin içine `<a>` koymak çözüm değil: etkileşimli öğe içinde etkileşimli
   öğe geçersiz HTML'dir. Bileşenin kendisi de elle düzenlenemez, üretiliyor.
   Bu yüzden yama üretim anında, yalnız NavBar bölgesine uygulanır:

     - `adres` taşıyan bir kalem `<a href>` olarak basılır, taşımayan `<button>`
       olarak kalır (ana sayfada bölüme kaydıran başlıklar için doğru olan bu).
     - `onNavigate` artık olayı da alır; çağıran taraf kendi hallettiğinde
       `preventDefault` diyebilsin diye. Olay geçirilmezse eski davranış sürer.

   Yama paketin NavBar kaynağına bağlıdır. Paket güncellenip o dosya değişirse
   aşağıdaki özet tutmaz ve üretim hata vererek durur — yama sessizce
   uygulanmamış olmaz. Yeni sürümde bloğun hâlâ aynı olduğu doğrulanıp
   NAVBAR_OZETI güncellenir. */

const NAVBAR_OZETI = '2723a2189289';
const NAVBAR_YOLU = 'components/navigation/NavBar.jsx';

function navBarYamasi(kaynak) {
  const baslik = kaynak.match(/@ds-bundle:\s*(\{.*?\})\s*\*\//s);
  if (!baslik) throw new Error('gen:ds — paket başlığı okunamadı.');

  const ozet = JSON.parse(baslik[1]).sourceHashes?.[NAVBAR_YOLU];
  if (ozet !== NAVBAR_OZETI) {
    throw new Error(
      `gen:ds — ${NAVBAR_YOLU} değişmiş (${ozet ?? 'yok'}, beklenen ${NAVBAR_OZETI}).\n` +
        'NavBar bağlantı yaması bu sürüme göre yazılmıştı. Yeni sürümdeki\n' +
        'links.map bloğunu kontrol edip tools/gen-ds-module.mjs içindeki\n' +
        'NAVBAR_OZETI değerini güncelleyin.'
    );
  }

  /* Yama yalnız NavBar bölgesine uygulanır: aranan parçalar (height: 36 gibi)
     paketin başka bileşenlerinde de geçiyor. */
  const bas = kaynak.indexOf(`// ${NAVBAR_YOLU}`);
  const son = kaynak.indexOf('\n// components/', bas + 1);
  if (bas < 0 || son < 0) throw new Error('gen:ds — NavBar bölgesi bulunamadı.');

  let bolge = kaynak.slice(bas, son);

  const degisiklikler = [
    [
      'return /*#__PURE__*/React.createElement("button", {\n' +
        '      key: v,\n' +
        '      onClick: () => onNavigate && onNavigate(v),',
      'return /*#__PURE__*/React.createElement(l && l.adres ? "a" : "button", {\n' +
        '      key: v,\n' +
        '      href: l && l.adres ? l.adres : undefined,\n' +
        '      onClick: (ev) => onNavigate && onNavigate(v, ev),'
    ],
    [
      // <a> satır içi bir öğedir: yükseklik ve dikey ortalama ancak kutu
      // modeli verilince uygular. Düğmede de aynı sonucu verir.
      "        height: 36,\n        padding: '0 15px',",
      "        height: 36,\n        padding: '0 15px',\n" +
        "        display: 'inline-flex',\n        alignItems: 'center',\n" +
        "        textDecoration: 'none',"
    ]
  ];

  for (const [aranan, yeni] of degisiklikler) {
    const adet = bolge.split(aranan).length - 1;
    if (adet !== 1) {
      throw new Error(
        `gen:ds — NavBar yaması tutmadı: aranan parça ${adet} kez bulundu.\n` +
          aranan.split('\n')[0]
      );
    }
    bolge = bolge.replace(aranan, yeni);
  }

  return kaynak.slice(0, bas) + bolge + kaynak.slice(son);
}

const govde = navBarYamasi(ham);

// Paket `Object.assign(window, {...})` ile birkaç örnek ekran da yayınlıyor.
// Sahte window nesnesi bunları sessizce yutar; dışa aktarılmazlar.
const cikti = `'use client';
/* ÜRETİLMİŞ DOSYA — elle düzenlemeyin. Kaynak: _ds_bundle.js
   Yeniden üretmek için: npm run gen:ds */

import * as React from 'react';

/* Icon bileşeni ikonları window.lucide.createIcons ile çiziyor ve ikon kümesini
   kendisi geçmiyor — tarayıcı sürümünde küme pakete gömülü olduğu için. npm
   paketinde küme ayrı geldiğinden burada tamamlanıyor.

   Küme ~400 KB. Sayfada Icon kullanılmazsa hiç indirilmemesi için erişim anında
   yükleniyor: Icon, window.lucide dolana kadar 120 ms'de bir yeniden deniyor. */
let __lucide;
let __lucideIstendi = false;

const __ds_window = {
  ${AD_ALANI}: {},
  get lucide() {
    if (__lucide) return __lucide;
    if (!__lucideIstendi) {
      __lucideIstendi = true;
      import('lucide').then(({ createIcons, icons }) => {
        __lucide = { createIcons: (secenekler) => createIcons({ icons, ...secenekler }) };
      });
    }
    return undefined;
  }
};

(function (window) {
${govde}
})(__ds_window);

const __ns = __ds_window.${AD_ALANI};

const __eksik = [${BILESENLER.map((b) => `'${b}'`).join(', ')}].filter((ad) => !__ns[ad]);
if (__eksik.length) {
  throw new Error('Tasarım sisteminden gelmeyen bileşenler: ' + __eksik.join(', '));
}

${BILESENLER.map((b) => `export const ${b} = __ns.${b};`).join('\n')}
`;

mkdirSync(dirname(HEDEF), { recursive: true });
writeFileSync(HEDEF, cikti, 'utf8');

/* Token dosyaları olduğu gibi taşınır. Tek istisna fonts.css: paket fontları
   Google'dan @import ile çekiyor, biz next/font ile kendi sunucumuzdan
   verdiğimiz için içeriği boşaltılır. */
mkdirSync(resolve(kok, 'ds/tokens'), { recursive: true });

for (const ad of readdirSync(resolve(PAKET, 'tokens'))) {
  const icerik =
    ad === 'fonts.css'
      ? '/* Fontlar next/font ile yerelden veriliyor — bkz. app/layout.tsx.\n' +
        '   Paketin Google Fonts @import satırı bilerek çıkarıldı. */\n'
      : readFileSync(resolve(PAKET, 'tokens', ad), 'utf8');
  writeFileSync(resolve(kok, 'ds/tokens', ad), icerik, 'utf8');
}

writeFileSync(
  resolve(kok, 'ds/styles.css'),
  readFileSync(resolve(PAKET, 'styles.css'), 'utf8'),
  'utf8'
);

console.log(
  `ds/bundle.js üretildi — ${BILESENLER.length} bileşen, ${(cikti.length / 1024).toFixed(0)} KB`
);
console.log('ds/styles.css ve ds/tokens/ kopyalandı (fonts.css hariç tutuldu)');
