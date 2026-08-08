"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const fazlar = [
  {
    rozet: "Ankara · Çankaya",
    satirlar: ["Gülüşünüzü", "yeniden düşünün."],
    metin:
      "Diş hekimliğinde iyi sonuç, iyi planlamayla başlar. Süreci baştan sona birlikte kurguluyoruz.",
  },
  {
    rozet: "01 · Dijital analiz",
    satirlar: ["Dijital analiz"],
    metin:
      "Ağız içi tarayıcı ve 3B görüntüleme ile dişlerinizin ölçüsünü tahmine bırakmadan alıyoruz.",
  },
  {
    rozet: "02 · Kişisel planlama",
    satirlar: ["Kişisel planlama"],
    metin:
      "Hangi işlemin neden yapılacağını, ne kadar süreceğini ve maliyetini tedaviye başlamadan yazılı olarak paylaşıyoruz.",
  },
  {
    rozet: "03 · Sıra sizde",
    satirlar: ["İlk adım:", "bir randevu."],
    metin:
      "Muayene ve bilgilendirme sonrası kararı siz veriyorsunuz. Aynı gün içinde sizi arayalım.",
  },
];

const saatler = [
  { gun: "Pzt–Cum", saat: "09:00–19:00" },
  { gun: "Cmt", saat: "09:00–15:00" },
];

