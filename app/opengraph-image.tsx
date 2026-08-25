import { klinik } from '@/site.config';
import { OG_ALT_SATIR, OG_OLCU, OG_TUR, ogGorseli } from './_ortak/og-duzen';

/* Sitenin paylaşım görseli. Bu dosyanın varlığı yeter: Next hem og:image hem
   twitter:image etiketlerini kendisi basar ve alt sayfalar da bunu devralır
   (tedaviler kendi görselini `tedaviler/[id]/opengraph-image.tsx` ile ezer). */

export const size = OG_OLCU;
export const contentType = OG_TUR;
export const alt = `${klinik.ad} — ${klinik.konum}`;

export default function OgGorseli() {
  return ogGorseli({
    ust: klinik.konum,
    buyuk: klinik.marka,
    punto: 148,
    alt: OG_ALT_SATIR
  });
}
