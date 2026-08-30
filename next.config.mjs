/* ==========================================================================
   NEXT YAPILANDIRMASI VE GÜVENLİK BAŞLIKLARI

   Başlıklar tarayıcıya sitenin nelere izin verdiğini söyler. Hiçbiri
   görünmez; bir tanesi eksik olduğunda da site çalışmaya devam eder. Bu
   yüzden tek yerde ve gerekçeleriyle durur.

   Ölçüm sağlayıcısı `site.config.ts`ten okunur: sağlayıcı değiştiğinde
   CSP'nin de değişmesi gerekiyor ve iki dosyayı elle eşlemek unutuluyor.
   ========================================================================== */

/* Config bir .ts dosyası ve Node onu tip soymayla okuyor; `type` alanı
   olmadığı için her derlemede MODULE_TYPELESS_PACKAGE_JSON uyarısı basıyor.
   Depoya "type": "module" eklemek CommonJS betiklerini kırar, bu yüzden
   yalnız o uyarı susturulur — tools/kontrol.mjs ile aynı çözüm. Uyarı içe
   aktarma sırasında doğduğu için import dinamiktir: statik import hepsinden
   önce çalışır ve aşağıdaki dinleyici geç kalırdı. */
const uyariYazici = process.listeners('warning');
process.removeAllListeners('warning');
process.on('warning', (u) => {
  if (u.code === 'MODULE_TYPELESS_PACKAGE_JSON') return;
  for (const yazici of uyariYazici) yazici(u);
});

const { olcum } = await import('./site.config.ts');

const GELISTIRME = process.env.NODE_ENV !== 'production';

/* CSP önce Report-Only yayımlanır: tarayıcı ihlalleri konsola yazar ama
   hiçbir şeyi engellemez. Birkaç gün gerçek ziyaret altında konsol temiz
   kaldıktan sonra burası true yapılır ve kural zorlanmaya başlar.

   Zorlamadan önce bakılacak yerler: gömülü harita (frame-src), ölçüm
   betiği (script-src / connect-src) ve klinikten sonradan eklenen üçüncü
   taraf bir kod (canlı destek, randevu widget'ı) varsa o. */
const CSP_ZORLA = false;

/** Ölçüm betiğinin geldiği kaynak. Vercel'in betiği kendi alan adımızdan
    (`/_vercel/insights/…`) sunulduğu için ek kaynak istemez; Plausible
    dışarıdan gelir ve olayları da aynı kaynağa gönderir. */
function olcumKaynagi() {
  if (olcum.saglayici !== 'plausible') return '';
  try {
    return new URL((olcum.betik || 'https://plausible.io/js/script.js').trim()).origin;
  } catch {
    return '';
  }
}

const OLCUM = olcumKaynagi();

/* --- İçerik güvenlik kuralı ------------------------------------------------

   `unsafe-inline` iki yerde kalıyor ve ikisi de kasıtlı:

   - script-src: sayfalar önceden üretiliyor (statik). Nonce vermek için her
     isteğin sunucuda çizilmesi gerekir; bu, sitenin bütün hızını götürür.
     Karşılığında kaybedilen şey inline XSS koruması, kazanılan şey dışarıdan
     betik yüklenememesi — bu sitede kullanıcı girdisi hiçbir yerde HTML'e
     basılmadığı için takas doğru taraftan yapılıyor.
   - style-src: bütün görünüm satır içi `style` nesneleriyle yazılıyor
     (bkz. CLAUDE.md, tasarım sistemi). Bu kaçınılmaz.

   Asıl korumayı bu üçü veriyor: `object-src 'none'` (eklenti gömülemez),
   `base-uri 'self'` (enjekte edilen bir <base> ile bütün göreli adresler
   çalınamaz) ve `form-action 'self'` (form başka sunucuya gönderilemez). */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${GELISTIRME ? " 'unsafe-eval'" : ''}${OLCUM ? ` ${OLCUM}` : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  /* Geliştirmede Turbopack sıcak yeniden yükleme için websocket açar. */
  `connect-src 'self'${GELISTIRME ? ' ws: wss:' : ''}${OLCUM ? ` ${OLCUM}` : ''}`,
  /* Ulaşım kartındaki gömülü Google haritası. */
  'frame-src https://www.google.com',
  "manifest-src 'self'",
  "media-src 'none'",
  /* Yerel geliştirme http üzerinden gider; orada yükseltme sayfayı kırar. */
  ...(GELISTIRME ? [] : ['upgrade-insecure-requests'])
].join('; ');

/* --- Başlıklar ------------------------------------------------------------- */

const guvenlikBasliklari = [
  /* Tarayıcı dosya türünü içeriğe bakarak tahmin etmesin: yüklenen bir
     görselin betik olarak çalıştırılması bu şekilde engellenir. */
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  /* Dış sitelere yalnız alan adımız gider, hangi sayfadan gidildiği değil.
     Ziyaretçinin hangi tedaviyi okuduğu üçüncü tarafı ilgilendirmez. */
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  /* Site başka bir sayfanın içine çerçevelenemez. CSP'deki frame-ancestors
     ile aynı işi görür; CSP zorlanana kadar korumayı bu başlık taşır. */
  { key: 'X-Frame-Options', value: 'DENY' },

  /* Kullanılmayan cihaz izinleri kapatılır: sayfaya sızan bir kod da
     isteyemez. Tam ekran listede yok, gömülü harita onu kullanıyor. */
  {
    key: 'Permissions-Policy',
    value: [
      'accelerometer=()',
      'autoplay=()',
      'camera=()',
      'display-capture=()',
      'geolocation=()',
      'gyroscope=()',
      'magnetometer=()',
      'microphone=()',
      'payment=()',
      'usb=()'
    ].join(', ')
  },

  /* Sekmeler arası pencere erişimi kesilir (window.opener saldırıları). */
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },

  { key: CSP_ZORLA ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only', value: csp }
];

/* HSTS yalnız yayında: tarayıcı bu başlığı gördüğü alan adına bir daha
   http ile bağlanmaz ve bunu unutması iki yıl sürer. localhost'ta verilirse
   makinedeki bütün http projeleri kırılır.

   `preload` bilerek yazılmadı: listeye girmek kolay, çıkmak aylar sürüyor ve
   karar kliniğin alan adının tamamını bağlıyor. */
const hsts = { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /* Sunucunun hangi çatıyla yazıldığı saldırgana bedava bilgi. */
  poweredByHeader: false,

  /* Ana dizinde de bir package-lock.json bulunduğu için proje kökü açıkça
     belirtilir; aksi hâlde derleyici kökü yanlış yerde arıyor. */
  turbopack: { root: import.meta.dirname },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: GELISTIRME ? guvenlikBasliklari : [...guvenlikBasliklari, hsts]
      },
      {
        /* Randevu ucunun yanıtı kişiseldir ve tekrarlanabilir değildir;
           hiçbir ara katman saklamamalı. */
        source: '/api/:yol*',
        headers: [{ key: 'Cache-Control', value: 'no-store' }]
      }
    ];
  }
};

export default nextConfig;
