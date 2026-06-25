import { SERVICE_COMPARISON } from "@/lib/constants";
import Reveal from "./Reveal";

function CellValue({ value }: { value: boolean | "optional" }) {
  if (value === true) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
        ✓
      </span>
    );
  }

  if (value === "optional") {
    return <span className="text-sm font-medium text-gray-500">Po dogovoru</span>;
  }

  return <span className="text-sm text-gray-300">—</span>;
}

export default function ServiceComparisonTable() {
  return (
    <Reveal>
      <div className="card-modern overflow-hidden">
        <div className="space-y-3 p-4 sm:hidden">
          {SERVICE_COMPARISON.map((row) => (
            <div key={row.label} className="rounded-lg border border-gray-200 p-3">
              <p className="font-medium text-gray-900">{row.label}</p>
              <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[11px] sm:gap-2 sm:text-xs">
                <div>
                  <p className="mb-1 font-semibold text-brand-700">Redovno</p>
                  <CellValue value={row.redovno} />
                </div>
                <div>
                  <p className="mb-1 font-semibold text-brand-700">Jednokratno</p>
                  <CellValue value={row.jednokratno} />
                </div>
                <div>
                  <p className="mb-1 font-semibold text-brand-700">Generalno</p>
                  <CellValue value={row.generalno} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full min-w-[36rem] text-left text-base">
            <thead>
              <tr className="border-b border-gray-200 bg-brand-50">
                <th className="px-4 py-3.5 font-semibold text-gray-900 sm:px-6">Uključeno</th>
                <th className="px-4 py-3.5 text-center font-semibold text-gray-900 sm:px-6">
                  Redovno
                </th>
                <th className="px-4 py-3.5 text-center font-semibold text-gray-900 sm:px-6">
                  Jednokratno
                </th>
                <th className="px-4 py-3.5 text-center font-semibold text-gray-900 sm:px-6">
                  Generalno
                </th>
              </tr>
            </thead>
            <tbody>
              {SERVICE_COMPARISON.map((row, index) => (
                <tr
                  key={row.label}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? "bg-surface" : "bg-gray-50/40"
                  }`}
                >
                  <td className="px-4 py-3.5 text-gray-800 sm:px-6">{row.label}</td>
                  <td className="px-4 py-3.5 text-center sm:px-6">
                    <CellValue value={row.redovno} />
                  </td>
                  <td className="px-4 py-3.5 text-center sm:px-6">
                    <CellValue value={row.jednokratno} />
                  </td>
                  <td className="px-4 py-3.5 text-center sm:px-6">
                    <CellValue value={row.generalno} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}
