import { ChevronDown, Search, Share2, Siren, Sparkles } from 'lucide-react';
import { AccessibleRouteLeafletMap } from '../../components/maps/AccessibleRouteLeafletMap';
import { routeOptions } from '../../data/mockData';

const routeCards = [
  {
    title: '빠른 길',
    badge: '13분',
    badgeTone: 'bg-blue-50 text-action-600',
    distance: '420m',
    distanceLabel: '거리',
    risk: '2',
    riskLabel: '위험',
    note: '평균 보행 5.8%',
  },
  {
    title: '안전한 길',
    badge: '추천',
    badgeTone: 'bg-civic-50 text-civic-700',
    distance: '610m',
    distanceLabel: '거리',
    risk: '0',
    riskLabel: '계단',
    note: '평균 경사 1.3%',
  },
  {
    title: '계단 없는 길',
    badge: '가능',
    badgeTone: 'bg-emerald-50 text-emerald-600',
    distance: '680m',
    distanceLabel: '거리',
    risk: '0',
    riskLabel: '계단',
    note: '단차 1곳',
  },
  {
    title: '완만한 길',
    badge: '우회',
    badgeTone: 'bg-amber-50 text-amber-600',
    distance: '760m',
    distanceLabel: '거리',
    risk: '0',
    riskLabel: '급경사',
    note: '평균 경사 2.6%',
  },
];

const mapFilters = ['빠른 길', '안전한 길', '계단 없는 길', '완만한 길'];

const guideSteps = [
  {
    title: '부산역 광장 출발',
    description: '복합환승센터 방향 · 평탄한 보도 확인',
    distance: '0m',
    tone: 'bg-civic-100 text-civic-700',
  },
  {
    title: '중앙대로 횡단 전 구간 이용',
    description: '횡단 대기공간 · 보도 폭 확인',
    distance: '210m',
    tone: 'bg-blue-100 text-action-600',
  },
  {
    title: '급경사 골목 우회',
    description: '계단 구간 회피 경로 적용',
    distance: '420m',
    tone: 'bg-orange-100 text-orange-600',
  },
  {
    title: '쉼터 후보 지점',
    description: '고령자·관광약자 이용 안내 표시',
    distance: '520m',
    tone: 'bg-cyan-100 text-civic-700',
  },
  {
    title: '초량이바구길 도착',
    description: '계단 없는 권장 동선으로 연계',
    distance: '610m',
    tone: 'bg-emerald-100 text-emerald-700',
  },
];

function MetricCard({ card }: { card: (typeof routeCards)[number] }) {
  return (
    <article className="flex h-full min-h-0 flex-col justify-between overflow-hidden rounded-[22px] border border-blue-100/70 bg-white px-6 py-4 shadow-[0_18px_35px_rgba(33,91,145,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-[15px] font-black leading-5 text-navy-950">{card.title}</h2>
        <span className={`rounded-full px-3 py-1 text-[11px] font-black leading-4 ${card.badgeTone}`}>{card.badge}</span>
      </div>
      <div className="mt-4 grid grid-cols-[1fr_1fr] gap-5">
        <div>
          <p className="text-[26px] font-black leading-none text-navy-950">{card.distance}</p>
          <p className="mt-1 text-[11px] font-extrabold leading-4 text-slate-400">{card.distanceLabel}</p>
        </div>
        <div>
          <p className="text-[26px] font-black leading-none text-navy-950">{card.risk}</p>
          <p className="mt-1 text-[11px] font-extrabold leading-4 text-slate-400">{card.riskLabel}</p>
        </div>
      </div>
      <p className="mt-3 text-[11px] font-bold leading-4 text-slate-400">{card.note}</p>
    </article>
  );
}

