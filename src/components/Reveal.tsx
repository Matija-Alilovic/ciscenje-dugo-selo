import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Bez client JS — brži mobile. Animacije su CSS-only na desktopu ako treba. */
export default function Reveal({ children, className }: RevealProps) {
  if (!className) return <>{children}</>;
  return <div className={cn(className)}>{children}</div>;
}
