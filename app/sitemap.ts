import type { MetadataRoute } from 'next';

import { islemler, site, tedaviler } from '@/site.config';

/* Adres listesi config'ten üretilir; yeni tedavi eklendiğinde site haritasına
   da kendiliğinden girer. Yasal metinler bilerek dışarıda tutulur.

   Tarih derleme anından değil içerikten gelir. Derleme anı yazıldığında her
   yayın bütün sayfaların değiştiğini iddia ediyordu — arama motoru bir süre
   sonra o alana bakmayı bırakır. Sayfanın kendi `guncelleme` alanı varsa o,
   yoksa `site.icerikGuncelleme` kullanılır. */

/** 'YYYY-AA-GG' metnini tarihe çevirir; biçim tutmuyorsa site tarihine düşer. */
function tarih(deger: string | undefined, yedek: Date) {
  if (!deger) return yedek;
  const cozulen = new Date(`${deger}T00:00:00Z`);
  return Number.isNaN(cozulen.getTime()) ? yedek : cozulen;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteTarihi = tarih(site.icerikGuncelleme, new Date());

  const sayfalar: { yol: string; oncelik: number; tarih: Date }[] = [
    { yol: '/', oncelik: 1, tarih: siteTarihi },
    { yol: '/hekimler', oncelik: 0.7, tarih: siteTarihi },
    { yol: '/iletisim', oncelik: 0.8, tarih: siteTarihi },
    { yol: '/tedaviler', oncelik: 0.9, tarih: siteTarihi },
    ...tedaviler.map((t) => ({
      yol: `/tedaviler/${t.id}`,
      oncelik: 0.9,
      tarih: tarih(t.guncelleme, siteTarihi)
    })),
    ...islemler.map((i) => ({
      yol: `/tedaviler/${i.slug}`,
      oncelik: 0.8,
      tarih: tarih(i.guncelleme, siteTarihi)
    }))
  ];

  return sayfalar.map(({ yol, oncelik, tarih: guncelleme }) => ({
    url: `${site.adres}${yol}`,
    lastModified: guncelleme,
    changeFrequency: 'monthly' as const,
    priority: oncelik
  }));
}
