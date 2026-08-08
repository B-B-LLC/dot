const uzmanliklar = ["İmplantoloji", "Protez", "Estetik restorasyon"];

export default function Doctor() {
  return (
    <section id="hekim" className="border-y border-brand-100 bg-brand-50/50">
      <div className="mx-auto grid max-w-6xl items-center gap-9 px-5 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-15 lg:py-28">
        <div
          data-rv
          className="relative flex aspect-4/5 items-end overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-700 to-brand-900 p-6 text-sm leading-relaxed text-white/90 shadow-2xl shadow-brand-900/30"
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_70%_22%,rgba(255,255,255,0.2),transparent_58%)]" />
          <span className="relative">
            Hekim portresi buraya gelecek
            <span className="mt-1 block text-xs text-white/70">
              (dikey 4:5, en az 900×1125 px, WebP)
            </span>
          </span>
        </div>

        <div>
          <p
            data-rv
            className="text-sm font-semibold uppercase tracking-widest text-brand-600"
          >
            Hekim
          </p>
          <p data-rv className="mt-3 font-semibold text-brand-700 delay-75">
            Dt. — Kurucu Hekim
          </p>
          <h2
            data-rv
            className="mt-1 text-3xl font-semibold tracking-tight delay-75 sm:text-4xl"
          >
            [Hekim Ad Soyad]
          </h2>
          <p data-rv className="mt-4 max-w-xl text-ink/65 delay-100">
            Tedavinin teknik kısmı kadar hastanın süreci anlaması da işin
            parçası. Muayenede önce dinliyor, sonra seçenekleri sade bir dille
            anlatıyoruz.
          </p>

          <ul data-rv className="mt-6 flex flex-wrap gap-2 delay-150">
            {uzmanliklar.map((u) => (
              <li
                key={u}
                className="rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm font-medium"
              >
                {u}
              </li>
            ))}
          </ul>

          <a
            data-rv
            href="#iletisim"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-700 delay-200"
          >
            Hekimi Tanıyın
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition group-hover:translate-x-1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
