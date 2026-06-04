import { Camera, ChevronRight, MapPinned, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MockMapPanel } from '../../components/maps/MockMapPanel';
import { dangerZones, riskTypes, routeOptions } from '../../data/mockData';

export function MobileHomePage() {
  const mainRoute = routeOptions[0];

  return (
    <div className="space-y-5">
      <section className="rounded-2xl bg-navy-950 p-5 text-white shadow-card">
        <p className="text-sm font-bold text-cyan-200">오늘의 온길 점수</p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <strong className="text-5xl font-bold tracking-normal">{mainRoute.score}</strong>
            <span className="ml-1 text-sm text-slate-300">점</span>
          </div>
          <span className="rounded-full bg-cyan-300/20 px-3 py-1 text-xs font-bold text-cyan-100">
            {mainRoute.userType}
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          {mainRoute.from}에서 {mainRoute.to}까지 계단 없는 우회길을 우선 참고합니다.
        </p>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <Link
          to="/mobile/search"
          className="flex items-center justify-between rounded-2xl bg-action-500 p-4 text-sm font-bold text-white shadow-card"
        >
          경로 찾기
          <Search className="h-5 w-5" aria-hidden="true" />
        </Link>
        <Link
          to="/mobile/report"
          className="flex items-center justify-between rounded-2xl bg-white p-4 text-sm font-bold text-navy-950 shadow-card"
        >
          위험 제보
          <Camera className="h-5 w-5 text-civic-700" aria-hidden="true" />
        </Link>
      </div>

      <MockMapPanel mode="mobile" />

      <section className="app-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-950">근처 주의 구간</h2>
          <MapPinned className="h-5 w-5 text-civic-700" aria-hidden="true" />
        </div>
        <div className="mt-3 space-y-3">
          {dangerZones.slice(0, 3).map((zone) => (
            <Link
              key={zone.id}
              to="/mobile/routes"
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
            >
              <div>
                <p className="text-sm font-bold text-navy-950">{zone.name}</p>
                <p className="mt-1 text-xs text-slate-500">{zone.primaryRisks.join(' · ')}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-2">
        {riskTypes.slice(0, 5).map((risk) => (
          <span key={risk.id} className="soft-chip">
            {risk.label}
          </span>
        ))}
      </section>
    </div>
  );
}
