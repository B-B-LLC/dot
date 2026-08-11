import type { MetadataRoute } from 'next';

import { site } from '@/site.config';

export default function robots(): MetadataRoute.Robots {
  /* Demo sürümlerinde tarama tamamen kapatılır: aynı metinle yayınlanan
     demolar birbirinin kopyası sayılır ve demo alan adı yanlış kaydedilir. */
  if (site.demoModu) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${site.adres}/sitemap.xml`
  };
}
