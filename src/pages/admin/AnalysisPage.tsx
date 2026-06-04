import { PageHeader } from '../../components/common/PageHeader';
import { ProgressBar } from '../../components/common/ProgressBar';
import { HorizontalBars } from '../../components/common/SimpleCharts';
import { districtScores, riskSummary, riskTypes, scoreFactors } from '../../data/mockData';

export function AnalysisPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="데이터 분석" title="접근성 점수와 위험 유형 분석" description="구간 점수 요인과 부산 구·군 비교를 시각화한 mock 분석 화면입니다." />

      <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <div className="app-card p-5">
          <h2 className="text-lg font-bold text-navy-950">접근성 점수 요인</h2>
          <div className="mt-5 space-y-4">
            {scoreFactors.map((factor, index) => (
              <ProgressBar key={factor.label} label={factor.label} value={factor.value} tone={index % 2 === 0 ? 'teal' : 'blue'} />
            ))}
          </div>
        </div>

        <div className="app-card p-5">
          <h2 className="text-lg font-bold text-navy-950">위험 유형 분포</h2>
          <div className="mt-5">
            <HorizontalBars data={riskSummary} />
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="app-card p-5">
          <h2 className="text-lg font-bold text-navy-950">구·군 접근성 비교</h2>
          <div className="mt-5 space-y-4">
            {districtScores.map((item) => (
              <ProgressBar key={item.district} label={`${item.district} · 위험 ${item.zones}곳`} value={item.score} tone="navy" />
            ))}
          </div>
        </div>

        <div className="app-card p-5">
          <h2 className="text-lg font-bold text-navy-950">위험 정의 카드</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {riskTypes.slice(0, 6).map((risk) => (
              <article key={risk.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <strong className="text-sm text-navy-950">{risk.label}</strong>
                <p className="mt-2 text-xs leading-5 text-slate-600">{risk.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
