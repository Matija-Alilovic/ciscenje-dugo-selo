import { ABOUT_US } from '@/lib/constants';
import Reveal from './Reveal';

export default function AboutSection() {
  return (
    <div className="max-w-3xl space-y-5">        <Reveal>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-800 sm:text-xl">
            {ABOUT_US.intro}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-700 sm:text-lg">
            {ABOUT_US.story}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-700 sm:text-lg">
            {ABOUT_US.teamNote}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT_US.highlights.map((item) => (
              <li
                key={item}
                className="card-modern flex items-start gap-3 p-4 text-base text-gray-700 dark:text-gray-800"
              >
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
    </div>
  );
}