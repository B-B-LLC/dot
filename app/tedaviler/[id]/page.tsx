import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { klinik, tedaviler } from '@/site.config';
import TedaviIcerik from './tedavi-icerik';

type Props = { params: Promise<{ id: string }> };

/* Adresler config'teki listeden üretilir: yeni tedavi eklendiğinde
   sayfası kendiliğinden oluşur. */
export function generateStaticParams() {
  return tedaviler.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tedavi = tedaviler.find((t) => t.id === id);
  if (!tedavi) return {};

  const baslik = `${tedavi.ad} — ${klinik.ad}`;
  return {
    title: baslik,
    description: tedavi.metaAciklama,
    alternates: { canonical: `/tedaviler/${tedavi.id}` },
    openGraph: {
      type: 'article',
      locale: 'tr_TR',
      title: baslik,
      description: tedavi.metaAciklama
    }
  };
}

export default async function TedaviSayfasi({ params }: Props) {
  const { id } = await params;
  if (!tedaviler.some((t) => t.id === id)) notFound();

  return <TedaviIcerik id={id} />;
}
