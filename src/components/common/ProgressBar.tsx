type ProgressBarProps = {
  label: string;
  value: number;
  tone?: 'blue' | 'teal' | 'amber' | 'rose' | 'navy';
};

const toneClass = {
  blue: 'bg-action-500',
  teal: 'bg-civic-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  navy: 'bg-navy-950',
};

export function ProgressBar({ label, value, tone = 'teal' }: ProgressBarProps) {
  return (
    <div>
      <div className="flex justify-between gap-3 text-sm font-bold text-slate-700">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        <div className={`h-full rounded-full ${toneClass[tone]}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
