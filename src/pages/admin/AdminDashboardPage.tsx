import { PageHeader } from '../../components/common/PageHeader';
import { MetricCard } from '../../components/common/MetricCard';
import { MockMapPanel } from '../../components/maps/MockMapPanel';
import { dashboardStats, improvementPriorities } from '../../data/mockData';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="온길 대시보드"
        title="부산 보행접근성 관제"
        description="위험구간, 시민제보, 접근성 점수, 개선 우선순위를 한눈에 보는 관리자 mock 대시보드입니다."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <MockMapPanel />
        <div className="app-card p-5">
          <h2 className="text-lg font-bold text-navy-950">개선 우선순위</h2>
          <div className="mt-4 space-y-3">
            {improvementPriorities.map((item) => (
              <article key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm text-navy-950">{item.area}</strong>
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">{item.urgency}</span>
                </div>
                <p className="mt-2 text-sm text-slate-700">{item.action}</p>
                <p className="mt-1 text-xs text-slate-500">{item.impact}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
