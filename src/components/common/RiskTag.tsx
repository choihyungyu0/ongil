type RiskTagProps = {
  label: string;
  compact?: boolean;
};

export function RiskTag({ label, compact = false }: RiskTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-cyan-100 bg-civic-50 font-bold text-civic-700 ${
        compact ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
      }`}
    >
      {label}
    </span>
  );
}
