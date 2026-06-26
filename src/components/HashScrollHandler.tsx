"use client";

import { useEffect } from "react";
import { scrollToCalculator } from "@/lib/calculatorPrefill";

export default function HashScrollHandler() {
  useEffect(() => {
    function handleHash() {
      if (window.location.hash !== "#kalkulator") return;
      if (!document.getElementById("kalkulator")) return;

      requestAnimationFrame(() => {
        scrollToCalculator();
      });
    }

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return null;
}
