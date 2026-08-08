/**
 * POST /api/randevu
 * Randevu talebi alır, doğrular ve e-posta olarak iletir.
 *
 * Ortam değişkenleri (Vercel > Settings > Environment Variables):
 *   RESEND_API_KEY  - resend.com'dan alınan API anahtarı
 *   ALICI_EPOSTA    - taleplerin düşeceği adres (klinik e-postası)
 *   GONDEREN_EPOSTA - doğrulanmış gönderen adresi (ör. randevu@klinigin.com)
 *
 * Anahtar yoksa istek yine doğrulanır ve 200 döner, e-posta gönderilmez.
 */

export const KONULAR = [
  "Genel muayene / kontrol",
  "İmplant",
  "Ortodonti",
  "Estetik diş hekimliği",
  "Çocuk diş hekimliği",
  "Diğer",
] as const;

// Basit hız sınırı. Serverless'ta örnek başına çalışır, kesin koruma değil;
// kötüye kullanımı yavaşlatmak için yeterli.
const istekler = new Map<string, { sayi: number; baslangic: number }>();
const PENCERE_MS = 60_000;
const PENCERE_LIMIT = 5;

function hizSiniri(ip: string) {
  const simdi = Date.now();
  const kayit = istekler.get(ip) ?? { sayi: 0, baslangic: simdi };
  if (simdi - kayit.baslangic > PENCERE_MS) {
    kayit.sayi = 0;
    kayit.baslangic = simdi;
  }
  kayit.sayi += 1;
  istekler.set(ip, kayit);
  if (istekler.size > 5000) istekler.clear();
  return kayit.sayi <= PENCERE_LIMIT;
}

function temizle(deger: unknown, maks: number) {
  return String(deger ?? "")
    .trim()
    .slice(0, maks);
}

function telefonGecerli(tel: string) {
  const rakam = tel.replace(/\D/g, "");
  // 05XXXXXXXXX (11) | 5XXXXXXXXX (10) | 905XXXXXXXXX (12)
  return /^(0?5\d{9}|905\d{9}|0?\d{10})$/.test(rakam);
}

type Govde = Record<string, unknown>;

function dogrula(govde: Govde) {
  const hatalar: Record<string, string> = {};

  const ad = temizle(govde.ad, 80);
  if (ad.length < 2) hatalar.ad = "Ad soyad en az 2 karakter olmalı.";

  const telefon = temizle(govde.telefon, 25);
  if (!telefonGecerli(telefon))
    hatalar.telefon = "Geçerli bir telefon numarası girin.";

  const konuHam = temizle(govde.konu, 60);
  const konu = (KONULAR as readonly string[]).includes(konuHam)
    ? konuHam
    : KONULAR[0];

  const not = temizle(govde.not, 500);

  return { hatalar, veri: { ad, telefon, konu, not } };
}

async function epostaGonder(veri: {
  ad: string;
  telefon: string;
  konu: string;
  not: string;
}) {
  const anahtar = process.env.RESEND_API_KEY;
  const alici = process.env.ALICI_EPOSTA;
  const gonderen = process.env.GONDEREN_EPOSTA;

  if (!anahtar || !alici || !gonderen) {
    console.log("[randevu] E-posta yapılandırması eksik, gönderim atlandı.");
    return { gonderildi: false as const };
  }

  const govde = [
    `Ad Soyad : ${veri.ad}`,
    `Telefon  : ${veri.telefon}`,
    `Konu     : ${veri.konu}`,
    `Not      : ${veri.not || "-"}`,
    ``,
    `Tarih    : ${new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
    })}`,
  ].join("\n");

  const yanit = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${anahtar}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: gonderen,
      to: [alici],
      reply_to: alici,
      subject: `Yeni randevu talebi — ${veri.ad}`,
      text: govde,
    }),
  });

  if (!yanit.ok) {
    console.error("[randevu] Resend hatası:", yanit.status);
    return { gonderildi: false as const };
  }

  return { gonderildi: true as const };
}

export async function POST(req: Request) {
  const ip =
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    "bilinmiyor";

  if (!hizSiniri(ip)) {
    return Response.json(
      {
        ok: false,
        mesaj: "Çok fazla deneme yaptınız. Lütfen bir dakika sonra tekrar deneyin.",
      },
      { status: 429 },
    );
  }

  let govde: Govde;
  try {
    govde = (await req.json()) as Govde;
  } catch {
    return Response.json(
      { ok: false, mesaj: "Geçersiz istek." },
      { status: 400 },
    );
  }
  govde = govde ?? {};

  // Bal küpü: botlar bu gizli alanı doldurur, insanlar görmez.
  if (temizle(govde.website, 100).length > 0) {
    return Response.json({ ok: true, mesaj: "Talebiniz alındı." });
  }

  const { hatalar, veri } = dogrula(govde);
  if (Object.keys(hatalar).length > 0) {
    return Response.json(
      { ok: false, mesaj: "Lütfen alanları kontrol edin.", hatalar },
      { status: 422 },
    );
  }

  try {
    const sonuc = await epostaGonder(veri);
    // KVKK: kişisel veriyi loglamıyoruz, yalnızca sonucu.
    console.log("[randevu] Talep işlendi. Gönderim:", sonuc.gonderildi);
    return Response.json({
      ok: true,
      mesaj: "Talebiniz alındı. En kısa sürede sizi arayacağız.",
    });
  } catch (hata) {
    console.error("[randevu] Beklenmeyen hata:", hata);
    return Response.json(
      {
        ok: false,
        mesaj: "Beklenmeyen bir hata oluştu. Lütfen telefonla ulaşın.",
      },
      { status: 500 },
    );
  }
}
