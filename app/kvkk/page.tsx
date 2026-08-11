import type { Metadata } from 'next';

import { klinik } from '@/site.config';
import { kvkkMetni } from '@/yasal.config';
import YasalSayfa from '../_ortak/yasal-sayfa';

export const metadata: Metadata = {
  title: `${kvkkMetni.baslik} — ${klinik.ad}`,
  description: kvkkMetni.ozet,
  alternates: { canonical: '/kvkk' },
  robots: { index: false, follow: true }
};

export default function KvkkSayfasi() {
  return <YasalSayfa metin={kvkkMetni} />;
}
