const faqs = [
  {
    q: "İlk muayene ücretli mi?",
    a: "Hayır. İlk muayene, panoramik röntgen ve tedavi planlaması ücretsizdir. Tedaviye başlamak zorunda değilsiniz.",
  },
  {
    q: "Tedavi ücretini taksitle ödeyebilir miyim?",
    a: "Evet. Kredi kartına 9 taksite kadar vade farksız ödeme ve uzun süreli tedavilerde seans bazlı ödeme seçeneği sunuyoruz.",
  },
  {
    q: "İmplant tedavisi ne kadar sürüyor?",
    a: "Kemik yapınıza bağlı olarak implantın kaynaması 2-4 ay sürer. Uygun vakalarda aynı gün geçici diş uygulanabilir.",
  },
  {
    q: "Anlaşmalı olduğunuz sigortalar var mı?",
    a: "Başlıca özel sağlık sigortaları ve tamamlayıcı sigortalarla anlaşmamız bulunuyor. Poliçenizi randevu öncesi iletirseniz kapsamı kontrol ediyoruz.",
  },
  {
    q: "Randevumu iptal edersem ne olur?",
    a: "24 saat öncesine kadar yapılan iptallerde herhangi bir ücret alınmaz, randevunuzu ücretsiz erteleyebilirsiniz.",
  },
];

export default function Faq() {
  return (
    <section id="sss" className="mx-auto max-w-3xl px-5 py-20 lg:py-28">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
          Sık sorulan sorular
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Merak edilenler
        </h2>
      </div>

      <div className="mt-12 divide-y divide-brand-100 border-y border-brand-100">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium">
              {f.q}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition group-open:rotate-45">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 pr-12 text-sm leading-relaxed text-ink/65">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
