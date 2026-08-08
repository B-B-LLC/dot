const tedaviLinks = [
  { href: "#tedaviler", label: "İmplant" },
  { href: "#tedaviler", label: "Ortodonti" },
  { href: "#tedaviler", label: "Estetik diş hekimliği" },
  { href: "#tedaviler", label: "Çocuk diş hekimliği" },
];

const kurumsalLinks = [
  { href: "#hekim", label: "Hekim" },
  { href: "#klinik", label: "Klinik & teknoloji" },
  { href: "#sss", label: "Sık sorulanlar" },
  { href: "#iletisim", label: "İletişim" },
  { href: "#", label: "KVKK Aydınlatma Metni" },
];

const sosyal = [
  {
    ad: "Instagram",
    href: "#",
    path: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  },
  {
    ad: "Facebook",
    href: "#",
    path: "M13.5 21v-8h2.6l.4-3h-3V8.2c0-.9.2-1.4 1.5-1.4H17V4.1A20 20 0 0 0 14.6 4C12.3 4 10.5 5.4 10.5 8v2h-2.5v3h2.5v8z",
  },
  {
    ad: "WhatsApp",
    href: "https://wa.me/905XXXXXXXXX",
    path: "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7.2 3.9z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-sm text-white/60">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-8 sm:grid-cols-[1.7fr_1fr_1fr] sm:gap-10">
          <div>
            <div className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-brand-300"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 5.2c-1.3-1-2.7-1.6-4.1-1.6C5.2 3.6 3 5.9 3 9.1c0 2 .5 3.6 1.2 5.8.6 1.8.9 3 1.2 4.2.3 1.1.9 1.7 1.7 1.7.9 0 1.4-.6 1.7-2 .3-1.3.5-2.5.8-3.4.3-.9.8-1.4 1.4-1.4s1.1.5 1.4 1.4c.3.9.5 2.1.8 3.4.3 1.4.8 2 1.7 2 .8 0 1.4-.6 1.7-1.7.3-1.2.6-2.4 1.2-4.2.7-2.2 1.2-3.8 1.2-5.8 0-3.2-2.2-5.5-4.9-5.5-1.4 0-2.8.6-4.1 1.6Z" />
              </svg>
              Beyaz Diş Kliniği
            </div>
            <p className="mt-3 max-w-xs leading-relaxed">
              Ankara Çankaya&apos;da ağız ve diş sağlığı hizmetleri. Randevu
              için 0312 123 45 67.
            </p>
            <div className="mt-5 flex gap-2.5">
              {sosyal.map((s) => (
                <a
                  key={s.ad}
                  href={s.href}
                  aria-label={s.ad}
                  rel="noopener"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 transition hover:border-white/35 hover:bg-white/10 hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4.5 w-4.5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Tedaviler">
            <h4 className="font-semibold text-white">Tedaviler</h4>
            <ul className="mt-3.5">
              {tedaviLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="block min-h-9 py-1.5 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Kurumsal">
            <h4 className="font-semibold text-white">Kurumsal</h4>
            <ul className="mt-3.5">
              {kurumsalLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="block min-h-9 py-1.5 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/45 lg:flex-row lg:items-center lg:justify-between">
          <span>© 2026 Beyaz Diş Kliniği. Tüm hakları saklıdır.</span>
          <span>
            Bu sitedeki içerikler bilgilendirme amaçlıdır, tanı ve tedavi yerine
            geçmez.
          </span>
        </div>
      </div>
    </footer>
  );
}
