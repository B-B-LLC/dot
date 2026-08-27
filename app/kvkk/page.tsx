import type { Metadata } from 'next';

import { klinik } from '@/site.config';
import { kvkkMetni } from '@/yasal.config';
import { YapisalVeri, yasalVeri } from '../_ortak/yapisal-veri';
import YasalSayfa from '../_ortak/yasal-sayfa';

export const metadata: Metadata = {
  title: `${kvkkMetni.baslik} — ${klinik.ad}`,
  description: kvkkMetni.ozet,
  alternates: { canonical: '/kvkk' },
  robots: { index: false, follow: true }
};

export default function KvkkSayfasi() {
  return (
    <>
      <YapisalVeri veri={yasalVeri('/kvkk', kvkkMetni)} />
      <YasalSayfa metin={kvkkMetni} />
    </>
  );
}
