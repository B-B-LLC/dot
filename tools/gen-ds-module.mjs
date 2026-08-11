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

const govde = readFileSync(KAYNAK, 'utf8');

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
