/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* Ana dizinde de bir package-lock.json bulunduğu için proje kökü açıkça
     belirtilir; aksi hâlde derleyici kökü yanlış yerde arıyor. */
  turbopack: { root: import.meta.dirname }
};

export default nextConfig;
