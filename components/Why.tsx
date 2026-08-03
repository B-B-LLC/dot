const points = [
  {
    title: "Ağrısız tedavi protokolü",
    desc: "Bilgisayar kontrollü anestezi sistemi ve sedasyon seçeneğiyle işlem konforu.",
  },
  {
    title: "Şeffaf fiyatlandırma",
    desc: "Tedaviye başlamadan önce kalem kalem yazılı teklif. Sürpriz ek ücret yok.",
  },
  {
    title: "Sterilizasyon standardı",
    desc: "Her hasta için tek kullanımlık set, B sınıfı otoklav ile sertifikalı sterilizasyon.",
  },
  {
    title: "Dijital diş hekimliği",
    desc: "Ağız içi tarayıcı ve 3D tomografi ile ölçü macunu olmadan hassas planlama.",
  },
];

export default function Why() {
  return (
    <section id="neden-biz" className="bg-brand-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">
            Neden biz
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tedaviden çok, güven inşa ediyoruz
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-white/70">
            2010&apos;dan bu yana aynı ekiple çalışıyoruz. Hastalarımızın
            %68&apos;i bize yakınlarının tavsiyesiyle geliyor — bizim için en
            iyi referans bu.
          </p>
          <a
            href="#iletisim"
            className="mt-9 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-100"
          >
            Kliniği ziyaret edin
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-brand-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 5 5L20 7" />
              </svg>
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
