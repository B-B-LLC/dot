import type { Metadata } from 'next';

import { klinik, hekimler } from '@/site.config';
import HekimlerIcerik from './hekimler-icerik';

const uzmanlar = hekimler.filter((hekim) => hekim.akademik !== '—').length;

export const metadata: Metadata = {
  title: `Hekim kadrosu — ${klinik.ad}`,
  description:
    `Poliklinikte görev yapan ${hekimler.length} diş hekimi` +
    (uzmanlar ? `, ${uzmanlar} uzman hekim` : '') +
    '. Mezuniyet ve uzmanlık bilgileri.',
  alternates: { canonical: '/hekimler' }
};

export default function HekimlerSayfasi() {
  return <HekimlerIcerik />;
}
