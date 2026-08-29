import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { islemler, sayfaBasligi, tedaviler } from '@/site.config';
import type { Kirinti } from '../../_ortak/yapisal-veri';
import { YapisalVeri, islemVeri, sayfaVeri } from '../../_ortak/yapisal-veri';
import { ustveri } from '../../_ortak/ustveri';
import IslemIcerik from './islem-icerik';
import TedaviIcerik from './tedavi-icerik';

type Props = { params: Promise<{ id: string }> };

/* Bu segment iki tür sayfayı taşır: altı ana dal (tedaviler[]) ve menüde
   içeriği yazılmış işlemler (islemler[]). İkisi de config'ten üretilir, yani
   yeni bir kalem eklendiğinde sayfası kendiliğinden oluşur. Slug çakışması
   site.config.ts içinde derleme anında yakalanır. */
export function generateStaticParams() {
  return [
    ...tedaviler.map((t) => ({ id: t.id })),
    ...islemler.map((i) => ({ id: i.slug }))
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tedavi = tedaviler.find((t) => t.id === id);
  const islem = tedavi ? undefined : islemler.find((i) => i.slug === id);
  const sayfa = tedavi ?? islem;
  if (!sayfa) return {};

  const aciklama = tedavi ? tedavi.metaAciklama : islem!.metaAciklama ?? islem!.ozet;
  return ustveri({
    yol: `/tedaviler/${id}`,
    ad: sayfa.ad,
    aciklama,
    tur: 'article'
  });
}

export default async function TedaviSayfasi({ params }: Props) {
  const { id } = await params;
  const yol = `/tedaviler/${id}`;

  const tedavi = tedaviler.find((t) => t.id === id);
  if (tedavi) {
    return (
      <>
        <YapisalVeri
          veri={sayfaVeri({
            yol,
            tur: 'MedicalWebPage',
            baslik: sayfaBasligi(tedavi.ad),
            aciklama: tedavi.metaAciklama,
            kirintilar: [
              { ad: 'Ana sayfa', yol: '/' },
              { ad: 'Tedaviler', yol: '/tedaviler' },
              { ad: tedavi.ad }
            ],
            hakkinda: islemVeri({ yol, ad: tedavi.ad, aciklama: tedavi.ozet }),
            sorular: tedavi.sorular
          })}
        />
        <TedaviIcerik id={id} />
      </>
    );
  }

  const islem = islemler.find((i) => i.slug === id);
  if (islem) {
    const dal = islem.dal ? tedaviler.find((t) => t.id === islem.dal) : undefined;
    /* Kırıntı, sayfada görünenin aynısıdır: dal biliniyorsa ara basamak o
       dalın sayfasıdır, bilinmiyorsa dizin sayfasında kalınır. */
    const kirintilar: Kirinti[] = [
      { ad: 'Ana sayfa', yol: '/' },
      { ad: 'Tedaviler', yol: '/tedaviler' },
      ...(dal ? [{ ad: dal.ad, yol: `/tedaviler/${dal.id}` }] : []),
      { ad: islem.ad }
    ];
    return (
      <>
        <YapisalVeri
          veri={sayfaVeri({
            yol,
            tur: 'MedicalWebPage',
            baslik: sayfaBasligi(islem.ad),
            aciklama: islem.metaAciklama ?? islem.ozet,
            kirintilar,
            hakkinda: islemVeri({ yol, ad: islem.ad, aciklama: islem.ozet }),
            sorular: islem.sorular
          })}
        />
        <IslemIcerik slug={id} />
      </>
    );
  }

  notFound();
}
