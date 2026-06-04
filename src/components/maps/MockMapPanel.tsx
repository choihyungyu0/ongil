import { MapPin, Route } from 'lucide-react';
import { dangerZones, routeOptions } from '../../data/mockData';
import { RiskBadge } from '../common/RiskBadge';

type MockMapPanelProps = {
  mode?: 'compact' | 'admin';
  title?: string;
  subtitle?: string;
  showRoutes?: boolean;
  activeZoneId?: string;
};

export function MockMapPanel({
  mode = 'admin',
  title,
  subtitle,
  showRoutes = false,
  activeZoneId,
}: MockMapPanelProps) {
  const compact = mode === 'compact';
  const zones = activeZoneId
    ? dangerZones.filter((zone) => zone.id === activeZoneId)
    : dangerZones.slice(0, compact ? 2 : 4);

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
        {showRoutes
          ? routeOptions.slice(0, 4).map((route, index) => (
              <path
                key={route.id}
                d={[
                  'M58 292 C150 250 210 262 282 202 S430 120 552 86',
                  'M45 230 C140 188 250 210 340 168 S450 150 558 198',
                  'M78 310 C120 250 168 210 230 190 C330 158 410 98 530 70',
                  'M92 112 C172 145 222 118 305 148 C390 178 448 235 548 218',
                ][index]}
                fill="none"
                stroke={route.color}
                strokeDasharray={index === 0 ? '8 10' : undefined}
                strokeLinecap="round"
                strokeWidth={route.recommended ? 9 : 6}
                opacity={route.recommended ? 0.86 : 0.56}
              />
            ))
          : null}
      </svg>

      <div className="relative z-10 flex h-full min-h-72 flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-civic-700">온길 위험지도</p>
            <h2 className="mt-1 text-lg font-bold text-navy-950">
              {title ?? (compact ? '초량 접근성 경로' : '부산 보행취약 히트맵')}
            </h2>
            {subtitle ? <p className="mt-1 text-xs font-semibold text-slate-600">{subtitle}</p> : null}
          </div>
          <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-navy-800 shadow-sm">
            Mock Map
          </span>
        </div>

        {showRoutes ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {routeOptions.slice(0, compact ? 2 : 4).map((route) => (
              <span
                key={route.id}
                className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700"
              >
                <Route className="h-3.5 w-3.5" style={{ color: route.color }} aria-hidden="true" />
                {route.title}
              </span>
            ))}
          </div>
        ) : null}

        <div className={compact ? 'space-y-2' : 'grid gap-2 sm:grid-cols-2'}>
          {zones.map((zone) => (
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
