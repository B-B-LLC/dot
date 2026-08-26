'use client';

/* Tek bir tedavinin sayfası. İçeriğin tamamı site.config.ts'ten gelir;
   yeni bir tedavi eklendiğinde bu dosyaya dokunmak gerekmez. */

import * as React from 'react';
import { Card, Button } from '@/ds/bundle';
import { klinik as KLINIK, tedaviler as TEDAVILER } from '@/site.config';
import SayfaCercevesi from '../../_ortak/cerceve';
import RandevuKarti from '../../_ortak/randevu-karti';
import { h, S, BolumBasligi, iki, tedaviSimgesi } from '../../_ortak/temel';

function Asamalar(props) {
  return h('ol', {
    style: { listStyle: 'none', margin: '36px 0 0', padding: 0, display: 'grid', gap: 16 }
  },
    props.asamalar.map(function (a, i) {
      return h('li', { key: a.baslik },
        h(Card, { tone: 'cream', padding: 'md' },
          h('div', { style: { display: 'flex', gap: 16, alignItems: 'flex-start' } },
            h('span', {
              style: {
                fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500,
                color: 'var(--emerald-600)', paddingTop: 3, flex: '0 0 auto'
              }
            }, iki(i + 1)),
            h('div', null,
              h('h3', { style: S.h3 }, a.baslik),
              h('p', { style: S.kartMetin }, a.metin)
            )
          )
        )
      );
    })
  );
}

function Notlar(props) {
  return h(Card, { tone: 'emerald', padding: 'lg', style: { marginTop: 32 } },
    h('div', {
      style: { fontSize: 12, letterSpacing: '.14em', fontWeight: 700, color: 'var(--emerald-300)' }
    }, 'SÜREÇ BOYUNCA'),
    h('ul', {
      style: { listStyle: 'none', margin: '20px 0 0', padding: 0, display: 'grid', gap: 14 }
    },
      props.notlar.map(function (n, i) {
        return h('li', { key: i, style: { display: 'flex', gap: 14, alignItems: 'flex-start' } },
          h('span', {
            style: { fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--emerald-300)', paddingTop: 2 }
          }, iki(i + 1)),
          h('p', {
            style: { margin: 0, color: 'var(--text-on-dark-muted)', fontSize: 14.5, lineHeight: 1.55 }
          }, n)
        );
      })
    )
  );
}

function Sorular(props) {
  return h('div', { style: { marginTop: 32 } },
    h('h2', { style: Object.assign({}, S.h2, { fontSize: 'clamp(22px,2.6vw,28px)' }) }, 'Sık sorulanlar'),
    h('div', { style: { display: 'grid', gap: 14, marginTop: 20 } },
      props.sorular.map(function (s) {
        return h(Card, { key: s.soru, tone: 'plain', padding: 'md' },
          h('h3', { style: S.h3 }, s.soru),
          h('p', { style: S.kartMetin }, s.cevap)
        );
      })
    )
  );
}

function DigerTedaviler(props) {
  var digerleri = TEDAVILER.filter(function (t) { return t.id !== props.simdiki; });

  return h('div', { style: { marginTop: 48 } },
    h('div', { style: S.ayirici }),
    h('h2', {
      style: Object.assign({}, S.h2, { fontSize: 'clamp(20px,2.2vw,24px)', margin: '32px 0 0' })
    }, 'Diğer tedavi alanları'),
    h('div', { style: Object.assign({}, S.izgara(240), { marginTop: 20 }) },
      digerleri.map(function (t) {
        return h('a', {
          key: t.id,
          href: '/tedaviler/' + t.id,
          style: { display: 'block', color: 'inherit' }
        },
          h(Card, { tone: 'cream', padding: 'md', interactive: true },
            h('div', {
              style: {
                width: 40, height: 40, borderRadius: 12,
                background: t.ton === 'amber' ? 'var(--amber-100)' : 'var(--emerald-100)',
                color: t.ton === 'amber' ? 'var(--amber-700)' : 'var(--emerald-700)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, tedaviSimgesi(t.id)),
            h('h3', { style: Object.assign({}, S.h3, { fontSize: 17, margin: '14px 0 0' }) }, t.ad)
          )
        );
      })
    )
  );
}

export default function TedaviIcerik(props) {
  var tedavi = TEDAVILER.find(function (t) { return t.id === props.id; });
  if (!tedavi) return null;

  return h(SayfaCercevesi, { aktif: 'Tedaviler' },
    h('section', { style: S.bolum },

      h('nav', { 'aria-label': 'Konum', style: { marginBottom: 22, fontSize: 13.5, color: 'var(--text-muted)' } },
        h('a', { href: '/' }, 'Ana sayfa'),
        h('span', { style: { margin: '0 8px', color: 'var(--text-faint)' } }, '/'),
        h('a', { href: '/#tedaviler' }, 'Tedaviler'),
        h('span', { style: { margin: '0 8px', color: 'var(--text-faint)' } }, '/'),
        h('span', { style: { color: 'var(--text-strong)' } }, tedavi.ad)
      ),

      h('div', { style: { display: 'flex', gap: 18, alignItems: 'flex-start' } },
        h('div', {
          style: {
            width: 54, height: 54, borderRadius: 15, flex: '0 0 auto',
            background: tedavi.ton === 'amber' ? 'var(--amber-100)' : 'var(--emerald-100)',
            color: tedavi.ton === 'amber' ? 'var(--amber-700)' : 'var(--emerald-700)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }
        }, tedaviSimgesi(tedavi.id)),
        h(BolumBasligi, {
          seviye: 'h1',
          numara: '',
          kas: 'TEDAVİ ALANI',
          baslik: tedavi.ad,
          giris: tedavi.giris
        })
      ),

      h(Asamalar, { asamalar: tedavi.asamalar }),
      h(Notlar, { notlar: tedavi.notlar }),
      h(Sorular, { sorular: tedavi.sorular }),

      h('p', { style: S.dipnot },
        'Bu sayfadaki bilgiler genel süreci anlatır ve tıbbi tavsiye yerine geçmez. ' +
        'Sonuçlar kişiden kişiye değişiklik gösterir; uygulanacak yöntem muayene sonrasında belirlenir.'),

      h(RandevuKarti),

      h(DigerTedaviler, { simdiki: tedavi.id })
    )
  );
}

/* İşlem sayfası (islem-icerik.js) bu iki parçayı olduğu gibi kullanır; görünüm
   iki sayfada da aynı kalsın diye kopyalanmaz. */
export { Notlar, Sorular };
