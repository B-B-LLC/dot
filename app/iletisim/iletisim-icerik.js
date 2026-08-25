'use client';

import SayfaCercevesi from '../_ortak/cerceve';
import { h } from '../_ortak/temel';
import { UlasimBolumu } from '../klinik-app';

export default function IletisimIcerik() {
  return h(SayfaCercevesi, { aktif: 'Ulaşım' }, h(UlasimBolumu, { seviye: 'h1' }));
}
