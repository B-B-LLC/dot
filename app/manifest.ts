import type { MetadataRoute } from 'next';

import { renk } from './_ortak/token-renk';
import { klinik } from '@/site.config';

/* Ana ekrana eklenen kısayolun adı, rengi ve ikonu. Dosyanın varlığı yeter:
   Next <link rel="manifest"> etiketini kendisi basar.

   İkonlar app/icon.tsx tarafından üretilir; oradaki id'ler burada adresle
   eşleşir (/icon/192, /icon/512). Bir ölçü orada silinirse burada da silinmeli.

   `display` bilerek 'browser': site bir uygulama değil, adres çubuğunu ve geri
   düğmesini gizlemek ziyaretçiyi telefonda kilitlenmiş hissettiriyor. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: klinik.ad,
    /* Marka bir logotiptir ve sonunda nokta taşıyabilir ("Meşe."); ana ekran
       etiketinde nokta yazım hatası gibi durduğu için kırpılır. */
    short_name: klinik.marka.replace(/[.·•]+$/, ''),
    description: klinik.metaAciklama,
    lang: 'tr',
    dir: 'ltr',
    start_url: '/',
    display: 'browser',
    background_color: renk('--sand-50'),
    theme_color: renk('--emerald-900'),
    icons: [
      { src: '/icon/192', sizes: '192x192', type: 'image/png' },
      { src: '/icon/512', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' }
    ]
  };
}
