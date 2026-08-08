const faqs = [
  {
    q: "Tedavi ücretini önceden öğrenebilir miyim?",
    a: "Evet. Muayene ve gerekli görüntüleme sonrası size işlem kalemlerini, süreyi ve toplam maliyeti içeren yazılı bir tedavi planı sunuyoruz. Planı görmeden bir şeye karar vermeniz gerekmiyor.",
  },
  {
    q: "Tedavi ne kadar sürer?",
    a: "İşleme göre değişir. Dolgu veya diş taşı temizliği tek seansta biter; implant ve ortodonti aylara yayılan süreçlerdir. Planlama aşamasında size seans sayısı ve takvim verilir.",
  },
  {
    q: "İşlem sırasında ağrı hisseder miyim?",
    a: "İşlemler lokal anestezi altında yapılır, bu sayede tedavi sırasında ağrı beklenmez. Anestezi sonrası dönemde hafif hassasiyet olabilir; bunun için ne yapmanız gerektiği seans sonunda anlatılır.",
  },
  {
    q: "Randevu nasıl alıyorum?",
    a: "Sayfadaki formu doldurup gönderdiğinizde aynı gün içinde sizi arayıp uygun saati birlikte belirliyoruz. Dilerseniz doğrudan telefonla veya WhatsApp üzerinden de ulaşabilirsiniz.",
  },
  {
    q: "Randevumu değiştirmem gerekirse?",
    a: "Telefonla haber vermeniz yeterli. Mümkün olduğunca erken bildirirseniz o saati bekleyen başka bir hastaya açabiliyoruz.",
  },
  {
    q: "Ödemeyi nasıl yapabilirim?",
    a: "Ödeme seçeneklerini tedavi planıyla birlikte paylaşıyoruz. Güncel koşulları muayene sırasında sormanız en doğrusu.",
  },
];

export default function Faq() {
  return (
    <section id="sss" className="border-y border-brand-100 bg-brand-50/50">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p
            data-rv
            className="text-sm font-semibold uppercase tracking-widest text-brand-600"
          >
            Sık sorulanlar
          </p>
          <h2
            data-rv
            className="mt-3 text-3xl font-semibold tracking-tight delay-75 sm:text-4xl"
          >
            Hastalarımızın en çok sorduğu
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              data-rv
              style={{ transitionDelay: `${i * 60}ms` }}
              className="group border-b border-brand-200"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-semibold leading-snug transition hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-brand-200 text-brand-600 transition group-open:rotate-180 group-open:border-brand-600 group-open:bg-brand-600 group-open:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-10 text-sm leading-relaxed text-ink/65">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
