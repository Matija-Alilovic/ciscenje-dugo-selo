import { cn } from "@/lib/utils";

type LetterHoverTextProps = {
  text: string;
  className?: string;
  /** Kept for API compatibility; unused (no per-letter DOM on mobile). */
  delayStepMs?: number;
};

/** Plain text — no per-letter spans (much faster on phones). */
export default function LetterHoverText({
  text,
  className,
}: LetterHoverTextProps) {
  return <span className={cn(className)}>{text}</span>;
}
