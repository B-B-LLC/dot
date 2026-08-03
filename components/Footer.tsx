export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">
            Beyaz Diş <span className="text-brand-600">Kliniği</span>
          </p>
          <p className="mt-1 text-sm text-ink/55">
            Bağdat Caddesi No: 124, Kadıköy / İstanbul
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60">
          <a href="#hizmetler" className="hover:text-brand-600">Hizmetler</a>
          <a href="#ekip" className="hover:text-brand-600">Ekibimiz</a>
          <a href="#sss" className="hover:text-brand-600">S.S.S.</a>
          <a href="#iletisim" className="hover:text-brand-600">İletişim</a>
        </div>
      </div>
      <div className="border-t border-brand-50 py-5 text-center text-xs text-ink/45">
        © {new Date().getFullYear()} Beyaz Diş Kliniği. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
