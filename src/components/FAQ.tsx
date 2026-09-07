import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  return (
    <div className="card-modern divide-y divide-gray-200 overflow-hidden">
      {FAQ_ITEMS.map((item) => (
        <details key={item.question} className="group">
          <summary className="cursor-pointer list-none px-3 py-3 text-sm font-medium text-gray-900 transition-colors duration-200 hover:bg-brand-50/50 sm:px-6 sm:py-4 sm:text-xl [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-2 sm:items-center sm:gap-4">
              <span className="min-w-0 flex-1 leading-snug">{item.question}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-100 text-sm text-brand-700 transition-transform duration-200 group-open:rotate-45 sm:h-8 sm:w-8 sm:text-base">
                +
              </span>
            </span>
          </summary>
          <div className="faq-body">
            <div>
              <p className="px-3 pb-3 text-sm leading-relaxed text-gray-600 sm:px-6 sm:pb-4 sm:text-lg">
                {item.answer}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
