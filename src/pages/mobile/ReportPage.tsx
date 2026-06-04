import { Camera, Upload } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { RiskBadge } from '../../components/common/RiskBadge';
import { riskTypes } from '../../data/mockData';

export function ReportPage() {
  return (
    <div className="space-y-5">
      <PageHeader eyebrow="온길 스캔" title="보행 위험 제보" description="사진 기반 분류 결과는 실제 AI가 아닌 발표용 mock 결과입니다." />

      <section className="flex min-h-56 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-civic-200 bg-civic-50 p-6 text-center">
        <Camera className="h-12 w-12 text-civic-700" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-bold text-navy-950">보도 사진 업로드</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">계단, 단차, 점자블록, 노면 상태를 mock으로 분류합니다.</p>
        <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-action-500 px-4 py-3 text-sm font-bold text-white">
          <Upload className="h-4 w-4" aria-hidden="true" />
          사진 선택
        </button>
      </section>

      <section className="app-card p-4">
        <h2 className="text-base font-bold text-navy-950">Mock 분류 결과</h2>
        <div className="mt-3 space-y-3">
          {riskTypes.slice(0, 4).map((risk, index) => (
            <article key={risk.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-navy-950">{risk.label}</strong>
                <RiskBadge level={risk.level} />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{risk.description}</p>
              <p className="mt-2 text-xs font-bold text-civic-700">신뢰도 {92 - index * 6}%</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
