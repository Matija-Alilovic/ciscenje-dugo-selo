import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  return (
    <div className="card-modern divide-y divide-gray-200 overflow-hidden">
      {FAQ_ITEMS.map((item) => (
        <details key={item.question} className="group">
          <summary className="cursor-pointer list-none px-4 py-4 text-base font-medium text-gray-900 transition-colors duration-200 hover:bg-brand-50/50 sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-3 sm:items-center sm:gap-4">
              <span className="min-w-0 flex-1 leading-snug">{item.question}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-100 text-brand-700 transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <div className="faq-body">
            <div>
              <p className="px-4 pb-4 text-base leading-relaxed text-gray-600 sm:px-6">
                {item.answer}
              </p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
