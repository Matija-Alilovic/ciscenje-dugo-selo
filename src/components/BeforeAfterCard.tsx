"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type BeforeAfterCardProps = {
  title: string;
  src: string;
  caption?: string;
};

export default function BeforeAfterCard({ title, src, caption }: BeforeAfterCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <figure className="h-full">
        <figcaption className="mb-3 text-base font-semibold text-gray-900">{title}</figcaption>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative block w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-100 text-left transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          aria-label={`Uvećaj fotografiju — ${title}`}
        >
          <Image
            src={src}
            alt={`${title} — prije i poslije čišćenja, Dugo Selo`}
            width={1600}
            height={900}
            className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-between px-3 sm:top-4 sm:px-4">
            <span className="rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Prije
            </span>
            <span className="rounded-md bg-brand-600/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Poslije
            </span>
          </div>

          <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-black/55 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Klikni za uvećanje
          </span>
        </button>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-600">Kliknite sliku za uvećani prikaz.</p>

        {caption && (
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-500">{caption}</p>
        )}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/92 p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Uvećana fotografija — ${title}`}
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl leading-none text-white sm:right-4 sm:top-4"
            aria-label="Zatvori"
          >
            ×
          </button>

          <div
            className="relative inline-block w-full max-w-[1200px] sm:w-auto sm:max-w-[min(96vw,1200px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={src}
              alt={`${title} — uvećana usporedba prije i poslije čišćenja`}
              width={1600}
              height={900}
              className="h-auto max-h-[88dvh] w-full rounded-lg object-contain sm:max-h-[min(92vh,900px)] sm:w-auto sm:max-w-[min(96vw,1200px)]"
              sizes="(max-width: 640px) 100vw, 1200px"
              priority
            />

            <div className="pointer-events-none absolute inset-x-0 top-2 flex justify-between px-2 sm:top-4 sm:px-4">
              <span className="rounded-md bg-black/55 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Prije
              </span>
              <span className="rounded-md bg-brand-600/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Poslije
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
