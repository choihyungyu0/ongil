import { MapPinned } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { RiskBadge } from '../../components/common/RiskBadge';
import { RiskTag } from '../../components/common/RiskTag';
import { MockMapPanel } from '../../components/maps/MockMapPanel';
import { dangerZones } from '../../data/mockData';

const statusTone: Record<string, string> = {
  '검토 대기': 'bg-slate-100 text-slate-700',
  '예산 협의': 'bg-blue-50 text-blue-700',
  '공사 진행': 'bg-amber-50 text-amber-700',
  완료: 'bg-emerald-50 text-emerald-700',
};

export function ZonesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="위험구간 관리"
        title="위험구간 TOP 10 관리"
        description="우선순위 점수, 위험 태그, 개선 상태, 추천 기준을 함께 검토합니다."
      />

      <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="app-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500">
                <tr>
                  <th className="px-4 py-3">순위</th>
                  <th className="px-4 py-3">위험구간</th>
                  <th className="px-4 py-3">접근성</th>
                  <th className="px-4 py-3">위험도</th>
                  <th className="px-4 py-3">위험 태그</th>
                  <th className="px-4 py-3">우선도</th>
                  <th className="px-4 py-3">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dangerZones.map((zone, index) => (
                  <tr key={zone.id} className="bg-white align-top">
                    <td className="px-4 py-4 font-bold text-navy-950">{index + 1}</td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-navy-950">{zone.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{zone.address}</p>
                    </td>
                    <td className="px-4 py-4 font-bold text-navy-950">{zone.score}점</td>
                    <td className="px-4 py-4">
                      <RiskBadge level={zone.level} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {zone.primaryRisks.map((risk) => (
                          <RiskTag key={risk} label={risk} compact />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-bold text-rose-600">{zone.priority}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusTone[zone.improvementStatus]}`}>
                        {zone.improvementStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-5">
          <MockMapPanel title="선택 구간 지도" subtitle="TOP 위험구간 위치 preview" />
          <div className="app-card p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
              <MapPinned className="h-5 w-5 text-civic-700" aria-hidden="true" />
              추천 기준
            </h2>
            <ul className="mt-4 space-y-3">
              {dangerZones[0].criteria.map((criterion) => (
                <li key={criterion} className="rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                  {criterion}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-6 text-slate-600">{dangerZones[0].recommendedAction}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
