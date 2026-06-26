import { BEFORE_AFTER_ITEMS } from "@/lib/constants";
import Reveal from "./Reveal";
import BeforeAfterCard from "./BeforeAfterCard";

export default function BeforeAfterSection() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
      {BEFORE_AFTER_ITEMS.map((item, index) => (
        <Reveal key={item.title} delay={index * 100}>
          <BeforeAfterCard title={item.title} src={item.src} caption={item.caption} />
        </Reveal>
      ))}
    </div>
  );
}
