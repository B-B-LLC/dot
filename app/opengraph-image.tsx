import { klinik } from '@/site.config';
import { OG_OLCU, OG_TUR, ogGorseli } from './_ortak/og-duzen';

/* Sitenin paylaşım görseli. Bu dosyanın varlığı yeter: Next hem og:image hem
   twitter:image etiketlerini kendisi basar ve alt sayfalar da bunu devralır
   (tedaviler kendi görselini `tedaviler/[id]/opengraph-image.tsx` ile ezer). */

export const size = OG_OLCU;
export const contentType = OG_TUR;
export const alt = `${klinik.ad} — ${klinik.konum}`;

export default function OgGorseli() {
  /* Yalnız madalyon: klinik adı da semt de kartın yanında başlık ve açıklama
     olarak zaten tam metin duruyor, görselde tekrar edilince okunmuyordu. */
  return ogGorseli();
}
