type ChecklistProps = {
  items: readonly string[];
};

export default function Checklist({ items }: ChecklistProps) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm text-gray-700 sm:gap-3 sm:text-base"
        >
          <span
            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 sm:h-5 sm:w-5"
            aria-hidden="true"
          >
            <svg
              className="h-2.5 w-2.5 sm:h-3 sm:w-3"
              fill="none"
              viewBox="0 0 12 12"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M2 6l3 3 5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
