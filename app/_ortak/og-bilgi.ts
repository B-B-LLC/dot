import { klinik } from '@/site.config';

/* ==========================================================================
   PAYLAŞIM GÖRSELİNİN KÜNYESİ

   Görselin kendisi `og-duzen.tsx` içinde çizilir, ama ölçüsü ve alt metni
   sayfa üstverisinden de okunur (`ustveri.ts`). O dosya bir sunucu bileşeni
   zincirinin başında durduğu için `next/og` oraya çekilmemeli — satori ve
   resvg her sayfa modülüne yüklenirdi. Bu yüzden künye çizimden ayrı, hiçbir
   ağır bağımlılığı olmayan bu dosyada tutulur.
   ========================================================================== */

/** Facebook, WhatsApp ve LinkedIn'in beklediği ölçü. */
export const OG_OLCU = { width: 1200, height: 630 };

export const OG_TUR = 'image/png';

/** Kök görselin alt metni; `app/opengraph-image.tsx` bunu dışa aktarır. */
export const OG_ALT = `${klinik.ad} — ${klinik.konum}`;

/* Next'in `app/opengraph-image.tsx`ten ürettiği rota. Kendi görsel dosyası
   olmayan sayfalar `ustveri()` üzerinden buraya işaret eder; yoksa hiç
   `og:image` basılmaz (bkz. ustveri.ts, 4. madde). */
export const OG_YOL = '/opengraph-image';
