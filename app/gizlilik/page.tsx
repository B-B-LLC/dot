import type { Metadata } from 'next';

import { gizlilikMetni } from '@/yasal.config';
import { YapisalVeri, yasalVeri } from '../_ortak/yapisal-veri';
import { ustveri } from '../_ortak/ustveri';
import YasalSayfa from '../_ortak/yasal-sayfa';

export const metadata: Metadata = ustveri({
  yol: '/gizlilik',
  ad: gizlilikMetni.baslik,
  aciklama: gizlilikMetni.ozet,
  dizinDisi: true
});

export default function GizlilikSayfasi() {
  return (
    <>
      <YapisalVeri veri={yasalVeri('/gizlilik', gizlilikMetni)} />
      <YasalSayfa metin={gizlilikMetni} />
    </>
  );
}
