import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { klinik, site } from '@/site.config';

/* Randevu talebi ucu.

   Talepler HİÇBİR YERE KAYDEDİLMEZ: gelen veri doğrulanır, e-posta olarak
   kliniğe iletilir ve bellekten düşer. Veri tabanı yok, günlüğe kişisel veri
   yazılmaz. KVKK yükünün büyük kısmı bu tercihten dolayı doğmaz.

   Kötüye kullanıma karşı dört katman var ve hiçbiri ziyaretçiye bir iş
   çıkarmaz — captcha bilerek yok (bkz. aşağıdaki not):

     1. Kaynak denetimi — talep bu siteden mi geliyor
     2. Bot tuzakları    — görünmeyen alanlar ve doldurma süresi
     3. Hız sınırı       — IP başına dakikada beş
     4. Alan sınırları   — uzunluk, biçim, başlık enjeksiyonu

   Captcha (Turnstile, reCAPTCHA) plandan çıkarıldı: her gönderimde çalışan
   bir doğrulama, ziyaretçinin IP'sini ve tarayıcı izini yurt dışındaki bir
   sağlayıcıya gönderir. Bu KVKK m.9 anlamında rutin bir yurt dışı aktarımdır,
   arızi istisnaya girmez ve sağlayıcılar Türkiye'nin standart sözleşmesini
   imzalamaz; açık rıza da hizmetin şartına bağlanamaz. Yani engellediği spam
   kadar hukuki risk üretiyordu. Gerçek bir spam akını başlarsa karar yeniden
   değerlendirilir. */

export const runtime = 'nodejs';

const ALAN_SINIRI = { ad: 80, tel: 25, tarih: 10, not: 1000 };

/* Gövde okunmadan önceki tavan. Formun en dolu hâli 1,2 KB'ı geçmez; bunun
   üstü ya hata ya saldırıdır ve JSON'u ayrıştırmaya hiç girilmez. */
const EN_BUYUK_GOVDE = 8_000;

/* Formu açıp göndermek arasında geçmesi gereken en az süre. İki alan yazıp
   düğmeye basmak insanın en hızlı hâlinde bile bunun altına inmez; sayfayı
   açar açmaz gönderen bir betiktir. Süreyi tarayıcı ölçüp gönderir (bkz.
   klinik-app.js): mutlak saat değil geçen süre yollandığı için ziyaretçinin
   saati yanlış ayarlıysa da doğru çalışır. */
const EN_AZ_DOLDURMA_MS = 3_000;

/* Aynı IP'den kısa sürede gelen tekrarlı gönderimleri sınırlar. Bellekte
   tutulur: sunucu örneği yeniden başladığında sıfırlanır ve her örneğin kendi
   sayacı olur. Tek klinik ölçeğinde yeterli; kalıcı sınır gerekirse dış bir
   sayaç (Redis, Upstash) gerekir. */
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

/** İstemcinin IP'si. Sıra önemli: `x-forwarded-for`u ziyaretçi de yazabilir ve
    her istekte başka bir değer göndererek hız sınırını boşa çıkarabilir.
    Vercel'in kendi koyduğu başlıklar ziyaretçinin erişemediği başlıklardır,
    bu yüzden önce onlara bakılır. */
function istemciIp(istek: Request) {
  return (
    istek.headers.get('x-vercel-forwarded-for') ||
    istek.headers.get('x-real-ip') ||
    istek.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'bilinmiyor'
  );
}

/** Talebin bu sitenin kendi sayfasından gelip gelmediği.

    Tarayıcı, başka bir sitedeki koddan gönderilen isteğe o sitenin adresini
    `Origin` olarak yazar ve bunu sayfa değiştiremez. Yani bu denetim, formu
    kendi sayfasına gömüp kliniğin kutusunu doldurmaya çalışan bir siteyi
    keser. Uç bir tarayıcı korumasıyla karıştırılmamalı: `curl` gibi bir araç
    başlığı istediği gibi yazar — onu tuzaklar ve hız sınırı karşılar.

    İki adres kabul edilir: isteğin geldiği sunucu adı (Vercel'in önizleme
    dağıtımları kliniğin alan adından farklı bir adreste durur) ve config'te
    yazan yayın adresi. */
