export default function Cta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900 text-white">
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_65%_70%_at_50%_8%,rgba(79,173,180,0.3),transparent_62%)]" />

      <div className="relative mx-auto max-w-2xl px-5 py-20 text-center lg:py-28">
        <p
          data-rv
          className="text-sm font-semibold uppercase tracking-widest text-brand-300"
        >
          Randevu
        </p>
        <h2
          data-rv
          className="mt-3 text-3xl font-semibold tracking-tight delay-75 sm:text-4xl"
        >
          Gülüşünüz için ilk adımı atın
        </h2>
        <p data-rv className="mt-4 text-white/70 delay-100">
          Muayene ve bilgilendirme sonrası kararı siz verirsiniz. Formu bırakın,
          aynı gün içinde sizi arayalım.
        </p>

        <div
          data-rv
          className="mt-8 flex flex-col justify-center gap-3 delay-150 sm:flex-row"
        >
          <a
            href="#randevu"
            className="inline-flex min-h-13 min-w-50 items-center justify-center rounded-xl bg-white px-6 py-3.5 font-semibold text-brand-800 shadow-xl transition hover:bg-brand-50 active:scale-[0.98]"
          >
            Randevu Al
          </a>
          <a
            href="https://wa.me/905XXXXXXXXX"
            rel="noopener"
            className="inline-flex min-h-13 min-w-50 items-center justify-center gap-2.5 rounded-xl border border-white/35 px-6 py-3.5 font-semibold transition hover:border-white/60 hover:bg-white/10 active:scale-[0.98]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7.2 3.9zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1s-.6.8-.8 1c-.1.1-.3.2-.5 0a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.4c-.2 0-.4.1-.7.3-.9.9-.9 2.1-.1 3.4a10 10 0 0 0 4 3.5c1.5.6 2.1.7 2.8.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.1z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
