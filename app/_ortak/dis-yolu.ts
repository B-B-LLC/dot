/* Diş silueti, 100×100 kutuya çizilmiş tek yol.

   Kendi dosyasında durur çünkü iki ayrı dünyada kullanılır: `amblem.tsx`
   derleme sırasında PNG üretirken (orada token dosyası okunur, yani yalnız
   sunucuda çalışır), `global-error.tsx` ise tarayıcıda çizer. Şeklin tek
   kaynaktan gelmesi için ortak parça bu sabittir. */
export const DIS_YOLU =
  'M50 7 C29 7 15 20 15 39 C15 51 19 57 21 67 C23 80 25 94 34 94 C42 94 44 81 47 71 ' +
  'C48 67 52 67 53 71 C56 81 58 94 66 94 C75 94 77 80 79 67 C81 57 85 51 85 39 ' +
  'C85 20 71 7 50 7 Z';