function kaynakGecerli(istek: Request) {
  const kaynak = istek.headers.get('origin');
  if (!kaynak) return false;

  let gelen: URL;
  try {
    gelen = new URL(kaynak);
  } catch {
    return false;
  }

  if (gelen.host === istek.headers.get('host')) return true;

  try {
    return gelen.host === new URL(site.adres).host;
  } catch {
    return false;
  }
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
  /* Sıra bilerek böyle: talebin bu siteden gelip gelmediğine, sunucunun
     yapılandırılıp yapılandırılmadığından önce bakılır. Yabancı bir çağrıya
     "gönderim ayarlı değil" demek, sormadığı bir şeyi söylemektir. */
  if (!kaynakGecerli(istek)) {
    return NextResponse.json({ hata: 'Talep bu siteden gelmedi.' }, { status: 403 });
  }

  /* Sitenin formu JSON gönderir. Başka bir sayfadaki gizli bir <form> ise
     tarayıcıya bu türü yazdıramaz — o yüzden tür denetimi, `Origin` denetimini
     tamamlayan ikinci bir kilittir. */
  if (!(istek.headers.get('content-type') || '').includes('application/json')) {
    return NextResponse.json({ hata: 'Talep okunamadı.' }, { status: 415 });
  }

  const uzunluk = Number(istek.headers.get('content-length') || 0);
  if (uzunluk > EN_BUYUK_GOVDE) {
    return NextResponse.json({ hata: 'Talep fazla büyük.' }, { status: 413 });
  }

  const anahtar = process.env.RESEND_API_KEY;
  const alici = process.env.RANDEVU_ALICI;

  if (!anahtar || !alici) {
    console.error('randevu: RESEND_API_KEY veya RANDEVU_ALICI tanımlı değil');
    return NextResponse.json(
      { hata: 'Gönderim şu anda yapılandırılmamış. Lütfen telefonla ulaşın.' },
      { status: 503 }
    );
  }

  if (sinirAsildi(istemciIp(istek))) {
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

  /* Bot tuzakları. Üçünde de gönderim yapılmaz ama başarılı yanıt döner:
     botun denemesinin tutmadığını anlamaması, bir sonraki denemesini
     düzeltmemesi için. Gerçek ziyaretçi bu dallara hiç girmez.

     - `kapan` ve `eposta`: ekrandan ve ekran okuyucudan gizli alanlar. Formu
       kör dolduran bir betik hepsini doldurur; `eposta` ayrıca yemdir, çünkü
       botlar e-posta alanını atlamaz. Formda e-posta sorulmadığı için bu adın
       dolu gelmesinin başka bir açıklaması yok.
     - `sure` yok ya da sayı değil: form hiç açılmadan, doğrudan bu adrese
       JSON gönderilmiş demektir. */
  if (metin(govde.kapan, 100) || metin(govde.eposta, 100)) {
    return NextResponse.json({ tamam: true });
  }

  const sure = typeof govde.sure === 'number' && Number.isFinite(govde.sure) ? govde.sure : -1;
  if (sure < 0) {
    return NextResponse.json({ tamam: true });
  }

  /* Süre tuzağının tek görünür dalı. Sessiz yutmak yerine hata dönülüyor,
     çünkü buraya bir insanın da düşmesi mümkün (formu önceden doldurup
     sayfayı yeniden yükleyen tarayıcı); ikinci denemede süre zaten dolmuş
     olacağı için ziyaretçi bir şey kaybetmez. */
  if (sure < EN_AZ_DOLDURMA_MS) {
    return NextResponse.json(
      { hata: 'Talep çok hızlı gönderildi. Birkaç saniye sonra tekrar deneyin.' },
      { status: 422 }
    );
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
