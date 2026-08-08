const butonlar = [
  {
    ad: "WhatsApp ile yazın",
    href: "https://wa.me/905XXXXXXXXX",
    renk: "bg-[#25d366] text-[#0a2e18]",
    path: "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3a8.2 8.2 0 1 1 7.2 3.9zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1s-.6.8-.8 1c-.1.1-.3.2-.5 0a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.4c-.2 0-.4.1-.7.3-.9.9-.9 2.1-.1 3.4a10 10 0 0 0 4 3.5c1.5.6 2.1.7 2.8.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.1z",
  },
  {
    ad: "Telefonla arayın",
    href: "tel:+903121234567",
    renk: "bg-brand-600 text-white",
    path: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  },
];

export default function FloatingActions() {
  return (
    <div className="fixed bottom-[max(0.875rem,env(safe-area-inset-bottom))] right-3.5 z-40 flex flex-col gap-2.5 lg:bottom-6 lg:right-6">
      {butonlar.map((b) => (
        <a
          key={b.ad}
          href={b.href}
          aria-label={b.ad}
          rel="noopener"
          className={`grid h-13 w-13 place-items-center rounded-full shadow-xl shadow-brand-900/25 transition active:scale-90 hover:scale-105 ${b.renk}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={b.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
