import type { Hekim, Soru } from '@/site.config';
import { klinik, site } from '@/site.config';
import type { YasalMetin } from '@/yasal.config';

/* Arama motorlarına gönderilen yapısal veri (schema.org / JSON-LD).

   Klinik, site ve hekimler birden çok sayfada geçen varlıklardır. Her sayfa
   onları baştan tarif ederse arama motoru aynı kliniği birkaç ayrı işletme
   sanabilir; bu yüzden her varlığa sabit bir `@id` verilir ve sayfalar o
   kimliğe işaret eder (`{'@id': KLINIK_KIMLIK}`). Kliniğin kendisi kök düzende
   bir kez yazılır (app/layout.tsx), diğer sayfalar ona bağlanır.

   Aynı kimlik, bir düğüme sonradan alan eklemeye de yarar: /hekimler sayfası
   klinik kimliğiyle yalnız `employee` alanını basar ve bu kayıt kök düzendeki
   klinik düğümüyle birleşir. */

export const SITE_KIMLIK = `${site.adres}/#site`;
export const KLINIK_KIMLIK = `${site.adres}/#klinik`;

/** Site kökünden verilen yolu tam adrese çevirir. Yapısal veride göreli adres
    kullanılmaz: veri sayfadan koparılıp başka bir bağlamda okunabilir. */
export function mutlak(yol: string) {
  return new URL(yol, site.adres).toString();
}

type Dugum = Record<string, unknown>;

/** Kırıntı gezinmenin bir basamağı. Son basamağın (sayfanın kendisinin)
    `yol`u verilmez; Google geçerli sayfayı adressiz bekler. */
export type Kirinti = { ad: string; yol?: string };

export function kirintiVeri(yol: string, parcalar: Kirinti[]): Dugum {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${mutlak(yol)}#kirinti`,
    itemListElement: parcalar.map((parca, sira) => ({
      '@type': 'ListItem',
      position: sira + 1,
      name: parca.ad,
      ...(parca.yol ? { item: mutlak(parca.yol) } : {})
    }))
  };
}

/** Sıralı bağlantı listesi: dizin sayfalarının `mainEntity` alanı. */
export function listeVeri(ogeler: { ad: string; yol: string }[]): Dugum {
  return {
    '@type': 'ItemList',
    itemListElement: ogeler.map((oge, sira) => ({
      '@type': 'ListItem',
      position: sira + 1,
      name: oge.ad,
      url: mutlak(oge.yol)
    }))
  };
}

/** Bir tedavi ya da işlem sayfasının konusu. */
export function islemVeri(secenek: {
  yol: string;
  ad: string;
  aciklama: string;
}): Dugum {
  return {
    '@type': 'MedicalProcedure',
    '@id': `${mutlak(secenek.yol)}#islem`,
    name: secenek.ad,
    description: secenek.aciklama,
    url: mutlak(secenek.yol),
    provider: { '@id': KLINIK_KIMLIK }
  };
}

/* Hekim kartında mezuniyet "Ege Üniv. Diş Hek. Fak., 2011" biçimindedir; yıl
   okulun adının parçası değildir, ayrılır. Biçim tutmuyorsa alan hiç
   yazılmaz — yanlış bir kurum adı yazmaktansa eksik bırakmak yeğdir. */
function okulAdi(mezuniyet: string) {
  const eslesme = mezuniyet.match(/^(.+?),\s*\d{4}\s*$/);
  return eslesme ? eslesme[1] : '';
}

/** Hekim düğümü.

    Şema tarafında `Physician` bir kuruluş/işletme türüdür (muayenehane); tek
    tek hekimler klinikte çalışan kişilerdir, bu yüzden `Person` kullanılır ve
    `worksFor` ile kliniğe bağlanır. */
export function hekimVeri(hekim: Hekim, sira: number): Dugum {
  const akademik = hekim.akademik && hekim.akademik !== '—' ? hekim.akademik : '';
  const okul = okulAdi(hekim.mezuniyet);
  return {
    '@type': 'Person',
    '@id': `${mutlak('/hekimler')}#hekim-${sira + 1}`,
    name: hekim.ad,
    jobTitle: hekim.unvan,
    worksFor: { '@id': KLINIK_KIMLIK },
    ...(okul ? { alumniOf: { '@type': 'CollegeOrUniversity', name: okul } } : {}),
    ...(akademik ? { description: akademik } : {}),
    ...(hekim.gorsel ? { image: mutlak(hekim.gorsel) } : {})
  };
}

