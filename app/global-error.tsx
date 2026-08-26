'use client';

/* Kök düzenin kendisi çöktüğünde çizilen ekran. `layout.tsx`in yerine geçtiği
   için kendi `<html>` ve `<body>` etiketlerini, kendi stillerini getirmek
   zorundadır — gezinme, altbilgi ve next/font burada yoktur.

   Bu yüzden bağımlılığı en aza indirildi: yalnız token dosyaları (renkler ve
   yazı tipi için) ve şeklin sabiti. Metin `--font-body` ile yazılır; marka
   fontu burada yüklü olmadığından sistem yazı tipine düşer (globals.css'teki
   var() yedeği bunu sağlar).

   Ekranın tek işi var: ziyaretçi kliniğin sitesinde olduğunu anlasın ve
   telefon numarasını görsün. Sayfa çöktüğünde hastanın ihtiyacı olan şey
   gezinme değil, numaradır.

   Not: hata sınırı istemci bileşeni olduğu için `metadata` dışa aktarılamaz;
   başlık React'in `<title>` bileşeniyle verilir. */

import { klinik } from '@/site.config';

import '@/ds/styles.css';
import './globals.css';
import { DIS_YOLU } from './_ortak/dis-yolu';

export default function GenelHata({
  error,
  retry
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          background: 'var(--surface-page)',
          color: 'var(--text-body)',
          fontFamily: 'var(--font-body)'
        }}
      >
        <title>{`Sayfa yüklenemedi — ${klinik.ad}`}</title>

        <main style={{ maxWidth: 520, textAlign: 'center' }}>
          <svg
            width="52"
            height="52"
            viewBox="0 0 100 100"
            aria-hidden="true"
            style={{ marginBottom: 22 }}
          >
            <path d={DIS_YOLU} fill="var(--emerald-700)" />
          </svg>

          <h1
            style={{
              margin: 0,
              fontSize: 26,
              lineHeight: 1.25,
              letterSpacing: '-.02em',
              fontWeight: 700,
              color: 'var(--text-strong)'
            }}
          >
            Sayfa yüklenemedi
          </h1>

          <p style={{ margin: '14px 0 0', fontSize: 15.5, lineHeight: 1.6 }}>
            {klinik.ad} sitesinde beklenmedik bir sorun oluştu. Yeniden
            deneyebilir ya da danışmayı arayabilirsiniz.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'center',
              marginTop: 28
            }}
          >
            <button
              type="button"
              onClick={() => retry()}
              style={{
                border: 0,
                cursor: 'pointer',
                padding: '13px 22px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--emerald-700)',
                color: 'var(--sand-0)',
                fontSize: 15,
                fontWeight: 600,
                fontFamily: 'inherit'
              }}
            >
              Yeniden dene
            </button>

            <a
              href={klinik.telHref}
              style={{
                padding: '13px 22px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--line-hairline)',
                background: 'var(--sand-0)',
                color: 'var(--text-strong)',
                fontSize: 15,
                fontWeight: 600
              }}
            >
              {klinik.telefon}
            </a>
          </div>

          {error?.digest ? (
            <p
              style={{
                margin: '26px 0 0',
                fontFamily: 'var(--font-mono)',
                fontSize: 12.5,
                color: 'var(--text-faint)'
              }}
            >
              {`Hata kodu: ${error.digest}`}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
