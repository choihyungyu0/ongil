import { ClipboardCheck } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { improvementPriorities, type ImprovementStage } from '../../data/mockData';

const columns: ImprovementStage[] = ['검토 대기', '예산 협의', '공사 진행', '완료'];

const columnTone: Record<ImprovementStage, string> = {
  '검토 대기': 'border-slate-200 bg-slate-50',
  '예산 협의': 'border-blue-200 bg-blue-50',
  '공사 진행': 'border-amber-200 bg-amber-50',
  완료: 'border-emerald-200 bg-emerald-50',
};

export function ImprovementsPage() {
  const selected = improvementPriorities[0];

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="개선 추적" title="보행환경 개선 칸반" description="검토 대기부터 완료까지 개선 과제를 단계별로 추적하는 mock 화면입니다." />

      <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="grid gap-4 lg:grid-cols-4">
          {columns.map((column) => (
            <section key={column} className={`min-h-[520px] rounded-2xl border p-4 ${columnTone[column]}`}>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-navy-950">{column}</h2>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-slate-600">
                  {improvementPriorities.filter((item) => item.stage === column).length}
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {improvementPriorities
                  .filter((item) => item.stage === column)
                  .map((item) => (
                    <article key={item.id} className="rounded-xl border border-white bg-white p-4 shadow-sm">
                      <p className="text-xs font-bold text-slate-500">{item.id}</p>
                      <h3 className="mt-2 text-sm font-bold text-navy-950">{item.area}</h3>
                      <p className="mt-2 text-sm leading-5 text-slate-600">{item.action}</p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-rose-600">{item.urgency}</span>
                        <span className="text-xs text-slate-500">{item.owner}</span>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="app-card h-fit p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
            <ClipboardCheck className="h-5 w-5 text-civic-700" aria-hidden="true" />
            선택 개선안
          </h2>
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs font-bold text-slate-500">구간</p>
              <p className="mt-1 text-base font-bold text-navy-950">{selected.area}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500">권장 조치</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{selected.action}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500">기대 효과</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{selected.impact}</p>
            </div>
            <button type="button" className="w-full rounded-2xl bg-action-500 px-4 py-3 text-sm font-bold text-white">
              조치 계획 mock 등록
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
