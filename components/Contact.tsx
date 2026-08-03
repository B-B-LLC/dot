"use client";

import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="iletisim" className="bg-brand-50/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
            Randevu
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Size uygun saati birlikte belirleyelim
          </h2>
          <p className="mt-4 text-ink/65">
            Formu doldurun, aynı gün içinde arayıp müsait saatleri paylaşalım.
            Acil durumlar için doğrudan telefonla ulaşabilirsiniz.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="font-semibold">Adres</dt>
              <dd className="mt-1 text-ink/65">
                Bağdat Caddesi No: 124, Kadıköy / İstanbul
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Telefon</dt>
              <dd className="mt-1">
                <a href="tel:+902121234567" className="text-brand-700 hover:underline">
                  0212 123 45 67
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">E-posta</dt>
              <dd className="mt-1">
                <a href="mailto:info@beyazdisklinigi.com" className="text-brand-700 hover:underline">
                  info@beyazdisklinigi.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Çalışma saatleri</dt>
              <dd className="mt-1 text-ink/65">
                Pazartesi – Cuma 09:00 – 19:00 · Cumartesi 10:00 – 16:00
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl border border-brand-100 bg-white p-8 shadow-sm">
          {sent ? (
            <div className="flex h-full min-h-72 flex-col items-center justify-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-100 text-brand-700">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5L20 7" />
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-semibold">Talebiniz alındı</h3>
              <p className="mt-2 text-sm text-ink/65">
                En kısa sürede sizi arayacağız.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="ad" className="text-sm font-medium">
                  Ad Soyad
                </label>
                <input
                  id="ad"
                  name="ad"
                  required
                  className="mt-1.5 w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="tel" className="text-sm font-medium">
                  Telefon
                </label>
                <input
                  id="tel"
                  name="tel"
                  type="tel"
                  required
                  placeholder="05xx xxx xx xx"
                  className="mt-1.5 w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="konu" className="text-sm font-medium">
                  İlgilendiğiniz tedavi
                </label>
                <select
                  id="konu"
                  name="konu"
                  className="mt-1.5 w-full rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
                >
                  <option>Genel muayene</option>
                  <option>İmplant</option>
                  <option>Ortodonti</option>
                  <option>Estetik / gülüş tasarımı</option>
                  <option>Çocuk diş hekimliği</option>
                  <option>Diğer</option>
                </select>
              </div>
              <div>
                <label htmlFor="mesaj" className="text-sm font-medium">
                  Notunuz (opsiyonel)
                </label>
                <textarea
                  id="mesaj"
                  name="mesaj"
                  rows={3}
                  className="mt-1.5 w-full resize-none rounded-xl border border-brand-100 bg-brand-50/40 px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Randevu talebi gönder
              </button>
              <p className="text-center text-xs text-ink/50">
                Bilgileriniz yalnızca randevu için kullanılır, üçüncü kişilerle
                paylaşılmaz.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
