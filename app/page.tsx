import { anaBaslik, klinik, sorular } from '@/site.config';
import { KLINIK_KIMLIK, YapisalVeri, sayfaVeri } from './_ortak/yapisal-veri';
import KlinikApp from './klinik-app';

/* Ana sayfada sık sorulanlar bölümü durduğu için sayfa aynı zamanda FAQPage
   sayılır. Kliniğin kendisi kök düzende tarif edilir; burada yalnız işaret
   edilir. Kırıntı gezinme verilmez, sayfa zaten kökün kendisidir. */

export default function AnaSayfa() {
  return (
    <>
      <YapisalVeri
        veri={sayfaVeri({
          yol: '/',
          baslik: anaBaslik,
          aciklama: klinik.metaAciklama,
          hakkinda: { '@id': KLINIK_KIMLIK },
          sorular
        })}
      />
      <KlinikApp />
    </>
  );
}
