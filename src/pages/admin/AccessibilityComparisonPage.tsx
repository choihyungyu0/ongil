import {
  Accessibility,
  Armchair,
  Camera,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Download,
  Gauge,
  MapPin,
  MessageSquareWarning,
  Moon,
  Mountain,
  Route,
  Search,
  TrafficCone,
  TriangleAlert,
} from 'lucide-react';
import comparisonMapImage from '../../../asset/d44ecfd2-03aa-4757-97ae-169a227f42ac.png';
import {
  accessibilityComparisonSummary,
  accessibilityDistrictComparisons,
  accessibilityLayerItems,
  accessibilityMapDistricts,
  accessibilityRiskShares,
  accessibilityUserImpacts,
} from '../../data/mockData';

const layerToneClass = {
  cyan: 'bg-cyan-50 text-cyan-600',
  blue: 'bg-blue-50 text-action-600',
  orange: 'bg-orange-50 text-orange-500',
  violet: 'bg-violet-50 text-violet-500',
  emerald: 'bg-emerald-50 text-emerald-600',
  rose: 'bg-rose-50 text-rose-500',
  sky: 'bg-sky-50 text-sky-500',
  amber: 'bg-amber-50 text-amber-500',
};

const summaryToneClass = {
  cyan: {
    icon: 'bg-civic-50 text-civic-600',
    caption: 'text-civic-600',
  },
  blue: {
    icon: 'bg-blue-50 text-action-600',
    caption: 'text-action-600',
  },
  rose: {
    icon: 'bg-rose-50 text-rose-500',
    caption: 'text-rose-500',
  },
  emerald: {
    icon: 'bg-emerald-50 text-emerald-600',
    caption: 'text-emerald-600',
  },
};

const districtToneClass = {
  rose: 'bg-rose-50 text-rose-500 border-rose-100',
  orange: 'bg-orange-50 text-orange-500 border-orange-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  blue: 'bg-blue-50 text-action-600 border-blue-100',
  emerald: 'bg-civic-50 text-civic-700 border-civic-100',
};

const layerIcons = {
  dem: Mountain,
  road: Route,
  crosswalk: TrafficCone,
  facility: Accessibility,
  survey: Camera,
  'report-density': MessageSquareWarning,
  shelter: Armchair,
  lighting: Moon,
};

const summaryIcons = [MapPin, Gauge, TriangleAlert, CheckCircle2];

function getRiskGradient() {
  const total = accessibilityRiskShares.reduce((sum, item) => sum + item.value, 0);
  let start = 0;

  const stops = accessibilityRiskShares.map((item) => {
    const end = start + (item.value / total) * 100;
    const stop = `${item.color} ${start}% ${end}%`;
    start = end;
    return stop;
  });

  return `conic-gradient(${stops.join(', ')})`;
}

