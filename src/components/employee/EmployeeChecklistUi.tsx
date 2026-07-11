const ICON_PATHS: Record<string, string> = {
  clipboard:
    "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  sofa: "M4 10v4a2 2 0 002 2h12a2 2 0 002-2v-4M4 10l2-4h12l2 4M8 16v2M16 16v2M6 10h12",
  bed: "M3 12h18M3 12v6h18v-6M7 8V6a2 2 0 012-2h6a2 2 0 012 2v2M7 12v4M17 12v4",
  kitchen:
    "M4 6h16M4 10h16M8 14h8M8 18h5M6 6V4m12 2V4",
  bath: "M8 14v3M16 14v3M4 10h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4zM12 3v3",
  window: "M4 5h16v14H4V5zm0 0l8 7 8-7",
  sparkle:
    "M12 3l1.2 3.6L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3zM5 16l.8 2.4L8 19l-2.2.7L5 22l-.8-2.3L2 19l2.2-.6L5 16zm14 0l.8 2.4L22 19l-2.2.7L19 22l-.8-2.3L16 19l2.2-.6L19 16z",
  check: "M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z",
};

export function SectionIcon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const path = ICON_PATHS[name] ?? ICON_PATHS.check;

  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export function ProgressRing({
  percent,
  size = 72,
  stroke = 6,
}: {
  percent: number;
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-brand-600 transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-bold text-gray-900">{percent}%</span>
    </div>
  );
}
