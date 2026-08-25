'use client';

/* Sayfalar arasında paylaşılan stiller, yardımcılar ve görünüm sabitleri.
   İçerik burada tutulmaz; metinler site.config.ts'ten gelir. */

import * as React from 'react';
import Image from 'next/image';
import { saatler as SAATLER } from '@/site.config';
import { TEDAVI_IKONLARI } from './tedavi-ikonlari';

var h = React.createElement;
var useState = React.useState;
var useEffect = React.useEffect;

  /* ------------------------------------------------------------------ */
  /* Görünüme ait sabitler (içerik site.config.ts'te)                    */
  /* ------------------------------------------------------------------ */

  /* Gezinme başlıkları. `id` ana sayfadaki bölüme, `adres` ayrı sayfaya karşılık
     gelir: ana sayfadayken kaydırılır, başka sayfadayken adrese gidilir. */
  var BOLUMLER = [
    { id: 'tedaviler', etiket: 'Tedaviler', adres: '/#tedaviler' },
    { id: 'klinik', etiket: 'Klinik', adres: '/#klinik' },
    { id: 'hekimler', etiket: 'Hekimler', adres: '/hekimler' },
    { id: 'bilgi', etiket: 'Bilgi', adres: '/#bilgi' },
    { id: 'ulasim', etiket: 'Ulaşım', adres: '/iletisim' }
  ];

  /* Tedavi kartlarındaki simgeler — tasarım dosyasındaki yolların birebir aynısı. */
  function simge(yollar) {
    return h('svg', {
      width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true'
    }, yollar.map(function (d, i) { return h('path', { key: i, d: d }); }));
  }

  /* Klinik kendi ikon görsellerini verdiyse çizgi simge yerine o kullanılır.
     Kart metni dalın adını zaten yazdığı için görsel süsleyicidir: alt boş
     bırakılır ve ekran okuyucudan saklanır. */
  function ikonGorseli(kaynak) {
    return h('img', {
      src: kaynak, alt: '', 'aria-hidden': 'true', width: 26, height: 26,
      style: { width: 26, height: 26, borderRadius: 7, objectFit: 'cover', display: 'block' }
    });
  }

  /* site.config.ts'teki tedavi id'sine göre seçilir. */
  var TEDAVI_SIMGE_YOLLARI = {
    implantoloji: ['M7.6 6.2c0-2.1 1.7-3.4 3.4-2.7 1.3.5 2.7.5 4 0 1.7-.7 3.4.6 3.4 2.7 0 1.9-.5 3.4-1.3 4.6', 'M12.6 12.4v8', 'M10.3 14.6h4.6', 'M10.7 17.2h3.8', 'M3.4 12.6h5.2'],
    endodonti: ['M6.2 6.6c0-2.2 1.8-3.6 3.6-2.9 1.4.5 3 .5 4.4 0 1.8-.7 3.6.7 3.6 2.9 0 2.6-.6 5-1.6 7.3-.5 1.1-.9 2.3-1.1 3.5l-.4 2.3c-.2 1.2-1.9 1.2-2.1 0l-.6-3.4c-.1-.8-1.3-.8-1.4 0l-.6 3.4c-.2 1.2-1.9 1.2-2.1 0l-.4-2.3c-.2-1.2-.6-2.4-1.1-3.5-1-2.3-1.6-4.7-1.6-7.3Z', 'M10.4 9.4v4.4', 'M13.6 9.4v4.4'],
    pedodonti: ['M3.4 8.4c0-1.8 1.4-2.9 2.9-2.3 1.1.4 2.4.4 3.5 0 1.4-.6 2.9.5 2.9 2.3 0 2.1-.5 4-1.3 5.9-.4.9-.7 1.8-.9 2.8l-.3 1.8c-.2 1-1.5 1-1.7 0l-.5-2.7c-.1-.6-1-.6-1.1 0l-.5 2.7c-.2 1-1.5 1-1.7 0l-.3-1.8c-.2-1-.5-1.9-.9-2.8-.8-1.9-1.3-3.8-1.3-5.9Z', 'M16.6 5.4h4.2', 'M18.7 3.3v4.2', 'M15.6 12.4c1.6 1.2 3.2 1.2 4.8 0'],
    periodontoloji: ['M7 4.6c0-1.9 1.6-3.1 3.1-2.5 1.2.5 2.6.5 3.8 0 1.5-.6 3.1.6 3.1 2.5 0 2-.5 3.9-1.4 5.7', 'M8.4 10.3c-.4-.8-.8-1.7-1-2.6', 'M2.6 15.4c1.6-1.6 3.2-1.6 4.8 0s3.2 1.6 4.8 0 3.2-1.6 4.8 0 3.2 1.6 4.4.2', 'M12 12.6v3'],
    restoratif: ['M6.2 6.6c0-2.2 1.8-3.6 3.6-2.9 1.4.5 3 .5 4.4 0 1.8-.7 3.6.7 3.6 2.9 0 2.6-.6 5-1.6 7.3-.5 1.1-.9 2.3-1.1 3.5l-.4 2.3c-.2 1.2-1.9 1.2-2.1 0l-.6-3.4c-.1-.8-1.3-.8-1.4 0l-.6 3.4c-.2 1.2-1.9 1.2-2.1 0l-.4-2.3c-.2-1.2-.6-2.4-1.1-3.5-1-2.3-1.6-4.7-1.6-7.3Z', 'M8.4 8.2h4.4v3.6H9.2']
  };

  /* Ortodonti simgesi path dışında öğeler de içerir. */
  function ortodontiSimgesi() {
    return h('svg', {
      width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true'
    },
      h('path', { d: 'M2.8 13.6c6-2.6 12.4-2.6 18.4 0' }),
      h('rect', { x: 9.6, y: 9.4, width: 5, height: 5, rx: 1.4 }),
      h('path', { d: 'M5.4 10.6v2.2' }),
      h('path', { d: 'M18.6 10.6v2.2' }),
      h('path', { d: 'M8 18.4c2.6 1.4 5.4 1.4 8 0' })
    );
  }

  function tedaviSimgesi(id) {
    if (TEDAVI_IKONLARI[id]) return ikonGorseli(TEDAVI_IKONLARI[id]);
    return id === 'ortodonti' ? ortodontiSimgesi() : simge(TEDAVI_SIMGE_YOLLARI[id]);
  }

  var MEKANLAR = [
    { anahtar: 'bekleme', etiket: 'BEKLEME ALANI', genislik: '52%', oran: '1.2/1', yuvarlak: 'var(--radius-blob)' },
    { anahtar: 'muayene', etiket: 'MUAYENE ODASI', genislik: '46%', oran: '1/1.3', yuvarlak: '999px' },
    { anahtar: 'cocuk', etiket: 'ÇOCUK BÖLÜMÜ', genislik: '58%', oran: '1.4/1', yuvarlak: 'var(--radius-blob)' }
  ];

  /* ------------------------------------------------------------------ */
  /* Fotoğraflar                                                         */
  /* ------------------------------------------------------------------ */

  /* Kartın kapağını dolduran fotoğraf. site.config.ts'te yol yazılmamışsa null
     döner; çağıran yer o zaman kendi çizim yer tutucusunu gösterir.

     Fotoğrafın en-boy oranı kart oranıyla tutmadığında görsel esnetilmez,
     ortadan kırpılır (objectFit: cover). Portrelerde yüz karenin üst yarısında
     kaldığı için kırpma merkezi yukarı çekilebilir — konum bunun içindir. */
  function KapakGorseli(yol, alt, secenek) {
    if (!yol) return null;
    var s = secenek || {};
    /* next/image kullanılıyor: kaynak dosyalar birkaç megabayt, kartlar ise
       birkaç yüz piksel. Bu bileşen görseli istenen ölçüde ve WebP/AVIF olarak
       yeniden üretip önbelleğe alır, böylece ziyaretçiye kırpılmış hâli iner.
       olcu alanı, tarayıcıya hangi genişliği indireceğini söyler; yanlış verilirse
       gereğinden büyük dosya seçilir. */
    return h(Image, {
      src: yol,
      alt: alt || '',
      fill: true,
      sizes: s.olcu || '100vw',
      priority: !!s.oncelikli,
      draggable: false,
      style: { objectFit: 'cover', objectPosition: s.konum || 'center' }
    });
  }

  /* Fotoğrafın alt kenarına inen koyulaştırma. Üzerine gelen etiket yazısının
     açık renkli bir fotoğrafta da okunmasını sağlar. */
  function YaziPerdesi() {
    return h('div', {
      'aria-hidden': 'true',
      style: {
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top,rgba(24,18,10,.68) 0%,rgba(24,18,10,.22) 38%,rgba(24,18,10,0) 66%)'
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Ortak stiller                                                       */
  /* ------------------------------------------------------------------ */

  var S = {
    bolum: {
      maxWidth: 1180,
      margin: '0 auto',
      padding: 'clamp(64px,9vw,110px) clamp(20px,5vw,40px) 0'
    },
    baslikSatiri: { display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 },
    numara: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'var(--emerald-600)' },
    kas: { fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: 'var(--text-faint)' },
    cizgi: { flex: 1, height: 1, background: 'var(--line-hairline)' },
    h2: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(26px,3.6vw,40px)',
      lineHeight: 1.12,
      letterSpacing: '-.028em',
      fontWeight: 700,
      color: 'var(--text-strong)',
      margin: 0,
      maxWidth: '22ch'
    },
    h3: {
      fontFamily: 'var(--font-display)',
      fontSize: 19,
      letterSpacing: '-.012em',
      color: 'var(--text-strong)',
      margin: 0
    },
    kartMetin: { fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: '8px 0 0' },
    dipnot: { fontSize: 13, lineHeight: 1.6, color: 'var(--text-faint)', margin: '16px 0 0', maxWidth: '78ch' },
    izgara: function (min) {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(' + min + 'px,1fr))',
        gap: 20
      };
    },
    ayirici: { height: 1, background: 'var(--line-hairline)' },
    blob: {
      background: 'linear-gradient(150deg,#fff 0%,var(--sand-150) 100%)',
      boxShadow: 'inset -8px -10px 24px rgba(58,45,32,.07),inset 8px 10px 24px #fff'
    }
  };

  function BolumBasligi(props) {
    return h('div', null,
      h('div', { style: S.baslikSatiri },
        h('span', { style: S.numara }, props.numara),
        h('span', { style: S.kas }, props.kas),
        h('span', { style: S.cizgi })
      ),
      h('h2', { style: Object.assign({}, S.h2, props.baslikStil) }, props.baslik),
      props.giris
        ? h('p', {
            style: { fontSize: 16, lineHeight: 1.62, color: 'var(--text-muted)', margin: '14px 0 0', maxWidth: '56ch' }
          }, props.giris)
        : null
    );
  }

  /* ------------------------------------------------------------------ */
  /* Yardımcılar                                                         */
  /* ------------------------------------------------------------------ */

  function iki(n) { return n < 10 ? '0' + n : '' + n; }

  function dakika(s) { return parseInt(s.slice(0, 2), 10) * 60 + parseInt(s.slice(3), 10); }

  function gununKurali(gun) {
    return SAATLER.find(function (s) { return s.gunler.indexOf(gun) > -1; });
  }

  /** Verilen ana göre danışmanın açık/kapalı durumunu ve bir sonraki açılışı döndürür. */
  function durum(now) {
    var adlar = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    var g = now.getDay();
    var dk = now.getHours() * 60 + now.getMinutes();
    var bugun = gununKurali(g);

    if (bugun && !bugun.kapali && dk >= dakika(bugun.ac) && dk < dakika(bugun.kap)) {
      return { acik: true, baslik: 'Danışma şu anda açık', alt: bugun.kap + '’a kadar hasta kabul ediliyor' };
    }
    if (bugun && !bugun.kapali && dk < dakika(bugun.ac)) {
      return { acik: false, baslik: 'Danışma şu anda kapalı', alt: 'Bugün ' + bugun.ac + '’da açılıyor' };
    }
    for (var i = 1; i <= 7; i++) {
      var d = (g + i) % 7;
      var k = gununKurali(d);
      if (k && !k.kapali) {
        return { acik: false, baslik: 'Danışma şu anda kapalı', alt: adlar[d] + ' ' + k.ac + '’da açılıyor' };
      }
    }
    return { acik: false, baslik: 'Danışma şu anda kapalı', alt: '' };
  }

  /** Haftalık şerit: bugün koyu, açık günler yeşil, kapalı günler kum rengi. */
  function hafta(now) {
    var kisa = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    var sira = [1, 2, 3, 4, 5, 6, 0];
    var bugun = now.getDay();
    return sira.map(function (d, i) {
      var k = gununKurali(d);
      var kapali = !k || k.kapali;
      return {
        kisa: kisa[i],
        renk: d === bugun
          ? (kapali ? 'var(--sand-300)' : 'var(--emerald-600)')
          : (kapali ? 'var(--sand-200)' : 'var(--emerald-200)')
      };
    });
  }

  var CALISMA_SAATLERI = SAATLER.map(function (s) {
    return { ad: s.ad, saat: s.kapali ? 'Kapalı' : s.ac + ' – ' + s.kap };
  });

  function bolumeGit(id) {
    var n = document.getElementById(id);
    if (!n) return;
    window.scrollTo({
      top: n.getBoundingClientRect().top + window.scrollY - 96,
      behavior: 'smooth'
    });
  }

  var DAR_ESIK = 860;

  /** Pencere verilen eşikten darsa true döner; eşik verilmezse 860 px kullanılır
      (mobil eylem çubuğu ve sadeleşen NavBar bunu kullanır). Kendi eşiği olan
      parçalar sayı geçirir: saat kartı iki sütunu 560 px altında alt alta alır.
      Genişliği ResizeObserver ile izler — pencere `resize` olayı üretmeden boyut
      değiştiren gömülü çerçevelerde de doğru sonuç verir. */
  function useDar(esik) {
    var sinir = esik || DAR_ESIK;

    /* Sunucuda pencere genişliği bilinmez; aşağıdaki effect mount anında düzeltir. */
    var pair = useState(false);
    var dar = pair[0], setDar = pair[1];

    useEffect(function () {
      var uygula = function () { setDar(document.documentElement.clientWidth < sinir); };
      uygula();

      var gozlemci = new ResizeObserver(uygula);
      gozlemci.observe(document.documentElement);
      window.addEventListener('orientationchange', uygula);

      return function () {
        gozlemci.disconnect();
        window.removeEventListener('orientationchange', uygula);
      };
    }, [sinir]);

    return dar;
  }

export {
  h,
  BOLUMLER,
  MEKANLAR,
  KapakGorseli,
  YaziPerdesi,
  tedaviSimgesi,
  S,
  BolumBasligi,
  iki,
  dakika,
  gununKurali,
  durum,
  hafta,
  CALISMA_SAATLERI,
  bolumeGit,
  DAR_ESIK,
  useDar
};
