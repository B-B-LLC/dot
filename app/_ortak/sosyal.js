'use client';

/* Altbilgideki sosyal medya düğmeleri.

   Liste `site.config.ts` içindeki `klinik.sosyal` alanından gelir — yapısal
   veriye `sameAs` olarak yazılan dizinin aynısı. Böylece hesap tek yere
   yazılır: arama motoru da görür, ziyaretçi de. Dizi Google işletme kaydı
   gibi sosyal medya olmayan adresler de taşıyabildiği için tanınmayan adres
   sessizce atlanır; `sameAs` tarafında yine durur. */

import * as React from 'react';
import { klinik as KLINIK } from '@/site.config';

/* `h` temel.js'ten alınmaz: bu dosya yalnız üç düğüm çiziyor, temel.js ise
   gömülü tedavi ikonlarını yanında getiriyor. */
var h = React.createElement;

/* Çizgi ikonlar sitenin geri kalanıyla aynı ölçüde (19 px, 1.75 kalınlık).
   X'in markası dolu bir harf olduğu için tek istisna odur ve optik ağırlığı
   diğer ikisine eşitlensin diye daha küçük çizilir. */
function cizgi(cocuklar) {
  return h('svg', {
    width: 19, height: 19, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true'
  }, cocuklar);
}

function dolu(yol, boy) {
  return h('svg', {
    width: boy, height: boy, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true'
  }, h('path', { d: yol }));
}

/* `parcalar` adresin içinde aranır; hem eski hem yeni alan adı yazılabilir
   (x.com ile twitter.com aynı hesaptır). */
var AGLAR = [
  {
    anahtar: 'instagram',
    ad: 'Instagram',
    parcalar: ['instagram.com'],
    cizim: function () {
      return cizgi([
        h('rect', { key: 'r', x: 2, y: 2, width: 20, height: 20, rx: 5.5 }),
        h('path', { key: 'p', d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z' }),
        h('path', { key: 'n', d: 'M17.5 6.5h.01' })
      ]);
    }
  },
  {
    anahtar: 'x',
    ad: 'X',
    parcalar: ['x.com', 'twitter.com'],
    cizim: function () {
      return dolu(
        'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68' +
        'l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z',
        16
      );
    }
  },
  {
    anahtar: 'facebook',
    ad: 'Facebook',
    parcalar: ['facebook.com', 'fb.com'],
    cizim: function () {
      return cizgi(
        h('path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z' })
      );
    }
  }
];

/** Adres listesini tanınan ağlarla eşler; tanınmayanı düşürür. Sıra
    `AGLAR`dan gelir, config'teki yazım sırasından değil — böylece klinik
    hesaplarını hangi sırayla yazarsa yazsın düğmeler aynı yerde durur. */
export function sosyalHesaplar(adresler) {
  var liste = adresler || [];
  return AGLAR.map(function (ag) {
    var adres = liste.find(function (a) {
      return ag.parcalar.some(function (parca) { return a.indexOf(parca) !== -1; });
    });
    return adres ? { ag: ag, adres: adres } : null;
  }).filter(Boolean);
}

/** Tek düz satır hâlinde sosyal medya düğmeleri. Hesap yazılmamışsa hiç
    basılmaz — boş bir satır bırakmaz. */
export default function SosyalSatir(props) {
  var hesaplar = sosyalHesaplar(KLINIK.sosyal);
  if (hesaplar.length === 0) return null;

  return h('div', {
    className: 'sosyal-satir',
    style: props && props.stil
  },
    hesaplar.map(function (hesap) {
      return h('a', {
        key: hesap.ag.anahtar,
        className: 'sosyal-dugme',
        href: hesap.adres,
        target: '_blank',
        /* `me`: bu adresin aynı kliniğe ait olduğunu söyler, sameAs'in
           bağlantı üzerindeki karşılığıdır. */
        rel: 'noopener me',
        'aria-label': hesap.ag.ad + ' hesabımız'
      }, hesap.ag.cizim());
    })
  );
}