export default function Hero() {
  const kok = useRef<HTMLElement>(null);
  const cubuk = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // iOS'ta adres çubuğu açılıp kapanınca gereksiz refresh olmasın.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 'hep' her zaman eşleşir. gsap.matchMedia bir context'i ancak en az bir
      // koşul doğruyken canlı tutar; yalnızca azHareket + mobil verilseydi
      // masaüstünde (ikisi de false) context geri alınır ve hero donardı.
      mm.add(
        {
          hep: "(min-width: 1px)",
          azHareket: "(prefers-reduced-motion: reduce)",
          mobil: "(max-width: 899px)",
        },
        (self) => {
          const { azHareket, mobil } = self.conditions as {
            azHareket: boolean;
            mobil: boolean;
          };

          // Hareket azaltılmışsa scroll'a hiç dokunma: ilk faz sabit dursun.
          if (azHareket) return;

          const fazEl = gsap.utils.toArray<HTMLElement>("[data-faz]");
          if (fazEl.length < 2) return;

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: kok.current,
              start: "top top",
              end: mobil ? "+=200%" : "+=320%",
              pin: "[data-pin]",
              pinSpacing: true,
              anticipatePin: 1,
              scrub: 0.55,
              invalidateOnRefresh: true,
              onUpdate: (st) => {
                if (cubuk.current) {
                  cubuk.current.style.transform = `scaleX(${st.progress})`;
                }
              },
            },
          });

          // Faz geçişleri — yalnızca opacity + transform (compositor'da kalır)
          const kayma = mobil ? 26 : 38;
          fazEl.forEach((faz, i) => {
            if (i > 0) {
              tl.fromTo(
                faz,
                { opacity: 0, y: kayma },
                { opacity: 1, y: 0, duration: 0.6 },
                i,
              );
            }
            if (i < fazEl.length - 1) {
              tl.to(faz, { opacity: 0, y: -kayma, duration: 0.6 }, i + 0.75);
            }
          });

          // Görsel katman
          tl.to("[data-dis]", { scale: 0.82, rotate: -6, duration: 1 }, 0)
            .to("[data-tarama]", { opacity: 1, duration: 0.3 }, 0.85)
            .fromTo(
              "[data-tarama]",
              { yPercent: -160 },
              { yPercent: 160, duration: 1.1 },
              0.9,
            )
            .to("[data-tarama]", { opacity: 0, duration: 0.3 }, 1.9)
            .to("[data-dis]", { scale: 0.92, rotate: 3, duration: 1 }, 1.6)
            .to(
              "[data-nokta]",
              { opacity: 1, duration: 0.35, stagger: 0.18 },
              1.95,
            )
            .to("[data-dis]", { scale: 1, rotate: 0, duration: 1 }, 2.6)
            .to("[data-nokta]", { opacity: 0.25, duration: 0.4 }, 2.8)
            .fromTo(
              "[data-onay]",
              { opacity: 0, scale: 0.5 },
              { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
              2.95,
            );
        },
      );
    }, kok);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={kok}
      id="hero"
      className="bg-gradient-to-b from-brand-50 via-white to-brand-50/40"
    >
      <div
        data-pin
        className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-center overflow-hidden py-10 sm:py-14"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-9 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            {/* Fazlar aynı grid hücresinde üst üste durur: kapsayıcı en uzun
                fazın yüksekliğini alır, uzun başlık alttaki butonlara binmez.
                GSAP hiç çalışmazsa ilk faz görünür kalır, diğerleri şeffaf. */}
            <div className="grid">
              {fazlar.map((faz, i) => {
                const Baslik = i === 0 ? "h1" : "h2";
                return (
                  <div
                    key={faz.rozet}
                    data-faz
                    // 2-4. fazlar scroll anlatımının görsel varyasyonları;
                    // aynı bilgi Süreç bölümünde metin olarak da var.
                    aria-hidden={i > 0}
                    className={`col-start-1 row-start-1 flex flex-col justify-center ${
                      i === 0 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="mb-4 inline-flex items-center gap-2 self-start rounded-full bg-brand-100 px-3.5 py-1.5 text-xs font-semibold text-brand-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                      {faz.rozet}
                    </span>
                    <Baslik className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                      {faz.satirlar.map((satir) => (
                        <span key={satir} className="block">
                          {satir}
                        </span>
                      ))}
                    </Baslik>
                    <p className="mt-4 max-w-[34em] text-base leading-relaxed text-ink/65 sm:text-lg">
                      {faz.metin}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#randevu"
                className="inline-flex min-h-13 flex-auto items-center justify-center gap-2.5 rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-900/20 transition hover:bg-brand-700 active:scale-[0.98] sm:flex-none"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2.5" />
                  <path d="M16 3v4M8 3v4M3 11h18" />
                </svg>
                Randevu Al
              </a>
              <a
                href="tel:+903121234567"
                className="inline-flex min-h-13 flex-auto items-center justify-center gap-2.5 rounded-xl border border-brand-200 bg-white px-6 py-3.5 font-semibold transition hover:border-brand-600 hover:text-brand-700 active:scale-[0.98] sm:flex-none"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                </svg>
                0312 123 45 67
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60">
              {saatler.map((s) => (
                <span key={s.gun} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {s.gun} <b className="font-semibold text-ink">{s.saat}</b>
                </span>
              ))}
            </div>
          </div>

          {/* Görsel katman */}
          <div
            className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center lg:max-w-[430px]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,var(--color-brand-100)_0%,var(--color-brand-50)_48%,transparent_72%)]" />
            <div className="absolute inset-[7%] rounded-full border border-dashed border-brand-200" />
            <div className="absolute inset-[19%] rounded-full border border-brand-200/70" />

            <div
              data-dis
              className="relative w-[52%] text-brand-600 drop-shadow-[0_18px_34px_rgba(14,124,134,0.26)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-auto w-full"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5.5c-1.6-1.4-3.5-2-5-1.2-2 1-2.4 3.6-1.8 6.4.4 2 .6 3.4.8 5.2.2 1.7.6 3.6 1.9 3.6 1.2 0 1.5-1.6 1.8-3.2.3-1.5.6-2.8 2.3-2.8s2 1.3 2.3 2.8c.3 1.6.6 3.2 1.8 3.2 1.3 0 1.7-1.9 1.9-3.6.2-1.8.4-3.2.8-5.2.6-2.8.2-5.4-1.8-6.4-1.5-.8-3.4-.2-5 1.2z" />
              </svg>
            </div>

            <div
              data-tarama
              className="absolute inset-x-[14%] top-1/2 h-0.5 opacity-0 shadow-[0_0_18px_2px_rgba(14,124,134,0.5)]"
              style={{
                background:
                  "linear-gradient(90deg,transparent,var(--color-brand-600),transparent)",
              }}
            />

            <span
              data-nokta
              className="absolute left-[26%] top-[24%] h-2.5 w-2.5 rounded-full border-[2.5px] border-brand-600 bg-white opacity-0 shadow"
            />
            <span
              data-nokta
              className="absolute right-[21%] top-[38%] h-2.5 w-2.5 rounded-full border-[2.5px] border-brand-600 bg-white opacity-0 shadow"
            />
            <span
              data-nokta
              className="absolute bottom-[27%] left-[33%] h-2.5 w-2.5 rounded-full border-[2.5px] border-brand-600 bg-white opacity-0 shadow"
            />

            <span
              data-onay
              className="absolute bottom-[12%] right-[9%] grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white opacity-0 shadow-xl shadow-brand-900/40"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-100"
          aria-hidden="true"
        >
          <span
            ref={cubuk}
            className="block h-full w-full origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-brand-400"
          />
        </div>
      </div>
    </section>
  );
}
