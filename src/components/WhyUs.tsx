import { WHY_US } from "@/lib/constants";
import Reveal from "./Reveal";

export default function WhyUs() {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {WHY_US.map((item, index) => (
        <Reveal key={item} delay={index * 60}>
          <div className="card-modern flex h-full min-h-[6.5rem] flex-col items-center justify-center gap-3 p-5 text-center text-base leading-snug text-gray-700 dark:text-gray-800">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
            {item}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
