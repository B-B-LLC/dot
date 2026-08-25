'use client';

import SayfaCercevesi from '../_ortak/cerceve';
import { h } from '../_ortak/temel';
import { HekimlerBolumu } from '../klinik-app';

export default function HekimlerIcerik() {
  return h(SayfaCercevesi, { aktif: 'Hekimler' }, h(HekimlerBolumu, { seviye: 'h1' }));
}
