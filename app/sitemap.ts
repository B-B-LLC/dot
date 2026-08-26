import type { MetadataRoute } from 'next';

import { islemler, site, tedaviler } from '@/site.config';

/* Adres listesi config'ten üretilir; yeni tedavi eklendiğinde site haritasına
   da kendiliğinden girer. Yasal metinler bilerek dışarıda tutulur. */
export default function sitemap(): MetadataRoute.Sitemap {
  const guncelleme = new Date();

  const sayfalar: { yol: string; oncelik: number }[] = [
    { yol: '/', oncelik: 1 },
    { yol: '/hekimler', oncelik: 0.7 },
    { yol: '/iletisim', oncelik: 0.8 },
    { yol: '/tedaviler', oncelik: 0.9 },
    ...tedaviler.map((t) => ({ yol: `/tedaviler/${t.id}`, oncelik: 0.9 })),
    ...islemler.map((i) => ({ yol: `/tedaviler/${i.slug}`, oncelik: 0.8 }))
  ];

  return sayfalar.map(({ yol, oncelik }) => ({
    url: `${site.adres}${yol}`,
    lastModified: guncelleme,
    changeFrequency: 'monthly' as const,
    priority: oncelik
  }));
}
