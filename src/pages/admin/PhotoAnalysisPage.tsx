import { CheckCircle2, Sparkles } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { ProgressBar } from '../../components/common/ProgressBar';
import { photoAnalysis } from '../../data/mockData';

export function PhotoAnalysisPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="AI 사진 분석" title="보행환경 사진 판독 mock" description="실제 AI inference 없이 bounding box와 판독 결과를 시각적으로 보여줍니다." />

      <section className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="app-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-navy-950">{photoAnalysis.imageTitle}</h2>
              <p className="mt-1 text-sm text-slate-500">{photoAnalysis.location}</p>
            </div>
            <span className="rounded-full bg-civic-100 px-3 py-1 text-xs font-bold text-civic-700">Mock Analysis</span>
          </div>

          <div className="relative mt-5 min-h-[420px] overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#d9f3f5,#f8fafc)] p-5">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,29,51,0.06)_1px,transparent_1px),linear-gradient(rgba(15,29,51,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
            <div className="absolute left-[12%] top-[18%] h-32 w-20 rounded-xl bg-slate-300/70" />
            <div className="absolute bottom-[18%] left-[8%] right-[8%] h-24 skew-y-[-7deg] rounded-3xl bg-slate-400/35" />
            <div className="absolute bottom-[28%] left-[22%] h-16 w-72 rounded-full bg-cyan-200/50" />
            <div className="absolute right-[14%] top-[20%] h-36 w-8 rounded-full bg-navy-950/20" />

            {photoAnalysis.detections.map((box) => (
              <div
                key={box.label}
                className="absolute border-2 border-action-500 bg-action-500/10"
                style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.width}%`, height: `${box.height}%` }}
              >
                <span className="absolute -top-7 left-0 rounded-full bg-action-500 px-2 py-1 text-xs font-bold text-white">
                  {box.label} {box.confidence}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="app-card p-5">
            <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
              <Sparkles className="h-5 w-5 text-action-600" aria-hidden="true" />
              AI 판단 결과
            </h2>
            <div className="mt-5 space-y-4">
              {photoAnalysis.resultBars.map((item) => (
                <ProgressBar key={item.label} label={item.label} value={item.value} tone="blue" />
              ))}
            </div>
          </div>

          <div className="app-card p-5">
            <h2 className="text-lg font-bold text-navy-950">추천 개선안</h2>
            <div className="mt-4 space-y-3">
              {photoAnalysis.recommendations.map((item) => (
                <p key={item} className="rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="app-card p-5">
            <h2 className="text-lg font-bold text-navy-950">처리 단계</h2>
            <ol className="mt-4 space-y-3">
              {photoAnalysis.checklist.map((item, index) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className={`h-5 w-5 ${index < 2 ? 'text-civic-700' : 'text-slate-300'}`} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>
    </div>
  );
}
