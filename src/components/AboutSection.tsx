import { ABOUT_US } from '@/lib/constants';
import Reveal from './Reveal';

export default function AboutSection() {
  return (
    <div className="space-y-5 sm:space-y-8">
      <div className="max-w-3xl space-y-3 sm:space-y-5">
        <Reveal>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-800 sm:text-xl">
            {ABOUT_US.intro}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-700 sm:text-lg">
            {ABOUT_US.story}
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-700 sm:text-lg">
            {ABOUT_US.teamNote}
          </p>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <ul className="mx-auto grid w-full max-w-5xl gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {ABOUT_US.highlights.map((item) => (
            <li
              key={item}
              className="card-modern flex h-full min-h-[4.5rem] flex-col items-center justify-center gap-2 p-3.5 text-center text-sm leading-snug text-gray-700 dark:text-gray-800 sm:min-h-[6.5rem] sm:gap-3 sm:p-5 sm:text-base"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-600"
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
