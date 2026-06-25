import { PRICING, PRICING_TRUST_NOTE } from "@/lib/constants";
import Reveal from "./Reveal";

export default function PricingTable() {
  return (
    <Reveal>
      <div>
        <div className="space-y-3 sm:hidden">
          {PRICING.map((row) => (
            <div key={row.service} className="card-modern p-4">
              <p className="font-medium text-gray-900">{row.service}</p>
              {row.note && (
                <p className="mt-1 text-sm text-gray-500">{row.note}</p>
              )}
              <p className="mt-2 text-lg font-semibold text-brand-700">{row.price}</p>
            </div>
          ))}
        </div>

        <div className="card-modern hidden overflow-hidden sm:block">
          <table className="w-full text-left text-base">
            <thead>
              <tr className="border-b border-gray-200 bg-brand-50">
                <th className="px-4 py-3.5 font-semibold text-gray-900 sm:px-6">
                  Usluga
                </th>
                <th className="px-4 py-3.5 font-semibold text-gray-900 sm:px-6">
                  Cijena
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICING.map((row, i) => (
                <tr
                  key={row.service}
                  className={`transition-colors duration-200 hover:bg-brand-50/30 ${
                    i % 2 === 0 ? "bg-surface" : "bg-gray-50/40"
                  }`}
                >
                  <td className="px-4 py-4 sm:px-6">
                    <span className="font-medium text-gray-900">{row.service}</span>
                    {row.note && (
                      <span className="mt-1 block text-sm text-gray-500">
                        {row.note}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 font-semibold text-brand-700 sm:px-6">
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium leading-relaxed text-brand-800 sm:text-base">
          {PRICING_TRUST_NOTE}
        </p>
        <p className="mt-3 rounded-lg border border-gray-200 bg-surface px-4 py-3 text-sm leading-relaxed text-gray-600 sm:text-base">
          Konačna cijena ovisi o veličini prostora, stanju stana, broju
          kupaonica, kuhinji, prozorima i ostalom što dogovorimo.
        </p>
      </div>
    </Reveal>
  );
}
