'use client';

/* KVKK ve çerez politikası sayfalarının ortak düzeni.
   İçerik yasal.config.ts'ten gelir. */

import { Card } from '@/ds/bundle';
import { klinik as KLINIK } from '@/site.config';
import SayfaCercevesi from './cerceve';
import { h, S, BolumBasligi } from './temel';

export default function YasalSayfa(props) {
  var metin = props.metin;

  return h(SayfaCercevesi, null,
    h('section', { style: S.bolum },

      h('nav', {
        'aria-label': 'Konum',
        style: { marginBottom: 22, fontSize: 13.5, color: 'var(--text-muted)' }
      },
        h('a', { href: '/' }, 'Ana sayfa'),
        h('span', { style: { margin: '0 8px', color: 'var(--text-faint)' } }, '/'),
        h('span', { style: { color: 'var(--text-strong)' } }, metin.baslik)
      ),

      h(BolumBasligi, {
        numara: '',
        kas: 'YASAL',
        baslik: metin.baslik,
        giris: metin.ozet
      }),

      h('div', { style: { display: 'grid', gap: 16, marginTop: 36, maxWidth: 820 } },
        metin.bolumler.map(function (b) {
          return h(Card, { key: b.baslik, tone: 'cream', padding: 'md' },
            h('h2', { style: Object.assign({}, S.h3, { fontSize: 18 }) }, b.baslik),
            b.paragraflar.map(function (p, i) {
              return h('p', {
                key: i,
                style: { fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-muted)', margin: '10px 0 0' }
              }, p);
            })
          );
        })
      ),

      h('p', { style: S.dipnot }, KLINIK.sonGuncelleme, ' · ', KLINIK.editor)
    )
  );
}
