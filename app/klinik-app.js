'use client';

/* Ana sayfa bölümleri. Çerçeve app/_ortak/cerceve.js'te,
   ortak stil ve yardımcılar app/_ortak/temel.js'te. */

import * as React from 'react';
import { Card, Button, Field, Input, Checkbox } from '@/ds/bundle';
import {
  klinik as KLINIK,
  haritaYolTarifi,
  haritaYolTarifiApple,
  haritaGomme,
  dalSayisiYaziyla,
  hekimler as HEKIMLER,
  gorseller as GORSELLER,
  tedaviler as TEDAVILER,
  sorular as SORULAR,
  sterilizasyon as STERILIZASYON,
  koruyucuBilgiler as KORUYUCU_BILGILER,
  ulasimNotlari as ULASIM_NOTLARI
} from '@/site.config';
import SayfaCercevesi from './_ortak/cerceve';
import {
  h, BOLUMLER, MEKANLAR, KapakGorseli, YaziPerdesi, tedaviSimgesi, S, BolumBasligi,
  iki, durum, hafta, CALISMA_SAATLERI, bolumeGit, useDar
} from './_ortak/temel';

var Fragment = React.Fragment;
var useState = React.useState;
var useEffect = React.useEffect;
var useRef = React.useRef;
var useCallback = React.useCallback;

  /* ------------------------------------------------------------------ */
  /* Hero + canlı saat kartı                                             */
  /* ------------------------------------------------------------------ */

  function SaatKarti() {
    var pair = useState(function () { return new Date(); });
    var now = pair[0], setNow = pair[1];

    useEffect(function () {
      var t = setInterval(function () { setNow(new Date()); }, 15000);
      return function () { clearInterval(t); };
    }, []);

    var d = durum(now);
    var gunler = hafta(now);

    /* Saat + durum yazısı ile yedi günlük şerit yan yana ~430 px ister; telefonda
       bu genişlik yok, şerit taşıyor ve durum yazısı üç satıra kırılıyordu. Dar
       ekranda yazı bloğu sola üste, şerit ortalanmış olarak altına alınıyor. */
    var dar = useDar(560);

    return h('div', { style: { position: 'relative', margin: '-46px 20px 0', zIndex: 3 } },
      h('div', {
        style: {
          borderRadius: 28,
          padding: '20px 22px 18px',
          background: 'rgba(255,255,255,.72)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: '1px solid rgba(255,255,255,.9)',
          boxShadow: 'var(--shadow-3),var(--inner-glass)'
        }
      },
        h('div', {
          style: dar
            ? { display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 16 }
            : { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }
        },
          h('div', null,
            h('time', {
              dateTime: iki(now.getHours()) + ':' + iki(now.getMinutes()),
              style: {
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: 38,
                fontWeight: 500,
                letterSpacing: '-.03em',
                color: 'var(--text-strong)',
                lineHeight: 1
              }
            }, iki(now.getHours()) + ':' + iki(now.getMinutes())),
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 7, marginTop: 9 } },
              h('span', {
                style: d.acik
                  ? { width: 7, height: 7, borderRadius: '50%', background: 'var(--emerald-500)', boxShadow: '0 0 0 4px rgba(22,148,106,.16)' }
                  : { width: 7, height: 7, borderRadius: '50%', background: 'var(--sand-300)' }
              }),
              h('span', { style: { fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' } }, d.baslik)
            ),
            d.alt ? h('div', { style: { fontSize: 12.5, color: 'var(--text-muted)', marginTop: 3 } }, d.alt) : null
          ),
          h('div', {
            style: dar
              ? { display: 'flex', gap: 5, justifyContent: 'center' }
              : { display: 'flex', gap: 5 },
            'aria-hidden': 'true'
          },
            gunler.map(function (g) {
              return h('div', {
                key: g.kisa,
                style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 26 }
              },
                h('span', { style: { fontSize: 10.5, fontWeight: 600, color: 'var(--text-faint)', letterSpacing: '.02em' } }, g.kisa),
                h('span', { style: { width: 8, height: 26, borderRadius: 999, background: g.renk } })
              );
            })
          )
        )
      )
    );
  }

  function Hero() {
    return h('section', {
      id: 'hero',
      style: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: 'clamp(40px,7vw,86px) clamp(20px,5vw,40px) 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
        gap: 'clamp(28px,4vw,52px)',
        alignItems: 'center'
      }
    },
      h('div', null,
        h('div', {
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 9,
            height: 28,
            padding: '0 14px 0 11px',
            borderRadius: 999,
            background: 'var(--emerald-100)',
            color: 'var(--emerald-700)',
            border: '1px solid var(--emerald-200)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '.12em',
            marginBottom: 24
          }
        },
          h('span', { style: { width: 6, height: 6, borderRadius: '50%', background: 'currentColor' } }),
          'ÖZEL POLİKLİNİK'
        ),
        h('h1', {
          style: {
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px,5.6vw,66px)',
            lineHeight: 1.04,
            letterSpacing: '-.035em',
            fontWeight: 800,
            color: 'var(--text-strong)',
            margin: 0,
            textWrap: 'balance'
          }
        }, KLINIK.tanitim),
        h('p', {
          style: {
            fontSize: 'clamp(16px,1.4vw,18px)',
            lineHeight: 1.62,
            color: 'var(--text-muted)',
            margin: '22px 0 0',
            maxWidth: '46ch',
            textWrap: 'pretty'
          }
        /* Dal sayısı cümlesi listeden üretilir; config'te tedavi eklenip
           çıkarıldığında metinle sayı birbirini tutmaya devam eder. */
        }, KLINIK.tanitimAlt + ' ' + dalSayisiYaziyla(TEDAVILER.length).replace(/^./, function (c) {
          return c.toLocaleUpperCase('tr');
        }) + ' dalda hasta kabul ediliyor.'),
        h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 34 } },
          h(Button, { size: 'lg', onClick: function () { bolumeGit('randevu'); } }, 'Randevu talebi'),
          h(Button, {
            size: 'lg', variant: 'cream', as: 'a',
            href: haritaYolTarifi(), target: '_blank', rel: 'noopener'
          }, 'Yol tarifi')
        ),
        h('div', {
          style: { display: 'flex', flexWrap: 'wrap', gap: '10px 28px', marginTop: 30, fontSize: 14, color: 'var(--text-muted)' }
        },
          h('span', null, KLINIK.adresKisa),
          h('a', {
            href: KLINIK.telHref,
            style: { fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '-.01em' }
          }, KLINIK.telefon)
        )
      ),

      h('div', { style: { position: 'relative' } },
        h('div', {
          'aria-hidden': 'true',
          style: {
            position: 'absolute', right: -18, top: -26, width: 96, height: 96,
            borderRadius: 'var(--radius-blob)',
            background: 'linear-gradient(150deg,#fff 0%,var(--sand-150) 100%)',
            boxShadow: 'var(--shadow-3),inset -6px -8px 20px rgba(58,45,32,.07),inset 6px 8px 20px #fff',
            zIndex: 2
          }
        }),
        h(Card, { tone: 'emerald', padding: 'none' },
          h('div', {
            style: { position: 'relative', height: 380, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }
          },
            /* Fotoğraf konulduğunda kartın tamamını kaplar ve "fotoğraf alanı"
               notu kalkar; konulmadığında tasarımın çizim yer tutucusu durur.
               Sayfanın en üstündeki görsel olduğu için gecikmeli yüklenmez. */
            GORSELLER.hero.yol
              ? h(Fragment, null,
                  KapakGorseli(GORSELLER.hero.yol, GORSELLER.hero.alt, {
                    oncelikli: true,
                    /* Kart 380 px yüksekliğinde ve fotoğraflar yatay; kırpma
                       yükseklikten hesaplandığı için kutu genişliğinin
                       (~520 px) değil, ~700 px'in indirilmesi gerekiyor. */
                    olcu: '(max-width: 760px) 190vw, 760px'
                  }),
                  /* Kartın alt kenarına binen saat kartı, açık renkli bir
                     fotoğrafın üzerinde perdesiz okunmuyor. */
                  YaziPerdesi()
                )
              : h(Fragment, null,
                  h('div', {
                    'aria-hidden': 'true',
                    style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }
                  },
                    h('div', {
                      style: {
                        width: '56%', aspectRatio: '1/1.05', borderRadius: 'var(--radius-blob)',
                        background: 'linear-gradient(155deg,rgba(255,255,255,.22) 0%,rgba(255,255,255,.05) 100%)',
                        border: '1px solid rgba(255,255,255,.18)'
                      }
                    })
                  ),
                  h('div', { style: { position: 'relative', padding: '28px 28px 78px' } },
                    h('div', { style: { fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: 'var(--emerald-300)' } }, 'FOTOĞRAF ALANI'),
                    h('p', {
                      style: { color: 'var(--text-on-dark-muted)', fontSize: 14, lineHeight: 1.55, margin: '8px 0 0', maxWidth: '34ch' }
                    }, 'Kliniğin kendi çekilmiş bekleme alanı fotoğrafı bu kartın tamamını kaplayacak.')
                  )
                )
          )
        ),
        h(SaatKarti)
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* 01 — Tedaviler                                                      */
  /* ------------------------------------------------------------------ */

  /* Tedavi kartları bir halkanın çevresine dizilir: her kart kendi açısına
     döndürülüp yarıçap kadar öne itilir, dönüş ise tek bir transform ile
     halkaya uygulanır. Telefonda ucuz olmasının sebebi bu — dönerken tarayıcı
     altı kartı ayrı ayrı değil tek katmanı taşır, düzen (layout) yeniden
     hesaplanmaz. Ölçüler de CSS'ten gelir, JS ölçüm yapmaz.

     Halkayı üç şey çevirir ve üçü tek bir hedef açıda toplanır:
       • sayfa kaydırma — bölüm ekrandan geçerken halka CARK_KAYDIRMA_ACI kadar
         döner, kaydırmaya bağlı asıl etki budur;
       • boştaki sürüklenme — kimse dokunmazken çok yavaş dönmeye devam eder;
       • kullanıcı — parmakla sürükleme, oklar, noktalar.
     Çizilen açı hedefe yumuşayarak yaklaşır; akıcılık buradan gelir.

     Kare döngüsü React durumuna dokunmaz: transform ve saydamlıklar doğrudan
     DOM'a yazılır, yalnızca öndeki kart değiştiğinde (noktaları güncellemek
     için) bir kez setState çağrılır. Döngü de ancak bölüm ekrandayken, sekme
     öndeyken ve `prefers-reduced-motion` kapalıyken çalışır. */

  var CARK_KART_G = 'clamp(232px,74vw,320px)';                /* kart genişliği */
  var CARK_KART_Y = 'clamp(268px,84vw,296px)';                /* kart yüksekliği */
  /* Yarıçap kart genişliğine bağlı: altı kart için en dar kapanış genişlik ×
     .866'dır, biraz üstü kartları yan yana ama boşluklu tutar. Ekran genişliğine
     bağlanırsa masaüstünde kartlar birbirinden kopuyordu. */
  var CARK_YARICAP = 'calc(' + CARK_KART_G + ' * 1.05)';
  var CARK_KAYDIRMA_ACI = 420;    /* bölüm ekrandan geçerken toplam dönüş: altı kart da görünür */
  var CARK_SURUKLENME = 2;        /* boştayken saniyede derece */
  var CARK_DURAKLAMA = 2600;      /* etkileşimden sonra yavaş dönüşün geri gelmesi (ms) */
  var CARK_YUMUSAMA = 0.1;        /* 60 Hz'de kare başına hedefe yaklaşma oranı */
  var CARK_SOLMA = 108;           /* bu açıdan sonra kart tamamen soluk */

  function carkOku(yon) {
    return h('svg', {
      width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true'
    }, h('path', { d: yon < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6' }));
  }

  /* Açıyı (-180,180] aralığına indirir; hep kısa yoldan dönmek için. */
  function carkSapma(a) {
    var d = ((a + 180) % 360 + 360) % 360 - 180;
    return d;
  }

  /* Kartın öne göre sapması: 0 tam önde, 180 tam arkada. */
  function carkOnSapmasi(a) {
    var b = ((a % 360) + 360) % 360;
    return b > 180 ? 360 - b : b;
  }

  function carkSaydamlik(sapma) {
    return Math.max(0.14, 1 - sapma / CARK_SOLMA);
  }

  function TedaviCarki() {
    var n = TEDAVILER.length;
    var adim = 360 / n;

    /* Tek React durumu: öndeki kart. Sadece değiştiğinde yazılır. */
    var aktifPair = useState(0);
    var aktif = aktifPair[0], setAktif = aktifPair[1];

    var sahneRef = useRef(null);
    var halkaRef = useRef(null);
    var kartlarRef = useRef([]);

    var aciRef = useRef(0);          /* o an çizilen açı */
    var kaydirmaRef = useRef(0);     /* kaydırmadan gelen pay */
    var kullaniciRef = useRef(0);    /* sürükleme + düğmeler + boştaki sürüklenme */
    var aktifRef = useRef(0);
    var sonEtkilesimRef = useRef(0); /* son dokunuşun zamanı: yavaş dönüş bunu bekler */
    var azRef = useRef(false);
    var ekrandaRef = useRef(false);
    var kareRef = useRef(0);
    var sonKareRef = useRef(0);      /* bir önceki karenin zaman damgası */
    var kutuRef = useRef({ ust: 0, yukseklik: 1 });
    var surukRef = useRef(null);
    var tasindiRef = useRef(false);

    /* --- çizim ------------------------------------------------------- */

    var yaz = useCallback(function () {
      var a = aciRef.current;
      if (halkaRef.current) {
        halkaRef.current.style.transform =
          'translateZ(calc(-1 * var(--cark-r))) rotateY(' + a.toFixed(2) + 'deg)';
      }

      var yeniAktif = 0;
      var enYakin = 999;
      for (var i = 0; i < n; i++) {
        var el = kartlarRef.current[i];
        if (!el) continue;
        var sapma = carkOnSapmasi(i * adim + a);
        el.style.opacity = carkSaydamlik(sapma).toFixed(3);
        /* Arkaya dönen kart tıklamayı yutmasın. Değer her karede değil,
           yalnız durum değişince yazılır. */
        var onde = sapma < 62 ? '1' : '0';
        if (el.dataset.onde !== onde) {
          el.dataset.onde = onde;
          el.style.pointerEvents = onde === '1' ? 'auto' : 'none';
        }
        if (sapma < enYakin) { enYakin = sapma; yeniAktif = i; }
      }

      if (yeniAktif !== aktifRef.current) {
        aktifRef.current = yeniAktif;
        setAktif(yeniAktif);
      }
    }, [n, adim]);

    /* Hareket kare sayısına değil geçen süreye bağlanır: 60 Hz telefonda da
       144 Hz ekranda da aynı hızda döner. */
    var kare = useCallback(function (zaman) {
      kareRef.current = 0;
      if (!ekrandaRef.current || azRef.current) return;

      var onceki = sonKareRef.current;
      sonKareRef.current = zaman;
      var gecen = onceki ? Math.min(zaman - onceki, 100) : 16.7;

      /* Yavaş dönüş, kullanıcı bıraktıktan kısa süre sonra kendiliğinden
         geri gelir; bir sürükleme onu temelli susturmaz. */
      if (!surukRef.current && zaman - sonEtkilesimRef.current > CARK_DURAKLAMA) {
        kullaniciRef.current -= CARK_SURUKLENME * (gecen / 1000);
      }

      var hedef = kaydirmaRef.current + kullaniciRef.current;
      var fark = hedef - aciRef.current;
      if (Math.abs(fark) < 0.02) aciRef.current = hedef;
      else aciRef.current += fark * (1 - Math.pow(1 - CARK_YUMUSAMA, gecen / 16.7));

      yaz();
      kareRef.current = requestAnimationFrame(kare);
    }, [yaz]);

    var dondur = useCallback(function () {
      if (kareRef.current || !ekrandaRef.current) return;
      if (azRef.current) { aciRef.current = kaydirmaRef.current + kullaniciRef.current; yaz(); return; }
      sonKareRef.current = 0;        /* duraklamadan sonraki ilk kare sıçramasın */
      kareRef.current = requestAnimationFrame(kare);
    }, [kare, yaz]);

    /* --- kaydırma ----------------------------------------------------- */

    var kutuyuOlc = useCallback(function () {
      var el = sahneRef.current;
      if (!el) return;
      var r = el.getBoundingClientRect();
      kutuRef.current = { ust: r.top + window.scrollY, yukseklik: r.height };
    }, []);

    /* Kaydırma sırasında yalnız scrollY okunur; kutu ölçüsü önbellekten gelir,
       böylece tarayıcı düzeni yeniden hesaplamaya zorlanmaz. */
    var kaydirmayiOku = useCallback(function () {
      var k = kutuRef.current;
      var pencere = window.innerHeight;
      var yol = k.yukseklik + pencere;
      var ilerleme = yol > 0 ? (window.scrollY + pencere - k.ust) / yol : 0.5;
      if (ilerleme < 0) ilerleme = 0;
      if (ilerleme > 1) ilerleme = 1;
      kaydirmaRef.current = -(ilerleme - 0.5) * CARK_KAYDIRMA_ACI;
    }, []);

    useEffect(function () {
      var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      var uygulaMq = function () {
        azRef.current = mq.matches;
        if (mq.matches && kareRef.current) {
          cancelAnimationFrame(kareRef.current);
          kareRef.current = 0;
        }
        dondur();
      };
      uygulaMq();
      mq.addEventListener('change', uygulaMq);

      kutuyuOlc();
      kaydirmayiOku();
      aciRef.current = kaydirmaRef.current;
      yaz();

      var kaydir = function () { kaydirmayiOku(); dondur(); };
      var boyut = function () { kutuyuOlc(); kaydirmayiOku(); dondur(); };
      window.addEventListener('scroll', kaydir, { passive: true });
      window.addEventListener('resize', boyut);

      /* Ekranda değilken ya da sekme arkadayken dönmek boşa pil harcar. */
      var sekmeAcik = !document.hidden;
      var gorunuyor = false;
      var tazele = function () {
        ekrandaRef.current = gorunuyor && sekmeAcik;
        if (!ekrandaRef.current) {
          if (kareRef.current) { cancelAnimationFrame(kareRef.current); kareRef.current = 0; }
        } else {
          kutuyuOlc();
          kaydirmayiOku();
          dondur();
        }
      };

      var gozlemci = new IntersectionObserver(function (girdiler) {
        gorunuyor = girdiler[0].isIntersecting;
        tazele();
      }, { rootMargin: '10% 0px' });
      if (sahneRef.current) gozlemci.observe(sahneRef.current);

      var sekme = function () { sekmeAcik = !document.hidden; tazele(); };
      document.addEventListener('visibilitychange', sekme);

      return function () {
        mq.removeEventListener('change', uygulaMq);
        window.removeEventListener('scroll', kaydir);
        window.removeEventListener('resize', boyut);
        document.removeEventListener('visibilitychange', sekme);
        gozlemci.disconnect();
        if (kareRef.current) cancelAnimationFrame(kareRef.current);
      };
    }, [dondur, kaydirmayiOku, kutuyuOlc, yaz]);

    /* --- kullanıcı ---------------------------------------------------- */

    /* Kullanıcı dokundu: yavaş dönüş CARK_DURAKLAMA kadar bekler. */
    function devral() { sonEtkilesimRef.current = performance.now(); }

    function git(yon) {
      devral();
      kullaniciRef.current -= yon * adim;
      dondur();
    }

    /* Seçilen kartı öne getirir; hangi yönün kısa olduğuna bakar. */
    function kartaGit(i) {
      devral();
      var hedef = kaydirmaRef.current + kullaniciRef.current;
      kullaniciRef.current += carkSapma(-i * adim - hedef);
      dondur();
    }

    function tutBasla(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      surukRef.current = { x: e.clientX, aci: kullaniciRef.current };
      tasindiRef.current = false;
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (hata) { /* eski tarayıcı */ }
      devral();
      dondur();
    }

    function tutHareket(e) {
      var s = surukRef.current;
      if (!s) return;
      var dx = e.clientX - s.x;
      if (Math.abs(dx) > 4) tasindiRef.current = true;
      var genislik = sahneRef.current ? sahneRef.current.clientWidth : 320;
      kullaniciRef.current = s.aci + (dx / genislik) * adim * 2;
      dondur();
    }

    function tutBitir() {
      if (!surukRef.current) return;
      surukRef.current = null;
      /* Bırakınca en yakın kart öne oturur. */
      var hedef = kaydirmaRef.current + kullaniciRef.current;
      kullaniciRef.current += carkSapma(Math.round(hedef / adim) * adim - hedef);
      dondur();
    }

    function kartTiklandi(e, i) {
      if (tasindiRef.current) { tasindiRef.current = false; e.preventDefault(); return; }
      if (i !== aktifRef.current) { e.preventDefault(); kartaGit(i); }
    }

    return h('div', {
      style: {
        marginTop: 36,
        '--cark-g': CARK_KART_G,
        '--cark-y': CARK_KART_Y,
        '--cark-r': CARK_YARICAP
      }
    },
      h('div', {
        ref: sahneRef,
        role: 'group',
        'aria-roledescription': 'çark',
        'aria-label': 'Tedavi alanları',
        onPointerDown: tutBasla,
        onPointerMove: tutHareket,
        onPointerUp: tutBitir,
        onPointerCancel: tutBitir,
        style: {
          position: 'relative',
          height: 'calc(var(--cark-y) + 64px)',
          /* Bölümün yan boşluğunu aşıp ekran kenarına kadar taşar; gövdede
             `overflow-x: clip` olduğu için yatay kaydırma açılmaz. */
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          overflow: 'hidden',
          /* Dikey kaydırma tarayıcıda kalsın, yatay hareketi çark alsın. */
          touchAction: 'pan-y',
          cursor: 'grab',
          userSelect: 'none'
        }
      },
        h('div', { style: { position: 'absolute', inset: 0, perspective: 'clamp(1000px,160vw,1600px)' } },
          h('div', {
            ref: halkaRef,
            style: {
              position: 'absolute', top: 32, left: '50%',
              width: 'var(--cark-g)', height: 'var(--cark-y)',
              marginLeft: 'calc(var(--cark-g) / -2)',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(calc(-1 * var(--cark-r))) rotateY(0deg)',
              willChange: 'transform'
            }
          },
            TEDAVILER.map(function (t, i) {
              return h('a', {
                key: t.id,
                ref: function (el) { kartlarRef.current[i] = el; },
                href: '/tedaviler/' + t.id,
                onClick: function (e) { kartTiklandi(e, i); },
                onFocus: function () { if (i !== aktifRef.current) kartaGit(i); },
                /* Kartın üstünden sürüklenince tarayıcının bağlantı sürükleme
                   davranışı devreye girip çarkı yarıda kesiyordu. */
                draggable: false,
                onDragStart: function (e) { e.preventDefault(); },
                'aria-current': i === aktif ? 'true' : undefined,
                style: {
                  position: 'absolute', inset: 0, display: 'block', color: 'inherit',
                  transform: 'rotateY(' + (i * adim) + 'deg) translateZ(var(--cark-r))',
                  backfaceVisibility: 'hidden',
                  /* İlk çizimdeki değer; sonrasını kare döngüsü yazar. */
                  opacity: carkSaydamlik(carkOnSapmasi(i * adim))
                }
              },
                h(Card, { tone: 'cream', padding: 'md', interactive: i === aktif, style: { height: '100%', boxSizing: 'border-box' } },
                  h('div', {
                    style: {
                      width: 46, height: 46, borderRadius: 13,
                      background: t.ton === 'amber' ? 'var(--amber-100)' : 'var(--emerald-100)',
                      color: t.ton === 'amber' ? 'var(--amber-700)' : 'var(--emerald-700)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }
                  }, tedaviSimgesi(t.id)),
                  h('h3', { style: Object.assign({}, S.h3, { margin: '18px 0 0' }) }, t.ad),
                  h('p', {
                    style: Object.assign({}, S.kartMetin, {
                      display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                    })
                  }, t.ozet),
                  h('span', {
                    style: {
                      display: 'inline-block', marginTop: 14, fontSize: 14,
                      fontWeight: 'var(--fw-semibold)', color: 'var(--emerald-700)'
                    }
                  }, 'Süreci oku →')
                )
              );
            })
          )
        )
      ),

      h('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 18 }
      },
        h('button', { type: 'button', className: 'cark-ok', onClick: function () { git(-1); }, 'aria-label': 'Önceki dal' }, carkOku(-1)),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 4 } },
          TEDAVILER.map(function (t, i) {
            return h('button', {
              key: t.id,
              type: 'button',
              className: 'cark-nokta' + (i === aktif ? ' cark-nokta--etkin' : ''),
              onClick: function () { kartaGit(i); },
              'aria-label': t.ad,
              'aria-current': i === aktif ? 'true' : undefined
            });
          })
        ),
        h('button', { type: 'button', className: 'cark-ok', onClick: function () { git(1); }, 'aria-label': 'Sonraki dal' }, carkOku(1))
      )
    );
  }

  function Tedaviler() {
    return h('section', { id: 'tedaviler', style: S.bolum },
      h(BolumBasligi, {
        numara: '01',
        kas: 'TEDAVİ ALANLARI',
        baslik: 'Hasta kabul edilen dallar',
        baslikStil: { maxWidth: '20ch' },
        giris: 'Aşağıdaki başlıklar, poliklinikte hasta kabul edilen alanları ve her birinde izlenen genel süreci anlatır.'
      }),
      /* Kartlar tedavinin kendi sayfasına açılır; çark yalnız sunumu değiştirir,
         altı bağlantı da her zaman DOM'da durur. */
      h(TedaviCarki)
    );
  }

  /* ------------------------------------------------------------------ */
  /* 02 — Klinik                                                         */
  /* ------------------------------------------------------------------ */

  function Klinik() {
    return h('section', { id: 'klinik', style: S.bolum },
      h(BolumBasligi, {
        numara: '02',
        kas: 'KLİNİK',
        baslik: 'Mekân, sterilizasyon ve dijital kayıt',
        baslikStil: { maxWidth: '20ch' }
      }),

      h('div', { style: Object.assign({}, S.izgara(280), { marginTop: 32 }) },
        MEKANLAR.map(function (m) {
          var foto = GORSELLER.mekanlar[m.anahtar] || { yol: '', alt: '' };
          return h(Card, { key: m.etiket, tone: 'plain', padding: 'none' },
            h('div', {
              style: { position: 'relative', height: 240, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }
            },
              foto.yol
                ? h(Fragment, null,
                    KapakGorseli(foto.yol, foto.alt, { olcu: '(max-width: 760px) 180vw, 460px' }),
                    YaziPerdesi()
                  )
                : h('div', {
                    'aria-hidden': 'true',
                    style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grad-cream)' }
                  },
                    h('div', {
                      style: Object.assign({ width: m.genislik, aspectRatio: m.oran, borderRadius: m.yuvarlak }, S.blob)
                    })
                  ),
              h('div', { style: { position: 'relative', padding: 20 } },
                /* Etiket fotoğrafın üstüne bindiğinde krem zeminin rengiyle
                   değil, perdenin üstünde beyazla okunur. */
                h('span', { style: foto.yol ? Object.assign({}, S.kas, { color: '#fff' }) : S.kas }, m.etiket)
              )
            )
          );
        })
      ),

      h('p', { style: S.dipnot }, 'Her cerrahi veya girişimsel işlemde sonuçlar kişiden kişiye değişiklik gösterebilir. İşlem öncesinde hekiminizden detaylı görüş almanız önerilir.'),

      h('div', { style: Object.assign({}, S.izgara(300), { marginTop: 32 }) },
        h(Card, { tone: 'emerald', padding: 'lg' },
          h('div', { style: { fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: 'var(--emerald-300)' } }, 'STERİLİZASYON'),
          h('h3', {
            style: { fontFamily: 'var(--font-display)', color: '#fff', fontSize: 26, lineHeight: 1.14, letterSpacing: '-.022em', margin: '12px 0 0' }
          }, 'Aletlerin izlediği dört adım'),
          h('ol', {
            style: { listStyle: 'none', margin: '20px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }
          },
            STERILIZASYON.map(function (adim, i) {
              return h('li', { key: i, style: { display: 'flex', gap: 14, alignItems: 'flex-start' } },
                h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--emerald-300)', paddingTop: 2 } }, iki(i + 1)),
                h('p', { style: { margin: 0, color: 'var(--text-on-dark-muted)', fontSize: 14.5, lineHeight: 1.55 } }, adim)
              );
            })
          )
        ),

        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
          h(Card, { tone: 'cream', padding: 'md' },
            h('h3', { style: S.h3 }, 'Görüntüleme ve kayıt'),
            h('p', { style: S.kartMetin }, 'Poliklinikte panoramik röntgen, hacimsel tomografi ve ağız içi tarayıcı bulunur. Görüntüler hasta dosyasına dijital olarak işlenir; istenildiğinde hastaya kopyası verilir.')
          ),
          h(Card, { tone: 'cream', padding: 'md' },
            h('h3', { style: S.h3 }, 'Erişim'),
            h('p', { style: S.kartMetin }, 'Giriş zemin kattadır, eşik ve basamak yoktur. Tekerlekli sandalye ile bekleme alanına ve iki muayene odasına doğrudan geçilir. Refakatçi için oturma alanı bulunur.')
          )
        )
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* 03 — Hekimler                                                       */
  /* ------------------------------------------------------------------ */

  function Hekimler() {
    return h('section', { id: 'hekimler', style: S.bolum },
      h(BolumBasligi, {
        numara: '03',
        kas: 'HEKİM KADROSU',
        baslik: 'Poliklinikte çalışan hekimler',
        baslikStil: { maxWidth: '20ch' }
      }),
      h('div', { style: Object.assign({}, S.izgara(240), { marginTop: 32 }) },
        HEKIMLER.map(function (hk) {
          return h(Card, { key: hk.ad, tone: 'cream', padding: 'none' },
            h('div', {
              /* Yer tutucu süstür, ekran okuyucudan gizlenir; gerçek portre
                 hekimi tanıttığı için gizlenmez. */
              'aria-hidden': hk.gorsel ? undefined : 'true',
              style: {
                position: 'relative',
                height: 170, background: 'var(--grad-cream)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                borderBottom: '1px solid var(--line-hairline)'
              }
            },
              hk.gorsel
                /* Portrede yüz karenin üst yarısında kaldığı için kırpma
                   merkezi yukarı çekilir. */
                ? KapakGorseli(hk.gorsel, hk.ad + ' — ' + hk.unvan, {
                    konum: 'center 28%',
                    olcu: '(max-width: 760px) 50vw, 300px'
                  })
                : h('div', {
                    style: {
                      width: 96, height: 110, borderRadius: 'var(--radius-blob)',
                      background: 'linear-gradient(150deg,#fff 0%,var(--sand-150) 100%)',
                      boxShadow: 'inset -6px -8px 20px rgba(58,45,32,.07),inset 6px 8px 20px #fff'
                    }
                  })
            ),
            h('div', { style: { padding: '20px 22px 24px' } },
              h('h3', { style: Object.assign({}, S.h3, { fontSize: 18 }) }, hk.ad),
              h('div', { style: { fontSize: 13.5, fontWeight: 600, color: 'var(--emerald-700)', marginTop: 5 } }, hk.unvan),
              h('div', { style: Object.assign({}, S.ayirici, { margin: '14px 0' }) }),
              h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6, color: 'var(--text-muted)' } }, hk.mezuniyet),
              h('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6, color: 'var(--text-muted)' } }, hk.akademik)
            )
          );
        })
      ),
      h('p', { style: S.dipnot }, 'Unvanlar 1219 sayılı Kanun kapsamındaki diş hekimliği ana ve yan dal uzmanlıklarına göre yazılmıştır.')
    );
  }

  /* ------------------------------------------------------------------ */
  /* 04 — Koruyucu bilgiler                                              */
  /* ------------------------------------------------------------------ */

  function Bilgi() {
    return h('section', { id: 'bilgi', style: S.bolum },
      h(BolumBasligi, {
        numara: '04',
        kas: 'AĞIZ VE DİŞ SAĞLIĞI BİLGİLERİ',
        baslik: 'Koruyucu bilgiler'
      }),
      h('div', { style: Object.assign({}, S.izgara(280), { marginTop: 32 }) },
        KORUYUCU_BILGILER.map(function (b) {
          return h(Card, { key: b.harf, tone: 'plain', padding: 'md' },
            h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--emerald-600)' } }, b.harf),
            h('h3', { style: Object.assign({}, S.h3, { margin: '10px 0 0' }) }, b.baslik),
            h('p', { style: { fontSize: 14.5, lineHeight: 1.62, color: 'var(--text-muted)', margin: '10px 0 0' } }, b.metin)
          );
        })
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* 05 — Sık sorulan sorular                                            */
  /* ------------------------------------------------------------------ */

  function SSS() {
    var pair = useState(null);
    var acik = pair[0], setAcik = pair[1];

    return h('section', { id: 'sss', style: S.bolum },
      h(BolumBasligi, {
        numara: '05',
        kas: 'SIK SORULAN SORULAR',
        baslik: 'Süreç, hazırlık ve iyileşme'
      }),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 860, marginTop: 32 } },
        SORULAR.map(function (s, i) {
          var bu = acik === i;
          var govdeId = 'sss-cevap-' + i;
          return h('div', {
            key: i,
            style: { borderRadius: 22, background: 'rgba(255,255,255,.66)', border: '1px solid var(--line-hairline)', overflow: 'hidden' }
          },
            h('h3', { style: { margin: 0, font: 'inherit' } },
              h('button', {
                type: 'button',
                className: 'sss-baslik',
                'aria-expanded': bu ? 'true' : 'false',
                'aria-controls': govdeId,
                onClick: function () { setAcik(bu ? null : i); }
              },
                h('span', null, s.soru),
                h('span', {
                  'aria-hidden': 'true',
                  style: {
                    flex: 'none', width: 26, height: 26, borderRadius: '50%',
                    background: 'var(--emerald-100)', color: 'var(--emerald-700)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: 15, lineHeight: 1
                  }
                }, bu ? '−' : '+')
              )
            ),
            bu
              ? h('p', {
                  id: govdeId,
                  style: { margin: 0, padding: '0 22px 22px', fontSize: 15, lineHeight: 1.62, color: 'var(--text-muted)', maxWidth: '64ch' }
                }, s.cevap)
              : null
          );
        })
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* 06 — Ulaşım ve randevu                                              */
  /* ------------------------------------------------------------------ */

  function HaritaKarti() {
    var pair = useState(false);
    var acik = pair[0], setAcik = pair[1];
    var kutu = useRef(null);

    /* Harita, kart görüş alanına girmeden yüklenmez: sayfanın üst kısmında
       gezinen ziyaretçi için Google'a istek gitmez, iframe'in yükü boşuna
       inmez. rootMargin biraz erken tetikler, böylece bölüme gelindiğinde
       harita çoktan açılmış olur. */
    useEffect(function () {
      if (acik) return;
      var el = kutu.current;
      if (!el) return;
      if (typeof IntersectionObserver === 'undefined') { setAcik(true); return; }
      var gozcu = new IntersectionObserver(function (girisler) {
        if (girisler.some(function (g) { return g.isIntersecting; })) {
          setAcik(true);
          gozcu.disconnect();
        }
      }, { rootMargin: '300px 0px' });
      gozcu.observe(el);
      return function () { gozcu.disconnect(); };
    }, [acik]);

    var cizim = h('div', {
      'aria-hidden': 'true',
      style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#f6f0e6 0%,#efe6d9 100%)' }
    },
      h('div', { style: { position: 'absolute', left: 0, right: 0, top: '38%', height: 14, background: '#fff', opacity: .85 } }),
      h('div', { style: { position: 'absolute', top: 0, bottom: 0, left: '62%', width: 10, background: '#fff', opacity: .7 } }),
      h('div', { style: { position: 'absolute', left: '8%', top: '62%', width: '34%', height: 8, background: '#fff', opacity: .6, transform: 'rotate(-6deg)' } }),
      h('div', {
        style: {
          position: 'absolute', left: 'calc(62% - 62px)', top: 'calc(38% - 44px)',
          width: 44, height: 44, borderRadius: '50% 50% 50% 6px', transform: 'rotate(-45deg)',
          background: 'var(--grad-emerald)', boxShadow: 'var(--shadow-brand)'
        }
      }),
      h('span', {
        style: { position: 'absolute', left: 12, top: 'calc(38% + 20px)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }
      }, KLINIK.haritaEtiketleri[0]),
      h('span', {
        style: { position: 'absolute', left: 'calc(62% + 16px)', top: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }
      }, KLINIK.haritaEtiketleri[1])
    );

    var gomme = h('iframe', {
      src: haritaGomme(),
      title: KLINIK.ad + ' — harita üzerinde konum',
      loading: 'lazy',
      referrerPolicy: 'no-referrer-when-downgrade',
      allowFullScreen: true,
      style: { position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }
    });

    return h(Card, { tone: 'plain', padding: 'none' },
      /* Kartın yüksekliği bu kutudan gelir: harita da yer tutucu çizim de
         mutlak konumlandığı için kendi başlarına yer kaplamaz. */
      h('div', { ref: kutu, style: { position: 'relative', height: 230 } },
        acik ? gomme : cizim
      ),
      /* Yol tarifi bağlantıları haritanın üstünde değil altında durur; üstteki
         katman haritanın kendi denetimlerini örtüyordu. İki sağlayıcı birden
         veriliyor: iPhone kullanıcısı Google Haritalar kurulu olmasa da
         yol tarifini kendi uygulamasında açabiliyor. */
      h('div', {
        style: {
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10,
          padding: '14px 16px', borderTop: '1px solid var(--line-hairline)',
          background: 'var(--surface-card)'
        }
      },
        h('span', { style: { fontSize: 13.5, color: 'var(--text-muted)' } }, 'Yol tarifi'),
        h(Button, {
          size: 'sm', variant: 'cream', as: 'a', style: { flex: '1 1 132px' },
          href: haritaYolTarifi(), target: '_blank', rel: 'noopener'
        }, 'Google Haritalar'),
        h(Button, {
          size: 'sm', variant: 'glass', as: 'a', style: { flex: '1 1 132px' },
          href: haritaYolTarifiApple(), target: '_blank', rel: 'noopener'
        }, 'Apple Haritalar')
      )
    );
  }

  function AdresKarti() {
    return h(Card, { tone: 'cream', padding: 'md' },
      h('h3', { style: S.h3 }, 'Adres ve ulaşım'),
      h('p', { style: Object.assign({}, S.kartMetin, { margin: '10px 0 0' }) }, KLINIK.adresTam),
      h('div', { style: Object.assign({}, S.ayirici, { margin: '16px 0' }) }),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14, color: 'var(--text-muted)' } },
        ULASIM_NOTLARI.map(function (n, i) { return h('div', { key: i }, n); })
      ),
      h('div', { style: Object.assign({}, S.ayirici, { margin: '16px 0' }) }),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        CALISMA_SAATLERI.map(function (c) {
          return h('div', { key: c.ad, style: { display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 14 } },
            h('span', { style: { color: 'var(--text-body)' } }, c.ad),
            h('span', { style: { fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'var(--text-strong)' } }, c.saat)
          );
        })
      )
    );
  }

  function RandevuFormu() {
    var f = useState({ ad: '', tel: '', tarih: '', not: '', bulten: false, kapan: '' });
    var form = f[0], setForm = f[1];
    var e = useState({});
    var hatalar = e[0], setHatalar = e[1];
    var g = useState(false);
    var gonderildi = g[0], setGonderildi = g[1];
    var i = useState(false);
    var gonderiliyor = i[0], setGonderiliyor = i[1];
    var s = useState('');
    var sunucuHatasi = s[0], setSunucuHatasi = s[1];

    var alan = useCallback(function (anahtar) {
      return function (ev) {
        var deger = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        setForm(function (onceki) {
          var yeni = Object.assign({}, onceki);
          yeni[anahtar] = deger;
          return yeni;
        });
      };
    }, []);

    function gonder() {
      var yeni = {};
      if (!form.ad.trim()) yeni.ad = 'Ad ve soyadınızı yazın.';
      if (form.tel.replace(/[^0-9]/g, '').length < 10) yeni.tel = 'Telefon numarası eksik görünüyor.';
      setHatalar(yeni);
      setSunucuHatasi('');
      if (Object.keys(yeni).length > 0) return;

      setGonderiliyor(true);

      fetch('/api/randevu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
        .then(function (yanit) {
          return yanit.json().then(function (veri) {
            return { tamam: yanit.ok, veri: veri };
          });
        })
        .then(function (sonuc) {
          if (sonuc.tamam) {
            setGonderildi(true);
            return;
          }
          /* Sunucu alan bazlı hata döndüyse ilgili alanların altında gösterilir. */
          if (sonuc.veri && sonuc.veri.alanHatalari) {
            setHatalar(sonuc.veri.alanHatalari);
            return;
          }
          setSunucuHatasi((sonuc.veri && sonuc.veri.hata) || 'Talebiniz gönderilemedi.');
        })
        .catch(function () {
          setSunucuHatasi('Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.');
        })
        .then(function () { setGonderiliyor(false); });
    }

    function yeniTalep() {
      setForm({ ad: '', tel: '', tarih: '', not: '', bulten: false, kapan: '' });
      setHatalar({});
      setSunucuHatasi('');
      setGonderildi(false);
    }

    if (gonderildi) {
      return h(Card, { tone: 'glass', padding: 'lg', id: 'randevu' },
        h('div', {
          role: 'status',
          style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 420 }
        },
          h('div', {
            'aria-hidden': 'true',
            style: {
              width: 52, height: 52, borderRadius: 16, background: 'var(--emerald-100)', color: 'var(--emerald-700)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }
          },
            h('svg', {
              width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
              strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round'
            }, h('path', { d: 'M4.5 12.5 9.5 17.5 19.5 7' }))
          ),
          h('h3', {
            style: { fontFamily: 'var(--font-display)', fontSize: 26, letterSpacing: '-.022em', color: 'var(--text-strong)', margin: '20px 0 0' }
          }, 'Randevu talebiniz alındı.'),
          h('p', { style: { fontSize: 15, lineHeight: 1.62, color: 'var(--text-muted)', margin: '10px 0 0', maxWidth: '40ch' } },
            'Danışma çalışma saatleri içinde sizi arayacak. Bu arada bir şey sormak isterseniz ',
            h('a', { href: KLINIK.telHref }, KLINIK.telefon),
            ' numarasından ulaşabilirsiniz.'
          ),
          h('div', { style: { marginTop: 24 } },
            h(Button, { variant: 'cream', onClick: yeniTalep }, 'Yeni talep oluştur')
          )
        )
      );
    }

    return h(Card, { tone: 'glass', padding: 'lg', id: 'randevu' },
      h('form', {
        noValidate: true,
        onSubmit: function (ev) { ev.preventDefault(); gonder(); }
      },
        h('h3', {
          style: { fontFamily: 'var(--font-display)', fontSize: 26, lineHeight: 1.14, letterSpacing: '-.022em', color: 'var(--text-strong)', margin: 0 }
        }, 'Randevu talebi'),
        h('p', { style: Object.assign({}, S.kartMetin, { margin: '10px 0 0', maxWidth: '44ch' }) },
          'Formu ilettiğinizde danışma sizi arar ve uygun saati birlikte belirlersiniz. Tedavi bilgisi bu formda sorulmaz.'),

        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 } },
          h(Field, { label: 'Ad Soyad', required: true, htmlFor: 'f-ad', error: hatalar.ad || '' },
            h(Input, {
              id: 'f-ad', name: 'ad', autoComplete: 'name',
              value: form.ad, onChange: alan('ad'),
              placeholder: 'Elif Yılmaz', invalid: !!hatalar.ad,
              'aria-invalid': hatalar.ad ? 'true' : undefined
            })
          ),
          h(Field, {
            label: 'Telefon', required: true, htmlFor: 'f-tel',
            hint: 'Danışma yalnızca randevunuzu belirlemek için arar.',
            error: hatalar.tel || ''
          },
            h(Input, {
              id: 'f-tel', name: 'tel', type: 'tel', autoComplete: 'tel',
              value: form.tel, onChange: alan('tel'),
              placeholder: '0532 000 00 00', invalid: !!hatalar.tel,
              'aria-invalid': hatalar.tel ? 'true' : undefined
            })
          ),
          h(Field, { label: 'Tercih edilen tarih', htmlFor: 'f-tarih' },
            h(Input, { id: 'f-tarih', name: 'tarih', type: 'date', value: form.tarih, onChange: alan('tarih') })
          ),
          h(Field, { label: 'Not', htmlFor: 'f-not', hint: 'İsterseniz kısa bir not bırakabilirsiniz.' },
            h(Input, {
              id: 'f-not', name: 'not', multiline: true, rows: 3,
              value: form.not, onChange: alan('not'),
              placeholder: 'Sabah saatleri benim için daha uygun.'
            })
          )
        ),

        h('p', { style: { fontSize: 13, lineHeight: 1.6, color: 'var(--text-muted)', margin: '20px 0 0' } },
          'Kişisel verileriniz ', h('a', { href: '/kvkk' }, 'Aydınlatma Metni'), ' kapsamında işlenecektir.'),

        h('div', { style: { marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line-hairline)' } },
          h(Checkbox, {
            checked: form.bulten,
            onChange: alan('bulten'),
            label: 'Ağız ve diş sağlığı bilgilendirmeleri almak istiyorum.',
            description: 'İsteğe bağlıdır. İşaretlemeseniz de randevu talebiniz iletilir.'
          })
        ),

        /* Bot tuzağı: ekran okuyucudan ve gözden gizli, otomatik doldurma kapalı.
           Dolu geldiğinde sunucu gönderim yapmaz. */
        h('div', { 'aria-hidden': 'true', style: { position: 'absolute', left: -9999, width: 1, height: 1, overflow: 'hidden' } },
          h('label', null, 'Bu alanı boş bırakın',
            h('input', {
              type: 'text', name: 'kapan', tabIndex: -1, autoComplete: 'off',
              value: form.kapan, onChange: alan('kapan')
            })
          )
        ),

        sunucuHatasi
          ? h('p', {
              role: 'alert',
              style: {
                fontSize: 14, lineHeight: 1.55, color: 'var(--status-danger-fg)',
                background: 'var(--status-danger-bg)', borderRadius: 12,
                padding: '12px 14px', margin: '18px 0 0'
              }
            }, sunucuHatasi)
          : null,

        h('div', { style: { marginTop: 22 } },
          h(Button, {
            size: 'lg', fullWidth: true, type: 'submit',
            loading: gonderiliyor, disabled: gonderiliyor
          }, gonderiliyor ? 'Gönderiliyor…' : 'Randevu talebi gönder')
        )
      )
    );
  }

  function Ulasim() {
    return h('section', { id: 'ulasim', style: S.bolum },
      h(BolumBasligi, {
        numara: '06',
        kas: 'ULAŞIM VE RANDEVU',
        baslik: 'Nasıl gelinir, nasıl randevu alınır'
      }),
      h('div', { style: Object.assign({}, S.izgara(320), { marginTop: 32 }) },
        h('div', { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
          h(HaritaKarti),
          h(AdresKarti)
        ),
        h(RandevuFormu)
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* Altbilgi                                                            */
  /* ------------------------------------------------------------------ */

/* Kendi sayfaları da olan bölümler; /hekimler ve /iletisim bunları yeniden kullanır. */
export { Hekimler as HekimlerBolumu, Ulasim as UlasimBolumu };

export default function AnaSayfa() {
  return h(SayfaCercevesi, { bolumleriIzle: true },
    h(Hero),
    h(Tedaviler),
    h(Klinik),
    h(Hekimler),
    h(Bilgi),
    h(SSS),
    h(Ulasim)
  );
}
