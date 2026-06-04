import { CheckCircle2, Clock, Route } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { RiskTag } from '../../components/common/RiskTag';
import { ScoreCircle } from '../../components/common/ScoreCircle';
import { MockMapPanel } from '../../components/maps/MockMapPanel';
import { routeOptions } from '../../data/mockData';

export function AdminRoutesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="무장애 루트 비교"
        title="빠른 길·안전한 길·계단 없는 길·완만한 길"
        description="관광지, 병원, 복지관 주변 route package를 기관 담당자가 비교하는 mock 화면입니다."
      />

      <section className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <MockMapPanel title="다중 경로 비교 지도" subtitle="4개 후보 경로를 추상 선으로 표시" showRoutes />

        <aside className="app-card p-5">
          <h2 className="text-lg font-bold text-navy-950">우측 경로 안내</h2>
          <ol className="mt-4 space-y-3">
            {routeOptions.map((route, index) => (
              <li key={route.id} className="flex gap-3 rounded-xl bg-slate-50 p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: route.color }}>
                  {index + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-950">{route.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{route.recommendationReason}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {routeOptions.map((route) => (
          <article
            key={route.id}
            className={`rounded-2xl border bg-white p-5 shadow-card ${route.recommended ? 'border-action-500 ring-2 ring-action-500/15' : 'border-slate-200'}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: route.color }}>
                  {route.userType}
                </span>
                <h2 className="mt-4 text-lg font-bold text-navy-950">{route.title}</h2>
              </div>
              {route.recommended ? <CheckCircle2 className="h-5 w-5 text-action-600" aria-hidden="true" /> : null}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <ScoreCircle score={route.score} size="sm" />
              <div className="text-right text-sm text-slate-600">
                <p className="font-bold text-navy-950">{route.distance}</p>
                <p className="mt-1 inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {route.minutes}분
                </p>
                <p className="mt-1 inline-flex items-center gap-1">
                  <Route className="h-3.5 w-3.5" aria-hidden="true" />
                  위험 {route.riskCount}곳
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {route.tags.map((tag) => (
                <RiskTag key={tag} label={tag} compact />
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
