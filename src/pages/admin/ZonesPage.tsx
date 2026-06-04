import { PageHeader } from '../../components/common/PageHeader';
import { RiskBadge } from '../../components/common/RiskBadge';
import { dangerZones } from '../../data/mockData';

export function ZonesPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="위험구간" title="보행취약 구간 목록" description="구간별 접근성 점수, 제보 수, 신뢰도, 추천 조치를 정리합니다." />

      <section className="app-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">구간</th>
                <th className="px-4 py-3">행정구</th>
                <th className="px-4 py-3">점수</th>
                <th className="px-4 py-3">위험도</th>
                <th className="px-4 py-3">주요 위험</th>
                <th className="px-4 py-3">권장 조치</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dangerZones.map((zone) => (
                <tr key={zone.id} className="bg-white">
                  <td className="px-4 py-4 font-bold text-navy-950">{zone.name}</td>
                  <td className="px-4 py-4 text-slate-600">{zone.district}</td>
                  <td className="px-4 py-4 font-bold text-navy-950">{zone.score}</td>
                  <td className="px-4 py-4">
                    <RiskBadge level={zone.level} />
                  </td>
                  <td className="px-4 py-4 text-slate-600">{zone.primaryRisks.join(', ')}</td>
                  <td className="px-4 py-4 text-slate-600">{zone.recommendedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
