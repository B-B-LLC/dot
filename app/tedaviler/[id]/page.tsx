import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { islemler, klinik, tedaviler } from '@/site.config';
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

  const baslik = `${sayfa.ad} — ${klinik.ad}`;
  const aciklama = tedavi ? tedavi.metaAciklama : islem!.metaAciklama ?? islem!.ozet;
  return {
    title: baslik,
    description: aciklama,
    alternates: { canonical: `/tedaviler/${id}` },
    openGraph: {
      type: 'article',
      locale: 'tr_TR',
      title: baslik,
      description: aciklama
    }
  };
}

export default async function TedaviSayfasi({ params }: Props) {
  const { id } = await params;

  if (tedaviler.some((t) => t.id === id)) return <TedaviIcerik id={id} />;
  if (islemler.some((i) => i.slug === id)) return <IslemIcerik slug={id} />;

  notFound();
}
