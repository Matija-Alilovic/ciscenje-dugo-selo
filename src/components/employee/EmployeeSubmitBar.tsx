"use client";

import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const barClassName =
  "fixed inset-x-0 bottom-0 z-[100] border-t border-gray-200/80 bg-surface/98 px-3 pt-3 shadow-[0_-8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md";

export default function EmployeeSubmitBar({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("employee-checklist-page");
    return () => {
      document.body.classList.remove("employee-checklist-page");
    };
  }, []);

  const bar = (
    <div
      id="employee-submit-bar"
      className={barClassName}
      role="region"
      aria-label="Akcije checkliste"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-2 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:flex-row sm:gap-3 sm:pb-5 sm:pt-1">
        {children}
      </div>
    </div>
  );

  if (!mounted) {
    return bar;
  }

  return createPortal(bar, document.body);
}
