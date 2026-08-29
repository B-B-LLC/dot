/* İçerik ekleme yardımcısı — geliştirme aracı, derlemeye girmez.

   `site.config.ts` içindeki bir işlem kalemine bölüm, soru, not ya da aşama
   şeridi ekler. Mevcut metne dokunmaz, dizilerin sonuna yazar.

   Neden metin üzerinden: config bir TS modülü, yani ayrıştırıp yeniden
   yazdırmak yorumları ve satır kırımlarını kaybettirir. Bölge slug'a göre
   daraltılıp diziler köşeli parantez sayılarak bulunuyor; tırnak içindeki
   parantezler atlanıyor.

   Kullanım: başka bir betikten `ekle()` çağrılır. */

import fs from 'node:fs';

const CONFIG = 'C:/src/dot/site.config.ts';

/** Bir kalemin config metnindeki [başlangıç, bitiş) aralığı. */
function bolge(s, slug) {
  const bas = s.indexOf(`          slug: '${slug}',`);
  if (bas === -1) throw new Error(`slug bulunamadı: ${slug}`);
  const sonraki = s.indexOf("          slug: '", bas + 10);
  return [bas, sonraki === -1 ? s.length : sonraki];
}

/** `alan: [` ile başlayan dizinin kapanış `]` indeksi. Tırnak içi atlanır. */
function diziSonu(s, bas, son, alan) {
  const im = s.indexOf(`          ${alan}: [`, bas);
  if (im === -1 || im >= son) return -1;
  let i = im + `          ${alan}: [`.length;
  let derinlik = 1;
  while (i < son) {
    const c = s[i];
    if (c === "'") {
      i++;
      while (i < son && !(s[i] === "'" && s[i - 1] !== '\\')) i++;
    } else if (c === '[') derinlik++;
    else if (c === ']') {
      derinlik--;
      if (derinlik === 0) return i;
    }
    i++;
  }
  throw new Error(`${alan} dizisi kapanmadı`);
}

/**
 * @param {string} slug
 * @param {{bolumler?:string[], sorular?:string[], notlar?:string[], zamanCizelgesi?:string[]}} parcalar
 *   Her parça, dizinin son elemanından sonra eklenecek hazır satırlardır.
 */
export function ekle(slug, parcalar) {
  let s = fs.readFileSync(CONFIG, 'utf8');
  const nl = s.includes('\r\n') ? '\r\n' : '\n';

  for (const [alan, satirlar] of Object.entries(parcalar)) {
    if (!satirlar || !satirlar.length) continue;
    const [bas, son] = bolge(s, slug);
    const kapanis = diziSonu(s, bas, son, alan);
    if (kapanis === -1) {
      throw new Error(`${slug}: ${alan} dizisi yok — önce elle eklenmeli`);
    }
    /* Kapanış `]`ten geriye son satır sonuna gidilir; oraya virgül + yeni
       elemanlar yazılır. */
    let p = kapanis - 1;
    while (p > bas && (s[p] === ' ' || s[p] === '\n' || s[p] === '\r')) p--;
    const yeni = `,${nl}${satirlar.join(nl)}`;
    s = s.slice(0, p + 1) + yeni + s.slice(p + 1);
    fs.writeFileSync(CONFIG, s);
  }
}

/** `zamanCizelgesi` alanı olmayan kaleme, notlar dizisinden önce ekler. */
export function cizelgeAc(slug, satirlar) {
  let s = fs.readFileSync(CONFIG, 'utf8');
  const nl = s.includes('\r\n') ? '\r\n' : '\n';
  const [bas, son] = bolge(s, slug);
  if (diziSonu(s, bas, son, 'zamanCizelgesi') !== -1) {
    throw new Error(`${slug}: zamanCizelgesi zaten var`);
  }
  const bolumSonu = diziSonu(s, bas, son, 'bolumler');
  if (bolumSonu === -1) throw new Error(`${slug}: bolumler yok`);
  /* `],` sonrasına yeni alan yazılır. */
  const ekYeri = s.indexOf(nl, bolumSonu) + nl.length;
  const blok = [`          zamanCizelgesi: [`, ...satirlar, `          ],`].join(nl) + nl;
  s = s.slice(0, ekYeri) + blok + s.slice(ekYeri);
  fs.writeFileSync(CONFIG, s);
}
