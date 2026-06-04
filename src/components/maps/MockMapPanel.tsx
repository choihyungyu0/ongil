import { MapPin } from 'lucide-react';
import { dangerZones } from '../../data/mockData';
import { RiskBadge } from '../common/RiskBadge';

type MockMapPanelProps = {
  mode?: 'mobile' | 'admin';
};

export function MockMapPanel({ mode = 'admin' }: MockMapPanelProps) {
  const compact = mode === 'mobile';

  return (
    <section className="relative min-h-72 overflow-hidden rounded-2xl border border-cyan-100 bg-civic-50 shadow-inner">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,29,51,0.05)_1px,transparent_1px),linear-gradient(rgba(15,29,51,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 360" role="img" aria-label="부산 보행 위험 추상 지도">
        <path
          d="M40 280 C130 210 190 250 260 180 S410 110 560 70"
          fill="none"
          stroke="#0d8794"
          strokeLinecap="round"
          strokeWidth="18"
          opacity="0.22"
        />
        <path
          d="M60 100 C160 140 190 95 270 130 C350 165 410 230 540 205"
          fill="none"
          stroke="#2477ff"
          strokeLinecap="round"
          strokeWidth="10"
          opacity="0.34"
        />
        <path
          d="M120 330 C180 240 210 180 180 70"
          fill="none"
          stroke="#14304d"
          strokeDasharray="12 13"
          strokeLinecap="round"
          strokeWidth="7"
          opacity="0.2"
        />
        <circle cx="180" cy="210" r="72" fill="#fb7185" opacity="0.18" />
        <circle cx="365" cy="145" r="88" fill="#f59e0b" opacity="0.18" />
        <circle cx="470" cy="235" r="62" fill="#14b8a6" opacity="0.14" />
      </svg>

      <div className="relative z-10 flex h-full min-h-72 flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-civic-700">온길 위험지도</p>
            <h2 className="mt-1 text-lg font-bold text-navy-950">
              {compact ? '초량 접근성 경로' : '부산 보행취약 히트맵'}
            </h2>
          </div>
          <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-navy-800 shadow-sm">
            Mock Map
          </span>
        </div>

        <div className={compact ? 'space-y-2' : 'grid gap-2 sm:grid-cols-2'}>
          {dangerZones.slice(0, compact ? 2 : 4).map((zone) => (
            <article key={zone.id} className="rounded-xl border border-white/70 bg-white/90 p-3 shadow-sm backdrop-blur">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-action-600" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-navy-950">{zone.name}</p>
                  <p className="text-xs text-slate-500">{zone.district} · 접근성 {zone.score}점</p>
                </div>
                <RiskBadge level={zone.level} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
