import { ABOUT_US } from '@/lib/constants';
import Reveal from './Reveal';

export default function AboutSection() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-5">
        <Reveal>
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
      </div>

      <Reveal delay={200}>
        <ul className="mx-auto grid w-full max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ABOUT_US.highlights.map((item) => (
            <li
              key={item}
              className="card-modern flex h-full min-h-[6.5rem] flex-col items-center justify-center gap-3 p-5 text-center text-base leading-snug text-gray-700 dark:text-gray-800"
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
