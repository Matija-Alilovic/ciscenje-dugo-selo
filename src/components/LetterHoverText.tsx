import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type LetterHoverTextProps = {
  text: string;
  className?: string;
  delayStepMs?: number;
};

export default function LetterHoverText({
  text,
  className,
  delayStepMs = 28,
}: LetterHoverTextProps) {
  return (
    <span className={cn("letter-hover", className)}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="letter-hover-char"
          style={{ "--letter-delay": `${index * delayStepMs}ms` } as CSSProperties}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}
