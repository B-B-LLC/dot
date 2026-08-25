'use client';

import { Button, Card } from '@/ds/bundle';
import { klinik as KLINIK, tedaviler as TEDAVILER } from '@/site.config';
import SayfaCercevesi from './cerceve';
import { h, S, BolumBasligi } from './temel';

export default function BulunamadiIcerik() {
  return h(SayfaCercevesi, null,
    h('section', { style: S.bolum },
      h(BolumBasligi, {
        seviye: 'h1',
        numara: '404',
        kas: 'SAYFA BULUNAMADI',
        baslik: 'Aradığınız sayfaya ulaşılamadı',
        giris:
          'Bağlantı değişmiş ya da sayfa kaldırılmış olabilir. Aşağıdaki başlıklardan devam ' +
          'edebilir veya danışmayı arayabilirsiniz.'
      }),

      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 } },
        h(Button, { size: 'lg', as: 'a', href: '/' }, 'Ana sayfa'),
        h(Button, { size: 'lg', variant: 'cream', as: 'a', href: KLINIK.telHref }, KLINIK.telefon)
      ),

      h('div', { style: Object.assign({}, S.izgara(240), { marginTop: 40 }) },
        TEDAVILER.map(function (t) {
          return h('a', {
            key: t.id,
            href: '/tedaviler/' + t.id,
            style: { display: 'block', color: 'inherit' }
          },
            h(Card, { tone: 'cream', padding: 'md', interactive: true },
              h('h2', { style: Object.assign({}, S.h3, { fontSize: 17 }) }, t.ad)
            )
          );
        })
      )
    )
  );
}
