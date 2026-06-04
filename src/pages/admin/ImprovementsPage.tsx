import { PageHeader } from '../../components/common/PageHeader';
import { improvementPriorities } from '../../data/mockData';

const urgencyTone: Record<string, string> = {
  긴급: 'bg-rose-50 text-rose-700',
  높음: 'bg-amber-50 text-amber-700',
};

export function ImprovementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="개선 우선순위" title="정비 후보 액션" description="민원, 접근성 점수, 제보 신뢰도를 바탕으로 한 mock 정비 우선순위입니다." />

      <section className="space-y-3">
        {improvementPriorities.map((item, index) => (
          <article key={item.id} className="app-card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-navy-950 text-sm font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h2 className="text-lg font-bold text-navy-950">{item.area}</h2>
                <p className="mt-1 text-sm text-slate-700">{item.action}</p>
                <p className="mt-2 text-xs text-slate-500">{item.impact}</p>
              </div>
            </div>
            <span className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${urgencyTone[item.urgency]}`}>
              {item.urgency}
            </span>
          </article>
        ))}
      </section>
    </div>
  );
}
