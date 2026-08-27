import type { Metadata } from 'next';

import { klinik } from '@/site.config';
import { cerezMetni } from '@/yasal.config';
import { YapisalVeri, yasalVeri } from '../_ortak/yapisal-veri';
import YasalSayfa from '../_ortak/yasal-sayfa';

export const metadata: Metadata = {
  title: `${cerezMetni.baslik} — ${klinik.ad}`,
  description: cerezMetni.ozet,
  alternates: { canonical: '/cerez' },
  robots: { index: false, follow: true }
};

export default function CerezSayfasi() {
  return (
    <>
      <YapisalVeri veri={yasalVeri('/cerez', cerezMetni)} />
      <YasalSayfa metin={cerezMetni} />
    </>
  );
}
