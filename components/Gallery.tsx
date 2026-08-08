const kareler = [
  "Bekleme alanı",
  "Tedavi ünitesi",
  "Görüntüleme odası",
  "Sterilizasyon",
  "Çocuk alanı",
  "Giriş / resepsiyon",
];

export default function Gallery() {
  return (
    <section id="galeri" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="max-w-2xl">
        <p
          data-rv
          className="text-sm font-semibold uppercase tracking-widest text-brand-600"
        >
          Klinikten
        </p>
        <h2
          data-rv
          className="mt-3 text-3xl font-semibold tracking-tight delay-75 sm:text-4xl"
        >
          Geldiğinizde göreceğiniz yer
        </h2>
      </div>

      {/* Mobilde yatay kaydırma. snap 'proximity': iOS'ta 'mandatory' hızlı
          flick hareketinin momentum scroll'unu bozuyor. */}
      <div
        data-rv
        tabIndex={0}
        role="region"
        aria-label="Klinik fotoğrafları — yatay kaydırılabilir"
        className="mt-12 -mx-5 grid snap-x snap-proximity auto-cols-[78%] grid-flow-col gap-3 overflow-x-auto overscroll-x-contain px-5 pb-4 delay-100 [scrollbar-width:none] sm:auto-cols-[44%] lg:mx-0 lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {kareler.map((k) => (
          <figure
            key={k}
            className="flex aspect-4/3 snap-center items-end rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-100 to-brand-200/80 p-4"
          >
            <figcaption className="text-sm font-medium leading-snug text-brand-900">
              {k}
              <span className="mt-0.5 block text-xs font-normal text-brand-800/70">
                4:3 · 1200×900
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-3 flex items-center gap-2 text-sm text-ink/45 lg:hidden">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
        Kaydırarak diğer fotoğraflara bakabilirsiniz
      </p>
    </section>
  );
}
