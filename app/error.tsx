'use client';

/* Hata sınırları istemci bileşeni olmak zorundadır (Next kuralı).

   Bu dosya kendi segmentindeki `layout.tsx`i sarmaz: kök düzenin kendisi
   çökerse ekran `global-error.tsx`ten gelir. */

import HataIcerik from './_ortak/hata-icerik';

export default function Hata({
  error,
  retry
}: {
  error: Error & { digest?: string };
  /* Next 16'da bu prop `reset` değil `retry`dir ve içeriği yeniden getirip
     yeniden çizer. */
  retry: () => void;
}) {
  return <HataIcerik hata={error} tekrar={retry} />;
}
