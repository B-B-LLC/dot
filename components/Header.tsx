"use client";

import { useState } from "react";

const links = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#neden-biz", label: "Neden Biz" },
  { href: "#ekip", label: "Ekibimiz" },
  { href: "#yorumlar", label: "Yorumlar" },
  { href: "#sss", label: "S.S.S." },
  { href: "#iletisim", label: "İletişim" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
              <path d="M12 5.2c-1.3-1-2.7-1.6-4.1-1.6C5.2 3.6 3 5.9 3 9.1c0 2 .5 3.6 1.2 5.8.6 1.8.9 3 1.2 4.2.3 1.1.9 1.7 1.7 1.7.9 0 1.4-.6 1.7-2 .3-1.3.5-2.5.8-3.4.3-.9.8-1.4 1.4-1.4s1.1.5 1.4 1.4c.3.9.5 2.1.8 3.4.3 1.4.8 2 1.7 2 .8 0 1.4-.6 1.7-1.7.3-1.2.6-2.4 1.2-4.2.7-2.2 1.2-3.8 1.2-5.8 0-3.2-2.2-5.5-4.9-5.5-1.4 0-2.8.6-4.1 1.6Z" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Beyaz Diş <span className="text-brand-600">Kliniği</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/70 transition hover:text-brand-600"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+902121234567"
            className="text-sm font-semibold text-ink/80 transition hover:text-brand-600"
          >
            0212 123 45 67
          </a>
          <a
            href="#iletisim"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Randevu Al
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menüyü aç"
          className="grid h-11 w-11 place-items-center rounded-lg border border-brand-100 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-brand-100 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-brand-50 py-3 text-sm font-medium text-ink/80 last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#iletisim"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Randevu Al
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
