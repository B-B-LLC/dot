"use client";

import { useState } from "react";

const konular = [
  "Genel muayene / kontrol",
  "İmplant",
  "Ortodonti",
  "Estetik diş hekimliği",
  "Çocuk diş hekimliği",
  "Diğer",
];

const iletisim = [
  {
    baslik: "Adres",
    deger: "Cinnah Caddesi No: 00, Çankaya / Ankara",
    icon: "M20 10.5c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 1 1 16 0ZM12 13a2.7 2.7 0 1 0 0-5.4A2.7 2.7 0 0 0 12 13Z",
  },
  {
    baslik: "Telefon",
    deger: "0312 123 45 67",
    href: "tel:+903121234567",
    icon: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  },
  {
    baslik: "WhatsApp",
    deger: "05XX XXX XX XX",
    href: "https://wa.me/905XXXXXXXXX",
    icon: "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.4-1.3l-3.1.8.8-3A8.2 8.2 0 1 1 12 20.2Z",
  },
  {
    baslik: "E-posta",
    deger: "info@beyazdisklinigi.com",
    icon: "M4.5 4.5h15a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2ZM3 7l9 6 9-6",
  },
];

const saatler = [
  { gun: "Pazartesi – Cuma", saat: "09:00 – 19:00" },
  { gun: "Cumartesi", saat: "09:00 – 15:00" },
  { gun: "Pazar", saat: "Kapalı" },
];

const alanSinif =
  "mt-1.5 w-full min-h-13 rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-base outline-none transition focus:border-brand-400 focus:bg-white focus:ring-3 focus:ring-brand-600/12";

type Durum = { tip: "ok" | "err"; mesaj: string } | null;

