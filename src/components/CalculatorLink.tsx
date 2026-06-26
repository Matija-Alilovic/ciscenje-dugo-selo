"use client";

import Link from "next/link";
import { scrollToCalculator } from "@/lib/calculatorPrefill";

type CalculatorLinkProps = {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
};

export default function CalculatorLink({
  href = "#kalkulator",
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: CalculatorLinkProps) {
  const isHomeHash = href === "#kalkulator" || href === "/#kalkulator";

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!isHomeHash) return;

    const onHomePage = window.location.pathname === "/";

    if (onHomePage) {
      event.preventDefault();
      scrollToCalculator();
      window.history.pushState(null, "", "#kalkulator");
      onClick?.();
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
