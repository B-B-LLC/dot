const reviews = [
  {
    quote:
      "Yıllardır diş hekiminden korkardım. Burada işlem başlamadan her adımı anlattılar, hiç acı hissetmedim. İmplantım altı aydır sorunsuz.",
    name: "Ayşe T.",
    detail: "İmplant tedavisi",
  },
  {
    quote:
      "Şeffaf plak tedavim 11 ayda bitti. Randevularda hiç bekletilmedim, fiyat baştan söylendiği gibi kaldı.",
    name: "Burak Ş.",
    detail: "Ortodonti",
  },
  {
    quote:
      "Oğlum ilk kez diş hekimine ağlamadan gitti. Çocuk bölümü ayrı ve hekim gerçekten sabırlı.",
    name: "Zeynep A.",
    detail: "Çocuk diş hekimliği",
  },
];

export default function Testimonials() {
  return (
    <section id="yorumlar" className="bg-brand-50/60">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Hasta yorumları
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Google&apos;da 4.9 / 5 · 340+ değerlendirme
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-sm"
            >
              <div className="flex gap-1 text-brand-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L12 16.9 6.4 20l1.4-6.2L3 9.5l6.4-.6L12 3Z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-5 grow text-sm leading-relaxed text-ink/75">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-brand-100 pt-4">
                <span className="text-sm font-semibold">{r.name}</span>
                <span className="mt-0.5 block text-xs text-ink/55">{r.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
