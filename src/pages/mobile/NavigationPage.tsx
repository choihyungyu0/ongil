import { AlertTriangle, CheckCircle2, Navigation } from 'lucide-react';
import { MockMapPanel } from '../../components/maps/MockMapPanel';
import { routeOptions } from '../../data/mockData';

const steps = [
  '부산역 7번 출구 앞 횡단보도까지 직진',
  '복지관 앞 완만한 우회 보도를 따라 이동',
  '볼라드 간격이 좁은 구간에서 오른쪽 보행선 유지',
  '초량이바구길 안내소 방향으로 진입',
];

export function NavigationPage() {
  const route = routeOptions[0];

  return (
    <div className="space-y-5">
      <section className="rounded-2xl bg-action-500 p-5 text-white shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-blue-100">안내 중</p>
            <h1 className="mt-1 text-2xl font-bold tracking-normal">{route.title}</h1>
          </div>
          <Navigation className="h-8 w-8" aria-hidden="true" />
        </div>
        <p className="mt-4 text-sm text-blue-50">다음 120m는 완만한 오르막입니다. 접근성 참고 점수 {route.score}점.</p>
      </section>

      <MockMapPanel mode="mobile" />

      <section className="app-card p-4">
        <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-3 text-amber-800">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="text-sm font-semibold">볼라드 간격이 좁은 구간이 있어 현장 상황 확인이 필요합니다.</p>
        </div>
        <ol className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${index === 0 ? 'text-civic-700' : 'text-slate-300'}`} />
              <span className="text-sm leading-6 text-slate-700">{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
