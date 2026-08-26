'use client';

/* Her sayfada tekrarlanan çerçeve: üst gezinme, altbilgi ve mobil eylem çubuğu. */

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { NavBar, Button } from '@/ds/bundle';
import { klinik as KLINIK, haritaYolTarifi } from '@/site.config';
import { h, BOLUMLER, CALISMA_SAATLERI, bolumeGit, useDar } from './temel';
import { useTedaviMenusu, TedaviTetigi, TedaviPaneli } from './tedavi-menusu';

var Fragment = React.Fragment;
var useRef = React.useRef;
var useState = React.useState;
var useEffect = React.useEffect;

  /* ------------------------------------------------------------------ */
  /* Üst gezinme                                                         */
  /* ------------------------------------------------------------------ */

  function UstGezinme(props) {
    var navRef = useRef(null);
    var yol = usePathname();
    var yonlendirici = useRouter();
    var menu = useTedaviMenusu(props.dar);

    /* Ana sayfadaki bölümlere kaydırarak, diğerlerine adres üzerinden gidilir. */
    function git(hedefId, adres) {
      menu.kapat();
      if (yol === '/' && document.getElementById(hedefId)) {
        bolumeGit(hedefId);
        return;
      }
      yonlendirici.push(adres);
    }

    /* Tedaviler başlığı hem bölüme gider hem açılır menüyü taşır. Geniş ekranda
       menü fareyle açıldığı için tıklama eskisi gibi bölüme kaydırır; dar
       ekranda fare yok, dokunuş menüyü açıp kapatır. */
    function bolumBaglantisi(b) {
      if (b.id !== 'tedaviler') return b.etiket;
      return {
        value: b.etiket,
        label: h(TedaviTetigi, { etiket: b.etiket, dar: props.dar, menu: menu })
      };
    }

    var tedavilerBolumu = BOLUMLER.find(function (b) { return b.id === 'tedaviler'; });

    useEffect(function () {
      var uygula = function () {
        var el = navRef.current;
        if (!el) return;
        var kucult = window.scrollY > 40;
        el.style.paddingTop = kucult ? '8px' : '18px';
        el.style.transform = kucult ? 'scale(.97)' : 'scale(1)';
      };
      uygula();
      window.addEventListener('scroll', uygula, { passive: true });
      return function () { window.removeEventListener('scroll', uygula); };
    }, []);

    return h('div', {
      ref: navRef,
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 40,
        padding: '18px clamp(16px,4vw,40px) 0',
        transformOrigin: 'top center',
        transition: 'padding var(--dur-base) var(--ease-glass),transform var(--dur-base) var(--ease-glass)'
      }
    },
      /* Açılır tedavi menüsü çubuğun altına asılır; konumu buradan alır. */
      h('div', { style: { position: 'relative', maxWidth: 1180, margin: '0 auto' } },
        h(NavBar, {
          brand: KLINIK.marka,
          /* Dar ekranda çubuğun kendi ölçüleri (28 px aralık, 28 px sol boşluk)
             marka + Tedaviler + randevu düğmesini 375 px'e sığdırmıyor. */
          style: props.dar ? { gap: 10, padding: '0 8px 0 16px' } : undefined,
          /* Dar ekranda bağlantı listesi 68 px’lik çubuğa sığmıyor; gezinme
             alttaki sabit eylem çubuğuna ve altbilgiye bırakılıyor. Tedaviler
             orada da durur: açılır menünün tek tutamağı odur. */
          links: props.dar
            ? [bolumBaglantisi(tedavilerBolumu)]
            : BOLUMLER.map(bolumBaglantisi),
          active: props.aktif,
          onNavigate: function (etiket) {
            var b = BOLUMLER.find(function (x) { return x.etiket === etiket; });
            if (!b) return;
            if (b.id === 'tedaviler' && props.dar) { menu.degistir(); return; }
            git(b.id, b.adres);
          },
          actions: h(Fragment, null,
            props.dar ? null : h('a', {
              href: KLINIK.telHref,
              style: {
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-strong)',
                letterSpacing: '-.01em',
                marginRight: 4
              }
            }, KLINIK.telefon),
            h(Button, {
              size: 'sm',
              onClick: function () { git('randevu', '/iletisim#randevu'); }
            }, props.dar ? 'Randevu' : 'Randevu talebi')
          )
        }),
        h(TedaviPaneli, {
          dar: props.dar,
          menu: menu,
          randevu: function () { git('randevu', '/iletisim#randevu'); },
          tumTedaviler: function () { menu.kapat(); yonlendirici.push('/tedaviler'); }
        })
      )
    );
  }

  function Altbilgi() {
    var sutunBasligi = { fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: 'var(--emerald-300)', marginBottom: 14 };
    var sutunGovde = { display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14, color: 'var(--text-on-dark-muted)' };

    /* Marka sonundaki nokta vurgu rengiyle yazılır: "Meşe" + amber "." */
    var markaAdi = KLINIK.marka.replace(/\.$/, '');
    var markaNoktali = KLINIK.marka !== markaAdi;

    /* adresTam tek satırdır; altbilgide iki satıra bölünür. */
    var adresSatirlari = KLINIK.adresTam.split(' — ');

    return h('footer', {
      style: { marginTop: 'clamp(64px,9vw,110px)', background: 'var(--emerald-900)', color: 'var(--text-on-dark)' }
    },
      h('div', { style: { maxWidth: 1180, margin: '0 auto', padding: 'clamp(44px,6vw,72px) clamp(20px,5vw,40px)' } },
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 36 } },

          h('div', null,
            h('div', {
              style: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-.035em', color: '#fff' }
            }, markaAdi, markaNoktali ? h('span', { style: { color: 'var(--amber-500)' } }, '.') : null),
            h('p', { style: { fontSize: 14, lineHeight: 1.6, color: 'var(--text-on-dark-muted)', margin: '14px 0 0', maxWidth: '32ch' } }, KLINIK.ad),
            h('p', { style: { fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,.5)', margin: '10px 0 0', maxWidth: '32ch' } }, KLINIK.ruhsat)
          ),

          h('div', null,
            h('div', { style: sutunBasligi }, 'İLETİŞİM'),
            h('div', { style: sutunGovde },
              h('a', { href: KLINIK.telHref, style: { fontFamily: 'var(--font-mono)', color: '#fff' } }, KLINIK.telefon),
              h('a', { className: 'footer-link', href: 'mailto:' + KLINIK.eposta }, KLINIK.eposta),
              h('span', null, adresSatirlari[0], adresSatirlari[1] ? h('br') : null, adresSatirlari[1])
            )
          ),

          h('div', null,
            h('div', { style: sutunBasligi }, 'ÇALIŞMA SAATLERİ'),
            h('div', { style: sutunGovde },
              CALISMA_SAATLERI.map(function (c) {
                return h('div', { key: c.ad, style: { display: 'flex', justifyContent: 'space-between', gap: 14 } },
                  h('span', null, c.ad),
                  h('span', { style: { fontFamily: 'var(--font-mono)', color: '#fff' } }, c.saat)
                );
              })
            )
          ),

          h('div', null,
            h('div', { style: sutunBasligi }, 'YASAL'),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: 9, fontSize: 14 } },
              h('a', { className: 'footer-link', href: '/kvkk' }, 'KVKK Aydınlatma Metni'),
              h('a', { className: 'footer-link', href: '/gizlilik' }, 'Gizlilik Politikası'),
              h('a', { className: 'footer-link', href: '/cerez' }, 'Çerez Politikası'),
              h('a', { className: 'footer-link', href: '/iletisim' }, 'İletişim ve ulaşım')
            )
          )
        ),

        h('div', { style: { height: 1, background: 'var(--line-on-dark)', margin: '36px 0 20px' } }),
        h('div', {
          style: { display: 'flex', flexWrap: 'wrap', gap: '8px 28px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,.55)' }
        },
          h('span', null, KLINIK.sonGuncelleme),
          h('span', null, KLINIK.editor)
        ),
        h('p', { style: { fontSize: 12, lineHeight: 1.6, color: 'rgba(255,255,255,.45)', margin: '16px 0 0', maxWidth: '84ch' } },
          'Bu site bilgilendirme amaçlıdır ve tıbbi tavsiye yerine geçmez. Sayfadaki içerikler Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik kapsamında hazırlanmıştır.')
      )
    );
  }

  /* ------------------------------------------------------------------ */
  /* Mobil eylem çubuğu                                                  */
  /* ------------------------------------------------------------------ */

  function MobilBar() {
    function ikon(yollar, ekler) {
      return h('svg', {
        width: 19, height: 19, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
        strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true'
      }, yollar.map(function (d, i) { return h('path', { key: i, d: d }); }), ekler);
    }

    return h('nav', {
      className: 'mobil-bar',
      'aria-label': 'Hızlı iletişim',
      style: {
        position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 50,
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, padding: 7,
        borderRadius: 999,
        background: 'rgba(255,255,255,.72)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: '1px solid rgba(255,255,255,.9)',
        boxShadow: 'var(--shadow-3),var(--inner-glass)'
      }
    },
      h('a', { className: 'mobil-bar-link mobil-bar-link--ara', href: KLINIK.telHref },
        ikon(['M6.2 3.6h3l1.5 3.7-2 1.3a12 12 0 0 0 5.4 5.4l1.3-2 3.7 1.5v3a1.8 1.8 0 0 1-2 1.8A16.4 16.4 0 0 1 4.4 5.6a1.8 1.8 0 0 1 1.8-2Z']),
        'Ara'
      ),
      h('a', { className: 'mobil-bar-link', href: haritaYolTarifi(), target: '_blank', rel: 'noopener' },
        ikon(
          ['M12 21c4.2-4.4 6.3-7.7 6.3-10.4A6.3 6.3 0 0 0 5.7 10.6C5.7 13.3 7.8 16.6 12 21Z'],
          h('circle', { cx: 12, cy: 10.4, r: 2.3 })
        ),
        'Yol tarifi'
      ),
      h('a', { className: 'mobil-bar-link', href: KLINIK.whatsapp, target: '_blank', rel: 'noopener' },
        ikon([
          'M20.4 11.6a8.4 8.4 0 0 1-12.3 7.5L3.6 20.4l1.3-4.5A8.4 8.4 0 1 1 20.4 11.6Z',
          'M9.3 9.1c.4 2.6 2.3 4.5 4.9 5.2l1-1.4 1.8.8v1.4c-2.9.5-6.4-2.4-7.5-5.3l1.4-.7Z'
        ]),
        'WhatsApp'
      )
    );
  }

