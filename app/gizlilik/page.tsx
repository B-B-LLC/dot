import type { Metadata } from 'next';

import { klinik } from '@/site.config';
import { gizlilikMetni } from '@/yasal.config';
import YasalSayfa from '../_ortak/yasal-sayfa';

export const metadata: Metadata = {
  title: `${gizlilikMetni.baslik} — ${klinik.ad}`,
  description: gizlilikMetni.ozet,
  alternates: { canonical: '/gizlilik' },
  robots: { index: false, follow: true }
};

export default function GizlilikSayfasi() {
  return <YasalSayfa metin={gizlilikMetni} />;
}
