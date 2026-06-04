import { Layers } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { MockMapPanel } from '../../components/maps/MockMapPanel';
import { mapLayers } from '../../data/mockData';

export function LayersPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="지도 레이어" title="위험 데이터 레이어" description="실제 지도 API 없이 추상 지도 위에 레이어 상태를 mock으로 표시합니다." />

      <section className="grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <div className="app-card p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
            <Layers className="h-5 w-5 text-civic-700" aria-hidden="true" />
            레이어 설정
          </h2>
          <div className="mt-5 space-y-3">
            {mapLayers.map((layer) => (
              <label key={layer.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-4">
                <span className="text-sm font-bold text-slate-700">{layer.label}</span>
                <input className="h-5 w-5 accent-civic-600" type="checkbox" defaultChecked={layer.enabled} />
              </label>
            ))}
          </div>
        </div>
        <MockMapPanel />
      </section>
    </div>
  );
}
