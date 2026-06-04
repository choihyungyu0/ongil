import { Download, FileSpreadsheet, FileText, Share2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { ScoreCircle } from '../../components/common/ScoreCircle';
import { reportPreviews } from '../../data/mockData';

const options = [
  { label: 'PDF', description: '기관 제출용 진단서', icon: FileText },
  { label: 'XLS', description: '구간별 점수 데이터', icon: FileSpreadsheet },
  { label: '공유 링크', description: '검토용 preview URL', icon: Share2 },
];

export function ReportExportPage() {
  const report = reportPreviews[0];

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="온길 리포트" title="진단 리포트 내보내기" description="설정 패널, preview 페이지, 출력 옵션을 포함한 visual-only export 화면입니다." />

      <section className="grid gap-5 xl:grid-cols-[320px_1fr_320px]">
        <aside className="app-card h-fit p-5">
          <h2 className="text-lg font-bold text-navy-950">리포트 설정</h2>
          <div className="mt-5 space-y-4">
            {['대상 구간', '기간', '포함 레이어', '수신 기관'].map((label, index) => (
              <label key={label} className="block">
                <span className="text-xs font-bold text-slate-500">{label}</span>
                <span className="mt-1 block rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-bold text-slate-700">
                  {['감천문화마을', '2026년 5월', '경사·계단·제보', '사하구청'][index]}
                </span>
              </label>
            ))}
          </div>
        </aside>

        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
          <div className="border-b border-slate-200 pb-6">
            <p className="text-sm font-bold text-civic-700">{report.exportType}</p>
            <h2 className="mt-2 text-3xl font-bold text-navy-950">{report.title}</h2>
            <p className="mt-2 text-sm text-slate-500">
              {report.area} · {report.period}
            </p>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-[160px_1fr]">
            <ScoreCircle score={report.score} size="lg" />
            <div>
              <h3 className="text-xl font-bold text-navy-950">핵심 진단</h3>
              <ul className="mt-4 space-y-3">
                {report.keyFindings.map((finding) => (
                  <li key={finding} className="rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 rounded-2xl bg-civic-50 p-5">
            <h3 className="text-base font-bold text-navy-950">개선 제안</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              계단 없는 우회 안내, 쉼터 후보지 검토, 위험구간 표지 설치를 우선 과제로 제안합니다. 본 리포트는 mock data 기반 preview입니다.
            </p>
          </div>
        </article>

        <aside className="app-card h-fit p-5">
          <h2 className="text-lg font-bold text-navy-950">출력 옵션</h2>
          <div className="mt-4 space-y-3">
            {options.map(({ label, description, icon: Icon }) => (
              <button key={label} type="button" className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left">
                <Icon className="h-5 w-5 text-action-600" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold text-navy-950">{label}</span>
                  <span className="text-xs text-slate-500">{description}</span>
                </span>
              </button>
            ))}
          </div>
          <button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-action-500 px-4 py-3 text-sm font-bold text-white">
            <Download className="h-4 w-4" aria-hidden="true" />
            다운로드 mock
          </button>
        </aside>
      </section>
    </div>
  );
}
