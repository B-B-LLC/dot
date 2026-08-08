"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#tedaviler", label: "Tedaviler" },
  { href: "#hekim", label: "Hekim" },
  { href: "#klinik", label: "Klinik" },
  { href: "#iletisim", label: "İletişim" },
];

const mobilLinks = [
  ...links.slice(0, 3),
  { href: "#surec", label: "Tedavi Süreci" },
  { href: "#sss", label: "Sık Sorulanlar" },
  { href: "#iletisim", label: "İletişim" },
];

export default function Header() {
  const [acik, setAcik] = useState(false);

  // Menü açıkken arka plan kaymasın; Esc kapatsın.
  useEffect(() => {
    if (!acik) return;
    const oncekiOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const kapat = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAcik(false);
    };
    document.addEventListener("keydown", kapat);
    return () => {
      document.body.style.overflow = oncekiOverflow;
      document.removeEventListener("keydown", kapat);
    };
  }, [acik]);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-4 px-5">
        <a href="#" className="flex flex-none items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M12 5.2c-1.3-1-2.7-1.6-4.1-1.6C5.2 3.6 3 5.9 3 9.1c0 2 .5 3.6 1.2 5.8.6 1.8.9 3 1.2 4.2.3 1.1.9 1.7 1.7 1.7.9 0 1.4-.6 1.7-2 .3-1.3.5-2.5.8-3.4.3-.9.8-1.4 1.4-1.4s1.1.5 1.4 1.4c.3.9.5 2.1.8 3.4.3 1.4.8 2 1.7 2 .8 0 1.4-.6 1.7-1.7.3-1.2.6-2.4 1.2-4.2.7-2.2 1.2-3.8 1.2-5.8 0-3.2-2.2-5.5-4.9-5.5-1.4 0-2.8.6-4.1 1.6Z" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Beyaz Diş <span className="text-brand-600">Kliniği</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink/70 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Randevu Al her ekran genişliğinde görünür */}
        <a
          href="#randevu"
          className="ml-auto inline-flex min-h-11 flex-none items-center rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 active:scale-95 lg:ml-3"
        >
          Randevu Al
        </a>

        <button
          onClick={() => setAcik(!acik)}
          aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={acik}
          aria-controls="mobil-menu"
          className="-mr-2 grid h-11 w-11 flex-none place-items-center rounded-lg lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {acik ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {acik && (
        <div
          id="mobil-menu"
          className="fixed inset-x-0 bottom-0 top-20 z-40 flex flex-col overflow-y-auto overscroll-contain bg-white/98 px-5 pb-8 pt-6 backdrop-blur lg:hidden"
        >
          <nav className="flex flex-col">
            {mobilLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setAcik(false)}
                className="flex items-center justify-between border-b border-brand-100 py-4 text-xl font-semibold tracking-tight"
              >
                {l.label}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-brand-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </a>
            ))}
          </nav>

          <div className="mt-auto grid gap-2.5 pt-7">
            <a
              href="#randevu"
              onClick={() => setAcik(false)}
              className="rounded-xl bg-brand-600 px-6 py-4 text-center font-semibold text-white"
            >
              Randevu Al
            </a>
            <a
              href="tel:+903121234567"
              className="rounded-xl border border-brand-200 px-6 py-4 text-center font-semibold"
            >
              0312 123 45 67
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