export default function Contact() {
  const [gonderiliyor, setGonderiliyor] = useState(false);
  const [durum, setDurum] = useState<Durum>(null);
  const [hataliAlanlar, setHataliAlanlar] = useState<string[]>([]);

  async function gonder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const veri = Object.fromEntries(new FormData(form).entries());

    setGonderiliyor(true);
    setDurum(null);
    setHataliAlanlar([]);

    try {
      const yanit = await fetch("/api/randevu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veri),
      });
      const sonuc = await yanit.json().catch(() => ({}));

      if (yanit.ok && sonuc.ok) {
        form.reset();
        setDurum({ tip: "ok", mesaj: sonuc.mesaj ?? "Talebiniz alındı." });
      } else {
        // Başarısız gönderimde her koşulda "alındı" demiyoruz.
        setHataliAlanlar(Object.keys(sonuc.hatalar ?? {}));
        setDurum({
          tip: "err",
          mesaj: sonuc.mesaj ?? "Gönderilemedi. Lütfen telefonla ulaşın.",
        });
      }
    } catch {
      setDurum({
        tip: "err",
        mesaj: "Bağlantı kurulamadı. Lütfen telefonla ulaşın.",
      });
    } finally {
      setGonderiliyor(false);
    }
  }

  const hataliMi = (ad: string) =>
    hataliAlanlar.includes(ad) ? " border-red-400 ring-3 ring-red-500/10" : "";

  return (
    <section id="randevu" className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <div id="iletisim" className="max-w-2xl scroll-mt-24">
        <p
          data-rv
          className="text-sm font-semibold uppercase tracking-widest text-brand-600"
        >
          İletişim
        </p>
        <h2
          data-rv
          className="mt-3 text-3xl font-semibold tracking-tight delay-75 sm:text-4xl"
        >
          Randevu formu
        </h2>
        <p data-rv className="mt-4 text-ink/65 delay-100">
          Formu doldurun, aynı gün içinde sizi arayarak uygun saati birlikte
          belirleyelim.
        </p>
      </div>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <form
          data-rv
          onSubmit={gonder}
          noValidate
          className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Bal küpü — botlar doldurur, insanlar görmez */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-px w-px opacity-0"
          />

          <div>
            <label htmlFor="ad" className="text-sm font-medium">
              Ad Soyad
            </label>
            <input
              id="ad"
              name="ad"
              required
              autoComplete="name"
              placeholder="Adınız ve soyadınız"
              className={alanSinif + hataliMi("ad")}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="telefon" className="text-sm font-medium">
              Telefon
            </label>
            <input
              id="telefon"
              name="telefon"
              type="tel"
              inputMode="tel"
              required
              autoComplete="tel"
              placeholder="05XX XXX XX XX"
              className={alanSinif + hataliMi("telefon")}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="konu" className="text-sm font-medium">
              Talebiniz
            </label>
            <select id="konu" name="konu" className={alanSinif}>
              {konular.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label htmlFor="not" className="text-sm font-medium">
              Eklemek istedikleriniz{" "}
              <span className="font-normal text-ink/45">(isteğe bağlı)</span>
            </label>
            <textarea
              id="not"
              name="not"
              rows={3}
              placeholder="Tercih ettiğiniz gün veya saat aralığı"
              className={alanSinif + " resize-y"}
            />
          </div>

          <button
            type="submit"
            disabled={gonderiliyor}
            className="mt-6 min-h-14 w-full rounded-xl bg-brand-600 px-6 py-4 font-semibold text-white shadow-lg shadow-brand-900/20 transition hover:bg-brand-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {gonderiliyor ? "Gönderiliyor…" : "Randevu Talebi Gönder"}
          </button>

          {durum && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-3.5 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                durum.tip === "ok"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {durum.mesaj}
            </p>
          )}

          <p className="mt-3.5 text-xs leading-relaxed text-ink/45">
            Bu form yalnızca sizinle iletişime geçmek amacıyla ad, soyad ve
            telefon bilgisi toplar. Lütfen sağlık durumunuza ilişkin bilgi
            paylaşmayınız. Verileriniz KVKK kapsamında saklanır ve üçüncü
            kişilerle paylaşılmaz.
          </p>
        </form>

        <div data-rv className="delay-100">
          <dl className="rounded-3xl border border-brand-100 bg-brand-50/50 px-6">
            {iletisim.map((k) => (
              <div
                key={k.baslik}
                className="flex items-start gap-3.5 border-b border-brand-100 py-4 last:border-b-0"
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-brand-100 bg-white text-brand-600">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4.5 w-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={k.icon} />
                  </svg>
                </span>
                <div>
                  <dt className="text-sm font-semibold">{k.baslik}</dt>
                  <dd className="mt-0.5 text-sm text-ink/65">
                    {k.href ? (
                      <a
                        href={k.href}
                        rel="noopener"
                        className="transition hover:text-brand-700"
                      >
                        {k.deger}
                      </a>
                    ) : (
                      k.deger
                    )}
                  </dd>
                </div>
              </div>
            ))}

            <div className="flex items-start gap-3.5 border-t border-brand-100 py-4">
              <span className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-brand-100 bg-white text-brand-600">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4.5 w-4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3.2 1.9" />
                </svg>
              </span>
              <div className="flex-1">
                <dt className="text-sm font-semibold">Çalışma saatleri</dt>
                <dd className="mt-1.5">
                  {saatler.map((s) => (
                    <span
                      key={s.gun}
                      className="flex justify-between gap-4 py-0.5 text-sm"
                    >
                      <span className="text-ink/65">{s.gun}</span>
                      <b className="font-semibold">{s.saat}</b>
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-4 flex aspect-16/10 items-center justify-center rounded-3xl border border-brand-100 bg-[repeating-linear-gradient(45deg,var(--color-brand-50),var(--color-brand-50)_12px,var(--color-brand-100)_12px,var(--color-brand-100)_24px)] p-6 text-center text-sm leading-relaxed text-ink/50">
            Google Haritalar yerleşimi buraya gömülecek
            <br />
            (Maps → Paylaş → Harita yerleştir)
          </div>
        </div>
      </div>
    </section>
  );
}