function LayerPanel() {
  return (
    <aside className="flex min-h-0 flex-col rounded-[30px] border border-blue-100/80 bg-white/95 p-7 shadow-[0_24px_50px_rgba(33,91,145,0.09)]">
      <header>
        <p className="text-[12px] font-black leading-4 text-civic-700">GIS 데이터 · 레이어 관리</p>
        <h2 className="text-[28px] font-black leading-8 tracking-tight text-navy-950">보행접근성 데이터 레이어</h2>
        <p className="mt-2 text-[13px] font-semibold leading-5 text-slate-500">
          공공데이터·현장조사·시민제보 데이터를 지도 레이어로 관리합니다.
        </p>
      </header>

      <section className="mt-6 flex min-h-0 flex-1 flex-col rounded-[20px] border border-blue-100/80 bg-white p-5 shadow-[0_12px_28px_rgba(33,91,145,0.06)]">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-black text-navy-950">레이어 목록</h3>
          <span className="text-[11px] font-black text-civic-700">동기화됨</span>
        </div>

        <div className="mt-4 grid gap-3">
          {accessibilityLayerItems.map((layer) => {
            const Icon = layerIcons[layer.id as keyof typeof layerIcons] ?? CircleDot;

            return (
              <article
                key={layer.id}
                className="grid h-[58px] grid-cols-[40px_minmax(0,1fr)_46px] items-center gap-3 rounded-[16px] border border-blue-100/70 bg-slate-50/80 px-3"
              >
                <span className={`grid h-10 w-10 place-items-center rounded-[14px] ${layerToneClass[layer.tone]}`}>
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <strong className="block truncate text-[13px] font-black text-navy-950">{layer.label}</strong>
                  <span className="mt-0.5 block text-[10px] font-bold text-slate-400">{layer.dateLabel}</span>
                </span>
                <button
                  type="button"
                  aria-label={`${layer.label} 레이어 ${layer.enabled ? '켜짐' : '꺼짐'}`}
                  className={[
                    'relative h-6 w-11 rounded-full transition',
                    layer.enabled ? 'bg-civic-500' : 'bg-slate-200',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition',
                      layer.enabled ? 'left-6' : 'left-1',
                    ].join(' ')}
                  />
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          <article className="rounded-[16px] border border-cyan-100 bg-civic-50/70 px-4 py-3">
            <p className="text-[10px] font-black text-civic-700">레이어 품질</p>
            <strong className="mt-1 block text-[24px] font-black leading-none text-navy-950">94%</strong>
            <span className="mt-1 block text-[10px] font-bold text-slate-500">좌표 정합성 기준</span>
          </article>
          <article className="rounded-[16px] border border-blue-100 bg-blue-50/60 px-4 py-3">
            <p className="text-[10px] font-black text-action-600">오늘 갱신</p>
            <strong className="mt-1 block text-[24px] font-black leading-none text-navy-950">37건</strong>
            <span className="mt-1 block text-[10px] font-bold text-slate-500">현장조사 포함</span>
          </article>
        </div>
      </section>
    </aside>
  );
}

function SummaryCard({ index }: { index: number }) {
  const card = accessibilityComparisonSummary[index];
  const Icon = summaryIcons[index];
  const tone = summaryToneClass[card.tone];

  return (
    <article className="grid h-[86px] grid-cols-[42px_minmax(0,1fr)] items-center gap-4 rounded-[18px] border border-blue-100/70 bg-white px-5 shadow-[0_14px_30px_rgba(33,91,145,0.07)]">
      <span className={`grid h-10 w-10 place-items-center rounded-[15px] ${tone.icon}`}>
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-black text-slate-400">{card.label}</p>
        <strong className="mt-1 block truncate text-[25px] font-black leading-none tracking-tight text-navy-950">{card.value}</strong>
        <p className={`mt-1 text-[10px] font-black ${tone.caption}`}>{card.trend}</p>
      </div>
    </article>
  );
}

function HeaderControls() {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <label className="relative block">
        <span className="sr-only">지역, 위험유형, 리포트 검색</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="지역, 위험유형, 리포트 검색"
          className="h-11 w-[330px] rounded-2xl border border-blue-100 bg-white pl-11 pr-4 text-[12px] font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
        />
      </label>
      <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-[12px] font-black text-navy-800 shadow-sm">
        부산광역시
        <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </button>
      <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-action-500 px-5 text-[12px] font-black text-white shadow-[0_12px_20px_rgba(36,119,255,0.25)] hover:bg-action-600">
        <Download className="h-4 w-4" aria-hidden="true" />
        엑셀 내보내기
      </button>
    </div>
  );
}

function MapComparisonPanel() {
  return (
    <section className="flex min-h-0 flex-col rounded-[24px] border border-blue-100/70 bg-white p-6 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
      <header>
        <h2 className="text-[21px] font-black tracking-tight text-navy-950">구·군 접근성 점수 지도</h2>
        <p className="mt-1 text-[12px] font-semibold text-slate-500">진한 색일수록 개선 우선순위가 높습니다.</p>
      </header>

      <div className="relative mt-5 min-h-0 flex-1 overflow-hidden rounded-[16px] border border-blue-100 bg-[#dbeef7]" role="img" aria-label="부산 구군 접근성 점수 비교 mock 지도">
        <img src={comparisonMapImage} alt="부산 구군 접근성 점수 비교 mock 지도" className="h-full w-full object-cover" />
        <div className="absolute bottom-5 right-5 rounded-[14px] border border-blue-100 bg-white/94 px-4 py-3 shadow-[0_12px_24px_rgba(15,29,51,0.12)]">
          <p className="mb-2 text-[10px] font-black text-slate-500">범례</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400">낮음</span>
            <span className="h-3 w-28 rounded-full bg-[linear-gradient(90deg,#28d5c1,#f7d95b,#ff8a2a,#ff4d55)]" />
            <span className="text-[10px] font-black text-slate-400">높음</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid shrink-0 grid-cols-5 gap-3">
        {accessibilityMapDistricts.map((item) => (
          <article key={item.district} className={`h-[60px] rounded-[14px] border px-4 py-2 ${districtToneClass[item.tone as keyof typeof districtToneClass]}`}>
            <p className="text-[12px] font-black">{item.district}</p>
            <strong className="mt-1 block text-[17px] font-black leading-none">{item.score}점</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function PriorityPanel() {
  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
      <h2 className="text-[20px] font-black text-navy-950">개선 우선 구·군 TOP 5</h2>
      <ol className="mt-3 grid gap-2">
        {accessibilityDistrictComparisons.map((item) => (
          <li key={item.district} className="grid h-[42px] grid-cols-[30px_minmax(0,1fr)_58px] items-center gap-3 rounded-[12px] border border-blue-100 bg-slate-50/70 px-4">
            <span className={['text-[13px] font-black', item.rank <= 2 ? 'text-rose-500' : item.rank === 3 ? 'text-orange-500' : 'text-action-600'].join(' ')}>
              {item.rank}
            </span>
            <div className="min-w-0">
              <strong className="block truncate text-[13px] font-black text-navy-950">{item.district}</strong>
              <span className="mt-0.5 block truncate text-[11px] font-bold text-slate-500">{item.issue}</span>
            </div>
            <strong className="justify-self-end text-[13px] font-black text-rose-500">{item.score}점</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}

function RiskDistributionPanel() {
  return (
    <section className="flex min-h-0 flex-col rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
      <h2 className="text-[17px] font-black text-navy-950">위험유형별 분포</h2>
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div className="relative h-[176px] w-[176px] rounded-full" style={{ background: getRiskGradient() }}>
          <div className="absolute inset-[34px] grid place-items-center rounded-full bg-white shadow-inner">
            <div className="text-center">
              <strong className="block text-[24px] font-black leading-none text-navy-950">12,248</strong>
              <span className="mt-1 block text-[11px] font-black text-slate-400">전체</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-3 gap-x-3 gap-y-2">
        {accessibilityRiskShares.slice(0, 5).map((item) => (
          <span key={item.label} className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-500">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}

function UserImpactPanel() {
  return (
    <section className="flex min-h-0 flex-col rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
      <h2 className="text-[17px] font-black text-navy-950">사용자유형별 영향도</h2>
      <div className="mt-5 grid flex-1 content-center gap-4">
        {accessibilityUserImpacts.map((item) => (
          <div key={item.label} className="grid grid-cols-[82px_minmax(0,1fr)_34px] items-center gap-3">
            <span className="truncate text-[12px] font-black text-navy-950">{item.label}</span>
            <span className="h-3 overflow-hidden rounded-full bg-slate-100">
              <span className="block h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
            </span>
            <span className="text-right text-[11px] font-black text-slate-400">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AccessibilityComparisonPage() {
  return (
    <div className="access-comparison-screen grid gap-6 overflow-hidden xl:grid-cols-[420px_minmax(0,1fr)]">
      <LayerPanel />

      <main className="flex min-h-0 flex-col gap-5 overflow-hidden">
        <header className="flex h-[78px] shrink-0 items-start justify-between gap-5 pt-1">
          <div className="min-w-0">
            <p className="text-[12px] font-black leading-4 text-civic-700">통계/현황 · 지역 비교</p>
            <h1 className="truncate text-[30px] font-black leading-9 tracking-tight text-navy-950">구·군별 접근성 비교 대시보드</h1>
            <p className="text-[13px] font-semibold text-slate-500">부산 구·군별 보행접근성 점수와 취약유형 분포를 비교합니다.</p>
          </div>
          <HeaderControls />
        </header>

        <section className="grid h-[86px] shrink-0 grid-cols-4 gap-5" aria-label="접근성 비교 핵심 지표">
          {accessibilityComparisonSummary.map((card, index) => (
            <SummaryCard key={card.label} index={index} />
          ))}
        </section>

        <section className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_560px] gap-6">
          <MapComparisonPanel />
          <aside className="grid min-h-0 grid-rows-[324px_minmax(0,1fr)] gap-6">
            <PriorityPanel />
            <div className="grid min-h-0 grid-cols-2 gap-6">
              <RiskDistributionPanel />
              <UserImpactPanel />
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
