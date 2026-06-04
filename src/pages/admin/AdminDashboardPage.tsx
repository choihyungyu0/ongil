import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MetricCard } from '../../components/common/MetricCard';
import { PageHeader } from '../../components/common/PageHeader';
import { RiskBadge } from '../../components/common/RiskBadge';
import { HorizontalBars, TrendChart } from '../../components/common/SimpleCharts';
import { MockMapPanel } from '../../components/maps/MockMapPanel';
import { dashboardStats, dangerZones, monthlyTrend, riskSummary } from '../../data/mockData';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="온길 대시보드"
        title="부산 보행취약지역 관제"
        description="위험구간, 오늘 신규 제보, 개선 진행률, 위험 유형을 한 화면에서 확인하는 관리자용 mock 대시보드입니다."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <MetricCard key={stat.label} {...stat} />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <MockMapPanel title="위험구간 히트맵" subtitle="감천·초량·부산역 주변 mock 집중도" />

        <div className="app-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-navy-950">위험구간 TOP 10</h2>
            <Link to="/admin/zones" className="text-sm font-bold text-action-600">
              전체 보기
            </Link>
          </div>
          <div className="mt-4 max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {dangerZones.slice(0, 10).map((zone, index) => (
              <Link key={zone.id} to="/admin/zones" className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-navy-950 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-navy-950">{zone.name}</p>
                  <p className="text-xs text-slate-500">
                    {zone.district} · 제보 {zone.reports}건 · 우선도 {zone.priority}
                  </p>
                </div>
                <RiskBadge level={zone.level} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="app-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy-950">월별 제보·조치 추이</h2>
            <div className="flex gap-3 text-xs font-bold text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-action-500" />
                제보
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full bg-civic-500" />
                조치
              </span>
            </div>
          </div>
          <div className="mt-4">
            <TrendChart data={monthlyTrend} />
          </div>
        </div>

        <div className="app-card p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
            <AlertTriangle className="h-5 w-5 text-rose-500" aria-hidden="true" />
            위험 유형 요약
          </h2>
          <div className="mt-5">
            <HorizontalBars data={riskSummary} />
          </div>
          <Link
            to="/admin/analysis"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-navy-950 px-4 py-3 text-sm font-bold text-white"
          >
            분석 화면으로 이동
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
