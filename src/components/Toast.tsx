"use client";

import { useEffect, useState } from "react";
import { TOAST_EVENT, type ToastPayload } from "@/lib/toast";
import { cn } from "@/lib/utils";

export default function Toast() {
  const [toast, setToast] = useState<ToastPayload | null>(null);

  useEffect(() => {
    function onToast(event: Event) {
      const detail = (event as CustomEvent<ToastPayload>).detail;
      setToast(detail);
    }

    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed inset-x-4 z-[60] mx-auto max-w-md animate-[slide-up_0.35s_ease-out]",
        "top-[calc(4.25rem+env(safe-area-inset-top,0px))] md:bottom-auto md:right-6 md:top-6 md:left-auto md:inset-x-auto",
      )}
    >
      <div className="rounded-lg border border-gray-300 bg-surface px-4 py-3 shadow-lg dark:border-gray-500 dark:shadow-black/40">
        <p className="text-sm font-medium text-gray-800">{toast.message}</p>
        {toast.href && toast.hrefLabel && (
          <a
            href={toast.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-brand-700 underline-offset-2 hover:underline"
          >
            {toast.hrefLabel}
          </a>
        )}
      </div>
    </div>
  );
}
