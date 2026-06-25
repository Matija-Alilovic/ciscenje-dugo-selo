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
  const words = text.split(" ").filter(Boolean);
  let charIndex = 0;

  return (
    <span className={cn("letter-hover", className)}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="letter-hover-word">
          {word.split("").map((char) => {
            const index = charIndex;
            charIndex += 1;
            return (
              <span
                key={index}
                className="letter-hover-char"
                style={{ "--letter-delay": `${index * delayStepMs}ms` } as CSSProperties}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
