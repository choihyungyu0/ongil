import { Layers } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { ProgressBar } from '../../components/common/ProgressBar';
import { DonutChart, HorizontalBars } from '../../components/common/SimpleCharts';
import { MockMapPanel } from '../../components/maps/MockMapPanel';
import { districtScores, mapLayers, riskSummary } from '../../data/mockData';

export function LayersPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="접근성 데이터 레이어" title="지도 레이어와 구·군 비교" description="실제 지도 API 없이 접근성 데이터 레이어 상태와 비교 대시보드를 구성합니다." />

      <section className="grid gap-5 xl:grid-cols-[340px_1fr]">
        <div className="app-card p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
            <Layers className="h-5 w-5 text-civic-700" aria-hidden="true" />
            레이어 토글
          </h2>
          <div className="mt-5 space-y-3">
            {mapLayers.map((layer) => (
              <label key={layer.id} className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <span>
                  <span className="block text-sm font-bold text-slate-700">{layer.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">{layer.description}</span>
                </span>
                <input className="mt-1 h-5 w-5 accent-civic-600" type="checkbox" defaultChecked={layer.enabled} />
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <MockMapPanel title="접근성 점수 지도" subtitle="레이어별 위험 집중도를 추상 지도에 표시" />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="app-card p-5">
              <h2 className="text-lg font-bold text-navy-950">구·군 비교</h2>
              <div className="mt-5 space-y-4">
                {districtScores.map((item) => (
                  <ProgressBar key={item.district} label={`${item.district} · ${item.zones}곳`} value={item.score} tone="teal" />
                ))}
              </div>
            </div>
            <div className="app-card p-5">
              <h2 className="text-lg font-bold text-navy-950">시각화 요약</h2>
              <div className="mt-5 space-y-6">
                <DonutChart value={68} label="전체 조사 구간 중 개선 검토가 필요한 구간 비율입니다." />
                <HorizontalBars data={riskSummary.slice(0, 3)} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
