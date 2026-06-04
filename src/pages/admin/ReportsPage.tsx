import { Bot, MapPin } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { ProgressBar } from '../../components/common/ProgressBar';
import { RiskBadge } from '../../components/common/RiskBadge';
import { MockMapPanel } from '../../components/maps/MockMapPanel';
import { citizenReports, photoAnalysis } from '../../data/mockData';

const statusTone: Record<string, string> = {
  '검토 필요': 'bg-slate-100 text-slate-700',
  접수: 'bg-blue-50 text-blue-700',
  긴급: 'bg-rose-50 text-rose-700',
  '조치 예정': 'bg-amber-50 text-amber-700',
  모니터링: 'bg-emerald-50 text-emerald-700',
};

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="시민제보 관리" title="제보 접수·검수" description="제보 상태, mock AI 분류, 위치 preview를 함께 확인합니다." />

      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="app-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500">
                <tr>
                  <th className="px-4 py-3">제보 ID</th>
                  <th className="px-4 py-3">위치</th>
                  <th className="px-4 py-3">유형</th>
                  <th className="px-4 py-3">상태</th>
                  <th className="px-4 py-3">심각도</th>
                  <th className="px-4 py-3">신뢰도</th>
                  <th className="px-4 py-3">담당</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {citizenReports.map((report) => (
                  <tr key={report.id} className="bg-white align-top">
                    <td className="px-4 py-4 font-bold text-navy-950">{report.id}</td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-navy-950">{report.location}</p>
                      <p className="mt-1 text-xs text-slate-500">{report.summary}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{report.riskType}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusTone[report.status]}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <RiskBadge level={report.severity} />
                    </td>
                    <td className="px-4 py-4 font-bold text-civic-700">{report.confidence}%</td>
                    <td className="px-4 py-4 text-slate-600">{report.assignedTeam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="app-card p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
              <Bot className="h-5 w-5 text-action-600" aria-hidden="true" />
              AI 분류 흐름 mock
            </h2>
            <div className="mt-5 space-y-4">
              {photoAnalysis.resultBars.slice(0, 3).map((item) => (
                <ProgressBar key={item.label} label={item.label} value={item.value} tone="blue" />
              ))}
            </div>
          </div>
          <div className="app-card p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
              <MapPin className="h-5 w-5 text-civic-700" aria-hidden="true" />
              위치 preview
            </h2>
            <div className="mt-4">
              <MockMapPanel mode="compact" title="제보 위치" activeZoneId="zone-003" />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
