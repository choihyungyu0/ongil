import { Clock, Route } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { routeOptions } from '../../data/mockData';

export function RoutesPage() {
  return (
    <div className="space-y-5">
      <PageHeader eyebrow="온길 루트" title="추천 경로 비교" description="접근성 점수와 위험요소를 함께 참고하는 mock 경로 목록입니다." />

      <div className="space-y-3">
        {routeOptions.map((route, index) => (
          <article key={route.id} className="app-card overflow-hidden">
            <div className="flex items-start justify-between gap-3 p-4">
              <div>
                <span className="rounded-full bg-civic-100 px-3 py-1 text-xs font-bold text-civic-700">
                  {route.userType}
                </span>
                <h2 className="mt-3 text-lg font-bold text-navy-950">{route.title}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {route.from} → {route.to}
                </p>
              </div>
              <div className="text-right">
                <strong className="text-3xl font-bold text-navy-950">{route.score}</strong>
                <p className="text-xs font-bold text-slate-500">접근성</p>
              </div>
            </div>
            <div className="grid grid-cols-2 border-y border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-action-600" aria-hidden="true" />
                {route.minutes}분
              </span>
              <span className="flex items-center gap-2">
                <Route className="h-4 w-4 text-civic-700" aria-hidden="true" />
                {route.distance}
              </span>
            </div>
            <div className="space-y-2 p-4">
              {route.highlights.slice(0, 2).map((item) => (
                <p key={item} className="text-sm text-slate-700">
                  좋아요: {item}
                </p>
              ))}
              {route.cautions.slice(0, 1).map((item) => (
                <p key={item} className="text-sm text-amber-700">
                  주의: {item}
                </p>
              ))}
              {index === 0 ? (
                <Link
                  to="/mobile/navigation"
                  className="mt-3 inline-flex w-full justify-center rounded-2xl bg-action-500 px-4 py-3 text-sm font-bold text-white"
                >
                  안내 시작
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
