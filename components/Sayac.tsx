"use client";

import { useEffect, useRef } from "react";

type Props = {
  hedef: number;
  sonek?: string;
  /** true ise binlik ayracı uygulanır (4800 → 4.800) */
  ayrac?: boolean;
};

const bicimle = (sayi: number, ayrac?: boolean) =>
  ayrac ? sayi.toLocaleString("tr-TR") : String(sayi);

/**
 * Görünür olduğunda 0'dan hedefe sayar.
 *
 * State yerine ref üzerinden textContent yazıyor. Bunun iki faydası var:
 * sunucu doğrudan son değeri render ediyor (JS çalışmazsa gerçek rakam
 * görünür), ve effect içinde setState çağrılmadığı için zincirleme render
 * olmuyor. Sıfırlama hydration bittikten sonra, eleman daha ekrana
 * girmeden yapılıyor; bu yüzden gözle görülür bir sıçrama olmuyor.
 */
export default function Sayac({ hedef, sonek = "", ayrac }: Props) {
  const kok = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = kok.current;
    if (!el) return;

    const azHareket = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Hareket azaltılmışsa sunucudan gelen son değer olduğu gibi kalsın.
    if (azHareket || !("IntersectionObserver" in window)) return;

    const yaz = (n: number) => {
      el.textContent = bicimle(n, ayrac) + sonek;
    };

    yaz(0);

    let cerceve = 0;
    const gozlemci = new IntersectionObserver(
      (girisler) => {
        if (!girisler[0].isIntersecting) return;
        gozlemci.disconnect();

        const sure = 1400;
        let basla: number | null = null;
        const adim = (zaman: number) => {
          if (basla === null) basla = zaman;
          const o = Math.min((zaman - basla) / sure, 1);
          const yumusak = 1 - Math.pow(1 - o, 3); // easeOutCubic
          yaz(Math.round(hedef * yumusak));
          if (o < 1) cerceve = requestAnimationFrame(adim);
        };
        cerceve = requestAnimationFrame(adim);
      },
      { threshold: 0.5 },
    );

    gozlemci.observe(el);
    return () => {
      gozlemci.disconnect();
      cancelAnimationFrame(cerceve);
    };
  }, [hedef, sonek, ayrac]);

  return (
    <span ref={kok} className="tabular-nums">
      {bicimle(hedef, ayrac)}
      {sonek}
    </span>
  );
}
