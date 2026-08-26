'use client';

/* Tek bir işlemin sayfası (/tedaviler/<slug>).

   Ana dal sayfasından (tedavi-icerik.js) ayrı durur çünkü gövdesi aşamalı bir
   süreç değil, serbest başlıklı bölümlerdir; süreç sırası olmayan işlemlerde
   numaralı liste yanlış bilgi verir. Notlar ve sık sorulanlar dal
   sayfasından, randevu kartı _ortak'tan alınır: iki sayfa aynı görünsün.

   İçeriğin tamamı site.config.ts'teki menü kaleminden gelir; yeni bir işlem
   yazıldığında bu dosyaya dokunmak gerekmez. */

import { Card } from '@/ds/bundle';
import { islemler as ISLEMLER, tedaviler as TEDAVILER } from '@/site.config';
import SayfaCercevesi from '../../_ortak/cerceve';
import RandevuKarti from '../../_ortak/randevu-karti';
import { h, S, BolumBasligi, tedaviSimgesi } from '../../_ortak/temel';
import { Notlar, Sorular } from './tedavi-icerik';

function Bolumler(props) {
  return h('div', { style: { display: 'grid', gap: 16, marginTop: 36 } },
    props.bolumler.map(function (b) {
      return h(Card, { key: b.baslik, tone: 'cream', padding: 'md' },
        h('h2', { style: Object.assign({}, S.h3, { fontSize: 18 }) }, b.baslik),
        h('p', { style: S.kartMetin }, b.metin)
      );
    })
  );
}

/* Aynı kategorideki komşu işlemler. Sayfası olmayan kalemler listede
   görünmez: bağlantısız satır burada bir işe yaramaz. */
function Komsular(props) {
  var digerleri = ISLEMLER.filter(function (i) {
    return i.kategori === props.kategori && i.slug !== props.simdiki;
  });
  if (!digerleri.length) return null;

  return h('div', { style: { marginTop: 48 } },
    h('div', { style: S.ayirici }),
    h('h2', {
      style: Object.assign({}, S.h2, { fontSize: 'clamp(20px,2.4vw,24px)', marginTop: 28 })
    }, props.kategori + ' başlığındaki diğer işlemler'),
    h('div', { style: Object.assign({}, S.izgara(260), { marginTop: 20 }) },
      digerleri.map(function (i) {
        return h('a', {
          key: i.slug,
          href: '/tedaviler/' + i.slug,
          style: { display: 'block', color: 'inherit' }
        },
          h(Card, { tone: 'plain', padding: 'md', interactive: true },
            h('h3', { style: Object.assign({}, S.h3, { fontSize: 17 }) }, i.ad),
            h('p', { style: Object.assign({}, S.kartMetin, { marginTop: 8 }) }, i.ozet)
          )
        );
      })
    )
  );
}

export default function IslemIcerik(props) {
  var islem = ISLEMLER.find(function (i) { return i.slug === props.slug; });
  if (!islem) return null;

  var dal = islem.dal
    ? TEDAVILER.find(function (t) { return t.id === islem.dal; })
    : undefined;

  return h(SayfaCercevesi, { aktif: 'Tedaviler' },
    h('section', { style: S.bolum },

      /* Kırıntı gezinme: dal biliniyorsa ara basamak o dalın sayfasıdır,
         bilinmiyorsa dizin sayfasında kalınır. */
      h('nav', { 'aria-label': 'Konum', style: { marginBottom: 22, fontSize: 13.5, color: 'var(--text-muted)' } },
        h('a', { href: '/' }, 'Ana sayfa'),
        h('span', { style: { margin: '0 8px', color: 'var(--text-faint)' } }, '/'),
        h('a', { href: '/tedaviler' }, 'Tedaviler'),
        dal
          ? h('span', null,
              h('span', { style: { margin: '0 8px', color: 'var(--text-faint)' } }, '/'),
              h('a', { href: '/tedaviler/' + dal.id }, dal.ad)
            )
          : null,
        h('span', { style: { margin: '0 8px', color: 'var(--text-faint)' } }, '/'),
        h('span', { style: { color: 'var(--text-strong)' } }, islem.ad)
      ),

      h('div', { style: { display: 'flex', gap: 18, alignItems: 'flex-start' } },
        dal
          ? h('div', {
              style: {
                width: 54, height: 54, borderRadius: 15, flex: '0 0 auto',
                background: dal.ton === 'amber' ? 'var(--amber-100)' : 'var(--emerald-100)',
                color: dal.ton === 'amber' ? 'var(--amber-700)' : 'var(--emerald-700)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }
            }, tedaviSimgesi(dal.id))
          : null,
        h(BolumBasligi, {
          seviye: 'h1',
          numara: '',
          kas: islem.kategori.toLocaleUpperCase('tr-TR'),
          baslik: islem.ad,
          giris: islem.giris
        })
      ),

      h(Bolumler, { bolumler: islem.bolumler }),
      islem.notlar && islem.notlar.length ? h(Notlar, { notlar: islem.notlar }) : null,
      islem.sorular && islem.sorular.length ? h(Sorular, { sorular: islem.sorular }) : null,

      h('p', { style: S.dipnot },
        'Bu sayfadaki bilgiler genel süreci anlatır ve tıbbi tavsiye yerine geçmez. ' +
        'Sonuçlar kişiden kişiye değişiklik gösterir; uygulanacak yöntem muayene sonrasında belirlenir.'),

      h(RandevuKarti),

      h(Komsular, { kategori: islem.kategori, simdiki: islem.slug })
    )
  );
}