/** Bir sayfanın yapısal verisini kurar.

    `sorular` verildiğinde sayfa ayrıca `FAQPage` sayılır ve sorular
    `mainEntity` olur — şemanın istediği yer orasıdır. Bu yüzden `sorular` ile
    `anaVarlik` birlikte verilmez; soru listesi olan sayfada liste `hakkinda`
    alanına yazılır. */
export function sayfaVeri(secenek: {
  yol: string;
  baslik: string;
  aciklama?: string;
  /** Varsayılan 'WebPage'. Tedavi sayfalarında 'MedicalWebPage', iletişimde
      'ContactPage' gibi daha dar bir tür verilir. */
  tur?: string;
  /** Sayfada görünen kırıntı gezinmenin aynısı. Ekranda kırıntı yoksa
      verilmez: yapısal veri sayfada olmayan bir gezinmeyi bildirmez. */
  kirintilar?: Kirinti[];
  sorular?: Soru[];
  /** Sayfanın konusu (`about`): tedavi düğümü ya da kliniğin kimliği. */
  hakkinda?: unknown;
  /** Sayfanın ana içeriği (`mainEntity`); dizin sayfalarında bağlantı listesi. */
  anaVarlik?: unknown;
  /** Grafiğe eklenecek bağımsız düğümler (hekimler gibi). */
  ekDugumler?: unknown[];
}) {
  const sorular = secenek.sorular ?? [];
  const tur = secenek.tur ?? 'WebPage';

  const sayfa: Dugum = {
    '@type': sorular.length ? [tur, 'FAQPage'] : tur,
    '@id': `${mutlak(secenek.yol)}#sayfa`,
    url: mutlak(secenek.yol),
    name: secenek.baslik,
    inLanguage: 'tr-TR',
    isPartOf: { '@id': SITE_KIMLIK },
    ...(secenek.aciklama ? { description: secenek.aciklama } : {}),
    ...(secenek.kirintilar
      ? { breadcrumb: kirintiVeri(secenek.yol, secenek.kirintilar) }
      : {}),
    ...(secenek.hakkinda ? { about: secenek.hakkinda } : {}),
    ...(sorular.length
      ? {
          mainEntity: sorular.map((soru) => ({
            '@type': 'Question',
            name: soru.soru,
            acceptedAnswer: { '@type': 'Answer', text: soru.cevap }
          }))
        }
      : secenek.anaVarlik
        ? { mainEntity: secenek.anaVarlik }
        : {})
  };

  return grafik([sayfa, ...(secenek.ekDugumler ?? [])]);
}

/** Yasal metin sayfaları (KVKK, gizlilik, çerez) aynı kalıptadır: görünen
    kırıntı "Ana sayfa / <başlık>" ve konu kliniğin kendisidir.

    Bu sayfalar `noindex` işaretlidir, yani veri arama sonucuna girmez. Yine de
    basılır: sayfada görünen her kırıntının veri karşılığı olsun diye. */
export function yasalVeri(yol: string, metin: YasalMetin) {
  return sayfaVeri({
    yol,
    baslik: `${metin.baslik} — ${klinik.ad}`,
    aciklama: metin.ozet,
    kirintilar: [{ ad: 'Ana sayfa', yol: '/' }, { ad: metin.baslik }],
    hakkinda: { '@id': KLINIK_KIMLIK }
  });
}

/** Düğümleri tek bir JSON-LD belgesine sarar. */
export function grafik(dugumler: unknown[]) {
  return { '@context': 'https://schema.org', '@graph': dugumler };
}

/** Belgeyi sayfaya basar.

    `<` kaçırılır: veri metninde `</script` geçerse tarayıcı betiği erken
    kapatır. Türkçe metinde olası değildir ama config'e HTML yapıştırılabilir. */
export function YapisalVeri({ veri }: { veri: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(veri).replace(/</g, '\\u003c')
      }}
    />
  );
}
