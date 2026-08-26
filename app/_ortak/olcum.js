'use client';

/* Ziyaretçi ölçümü: sayfa görüntülemeleri ve dönüşüm sayılan üç tıklama.

   Sağlayıcı `site.config.ts` içindeki `olcum.saglayici` ile seçilir; 'yok'
   iken bu dosyadaki her şey sessizce devre dışı kalır. İki sağlayıcı da
   çerezsizdir, bu yüzden onay bandı gerekmez (bkz. yasal.config.ts).

   Kütüphane kullanılmaz: her iki sağlayıcının da tek satırlık bir yükleyici
   betiği ve `window` üzerinde bir kuyruğu vardır. Betik yüklenmeden önce
   gönderilen olaylar kuyruğa yazılır, betik yüklenince kuyruk boşaltılır —
   `olay()` bu yüzden kuyruğu kendisi kurabiliyor ve satır içi bir "shim"
   betiğine gerek kalmıyor. */

import * as React from 'react';
import Script from 'next/script';
import { olcum } from '@/site.config';

/* `h` burada temel.js'ten alınmaz: bu modülü kök layout da kullanıyor ve
   temel.js gömülü tedavi ikonlarını (yüzlerce KB) yanında getiriyor. */
var h = React.createElement;
var useEffect = React.useEffect;

var GELISTIRME = process.env.NODE_ENV !== 'production';

/* ------------------------------------------------------------------ */
/* Olay gönderimi                                                      */
/* ------------------------------------------------------------------ */

/** Ölçülen olayların adları. Panelde bu adlarla görünürler. */
export var OLAYLAR = {
  telefon: 'telefon',
  whatsapp: 'whatsapp',
  yolTarifi: 'yol-tarifi',
  randevu: 'randevu'
};

/** Bir dönüşüm olayını gönderir. `ozellikler` panelde olayın kırılımı olur
    (ör. `{ yer: 'mobil-cubuk' }` → telefonun nereden arandığı).

    Ölçüm hiçbir koşulda sayfayı bozmaz: sağlayıcı kapalıysa, betik
    engellendiyse veya bir hata çıkarsa sessizce geri döner. */
export function olay(ad, ozellikler) {
  if (typeof window === 'undefined') return;

  /* Geliştirmede betik yüklenmiyor; olayın tetiklendiği yine de görülsün. */
  if (GELISTIRME) {
    console.info('ölçüm:', ad, ozellikler || {});
    return;
  }

  try {
    if (olcum.saglayici === 'vercel') {
      if (typeof window.va !== 'function') {
        window.va = function () {
          (window.vaq = window.vaq || []).push(arguments);
        };
      }
      window.va('event', { name: ad, data: ozellikler });
      return;
    }

    if (olcum.saglayici === 'plausible') {
      if (typeof window.plausible !== 'function') {
        window.plausible = function () {
          (window.plausible.q = window.plausible.q || []).push(arguments);
        };
      }
      window.plausible(ad, { props: ozellikler });
    }
  } catch (hata) {
    /* yutulur */
  }
}

/* ------------------------------------------------------------------ */
/* Bağlantı tıklamaları                                                */
/* ------------------------------------------------------------------ */

/* Telefon, WhatsApp ve yol tarifi bağlantıları sitede on ayrı yerde geçiyor
   (gezinme, altbilgi, mobil çubuk, hero, randevu kartı, hata ekranları…).
   Her birine tek tek dinleyici asmak yerine tıklama belgeden yakalanır: yarın
   eklenen bir telefon bağlantısı da kendiliğinden sayılır. */
function olayAdi(adres) {
  if (adres.indexOf('tel:') === 0) return OLAYLAR.telefon;
  if (adres.indexOf('wa.me') !== -1 || adres.indexOf('whatsapp.com') !== -1) {
    return OLAYLAR.whatsapp;
  }
  if (adres.indexOf('google.com/maps') !== -1 || adres.indexOf('maps.apple.com') !== -1) {
    return OLAYLAR.yolTarifi;
  }
  return '';
}

function belgeyiDinle() {
  function tiklandi(ev) {
    var hedef = ev.target;
    if (!hedef || typeof hedef.closest !== 'function') return;
    var bag = hedef.closest('a[href]');
    if (!bag) return;

    var ad = olayAdi(bag.getAttribute('href') || '');
    if (!ad) return;

    /* `data-olcum-yer` bağlantının sayfadaki yerini söyler; verilmemişse
       olay yine sayılır, yalnız kırılımı olmaz. */
    olay(ad, { yer: bag.getAttribute('data-olcum-yer') || 'sayfa' });
  }

  /* Yakalama aşaması: araya giren bir bileşen olayı durdursa bile sayılır. */
  document.addEventListener('click', tiklandi, true);
  return function () { document.removeEventListener('click', tiklandi, true); };
}

/* ------------------------------------------------------------------ */
/* Yükleyici                                                           */
/* ------------------------------------------------------------------ */

function betikAdresi() {
  if (olcum.saglayici === 'vercel') return '/_vercel/insights/script.js';
  if (olcum.saglayici === 'plausible') {
    return olcum.betik || 'https://plausible.io/js/script.js';
  }
  return '';
}

/** Sağlayıcının betiğini sayfaya koyar ve bağlantı tıklamalarını dinler.
    `layout.tsx` içinde bir kez çağrılır; sayfa görüntülemelerini betiğin
    kendisi sayar (adres değişimleri dâhil). */
export function OlcumBetigi() {
  useEffect(belgeyiDinle, []);

  /* Geliştirmede yüklenmez: Vercel'in betiği yalnız yayındaki dağıtımda
     vardır, localhost'ta 404 döner. */
  if (GELISTIRME || olcum.saglayici === 'yok') return null;

  return h(Script, {
    src: betikAdresi(),
    strategy: 'afterInteractive',
    'data-domain': olcum.saglayici === 'plausible' ? olcum.alan : undefined
  });
}
