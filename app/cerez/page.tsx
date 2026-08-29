import type { Metadata } from 'next';

import { cerezMetni } from '@/yasal.config';
import { YapisalVeri, yasalVeri } from '../_ortak/yapisal-veri';
import { ustveri } from '../_ortak/ustveri';
import YasalSayfa from '../_ortak/yasal-sayfa';

export const metadata: Metadata = ustveri({
  yol: '/cerez',
  ad: cerezMetni.baslik,
  aciklama: cerezMetni.ozet,
  dizinDisi: true
});

export default function CerezSayfasi() {
  return (
    <>
      <YapisalVeri veri={yasalVeri('/cerez', cerezMetni)} />
      <YasalSayfa metin={cerezMetni} />
    </>
  );
}
