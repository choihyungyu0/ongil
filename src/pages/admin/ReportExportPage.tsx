import { Download, Printer } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { reportPreviews } from '../../data/mockData';

export function ReportExportPage() {
  const report = reportPreviews[0];

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="온길 리포트" title="진단 리포트 내보내기" description="관광지와 공공기관에 전달할 접근성 진단 리포트 preview입니다." />

      <section className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <article className="app-card p-6">
          <div className="border-b border-slate-200 pb-5">
            <p className="text-sm font-bold text-civic-700">{report.exportType}</p>
            <h2 className="mt-2 text-2xl font-bold text-navy-950">{report.title}</h2>
            <p className="mt-2 text-sm text-slate-500">
              {report.area} · {report.period}
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-[180px_1fr]">
            <div className="rounded-2xl bg-navy-950 p-5 text-white">
              <p className="text-sm text-slate-300">종합 접근성</p>
              <strong className="mt-3 block text-5xl font-bold">{report.score}</strong>
              <p className="text-sm text-slate-300">점</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-950">핵심 진단</h3>
              <ul className="mt-3 space-y-3">
                {report.keyFindings.map((finding) => (
                  <li key={finding} className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <aside className="app-card h-fit p-5">
          <h2 className="text-lg font-bold text-navy-950">내보내기</h2>
          <div className="mt-4 space-y-3">
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-action-500 px-4 py-3 text-sm font-bold text-white">
              <Download className="h-4 w-4" aria-hidden="true" />
              PDF Export
            </button>
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
              <Printer className="h-4 w-4" aria-hidden="true" />
              인쇄 미리보기
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
}
