import { PageHeader } from '../../components/common/PageHeader';
import { routeOptions } from '../../data/mockData';

export function AdminRoutesPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="루트 패키지" title="기관별 추천 동선" description="관광지, 복지관, 병원, 행사장 주변의 접근성 route package mock입니다." />

      <section className="grid gap-4 lg:grid-cols-3">
        {routeOptions.map((route) => (
          <article key={route.id} className="app-card p-5">
            <span className="rounded-full bg-civic-100 px-3 py-1 text-xs font-bold text-civic-700">{route.userType}</span>
            <h2 className="mt-4 text-lg font-bold text-navy-950">{route.title}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {route.from} → {route.to}
            </p>
            <p className="mt-4 text-3xl font-bold text-navy-950">{route.score}점</p>
            <div className="mt-4 space-y-2">
              {route.highlights.map((item) => (
                <p key={item} className="text-sm text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
