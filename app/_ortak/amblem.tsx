/* Markanın tek şekli: diş silueti.

   Hem paylaşım görselleri (og-duzen.tsx) hem sekme ikonları (app/icon.tsx,
   app/apple-icon.tsx) buradan çizilir. Tek kaynak olması, sekmedeki simgeyle
   WhatsApp'ta çıkan kartın aynı aileden görünmesini garanti eder.

   Şekil vektördür: 100×100 kutuya çizilmiş tek yol, dolayısıyla 32 pikselde de
   1200 pikselde de kenarı nettir. Yazı kullanılmaz — 32 pikselde harf okunmaz,
   dolu bir siluet ise küçülürken bozulmaz. */

import { DIS_YOLU } from './dis-yolu';
import { renk } from './token-renk';

/* Şeklin kendisi dis-yolu.ts içindedir: bu dosya token okuduğu için yalnız
   sunucuda çalışır, oysa aynı yol global-error.tsx'te tarayıcıda da çizilir. */
export { DIS_YOLU };

/** Marka renkleri; ikon ve görsellerde aynı ikili kullanılır. */
export const AMBLEM_KOYU = renk('--emerald-900');
export const AMBLEM_ACIK = renk('--sand-50');

/** Tek başına diş. Verilen kutuyu doldurur, kendi zemini yoktur. */
export function Dis({ olcu, dolgu }: { olcu: number; dolgu: string }) {
  return (
    <svg width={olcu} height={olcu} viewBox="0 0 100 100">
      <path d={DIS_YOLU} fill={dolgu} />
    </svg>
  );
}

/** Krem daire içinde zümrüt diş. `olcu` dairenin çapıdır. */
export function Madalyon({ olcu }: { olcu: number }) {
  return (
    <svg width={olcu} height={olcu} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill={AMBLEM_ACIK} />
      {/* Diş, dairenin yaklaşık %60'ını kaplar ve ortalanır. */}
      <g transform="translate(20.2 20.2) scale(0.596)">
        <path d={DIS_YOLU} fill={AMBLEM_KOYU} />
      </g>
    </svg>
  );
}
