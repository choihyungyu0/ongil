type TrendPoint = {
  label: string;
  reports: number;
  improvements: number;
};

type BarDatum = {
  label: string;
  value: number;
  count?: number;
};

export function TrendChart({ data }: { data: TrendPoint[] }) {
  const max = Math.max(...data.map((item) => item.reports));

  return (
    <div className="h-56 rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex h-full items-end gap-3">
        {data.map((item) => (
          <div key={item.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div className="flex h-36 w-full items-end justify-center gap-1">
              <span
                className="w-3 rounded-t-full bg-action-500"
                style={{ height: `${(item.reports / max) * 100}%` }}
                aria-label={`${item.label} 제보 ${item.reports}건`}
              />
              <span
                className="w-3 rounded-t-full bg-civic-500"
                style={{ height: `${(item.improvements / max) * 100}%` }}
                aria-label={`${item.label} 조치 ${item.improvements}건`}
              />
            </div>
            <span className="text-xs font-bold text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HorizontalBars({ data }: { data: BarDatum[] }) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between gap-3 text-sm font-bold text-slate-700">
            <span>{item.label}</span>
            <span>{item.count ? `${item.count}건` : `${item.value}%`}</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-navy-950" style={{ width: `${item.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DonutChart({ value, label }: { value: number; label: string }) {
  const angle = Math.max(0, Math.min(value, 100)) * 3.6;

  return (
    <div className="flex items-center gap-4">
      <div
        className="grid h-24 w-24 place-items-center rounded-full"
        style={{ background: `conic-gradient(#2477ff ${angle}deg, #dbeafe ${angle}deg)` }}
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white">
          <strong className="text-xl font-bold text-navy-950">{value}%</strong>
        </div>
      </div>
      <p className="text-sm font-semibold leading-6 text-slate-600">{label}</p>
    </div>
  );
}
