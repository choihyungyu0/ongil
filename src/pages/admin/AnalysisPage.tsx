import { PageHeader } from '../../components/common/PageHeader';
import { riskTypes, scoreFactors } from '../../data/mockData';

export function AnalysisPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="분석" title="접근성 점수 요인" description="경사, 계단, 단차, 점자블록, 조도 등 요인별 mock 점수입니다." />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="app-card p-5">
          <h2 className="text-lg font-bold text-navy-950">점수 요인</h2>
          <div className="mt-5 space-y-4">
            {scoreFactors.map((factor) => (
              <div key={factor.label}>
                <div className="flex justify-between text-sm font-bold text-slate-700">
                  <span>{factor.label}</span>
                  <span>{factor.value}점</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-civic-500" style={{ width: `${factor.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="app-card p-5">
          <h2 className="text-lg font-bold text-navy-950">위험 유형</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {riskTypes.map((risk) => (
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
