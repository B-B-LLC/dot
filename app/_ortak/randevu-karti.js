'use client';

/* Tedavi, işlem ve tüm tedaviler sayfalarının sonunda duran çağrı kartı.
   Üçünde de aynı göründüğü için tek yerde durur. */

import { Card, Button } from '@/ds/bundle';
import { klinik as KLINIK } from '@/site.config';
import { h, S } from './temel';

export default function RandevuKarti() {
  return h(Card, { tone: 'glass', padding: 'lg', style: { marginTop: 32 } },
    h('h2', {
      style: Object.assign({}, S.h2, { fontSize: 'clamp(20px,2.4vw,26px)' })
    }, 'Değerlendirme için randevu'),
    h('p', {
      style: { fontSize: 15, lineHeight: 1.62, color: 'var(--text-muted)', margin: '10px 0 0', maxWidth: '52ch' }
    }, 'İlk randevuda muayene yapılır, bulgular anlatılır ve seçenekler konuşulur. Danışma çalışma saatleri içinde size dönüş yapar.'),
    h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 22 } },
      h(Button, { size: 'lg', as: 'a', href: '/iletisim#randevu' }, 'Randevu talebi'),
      h(Button, { size: 'lg', variant: 'cream', as: 'a', href: KLINIK.telHref }, KLINIK.telefon)
    )
  );
}
