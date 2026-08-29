import type { Metadata } from 'next';

import { sayfaBasligi } from '@/site.config';
import BulunamadiIcerik from './_ortak/bulunamadi-icerik';

/* Kendi adresi olmayan bir ekran: canonical ve og:url verilmez, o yüzden
   ustveri() yerine elle yazılır. */
export const metadata: Metadata = {
  title: sayfaBasligi('Sayfa bulunamadı'),
  robots: { index: false, follow: true }
};

export default function Bulunamadi() {
  return <BulunamadiIcerik />;
}
