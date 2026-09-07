import { STEPS } from "@/lib/constants";
import Reveal from "./Reveal";

export default function Steps() {
  return (
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-6">
      {STEPS.map((step, index) => (
        <Reveal key={step.step} delay={index * 100}>
          <div className="card-modern relative h-full p-4 sm:p-6">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm">
              {step.step}
            </span>
            <h3 className="mt-3 text-base font-semibold text-gray-900 sm:mt-4 sm:text-xl">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-600 sm:mt-2 sm:text-base">
              {step.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
