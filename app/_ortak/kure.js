'use client';

/* Hero fotoğrafının sağ üstünde duran, içinde marka renkleri dönen krem
   baloncuk. Daha önce burada düz degradeli bir blob vardı; gövdesi (krem cam,
   gölge, blob yuvarlaklığı) aynı kaldı, içine dönen konik degradeler eklendi.

   Süsleme olduğu için `aria-hidden`: ekran okuyucuya anlatacak bir şeyi yok.

   Renkler token'dan gelir ve dışarıdan değiştirilebilir; varsayılanı markanın
   zümrüt + kehribar ikilisidir. Görünümün geri kalanı globals.css'teki
   `.kure` kurallarındadır — konik degrade ve keyframe satır içiyle yazılamaz. */

import * as React from 'react';

import { h } from './temel';

var useEffect = React.useEffect;
var useRef = React.useRef;

/* Keyframe bir tur değil on tur döner (globals.css'teki `kure-don`), çünkü
   degradelerin kesirli katsayıları ancak on turda hep birlikte tam tur eder —
   tek turda sarsaydı hepsi birden sıfıra sıçrardı. Süre de aynı oranda uzar,
   böylece `sure` prop'u yine "temel katmanın bir turu kaç saniye" demektir. */
var DONGU_TURU = 10;

var VARSAYILAN_RENKLER = {
  c1: 'var(--emerald-500)',
  c2: 'var(--amber-400)',
  c3: 'var(--emerald-300)'
};

/* Bulanıklık ve kontrast küre büyüdükçe artar: aynı degradeler 96 px'te
   yumuşak bir sedef, 300 px'te dağılmış bir leke olurdu. Katsayılar kaynak
   bileşenden geliyor, alt sınır küçük ölçülerde degradenin kenarının
   kesilmemesi içindir. */
function bulaniklik(olcu) { return Math.max(olcu * 0.08, 8); }
function kontrast(olcu) { return Math.max(olcu * 0.003, 1.8); }

export default function Kure(props) {
  var olcu = props.olcu || 96;
  var sure = props.sure || 20;
  var renkler = Object.assign({}, VARSAYILAN_RENKLER, props.renkler);
  var kutu = useRef(null);

  /* Küre sürekli döner ve her karede konik degradeler yeniden boyanır — bu
     iş derleyiciye devredilemez, telefonda pil yakar. Çarkta olduğu gibi
     yalnız ekrandayken çalışsın diye kutu ekrandan çıkınca durdurulur.
     Sekme arkaya alındığında tarayıcı canlandırmayı zaten dondurur. */
  useEffect(function () {
    var dugum = kutu.current;
    if (!dugum || typeof IntersectionObserver === 'undefined') return;

    var gozcu = new IntersectionObserver(function (kayitlar) {
      dugum.classList.toggle('kure--durgun', !kayitlar[0].isIntersecting);
    });
    gozcu.observe(dugum);
    return function () { gozcu.disconnect(); };
  }, []);

  return h('div', {
    ref: kutu,
    'aria-hidden': 'true',
    className: 'kure' + (props.sinif ? ' ' + props.sinif : ''),
    style: Object.assign({
      width: olcu,
      height: olcu,
      '--kure-c1': renkler.c1,
      '--kure-c2': renkler.c2,
      '--kure-c3': renkler.c3,
      '--kure-sure': sure * DONGU_TURU + 's',
      '--kure-bulanik': bulaniklik(olcu) + 'px',
      '--kure-kontrast': kontrast(olcu)
    }, props.stil)
  });
}
