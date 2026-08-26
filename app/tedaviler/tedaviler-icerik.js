'use client';

/* Tüm tedaviler dizini (/tedaviler).

   İki katmanı bir arada gösterir: üstte altı ana dal (tedaviler[]), altında
   kliniğin işlemleri kategori kategori (tedaviMenusu). Menüdeki panelle aynı
   listeyi kullanır, ama panel gezinme için dar ve kısa; burası taranmak için
   geniş ve açıklamalıdır.

   İçeriği yazılmış kalem bağlantı olur, yazılmamış kalem satır olarak durur:
   liste eksiksiz kalsın, ziyaretçi kliniğin ne yaptığını görsün. */

import { Card } from '@/ds/bundle';
import {
  tedaviler as TEDAVILER,
  tedaviMenusu as MENU,
  tedavilerSayfasi as METIN
} from '@/site.config';
import SayfaCercevesi from '../_ortak/cerceve';
import RandevuKarti from '../_ortak/randevu-karti';
import { h, S, BolumBasligi, tedaviSimgesi } from '../_ortak/temel';

function Dallar() {
  return h('div', { style: { marginTop: 36 } },
    h('h2', { style: Object.assign({}, S.h2, { fontSize: 'clamp(20px,2.4vw,26px)' }) }, METIN.dallarBaslik),
    h('p', {
      style: { fontSize: 15, lineHeight: 1.62, color: 'var(--text-muted)', margin: '10px 0 0', maxWidth: '58ch' }
    }, METIN.dallarGiris),
    h('div', { style: Object.assign({}, S.izgara(240), { marginTop: 22 }) },
      TEDAVILER.map(function (t) {
        return h('a', {
          key: t.id,
          href: '/tedaviler/' + t.id,
          style: { display: 'block', color: 'inherit' }
        },
          h(Card, { tone: 'cream', padding: 'md', interactive: true },
            h('div', {
              style: {
                width: 42, height: 42, borderRadius: 12,
                background: t.ton === 'amber' ? 'var(--amber-100)' : 'var(--emerald-100)',
                color: t.ton === 'amber' ? 'var(--amber-700)' : 'var(--emerald-700)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, tedaviSimgesi(t.id)),
            h('h3', { style: Object.assign({}, S.h3, { fontSize: 17, margin: '14px 0 0' }) }, t.ad),
            h('p', { style: Object.assign({}, S.kartMetin, { marginTop: 8 }) }, t.ozet)
          )
        );
      })
    )
  );
}

function Kategori(props) {
  var k = props.kategori;
  return h(Card, { tone: 'plain', padding: 'md' },
    h('h3', {
      style: {
        fontSize: 12, letterSpacing: '.13em', fontWeight: 700,
        textTransform: 'uppercase', color: 'var(--emerald-700)',
        margin: 0, paddingBottom: 12, borderBottom: '1px solid var(--line-soft)'
      }
    }, k.baslik),
    h('ul', {
      style: { listStyle: 'none', margin: '12px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }
    },
      k.kalemler.map(function (kalem) {
        var yazildi = typeof kalem !== 'string';
        var ad = yazildi ? kalem.ad : kalem;

        if (!yazildi) {
          return h('li', { key: ad },
            h('span', { className: 'tedavi-dizin-kalem tedavi-dizin-kalem--pasif' }, ad)
          );
        }

        return h('li', { key: ad },
          h('a', { className: 'tedavi-dizin-kalem', href: '/tedaviler/' + kalem.slug },
            h('span', null,
              h('span', { style: { display: 'block' } }, ad),
              h('span', {
                style: { display: 'block', fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-muted)', marginTop: 2 }
              }, kalem.ozet)
            ),
            h('span', { className: 'tedavi-dizin-ok', 'aria-hidden': 'true' }, '→')
          )
        );
      })
    )
  );
}

/* Sayfası yazılmamış kalem kaldı mı? Liste tamamlandığında açıklama satırı
   kendiliğinden kalkar. */
function bekleyenVar() {
  return MENU.kategoriler.some(function (k) {
    return k.kalemler.some(function (kalem) { return typeof kalem === 'string'; });
  });
}

export default function TedavilerIcerik() {
  return h(SayfaCercevesi, { aktif: 'Tedaviler' },
    h('section', { style: S.bolum },

      h('nav', { 'aria-label': 'Konum', style: { marginBottom: 22, fontSize: 13.5, color: 'var(--text-muted)' } },
        h('a', { href: '/' }, 'Ana sayfa'),
        h('span', { style: { margin: '0 8px', color: 'var(--text-faint)' } }, '/'),
        h('span', { style: { color: 'var(--text-strong)' } }, 'Tedaviler')
      ),

      h(BolumBasligi, {
        seviye: 'h1',
        numara: '',
        kas: METIN.kas,
        baslik: METIN.baslik,
        giris: METIN.giris
      }),

      h(Dallar),

      h('div', { style: { marginTop: 48 } },
        h('div', { style: S.ayirici }),
        bekleyenVar()
          ? h('p', {
              style: {
                fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)',
                margin: '24px 0 0', maxWidth: '58ch'
              }
            }, METIN.hazirlanan)
          : null,
        h('div', { style: Object.assign({}, S.izgara(300), { marginTop: 28, alignItems: 'start' }) },
          MENU.kategoriler.map(function (k) {
            return h(Kategori, { key: k.baslik, kategori: k });
          })
        )
      ),

      h(RandevuKarti)
    )
  );
}
