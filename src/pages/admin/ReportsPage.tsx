import { PageHeader } from '../../components/common/PageHeader';
import { citizenReports } from '../../data/mockData';

const statusTone: Record<string, string> = {
  접수: 'bg-slate-100 text-slate-700',
  '검토 중': 'bg-blue-50 text-blue-700',
  '개선 요청': 'bg-amber-50 text-amber-700',
  완료: 'bg-emerald-50 text-emerald-700',
};

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="시민제보" title="제보 검토함" description="사진 기반 위험 분류와 관리자 검수 상태를 mock으로 보여줍니다." />

      <section className="grid gap-4 lg:grid-cols-3">
        {citizenReports.map((report) => (
          <article key={report.id} className="app-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-500">{report.id}</p>
                <h2 className="mt-2 text-base font-bold text-navy-950">{report.location}</h2>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusTone[report.status]}`}>
                {report.status}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{report.summary}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-bold text-civic-700">{report.riskType}</span>
              <span className="text-slate-500">신뢰도 {report.confidence}%</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
