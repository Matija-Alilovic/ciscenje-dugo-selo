import { WHY_US } from "@/lib/constants";
import Reveal from "./Reveal";

export default function WhyUs() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {WHY_US.map((item, index) => (
        <Reveal key={item} delay={index * 60}>
          <div className="card-modern flex h-full items-start gap-3 p-4 text-base text-gray-700">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
            {item}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
