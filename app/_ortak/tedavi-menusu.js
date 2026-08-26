'use client';

/* Üst gezinmedeki "Tedaviler" başlığına bağlı açılır menü.

   Geniş ekranda fare başlığın üzerine gelince açılır, alan terk edilince
   kapanır. Dar ekranda fare yoktur: başlığa dokunulunca açılır, ikinci
   dokunuşta, perdeye dokununca ya da Escape ile kapanır.

   İçerik burada tutulmaz; kategoriler ve kalemler site.config.ts'teki
   tedaviMenusu'ndan gelir. */

import * as React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/ds/bundle';
import { tedaviMenusu as MENU } from '@/site.config';
import { h } from './temel';

var useState = React.useState;
var useEffect = React.useEffect;
var useRef = React.useRef;

/* Fare tetikten panele giderken aradaki saydam boşluktan geçer; kapatma bu
   kadar ertelenmezse menü imlecin altından kaçar. */
var KAPANMA_GECIKMESI = 140;

  /* ------------------------------------------------------------------ */
  /* Durum                                                               */
  /* ------------------------------------------------------------------ */

  /** Menünün açık/kapalı durumunu ve işleyicilerini üretir. `dar` değişince
      menü kapanır: fareyle açılmış bir panel ekran daralınca asılı kalmasın. */
  function useTedaviMenusu(dar) {
    var p = useState(false);
    var acik = p[0], setAcik = p[1];
    var sayac = useRef(0);

    function iptal() {
      if (sayac.current) { clearTimeout(sayac.current); sayac.current = 0; }
    }
    function ac() { iptal(); setAcik(true); }
    function kapat() { iptal(); setAcik(false); }
    function degistir() { iptal(); setAcik(function (o) { return !o; }); }
    function gecikmeliKapat() {
      iptal();
      sayac.current = setTimeout(function () { sayac.current = 0; setAcik(false); }, KAPANMA_GECIKMESI);
    }

    useEffect(function () { return iptal; }, []);
    useEffect(function () { setAcik(false); }, [dar]);

    useEffect(function () {
      if (!acik) return;
      var tus = function (e) { if (e.key === 'Escape') setAcik(false); };
      window.addEventListener('keydown', tus);
      return function () { window.removeEventListener('keydown', tus); };
    }, [acik]);

    return { acik: acik, ac: ac, kapat: kapat, degistir: degistir, gecikmeliKapat: gecikmeliKapat };
  }

  /* ------------------------------------------------------------------ */
  /* Başlık                                                              */
  /* ------------------------------------------------------------------ */

  /** NavBar'ın bağlantı düğmesine etiket olarak geçilir. NavBar düğmenin
      kendisine tutamak vermediği için fare olayları etikete bağlanır; etiket
      de negatif kenar boşluğuyla düğmenin iç boşluğuna kadar genişletilir,
      yoksa imleç kenardan girdiğinde menü açılmaz. */
  function TedaviTetigi(props) {
    return h('span', {
      onMouseEnter: props.dar ? undefined : props.menu.ac,
      onMouseLeave: props.dar ? undefined : props.menu.gecikmeliKapat,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        height: 36,
        margin: '0 -15px',
        padding: '0 15px'
      }
    },
      props.etiket,
      h('svg', {
        width: 13, height: 13, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
        strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true',
        style: {
          transform: props.menu.acik ? 'rotate(180deg)' : 'none',
          transition: 'transform var(--dur-fast) var(--ease-glass)'
        }
      }, h('path', { d: 'M5 9l7 7 7-7' }))
    );
  }

  /* ------------------------------------------------------------------ */
  /* Panel                                                               */
  /* ------------------------------------------------------------------ */

  function disSimgesi() {
    return h('svg', {
      width: 21, height: 21, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true'
    },
      h('path', {
        d: 'M6.2 6.6c0-2.2 1.8-3.6 3.6-2.9 1.4.5 3 .5 4.4 0 1.8-.7 3.6.7 3.6 2.9 0 2.6-.6 5-1.6 7.3-.5 1.1-.9 2.3-1.1 3.5l-.4 2.3c-.2 1.2-1.9 1.2-2.1 0l-.6-3.4c-.1-.8-1.3-.8-1.4 0l-.6 3.4c-.2 1.2-1.9 1.2-2.1 0l-.4-2.3c-.2-1.2-.6-2.4-1.1-3.5-1-2.3-1.6-4.7-1.6-7.3Z'
      })
    );
  }

  /* Sayı kutusu: "42 / Tedavi". Sayılar elle yazılmaz, listeden sayılır. */
  function sayiKutusu(sayi, etiket) {
    return h('div', {
      key: etiket,
      style: {
        padding: '11px 12px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255,255,255,.13)',
        border: '1px solid var(--glass-border-dark)',
        textAlign: 'center'
      }
    },
      h('div', {
        style: { fontFamily: 'var(--font-display)', fontSize: 21, fontWeight: 'var(--fw-bold)', letterSpacing: '-.02em', color: '#fff' }
      }, String(sayi)),
      h('div', {
        style: { marginTop: 2, fontSize: 11.5, letterSpacing: '.06em', color: 'var(--text-on-dark-muted)' }
      }, etiket)
    );
  }

  function Kategori(props) {
    var k = props.kategori;
    return h('div', null,
      h('div', {
        style: {
          fontSize: 11.5,
          fontWeight: 'var(--fw-bold)',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'var(--emerald-700)',
          paddingBottom: 9,
          marginBottom: 10,
          borderBottom: '1px solid var(--line-soft)'
        }
      }, k.baslik),
      h('ul', { style: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 1 } },
        k.kalemler.map(function (kalem) {
          /* Kalem düz metinse içeriği henüz yazılmamış: bağlantı değil, liste
             satırı. Nesneye çevrildiği anda adresi slug'ından türer. */
          var ad = typeof kalem === 'string' ? kalem : kalem.ad;
          var adres = typeof kalem === 'string' ? '' : '/tedaviler/' + kalem.slug;
          return h('li', { key: ad },
            h(adres ? 'a' : 'span', {
              className: 'tedavi-menu-kalem' + (adres ? '' : ' tedavi-menu-kalem--pasif'),
              href: adres || undefined,
              onClick: adres ? props.kapat : undefined
            },
              h('span', { className: 'tedavi-menu-nokta', 'aria-hidden': 'true' }),
              ad
            )
          );
        })
      )
    );
  }

  /** Açılır panel. NavBar'ı saran, `position:relative` olan kutunun içine
      konur ve çubuğun altına asılır. */
  function TedaviPaneli(props) {
    var dar = props.dar;
    var menu = props.menu;
    var kategoriler = MENU.kategoriler;
    var tedaviSayisi = kategoriler.reduce(function (t, k) { return t + k.kalemler.length; }, 0);

    return h(React.Fragment, null,

      /* Dar ekranda arkadaki sayfayı perdeler; dokunuş menüyü kapatır.

         Gövdeye taşınmasının sebebi: üst çubuğun kabuğu kaydırmada
         `transform: scale(...)` alıyor ve dönüşüm taşıyan ata, içindeki
         `position: fixed` öğenin kapsayıcı bloğu oluyor. Perde burada
         kalırsa ekranı değil yalnız çubuğun kutusunu (86 px) karartır.

         z-index 39: sayfa içeriğinin üstünde, çubuk ile panelin (40) altında. */
      dar && menu.acik ? createPortal(h('div', {
        onClick: menu.kapat,
        'aria-hidden': 'true',
        style: {
          position: 'fixed', inset: 0, zIndex: 39,
          background: 'rgba(26,23,20,.34)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)'
        }
      }), document.body) : null,

      h('div', {
        onMouseEnter: dar ? undefined : menu.ac,
        onMouseLeave: dar ? undefined : menu.gecikmeliKapat,
        style: {
          position: 'absolute', left: 0, right: 0, top: '100%',
          /* Saydam ama fare yolunun parçası: panel çubuğa yapışmadan durur. */
          paddingTop: 12,
          opacity: menu.acik ? 1 : 0,
          transform: menu.acik ? 'translateY(0)' : 'translateY(-10px)',
          /* Kapalıyken hem fareden hem ekran okuyucudan çekilir. */
          visibility: menu.acik ? 'visible' : 'hidden',
          pointerEvents: menu.acik ? 'auto' : 'none',
          transition:
            'opacity var(--dur-base) var(--ease-glass),' +
            'transform var(--dur-base) var(--ease-glass),' +
            'visibility var(--dur-base) var(--ease-glass)'
        }
      },
        h('div', {
          'aria-label': MENU.ustBaslik,
          style: {
            display: 'grid',
            gridTemplateColumns: dar ? '1fr' : 'minmax(0,1fr) 268px',
            gap: dar ? 18 : 24,
            padding: dar ? 20 : 24,
            borderRadius: 'var(--radius-2xl)',
            /* Çubuğun aksine burası opak: arkasından sayfa metni geçerse
               kırk iki kalemlik liste okunmaz oluyor. */
            background: 'var(--grad-cream)',
            border: '1px solid var(--glass-border-light)',
            boxShadow: 'var(--shadow-4),var(--inner-glass)',
            /* Dar ekranda alttaki sabit eylem çubuğu panelin son satırını
               örtmesin diye pay daha büyük tutulur. */
            maxHeight: dar ? 'calc(100vh - 196px)' : 'calc(100vh - 132px)',
            overflowY: 'auto',
            overscrollBehavior: 'contain'
          }
        },

          h('div', null,
            h('div', {
              style: {
                fontSize: 11.5, fontWeight: 'var(--fw-bold)', letterSpacing: '.14em',
                textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16
              }
            }, MENU.ustBaslik),
            h('div', {
              style: {
                display: 'grid',
                /* Geniş ekranda dört sütun: kategoriler yazıldıkları sırayla
                   satır satır dizilir. Dar ekranda sütun sayısını genişlik
                   belirler, 375 px'de iki sütun çıkar. */
                gridTemplateColumns: dar ? 'repeat(auto-fill,minmax(130px,1fr))' : 'repeat(4,minmax(0,1fr))',
                gap: '24px 16px',
                alignItems: 'start'
              }
            },
              kategoriler.map(function (k) {
                return h(Kategori, { key: k.baslik, kategori: k, kapat: menu.kapat });
              })
            )
          ),

          h('div', {
            style: {
              display: 'flex', flexDirection: 'column', gap: 14,
              padding: 22,
              borderRadius: 'var(--radius-xl)',
              background: 'var(--grad-emerald)',
              color: 'var(--text-on-dark)',
              boxShadow: 'var(--shadow-brand)'
            }
          },
            h('div', {
              style: {
                width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(255,255,255,.16)',
                border: '1px solid var(--glass-border-dark)'
              }
            }, disSimgesi()),

            h('div', null,
              h('div', {
                style: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 'var(--fw-bold)', letterSpacing: '-.025em', color: '#fff' }
              }, MENU.panel.baslik),
              h('p', {
                style: { margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-on-dark-muted)' }
              }, kategoriler.length + ' kategori · ' + MENU.panel.aciklama)
            ),

            /* Geniş ekranda panel sol sütun kadar uzar; düğme ve sayılar alta iner. */
            dar ? null : h('div', { style: { flex: '1 0 12px' } }),

            h(Button, {
              variant: 'cream',
              size: 'sm',
              fullWidth: true,
              onClick: function () { menu.kapat(); props.randevu(); }
            }, MENU.panel.eylem),

            h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
              sayiKutusu(tedaviSayisi, 'Tedavi'),
              sayiKutusu(kategoriler.length, 'Kategori')
            ),

            h('button', {
              type: 'button',
              className: 'tedavi-menu-tumu',
              onClick: function () { menu.kapat(); props.tumTedaviler(); }
            }, MENU.panel.tumu, h('span', { 'aria-hidden': 'true' }, ' ↗'))
          )
        )
      )
    );
  }

export { useTedaviMenusu, TedaviTetigi, TedaviPaneli };
