const services = [
  {
    title: "İmplant Tedavisi",
    desc: "Eksik dişlerin kalıcı olarak tamamlanması. Planlama öncesi 3B tomografi ile kemik yapısı değerlendirilir.",
    icon: "M12 3v10M8.5 6.5L12 3l3.5 3.5M7 13h10l-1 8H8z",
  },
  {
    title: "Estetik Diş Hekimliği",
    desc: "Zirkonyum ve porselen kaplama, lamina ve diş beyazlatma uygulamaları.",
    icon: "m12 2 2.1 5.6L20 9.4l-4.4 4 1 6L12 16.6 7.4 19.4l1-6L4 9.4l5.9-1.8z",
  },
  {
    title: "Ortodonti",
    desc: "Metal ve şeffaf braket, şeffaf plak tedavisiyle diş ve çene düzensizliklerinin giderilmesi.",
    icon: "M3 9h18M3 15h18M7.5 7.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2M12 13.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2M16.5 7.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2",
  },
  {
    title: "Çocuk Diş Hekimliği",
    desc: "Çocuklara özel yaklaşımla koruyucu uygulamalar, dolgu ve fissür örtücü işlemleri.",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 21c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5",
  },
  {
    title: "Kanal Tedavisi",
    desc: "Ağrılı dişlerde kök kanal tedavisi; uygun vakalarda tek seansta tamamlanabilir.",
    icon: "M12 3c-2.2-1.6-4.8-1.4-6 .6-1.3 2.1-.6 5 .2 7.6.6 2 .8 3.9 1.2 5.6.3 1.4.9 2.6 1.8 2.6 1.1 0 1.4-1.7 1.6-3.4M12 3c2.2-1.6 4.8-1.4 6 .6M12 12v9",
  },
  {
    title: "Diş Taşı Temizliği",
    desc: "Diş eti sağlığının korunması için periyodik detertraj ve periodontal bakım.",
    icon: "M9 12.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM16.5 16.9a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM7.5 18.8a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z",
  },
];

export default function Services() {
  return (
    <section id="tedaviler" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div className="max-w-2xl">
        <p
          data-rv
          className="text-sm font-semibold uppercase tracking-widest text-brand-600"
        >
          Tedaviler
        </p>
        <h2
          data-rv
          className="mt-3 text-3xl font-semibold tracking-tight delay-75 sm:text-4xl"
        >
          Ağız ve diş sağlığının tüm alanlarında
        </h2>
        <p data-rv className="mt-4 text-ink/65 delay-100">
          Rutin kontrolden implant cerrahisine kadar. Her tedavi öncesi
          görüntüleme ve değerlendirme yapılır.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <article
            key={s.title}
            data-rv
            style={{ transitionDelay: `${i * 80}ms` }}
            className="group rounded-2xl border border-brand-100 bg-white p-7 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-900/5"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={s.icon} />
              </svg>
            </span>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
