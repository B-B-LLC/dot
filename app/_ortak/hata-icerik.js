'use client';

/* Beklenmedik hata ekranı (app/error.tsx). 404'ün kardeşidir: aynı çerçeve,
   aynı ton — sayfa çökse bile ziyaretçi kliniğin sitesinde olduğunu bilsin ve
   elinde telefon numarası kalsın.

   Kök düzenin kendisi çökerse bu ekran çizilemez; o durumda devreye
   app/global-error.tsx girer. */

import { Button } from '@/ds/bundle';
import { klinik as KLINIK } from '@/site.config';
import SayfaCercevesi from './cerceve';
import { h, S, BolumBasligi } from './temel';

export default function HataIcerik(props) {
  var hata = props.hata;

  return h(SayfaCercevesi, null,
    h('section', { style: S.bolum },
      h(BolumBasligi, {
        seviye: 'h1',
        numara: '!',
        kas: 'BEKLENMEDİK HATA',
        baslik: 'Sayfa yüklenirken bir sorun oluştu',
        giris:
          'Geçici bir aksaklık olabilir. Yeniden deneyebilir ya da randevunuz için doğrudan ' +
          'danışmayı arayabilirsiniz; telefonla ulaşmak her zaman çalışır.'
      }),

      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 } },
        /* Yeniden deneme bölümü yeniden çizer; sayfayı baştan yüklemez. */
        props.tekrar
          ? h(Button, { size: 'lg', onClick: function () { props.tekrar(); } }, 'Yeniden dene')
          : null,
        h(Button, { size: 'lg', variant: 'cream', as: 'a', href: KLINIK.telHref }, KLINIK.telefon),
        h(Button, { size: 'lg', variant: 'ghost', as: 'a', href: '/' }, 'Ana sayfa')
      ),

      /* Sunucu tarafındaki hatanın kimliği. Kişisel veri taşımaz ve günlükteki
         kaydı bulmayı kolaylaştırır; ziyaretçi bunu danışmaya okuyabilir. */
      hata && hata.digest
        ? h('p', {
            style: {
              marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 12.5,
              color: 'var(--text-faint)'
            }
          }, 'Hata kodu: ' + hata.digest)
        : null
    )
  );
}
