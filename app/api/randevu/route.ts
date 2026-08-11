import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { klinik } from '@/site.config';

/* Randevu talebi ucu.

   Talepler HİÇBİR YERE KAYDEDİLMEZ: gelen veri doğrulanır, e-posta olarak
   kliniğe iletilir ve bellekten düşer. Veri tabanı yok, günlüğe kişisel veri
   yazılmaz. KVKK yükünün büyük kısmı bu tercihten dolayı doğmaz. */

export const runtime = 'nodejs';

const ALAN_SINIRI = { ad: 80, tel: 25, tarih: 10, not: 1000 };

/* Aynı IP'den kısa sürede gelen tekrarlı gönderimleri sınırlar. Sunucu örneği
   yeniden başladığında sıfırlanır; kalıcı koruma için Turnstile eklenmeli. */
const PENCERE_MS = 60_000;
const PENCERE_SINIRI = 5;
const gecmis = new Map<string, number[]>();

function sinirAsildi(kimlik: string) {
  const simdi = Date.now();
  const oncekiler = (gecmis.get(kimlik) ?? []).filter((t) => simdi - t < PENCERE_MS);
  oncekiler.push(simdi);
  gecmis.set(kimlik, oncekiler);

  if (gecmis.size > 500) {
    for (const [k, v] of gecmis) if (v.every((t) => simdi - t >= PENCERE_MS)) gecmis.delete(k);
  }
  return oncekiler.length > PENCERE_SINIRI;
}

function metin(deger: unknown, enFazla: number) {
  return typeof deger === 'string' ? deger.trim().slice(0, enFazla) : '';
}

/** Satır sonlarını temizler; başlık satırına enjeksiyon yapılmasını engeller. */
function baslikGuvenli(deger: string) {
  return deger.replace(/[\r\n]+/g, ' ');
}

function kacir(deger: string) {
  return deger
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(istek: Request) {
  const anahtar = process.env.RESEND_API_KEY;
  const alici = process.env.RANDEVU_ALICI;

  if (!anahtar || !alici) {
    console.error('randevu: RESEND_API_KEY veya RANDEVU_ALICI tanımlı değil');
    return NextResponse.json(
      { hata: 'Gönderim şu anda yapılandırılmamış. Lütfen telefonla ulaşın.' },
      { status: 503 }
    );
  }

  const ip =
    istek.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    istek.headers.get('x-real-ip') ||
    'bilinmiyor';

  if (sinirAsildi(ip)) {
    return NextResponse.json(
      { hata: 'Çok sayıda talep gönderildi. Lütfen biraz sonra tekrar deneyin.' },
      { status: 429 }
    );
  }

  let govde: Record<string, unknown>;
  try {
    govde = await istek.json();
  } catch {
    return NextResponse.json({ hata: 'Talep okunamadı.' }, { status: 400 });
  }

  /* Bot tuzağı: kullanıcıya görünmeyen alan. Doluysa gönderim yapılmaz ama
     başarılı yanıt döner, böylece botun deneme yaptığı anlaşılmaz. */
  if (metin(govde.kapan, 100)) {
    return NextResponse.json({ tamam: true });
  }

  const ad = metin(govde.ad, ALAN_SINIRI.ad);
  const tel = metin(govde.tel, ALAN_SINIRI.tel);
  const tarih = metin(govde.tarih, ALAN_SINIRI.tarih);
  const not = metin(govde.not, ALAN_SINIRI.not);
  const bulten = govde.bulten === true;

  const alanHatalari: Record<string, string> = {};
  if (!ad) alanHatalari.ad = 'Ad ve soyadınızı yazın.';
  if (tel.replace(/[^0-9]/g, '').length < 10) {
    alanHatalari.tel = 'Telefon numarası eksik görünüyor.';
  }
  if (Object.keys(alanHatalari).length) {
    return NextResponse.json({ alanHatalari }, { status: 422 });
  }

  const satirlar = [
    ['Ad soyad', ad],
    ['Telefon', tel],
    ['Tercih edilen tarih', tarih || '—'],
    ['Not', not || '—'],
    ['Bilgilendirme izni', bulten ? 'Evet' : 'Hayır']
  ];

  const resend = new Resend(anahtar);

  try {
    const { error } = await resend.emails.send({
      from: process.env.RANDEVU_GONDEREN || 'Randevu <onboarding@resend.dev>',
      to: alici,
      replyTo: undefined,
      subject: baslikGuvenli(`Randevu talebi — ${ad}`),
      text: satirlar.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n${klinik.ad}`,
      html:
        `<h2 style="font-family:sans-serif">Randevu talebi</h2>` +
        `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">` +
        satirlar
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 16px 6px 0;color:#666">${kacir(k)}</td>` +
              `<td style="padding:6px 0"><strong>${kacir(v)}</strong></td></tr>`
          )
          .join('') +
        `</table><p style="font-family:sans-serif;font-size:12px;color:#888">` +
        `${kacir(klinik.ad)} — site randevu formu</p>`
    });

    if (error) {
      console.error('randevu: Resend hatası', error.name);
      return NextResponse.json(
        { hata: 'Talebiniz gönderilemedi. Lütfen telefonla ulaşın.' },
        { status: 502 }
      );
    }
  } catch (hata) {
    console.error('randevu: gönderim başarısız', hata instanceof Error ? hata.message : hata);
    return NextResponse.json(
      { hata: 'Talebiniz gönderilemedi. Lütfen telefonla ulaşın.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ tamam: true });
}
