"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor='pointer']";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    visible: false,
    hovering: false,
    clicking: false,
    active: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canUseCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)");

    const setActive = (active: boolean) => {
      state.current.active = active;

      if (active) {
        document.documentElement.classList.add("custom-cursor");
        layerRef.current?.classList.remove("custom-cursor-hidden");
        return;
      }

      document.documentElement.classList.remove("custom-cursor");
      layerRef.current?.classList.add("custom-cursor-hidden");
      layerRef.current?.classList.remove("is-visible", "is-hover", "is-clicking");
    };

    if (!canUseCustomCursor.matches) {
      setActive(false);
      return;
    }

    setActive(true);

    const setHovering = (value: boolean) => {
      if (state.current.hovering === value) return;
      state.current.hovering = value;
      layerRef.current?.classList.toggle("is-hover", value);
    };

    const setClicking = (value: boolean) => {
      if (state.current.clicking === value) return;
      state.current.clicking = value;
      layerRef.current?.classList.toggle("is-clicking", value);
    };

    const positionCursor = (x: number, y: number) => {
      if (!blobRef.current) return;
      blobRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      if (!state.current.visible) {
        state.current.visible = true;
        layerRef.current?.classList.add("is-visible");
      }

      positionCursor(event.clientX, event.clientY);

      const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement | null;
      setHovering(!!element?.closest(INTERACTIVE_SELECTOR));
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onLeave = () => {
      state.current.visible = false;
      layerRef.current?.classList.remove("is-visible");
    };

    const onPointerChange = () => setActive(canUseCustomCursor.matches);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    canUseCustomCursor.addEventListener("change", onPointerChange);

    return () => {
      setActive(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      canUseCustomCursor.removeEventListener("change", onPointerChange);
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      ref={layerRef}
      className="custom-cursor-layer custom-cursor-hidden"
      aria-hidden="true"
    >
      <div ref={blobRef} className="custom-cursor-blob">
        <div className="custom-cursor-ring" />
        <div className="custom-cursor-dot" />
      </div>
    </div>,
    document.body,
  );
}
