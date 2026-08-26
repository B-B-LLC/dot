import { klinik, tedaviler } from '@/site.config';
import { OG_OLCU, OG_TUR, ogGorseli } from '../../_ortak/og-duzen';

/* Tedavi sayfalarının paylaşım görseli: ortada dalın adı durur, böylece
   WhatsApp'ta paylaşılan link hangi tedaviyi anlattığını söyler. Adresler gibi
   görseller de config'teki listeden üretilir; yeni tedavi eklendiğinde görseli
   kendiliğinden oluşur. */

export const size = OG_OLCU;
export const contentType = OG_TUR;

/* `alt` sabit metin olmak zorunda: Next bunu derleme çıktısına gömdüğü için
   sayfaya göre değişen bir değer veremiyoruz. */
export const alt = `Tedavi alanı — ${klinik.ad}`;

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return tedaviler.map((t) => ({ id: t.id }));
}

export default async function OgGorseli({ params }: Props) {
  const { id } = await params;
  const tedavi = tedaviler.find((t) => t.id === id);

  /* Altta markanın kendisi durur: görsel tedaviyi söyler, marka da kimin
     tedavisi olduğunu. İkisi de iri, çünkü küçük yazı önizlemede okunmuyor. */
  return ogGorseli({
    buyuk: tedavi ? tedavi.ad : klinik.marka,
    punto: 116,
    alt: klinik.marka
  });
}
