import type { RiskLevel } from '../../data/mockData';

const toneByLevel: Record<RiskLevel, string> = {
  낮음: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  주의: 'border-amber-200 bg-amber-50 text-amber-700',
  높음: 'border-orange-200 bg-orange-50 text-orange-700',
  '매우 높음': 'border-rose-200 bg-rose-50 text-rose-700',
};

type RiskBadgeProps = {
  level: RiskLevel;
};

export function RiskBadge({ level }: RiskBadgeProps) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${toneByLevel[level]}`}>
      {level}
    </span>
  );
}
