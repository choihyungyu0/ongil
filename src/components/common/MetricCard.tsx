type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  tone?: string;
};

export function MetricCard({ label, value, delta, tone = 'text-civic-700' }: MetricCardProps) {
  return (
    <article className="app-card p-4">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="text-2xl font-bold text-navy-950">{value}</strong>
        <span className={`rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold ${tone}`}>{delta}</span>
      </div>
    </article>
  );
}
