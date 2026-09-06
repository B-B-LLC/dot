import { OG_ALT, OG_OLCU, OG_TUR } from './_ortak/og-bilgi';
import { ogGorseli } from './_ortak/og-duzen';

/* Sitenin paylaşım görseli. Bu dosyanın varlığı yeter: Next hem og:image hem
   twitter:image etiketlerini kendisi basar. Ama devralma kendiliğinden olmaz:
   `openGraph` yazan her sayfa kökteki bloğun tamamını düşürdüğü için alt
   sayfalar bu görseli `ustveri()` üzerinden adresle ister (bkz. ustveri.ts).
   Tedaviler kendi görselini `tedaviler/[id]/opengraph-image.tsx` ile üretir. */

export const size = OG_OLCU;
export const contentType = OG_TUR;
export const alt = OG_ALT;

export default function OgGorseli() {
  /* Yalnız madalyon: klinik adı da semt de kartın yanında başlık ve açıklama
     olarak zaten tam metin duruyor, görselde tekrar edilince okunmuyordu. */
  return ogGorseli();
}
