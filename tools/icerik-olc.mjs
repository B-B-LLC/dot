/* İçerik derinliği ölçümü — geliştirme aracı, derlemeye girmez.
   Sayfada gerçekten görünen metni sayar: giriş, bölümler, şerit, tablo,
   notlar ve sorular. Kullanım: node tools/icerik-olc.mjs [eksik] */
import { islemler } from '../site.config.ts';

const say = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;

const kelime = (i) =>
  say(i.giris) +
  i.bolumler.reduce((t, b) => t + say(b.baslik) + say(b.metin), 0) +
  (i.zamanCizelgesi || []).reduce((t, z) => t + say(z.asama) + say(z.sure) + say(z.aciklama), 0) +
  (i.karsilastirma
    ? say(i.karsilastirma.baslik) +
      i.karsilastirma.sutunlar.reduce((t, s) => t + say(s), 0) +
      i.karsilastirma.satirlar.reduce(
        (t, s) => t + say(s.olcut) + say(s.olcutAciklama) + say(s.a) + say(s.b),
        0
      ) +
      say(i.karsilastirma.dipnot)
    : 0) +
  (i.notlar || []).reduce((t, n) => t + say(n), 0) +
  (i.sorular || []).reduce((t, s) => t + say(s.soru) + say(s.cevap), 0);

const satirlar = islemler
  .map((i) => ({
    slug: i.slug,
    kelime: kelime(i),
    bolum: i.bolumler.length,
    soru: (i.sorular || []).length,
    ciz: i.zamanCizelgesi ? 1 : 0,
    tab: i.karsilastirma ? 1 : 0
  }))
  .sort((a, b) => a.kelime - b.kelime);

const yalnizEksik = process.argv[2] === 'eksik';
for (const s of satirlar) {
  if (yalnizEksik && s.kelime >= 600 && s.soru >= 4) continue;
  console.log(
    s.slug.padEnd(28),
    String(s.kelime).padStart(4),
    'kel',
    String(s.bolum).padStart(2) + ' böl',
    String(s.soru).padStart(2) + ' soru',
    s.ciz ? 'şerit' : '     ',
    s.tab ? 'tablo' : ''
  );
}

const n = satirlar.length;
console.log(
  `\n${n} işlem · 600+ kelime: ${satirlar.filter((s) => s.kelime >= 600).length}` +
    ` · 4+ soru: ${satirlar.filter((s) => s.soru >= 4).length}` +
    ` · şerit: ${satirlar.filter((s) => s.ciz).length}` +
    ` · tablo: ${satirlar.filter((s) => s.tab).length}`
);
