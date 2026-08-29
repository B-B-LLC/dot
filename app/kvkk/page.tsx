import type { Metadata } from 'next';

import { kvkkMetni } from '@/yasal.config';
import { YapisalVeri, yasalVeri } from '../_ortak/yapisal-veri';
import { ustveri } from '../_ortak/ustveri';
import YasalSayfa from '../_ortak/yasal-sayfa';

export const metadata: Metadata = ustveri({
  yol: '/kvkk',
  ad: kvkkMetni.baslik,
  aciklama: kvkkMetni.ozet,
  dizinDisi: true
});

export default function KvkkSayfasi() {
  return (
    <>
      <YapisalVeri veri={yasalVeri('/kvkk', kvkkMetni)} />
      <YasalSayfa metin={kvkkMetni} />
    </>
  );
}
