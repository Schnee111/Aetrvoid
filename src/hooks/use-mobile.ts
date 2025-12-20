import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768; // Batas lebar pixel untuk dianggap Mobile

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fungsi pengecekan
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Cek saat pertama load
    checkMobile();

    // Cek setiap kali layar di-resize
    window.addEventListener("resize", checkMobile);

    // Bersihkan event listener saat komponen hilang
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}