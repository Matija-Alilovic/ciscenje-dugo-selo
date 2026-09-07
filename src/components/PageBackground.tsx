"use client";

import { useEffect, useRef, useState } from "react";

const SMOOTHING = 0.07;
const DEFAULT = { x: 0.42, y: 0.28 };

/** Desktop-only ambient glow — skipped entirely on touch devices. */
export default function PageBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const target = useRef(DEFAULT);
  const current = useRef(DEFAULT);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    if (!root) return;

    root.classList.add("page-ambient--interactive");

    const onMove = (event: MouseEvent) => {
      target.current = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      };
    };

    const onLeave = () => {
      target.current = DEFAULT;
    };

    let frame = 0;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * SMOOTHING;
      current.current.y += (target.current.y - current.current.y) * SMOOTHING;

      const x = current.current.x * 100;
      const y = current.current.y * 100;

      root.style.setProperty("--mouse-x", `${x}%`);
      root.style.setProperty("--mouse-y", `${y}%`);
      root.style.setProperty("--mouse-x-2", `${x - 14}%`);
      root.style.setProperty("--mouse-y-2", `${y + 10}%`);
      root.style.setProperty("--mouse-x-3", `${x + 16}%`);
      root.style.setProperty("--mouse-y-3", `${y - 8}%`);

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frame);
      root.classList.remove("page-ambient--interactive");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="page-ambient" ref={rootRef} aria-hidden="true">
      <div className="page-ambient-glow page-ambient-glow--primary" />
      <div className="page-ambient-glow page-ambient-glow--secondary" />
      <div className="page-ambient-glow page-ambient-glow--accent" />
      <div className="page-ambient-grid" />
    </div>
  );
}
