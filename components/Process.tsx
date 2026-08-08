const adimlar = [
  {
    no: "01",
    baslik: "Muayene",
    metin: "Şikâyetinizi dinliyor, ağız içi genel değerlendirme yapıyoruz.",
  },
  {
    no: "02",
    baslik: "Görüntüleme",
    metin: "Gerekli durumda dijital röntgen veya 3B tomografi alınır.",
  },
  {
    no: "03",
    baslik: "Planlama",
    metin: "İşlem, süre ve maliyet yazılı olarak paylaşılır. Karar sizin.",
  },
  {
    no: "04",
    baslik: "Tedavi",
    metin:
      "Planlanan seanslar uygulanır; her seans sonunda bilgilendirme yapılır.",
  },
  {
    no: "05",
    baslik: "Kontrol",
    metin: "Tedavi sonrası kontrol randevusu ve bakım önerileri.",
  },
];

export default function Process() {
  return (
    <section id="surec" className="relative overflow-hidden bg-ink text-white">
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(14,124,134,0.35),transparent_65%)]" />

      <div className="relative mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p
            data-rv
            className="text-sm font-semibold uppercase tracking-widest text-brand-300"
          >
            Süreç
          </p>
          <h2
            data-rv
            className="mt-3 text-3xl font-semibold tracking-tight delay-75 sm:text-4xl"
          >
            İlk muayeneden kontrole kadar
          </h2>
          <p data-rv className="mt-4 text-white/60 delay-100">
            Beş adım. Hangi aşamada olduğunuzu her zaman bilirsiniz.
          </p>
        </div>

        <ol className="mt-14 grid lg:grid-cols-5">
          {adimlar.map((a, i) => (
            <li
              key={a.no}
              data-rv
              style={{ transitionDelay: `${i * 110}ms` }}
              className="group relative border-b border-white/10 py-6 pl-14 last:border-b-0 lg:border-b-0 lg:border-t lg:border-white/15 lg:py-0 lg:pl-0 lg:pr-5 lg:pt-9"
            >
              {/* aktifleşen çizgi */}
              <span className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-brand-300 transition-transform duration-700 group-[.gor]:scale-y-100 lg:-top-px lg:h-0.5 lg:w-full lg:origin-left lg:scale-x-0 lg:scale-y-100 lg:group-[.gor]:scale-x-100" />

              <span className="absolute left-0 top-6 text-sm font-bold tracking-wider text-white/25 tabular-nums transition-colors duration-500 group-[.gor]:text-brand-300 lg:top-0 lg:-translate-y-1/2 lg:bg-ink lg:pr-3">
                {a.no}
              </span>

              <h3 className="text-lg font-semibold text-white/45 transition-colors duration-500 group-[.gor]:text-white">
                {a.baslik}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/35 transition-colors duration-500 group-[.gor]:text-white/70">
                {a.metin}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
