import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/* OG görselleri derleme sırasında PNG'ye çevrilir; orada CSS çalışmadığı için
   `var(--emerald-900)` çözülmez ve renk kodunu elle yazmak gerekirdi. Bunun
   yerine token dosyası burada okunup değerler çıkarılır: tasarım sistemi
   değişince görsel de kendiliğinden değişir, depoda ikinci bir renk kaynağı
   oluşmaz. Yalnız derleme anında çalışır, istemciye girmez. */

const KAYNAK = join(process.cwd(), 'ds', 'tokens', 'colors.css');

function tokenlar(): Map<string, string> {
  const metin = readFileSync(KAYNAK, 'utf8');
  const harita = new Map<string, string>();
  for (const [, ad, deger] of metin.matchAll(/(--[\w-]+)\s*:\s*([^;}]+)/g)) {
    harita.set(ad, deger.trim());
  }
  return harita;
}

const HARITA = tokenlar();

/** `renk('--surface-inverse')` → '#06301f'. var() zinciri çözülür. */
export function renk(ad: string): string {
  let deger = HARITA.get(ad);
  if (deger === undefined) throw new Error('Bilinmeyen renk token: ' + ad);

  /* --text-brand: var(--emerald-700) gibi dolaylı tanımları takip et. */
  for (let adim = 0; adim < 10; adim++) {
    const eslesme = deger.match(/^var\((--[\w-]+)\)$/);
    if (!eslesme) return deger;
    const sonraki = HARITA.get(eslesme[1]);
    if (sonraki === undefined) throw new Error('Bilinmeyen renk token: ' + eslesme[1]);
    deger = sonraki;
  }
  throw new Error('Renk token zinciri çok derin: ' + ad);
}
