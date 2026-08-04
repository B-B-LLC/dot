const stats = [
  { value: "15+", label: "Yıllık deneyim" },
  { value: "12.000+", label: "Mutlu hasta" },
  { value: "4.9/5", label: "Google puanı" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            KIRMIZI-TEST-20260804 — kırmızı tema denemesi
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Gülüşünüz için
            <span className="block text-brand-600">kırmızı renkli eller</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
            İmplanttan ortodontiye, estetik diş hekimliğinden çocuk diş
            sağlığına kadar tüm tedaviler tek merkezde. Ağrısız uygulamalar,
            şeffaf fiyatlandırma ve tedavi öncesi ücretsiz muayene.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#iletisim"
              className="rounded-full bg-brand-600 px-7 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
            >
              Ücretsiz muayene randevusu
            </a>
            <a
              href="#hizmetler"
              className="rounded-full border border-brand-200 bg-white px-7 py-3.5 text-center text-sm font-semibold text-brand-700 transition hover:border-brand-400"
            >
              Tedavileri incele
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-semibold text-brand-700">{s.value}</dt>
                <dd className="mt-1 text-xs text-ink/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="aspect-4/5 overflow-hidden rounded-[2rem] bg-brand-100 shadow-2xl shadow-brand-900/10">
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-brand-200 via-brand-100 to-white p-10 text-center">
              <svg viewBox="0 0 24 24" className="h-24 w-24 text-brand-600" fill="currentColor">
                <path d="M12 5.2c-1.3-1-2.7-1.6-4.1-1.6C5.2 3.6 3 5.9 3 9.1c0 2 .5 3.6 1.2 5.8.6 1.8.9 3 1.2 4.2.3 1.1.9 1.7 1.7 1.7.9 0 1.4-.6 1.7-2 .3-1.3.5-2.5.8-3.4.3-.9.8-1.4 1.4-1.4s1.1.5 1.4 1.4c.3.9.5 2.1.8 3.4.3 1.4.8 2 1.7 2 .8 0 1.4-.6 1.7-1.7.3-1.2.6-2.4 1.2-4.2.7-2.2 1.2-3.8 1.2-5.8 0-3.2-2.2-5.5-4.9-5.5-1.4 0-2.8.6-4.1 1.6Z" />
              </svg>
              <p className="text-sm font-medium text-brand-800">
                Klinik fotoğrafınızı buraya ekleyin
                <span className="mt-1 block font-normal text-brand-700/70">
                  public/klinik.jpg → Image bileşeni
                </span>
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-brand-100 bg-white p-5 shadow-xl sm:block">
            <p className="text-xs font-medium text-ink/50">Bugünkü müsaitlik</p>
            <p className="mt-1 text-sm font-semibold">4 randevu aralığı</p>
            <div className="mt-3 flex gap-1.5">
              {["09:30", "13:00", "15:30", "17:00"].map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
