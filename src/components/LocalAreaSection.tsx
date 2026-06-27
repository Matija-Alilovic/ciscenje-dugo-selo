import Link from "next/link";
import { AREA_LINKS, LOCAL_SEO_TEXT } from "@/lib/constants";
import Reveal from "./Reveal";

export default function LocalAreaSection() {
  return (
    <div className="space-y-6">
      <Reveal>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-700 sm:text-xl">
          {LOCAL_SEO_TEXT}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <div className="flex flex-wrap gap-3">
          {AREA_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-gray-200 bg-surface px-4 py-2.5 text-base text-gray-700 transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