/* ------------------------------------------------------------------ */
/* Sayfa çerçevesi                                                     */
/* ------------------------------------------------------------------ */

/** `bolumleriIzle`: ana sayfada gezinmede etkin bölümü kaydırmaya göre işaretler. */
export default function SayfaCercevesi(props) {
  var dar = useDar();
  var a = useState('');
  var aktif = a[0], setAktif = a[1];

  useEffect(function () {
    if (!props.bolumleriIzle) return;

    /* Üstten 220 px'in üzerine çıkmış bölümlerden ekranda en aşağıda olanı
       etkin sayılır; hiçbiri çıkmamışsa (sayfanın en üstü) sayfadaki ilk
       bölüm işaretlenir.

       Karşılaştırma konuma göre yapılır, dizi sırasına göre değil: BOLUMLER
       çubuktaki sırayı taşır ve o sıra sayfadaki sırayla aynı olmak zorunda
       değildir — Tedaviler menüsü çubukta Hekimler'in sağında durur. */
    var uygula = function () {
      var gecmis = '', gecmisUst = -Infinity;
      var ilk = '', ilkUst = Infinity;
      BOLUMLER.forEach(function (b) {
        var n = document.getElementById(b.id);
        if (!n) return;
        var ust = n.getBoundingClientRect().top;
        if (ust < 220 && ust > gecmisUst) { gecmisUst = ust; gecmis = b.etiket; }
        if (ust < ilkUst) { ilkUst = ust; ilk = b.etiket; }
      });
      setAktif(gecmis || ilk);
    };
    uygula();
    window.addEventListener('scroll', uygula, { passive: true });
    return function () { window.removeEventListener('scroll', uygula); };
  }, [props.bolumleriIzle]);

  return h('div', { style: { minHeight: '100vh', paddingBottom: dar ? 140 : 0, overflowX: 'hidden' } },
    h('a', { className: 'skip-link', href: '#icerik' }, 'İçeriğe geç'),
    h(UstGezinme, { dar: dar, aktif: props.bolumleriIzle ? aktif : props.aktif }),
    h('main', { id: 'icerik' }, props.children),
    h(Altbilgi),
    dar ? h(MobilBar) : null
  );
}
