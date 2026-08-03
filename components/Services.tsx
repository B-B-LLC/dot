const services = [
  {
    title: "İmplant Tedavisi",
    desc: "Eksik dişler için kalıcı ve doğal görünümlü çözüm. 3D tomografi ile planlama.",
    icon: "M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4Z",
  },
  {
    title: "Ortodonti",
    desc: "Metal braket, şeffaf plak (aligner) ve lingual tedavi seçenekleriyle diş düzensizlikleri.",
    icon: "M4 7h16M4 12h16M4 17h10",
  },
  {
    title: "Estetik Diş Hekimliği",
    desc: "Zirkonyum kaplama, laminate veneer ve diş beyazlatma ile gülüş tasarımı.",
    icon: "m12 3 2.4 5.6L20 11l-5.6 2.4L12 19l-2.4-5.6L4 11l5.6-2.4L12 3Z",
  },
  {
    title: "Kanal Tedavisi",
    desc: "Mikroskop destekli endodonti ile dişinizi çekmeden kurtarma, tek seansta çözüm.",
    icon: "M12 3v18M8 7c0 3 8 3 8 7",
  },
  {
    title: "Çocuk Diş Hekimliği",
    desc: "Korkusuz, oyunlaştırılmış yaklaşımla koruyucu uygulamalar ve fissür örtücü.",
    icon: "M12 21s-7-4.4-7-9.6A4.4 4.4 0 0 1 12 8a4.4 4.4 0 0 1 7 3.4C19 16.6 12 21 12 21Z",
  },
  {
    title: "Diş Eti Tedavisi",
    desc: "Periodontoloji, diş taşı temizliği ve lazerle diş eti estetiği uygulamaları.",
    icon: "M4 12a8 8 0 0 1 16 0c0 4-3 8-8 8s-8-4-8-8Z",
  },
];

export default function Services() {
  return (
    <section id="hizmetler" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
          Hizmetlerimiz
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Tek merkezde eksiksiz ağız ve diş sağlığı
        </h2>
        <p className="mt-4 text-ink/65">
          Her tedavi öncesi detaylı muayene ve panoramik röntgen ile size özel
          plan hazırlıyoruz. Tedavi süresi ve ücreti başlamadan önce yazılı
          olarak paylaşılır.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="group rounded-2xl border border-brand-100 bg-white p-7 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/5"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
            </span>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
