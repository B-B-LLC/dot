import type { Metadata } from 'next';

import { klinik } from '@/site.config';
import { gizlilikMetni } from '@/yasal.config';
import { YapisalVeri, yasalVeri } from '../_ortak/yapisal-veri';
import YasalSayfa from '../_ortak/yasal-sayfa';

export const metadata: Metadata = {
  title: `${gizlilikMetni.baslik} — ${klinik.ad}`,
  description: gizlilikMetni.ozet,
  alternates: { canonical: '/gizlilik' },
  robots: { index: false, follow: true }
};

export default function GizlilikSayfasi() {
  return (
    <>
      <YapisalVeri veri={yasalVeri('/gizlilik', gizlilikMetni)} />
      <YasalSayfa metin={gizlilikMetni} />
    </>
  );
}
