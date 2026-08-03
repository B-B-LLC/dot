# Diş Kliniği Web Sitesi (Next.js)

## Yerelde çalıştırma
```bash
npm install
npm run dev
```
Tarayıcıda http://localhost:3000

## GitHub'a yükleme
```bash
git init
git add .
git commit -m "ilk commit"
git remote add origin <repo-url>
git push -u origin main
```

## Vercel
Proje zaten Vercel'de yayında: `disklinigi`
Repo'yu Vercel'deki projeye bağlarsan bundan sonra her `git push` otomatik deploy eder.

## Yapı
- `app/layout.tsx` — SEO başlıkları, font
- `app/page.tsx` — bölümlerin sırası
- `app/globals.css` — renk paleti (`--color-brand-*`)
- `components/` — Header, Hero, Services, Why, Team, Testimonials, Faq, Contact, Footer

Klinik adı, telefon, adres ve metinler ilgili bileşenlerin en üstündeki dizilerde.
İletişim formu şu an sadece arayüzde çalışıyor; gerçek gönderim için bir API route veya Formspree/Resend bağlanması gerekir.