export function AdminRoutesPage() {
  const recommendedRoute = routeOptions.find((route) => route.recommended) ?? routeOptions[1];

  return (
    <div className="route-screen-fit grid gap-4 overflow-visible lg:grid-rows-[auto_auto_minmax(0,1fr)] lg:overflow-hidden">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-5">
        <div className="min-w-0 pt-3">
          <p className="text-[12px] font-black leading-4 text-civic-700">환승점 · 관리자 경로 비교</p>
          <h1 className="mt-1 text-[28px] font-black leading-8 text-navy-950 sm:text-[34px] sm:leading-9">무장애 경로 비교 화면</h1>
          <p className="mt-2 text-[13px] font-bold text-slate-500">
            부산역과 초량이바구길 사이의 보행 위험을 비교하고 접근성이 더 나은 길을 안내합니다.
          </p>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-3 lg:pt-5">
          <label className="relative block w-full lg:w-auto">
            <span className="sr-only">지역, 위험유형, 리포트 검색</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="지역, 위험유형, 리포트 검색"
              className="h-12 w-full rounded-full border border-blue-100 bg-white pl-11 pr-4 text-[13px] font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20 lg:w-[360px]"
            />
          </label>
          <div className="flex gap-2">
            <button type="button" className="inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-blue-100 bg-white px-4 text-[13px] font-black text-navy-900 shadow-sm sm:flex-none sm:px-5">
              부산광역시
              <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-action-500 px-4 text-[13px] font-black text-white shadow-[0_14px_24px_rgba(36,119,255,0.26)] hover:bg-action-600 sm:flex-none sm:px-6"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              경로 공유
            </button>
          </div>
        </div>
      </header>

      <section className="grid min-h-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4" aria-label="무장애 경로 요약">
        {routeCards.map((card) => (
          <MetricCard key={card.title} card={card} />
        ))}
      </section>

      <section className="grid min-h-0 gap-4 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_420px]">
        <article className="min-h-0 overflow-hidden rounded-[24px] border border-blue-100/70 bg-white p-4 shadow-[0_20px_45px_rgba(33,91,145,0.09)]">
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex flex-col gap-3 px-1 pb-3 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
              <div className="min-w-0">
                <h2 className="text-[18px] font-black leading-6 text-navy-950">부산역 → 초량이바구길 경로 시뮬레이터</h2>
                <p className="mt-1 text-[12px] font-bold text-slate-500">
                  보행 약자 유형과 목적지 접근성을 기준으로 후보 경로를 비교합니다.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 lg:justify-end">
                {mapFilters.map((filter, index) => (
                  <button
                    key={filter}
                    type="button"
                    className={[
                      'h-9 rounded-full border px-4 text-[12px] font-black transition',
                      index === 1 ? 'border-civic-100 bg-civic-50 text-civic-700 shadow-sm' : 'border-blue-100 bg-white text-slate-500 hover:border-civic-100 hover:text-civic-700',
                    ].join(' ')}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-[430px] overflow-hidden rounded-[18px] bg-blue-50 lg:min-h-0 lg:flex-1">
              <AccessibleRouteLeafletMap />
            </div>
          </div>
        </article>

        <aside className="min-h-0 overflow-hidden rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_20px_45px_rgba(33,91,145,0.09)]">
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-[19px] font-black text-navy-950">안전 경로 안내</h2>
                <p className="mt-1 text-[12px] font-bold text-slate-400">On-gil Route</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-civic-50 px-3 py-2 text-[12px] font-black text-civic-700">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {recommendedRoute.title}
              </span>
            </div>

            <ol className="mt-6 space-y-4">
              {guideSteps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[42px_minmax(0,1fr)_48px] items-start gap-3">
                  <span className={`grid h-10 w-10 place-items-center rounded-[14px] text-[14px] font-black ${step.tone}`}>{index + 1}</span>
                  <span className="min-w-0 pt-0.5">
                    <strong className="block text-[14px] font-black leading-5 text-navy-950">{step.title}</strong>
                    <span className="mt-1 block text-[11px] font-bold leading-4 text-slate-500">{step.description}</span>
                  </span>
                  <span className="pt-1 text-right text-[11px] font-black text-slate-400">{step.distance}</span>
                </li>
              ))}
            </ol>

            <div className="mt-auto rounded-[18px] border border-cyan-100 bg-civic-50/90 p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-civic-700 shadow-sm">
                  <Siren className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[13px] font-black text-navy-950">유형별 경로 검토 참고</h3>
                  <p className="mt-1.5 text-[11px] font-bold leading-5 text-slate-600">
                    저시력, 휠체어, 유모차, 고령자, 관광약자 등 이동 유형별로 위험 참고 문구를 다르게 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
