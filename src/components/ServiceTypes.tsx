"use client";

import Link from "next/link";
import { SERVICE_TYPES } from "@/lib/constants";
import { openCalculatorWithType } from "@/lib/calculatorPrefill";
import Reveal from "./Reveal";

export default function ServiceTypes() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {SERVICE_TYPES.map((type, index) => (
        <Reveal key={type.title} delay={index * 80}>
          <article className="card-modern flex h-full flex-col p-6">
            <Link
              href={type.href}
              className="flex flex-1 flex-col transition-colors hover:text-brand-700"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                {type.title}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">{type.tagline}</h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-gray-600">
                {type.description}
              </p>
              <p className="mt-5 inline-flex w-fit rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-800">
                {type.price}
              </p>
            </Link>
            <button
              type="button"
              onClick={() => openCalculatorWithType(type.calculatorType)}
              className="btn-outline mt-4 w-full"
            >
              Izračunaj cijenu za ovo
            </button>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
