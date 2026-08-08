const teknoloji = [
  {
    baslik: "Ağız içi dijital tarayıcı",
    metin: "Ölçü macunu yerine tarama. Daha konforlu, tekrar oranı daha düşük.",
    icon: "M4.5 6h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2ZM7 10.5h3M7 13.5h5M17 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  },
  {
    baslik: "CBCT — 3B tomografi",
    metin:
      "İmplant planlamasında kemik hacmi ve sinir konumu üç boyutlu görülür.",
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 3v18M3 12h18M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z",
  },
  {
    baslik: "Cerrahi mikroskop",
    metin: "Kanal tedavisi ve hassas restorasyonlarda büyütmeli görüş.",
    icon: "M9 3h6l-1 5h-4zM12 8v5M12 12.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 21h16",
  },
  {
    baslik: "Dijital röntgen",
    metin: "Klasik filme göre belirgin biçimde daha düşük radyasyon dozu.",
    icon: "M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM8 21h8M12 17v4M7.5 10.5l2.5 2.5 4-4.5",
  },
];

export default function Clinic() {
  return (
    <section id="klinik" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="max-w-2xl">
        <p
          data-rv
          className="text-sm font-semibold uppercase tracking-widest text-brand-600"
        >
          Klinik &amp; teknoloji
        </p>
        <h2
          data-rv
          className="mt-3 text-3xl font-semibold tracking-tight delay-75 sm:text-4xl"
        >
          &ldquo;Moderniz&rdquo; demek yerine neyi kullandığımızı yazalım
        </h2>
      </div>

      <div className="mt-14 grid items-center gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div
          data-rv
          className="relative flex aspect-16/11 items-end overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 p-6 text-sm leading-relaxed text-white/90 shadow-2xl shadow-brand-900/30"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_26%_18%,rgba(255,255,255,0.22),transparent_55%)]" />
          <span className="relative">
            Klinik / tedavi ünitesi fotoğrafı
            <span className="mt-1 block text-xs text-white/70">
              (yatay 16:11, en az 1600×1100 px, WebP)
            </span>
          </span>
        </div>

        <ul className="grid">
          {teknoloji.map((t, i) => (
            <li
              key={t.baslik}
              data-rv
              style={{ transitionDelay: `${i * 80}ms` }}
              className="grid grid-cols-[auto_1fr] items-start gap-4 border-b border-brand-100 py-5 first:border-t"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4.5 w-4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={t.icon} />
                </svg>
              </span>
              <span>
                <b className="block font-semibold">{t.baslik}</b>
                <span className="mt-0.5 block text-sm leading-relaxed text-ink/65">
                  {t.metin}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
