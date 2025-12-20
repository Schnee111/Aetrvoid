"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Atur kecepatan scroll (semakin tinggi semakin lambat/halus)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function ala iOS
      // smoothTouch: false, // Matikan di touch device jika ingin native feel (opsional)
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}