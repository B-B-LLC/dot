import Sayac from "./Sayac";

const metrikler = [
  { hedef: 12, sonek: "+", etiket: "Yıllık deneyim" },
  { hedef: 4800, ayrac: true, etiket: "Tamamlanan tedavi" },
  { hedef: 3, etiket: "Uzman hekim" },
];

const noktalar = [
  {
    baslik: "Sterilizasyon protokolü",
    metin: "Tüm süreçler Sağlık Bakanlığı standartlarına uygun yürütülür.",
    icon: "M12 2l8 4v6c0 5-3.4 8.8-8 10-4.6-1.2-8-5-8-10V6zM9 12l2 2 4-4",
  },
  {
    baslik: "Yazılı tedavi planı",
    metin: "Muayene sonrası işlem, süre ve maliyet yazılı olarak paylaşılır.",
    icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 14h6M9 18h4",
  },
  {
    baslik: "Randevu saatine sadakat",
    metin: "Bekleme süresini en aza indiren randevu aralıkları kullanıyoruz.",
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.2 1.9",
  },
];

export default function Trust() {
  return (
    <section className="border-y border-brand-100 bg-brand-50/50">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <p
            data-rv
            className="text-sm font-semibold uppercase tracking-widest text-brand-600"
          >
            Neden buradayız
          </p>
          <h2
            data-rv
            className="mt-3 text-3xl font-semibold tracking-tight delay-75 sm:text-4xl"
          >
            Abartılı vaat değil, anlaşılır bir süreç.
          </h2>
          <p data-rv className="mt-4 text-ink/65 delay-100">
            2013&apos;ten bu yana Ankara Çankaya&apos;da hizmet veriyoruz.
            Amacımız hastanın tedaviye başlamadan önce ne yapılacağını, ne kadar
            süreceğini ve ne kadara mal olacağını net biçimde bilmesi.
          </p>

          <ul className="mt-9 grid gap-5">
            {noktalar.map((n, i) => (
              <li
                key={n.baslik}
                data-rv
                className="flex items-start gap-3.5"
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-white text-brand-600 ring-1 ring-brand-100">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={n.icon} />
                  </svg>
                </span>
                <span>
                  <b className="block font-semibold">{n.baslik}</b>
                  <span className="mt-0.5 block text-sm leading-relaxed text-ink/65">
                    {n.metin}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          data-rv
          className="grid grid-cols-3 gap-px overflow-hidden rounded-3xl border border-brand-100 bg-brand-100 delay-100 lg:self-center"
        >
          {metrikler.map((m) => (
            <div key={m.etiket} className="bg-white px-3 py-7 text-center">
              <b className="block text-3xl font-bold tracking-tight text-brand-600 sm:text-4xl">
                <Sayac hedef={m.hedef} sonek={m.sonek} ayrac={m.ayrac} />
              </b>
              <span className="mt-2 block text-xs leading-snug text-ink/60">
                {m.etiket}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
