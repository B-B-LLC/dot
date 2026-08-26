import type { Metadata } from 'next';

import { klinik, tedavilerSayfasi } from '@/site.config';
import TedavilerIcerik from './tedaviler-icerik';

/* Tüm tedaviler dizini. Menüdeki "Tüm tedaviler" düğmesi buraya gelir ve
   işlem sayfalarının tamamı buradan bağlanır. */

export const metadata: Metadata = {
  title: `${tedavilerSayfasi.baslik} — ${klinik.ad}`,
  description: tedavilerSayfasi.metaAciklama,
  alternates: { canonical: '/tedaviler' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    title: `${tedavilerSayfasi.baslik} — ${klinik.ad}`,
    description: tedavilerSayfasi.metaAciklama
  }
};

export default function TedavilerSayfasi() {
  return <TedavilerIcerik />;
}
