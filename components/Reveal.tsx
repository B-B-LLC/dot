"use client";

import { useEffect } from "react";

/**
 * Bölüm girişlerini açan tek IntersectionObserver.
 *
 * Sayfadaki `data-rv` taşıyan her elemanı gözler ve görünür olduğunda `gor`
 * sınıfını ekler; geçişin kendisi CSS'te (globals.css). Böylece bölüm
 * bileşenlerinin client component olması gerekmiyor — hepsi server component
 * kalabiliyor, yalnızca bu dosya client.
 *
 * Tek yönlü: açılan eleman bir daha gözlenmiyor, geri sarma yok.
 */
export default function Reveal() {
  useEffect(() => {
    const azHareket = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hedefler =
      document.querySelectorAll<HTMLElement>("[data-rv]");

    if (azHareket || !("IntersectionObserver" in window)) {
      hedefler.forEach((el) => el.classList.add("gor"));
      return;
    }

    const gozlemci = new IntersectionObserver(
      (girisler) => {
        girisler.forEach((giris) => {
          if (!giris.isIntersecting) return;
          giris.target.classList.add("gor");
          gozlemci.unobserve(giris.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    hedefler.forEach((el) => gozlemci.observe(el));
    return () => gozlemci.disconnect();
  }, []);

  return null;
}
