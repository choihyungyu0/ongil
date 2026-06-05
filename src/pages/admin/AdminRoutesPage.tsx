import {
  ChevronDown,
  Search,
  Share2,
  ShieldCheck,
  Siren,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import routeMapImage from '../../../asset/33783c4a-3ae1-461b-a3ef-3f43e1a3df80.png';
import { citizenReports, routeOptions, userTypes } from '../../data/mockData';

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

const citizenRiskTypes = ['계단', '단차', '보도블록 파손', '점자블록 훼손', '볼라드 간격', '어두운 길', '공사구간', '횡단 위험'];

const citizenRouteTones = [
  { letter: 'A', border: 'border-civic-200', bg: 'bg-civic-50', chip: 'bg-civic-100 text-civic-700', text: 'text-civic-700' },
  { letter: 'B', border: 'border-blue-100', bg: 'bg-white', chip: 'bg-blue-100 text-action-600', text: 'text-action-600' },
  { letter: 'C', border: 'border-rose-100', bg: 'bg-white', chip: 'bg-rose-100 text-rose-600', text: 'text-rose-600' },
];

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

function CitizenSafeRouteView() {
  const routes = routeOptions.slice(0, 3);
  const selectedReport = citizenReports[4] ?? citizenReports[0];

  return (
    <div className="min-h-[760px] rounded-[28px] bg-[#edf6fb] p-4">
      <div className="grid h-full min-h-[730px] gap-4 xl:grid-cols-[300px_minmax(0,1fr)_280px]">
        <section className="rounded-[20px] bg-white p-5 shadow-[0_18px_45px_rgba(33,91,145,0.08)]">
          <p className="text-[11px] font-black text-civic-700">시민 서비스 확장 · 웹지도</p>
          <h1 className="mt-1 text-[22px] font-black leading-7 text-navy-950">시민용 보행안전경로 안내</h1>
          <p className="mt-1 text-[11px] font-bold leading-5 text-slate-500">데이터 측정 이후 시민에게도 안전한 길을 비교해 안내합니다.</p>

          <div className="mt-5 rounded-[16px] border border-blue-100 bg-white p-4">
            <h2 className="text-[14px] font-black text-navy-950">경로 검색</h2>
            <div className="mt-3 space-y-2">
              <label className="relative block">
                <span className="sr-only">출발지</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-civic-600" aria-hidden="true" />
                <input value="부산역" readOnly className="h-10 w-full rounded-[12px] border border-blue-100 bg-slate-50 pl-9 pr-3 text-[12px] font-bold text-navy-950 outline-none focus:border-action-500 focus:ring-2 focus:ring-action-500/20" />
              </label>
              <label className="relative block">
                <span className="sr-only">도착지</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-action-600" aria-hidden="true" />
                <input value="초량이바구길" readOnly className="h-10 w-full rounded-[12px] border border-blue-100 bg-slate-50 pl-9 pr-3 text-[12px] font-bold text-navy-950 outline-none focus:border-action-500 focus:ring-2 focus:ring-action-500/20" />
              </label>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-[12px] font-black text-navy-950">사용자 유형</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {userTypes.slice(0, 5).map((type, index) => (
                <button key={type.id} type="button" className={`h-8 rounded-full border px-3 text-[11px] font-black ${index === 0 ? 'border-civic-200 bg-civic-50 text-civic-700' : 'border-blue-100 bg-white text-slate-600'}`}>
                  {type.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-[12px] font-black text-navy-950">경로 비교 결과</h2>
            <div className="mt-2 space-y-3">
              {routes.map((route, index) => {
                const tone = citizenRouteTones[index] ?? citizenRouteTones[1];

                return (
                  <article key={route.id} className={`rounded-[14px] border ${tone.border} ${tone.bg} p-3`}>
                    <div className="flex items-start gap-3">
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[12px] text-[12px] font-black ${tone.chip}`}>{tone.letter}</span>
                      <div className="min-w-0">
                        <h3 className="text-[13px] font-black leading-5 text-navy-950">{route.title}</h3>
                        <p className="mt-0.5 text-[11px] font-bold leading-4 text-slate-500">
                          {route.distance} · 평균 경사 {route.slope}
                        </p>
                        <p className={`mt-1 text-[11px] font-black ${tone.text}`}>
                          위험 {route.riskCount}곳 · 접근성 점수 {route.score}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="rounded-[20px] bg-white p-5 shadow-[0_18px_45px_rgba(33,91,145,0.08)]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-[18px] font-black leading-6 text-navy-950">웹 지도 경로 비교</h2>
              <p className="mt-1 text-[12px] font-bold leading-5 text-slate-500">빠른 길, 안전한 길, 계단 없는 길을 색상과 점선으로 비교합니다.</p>
            </div>
            <span className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-blue-100 bg-white px-3 text-[11px] font-black text-slate-600">
              <Smartphone className="h-4 w-4 text-civic-700" aria-hidden="true" />
              시민용
            </span>
          </div>

          <div className="relative mt-4 h-[calc(100%-76px)] min-h-[520px] overflow-hidden rounded-[18px] border border-blue-100 bg-blue-50">
            <img src={routeMapImage} alt="부산역에서 초량이바구길까지 시민 안전경로를 비교하는 mock 지도" className="h-full w-full object-fill" />
            <div className="absolute left-6 top-6 flex flex-wrap gap-2">
              {['휠체어 사용자', '계단 회피', '급경사 낮춤'].map((label, index) => (
                <span key={label} className={`rounded-full border px-4 py-2 text-[12px] font-black shadow-sm ${index === 0 ? 'border-civic-100 bg-civic-50 text-civic-700' : 'border-blue-100 bg-white text-civic-700'}`}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <aside className="rounded-[20px] bg-white p-5 shadow-[0_18px_45px_rgba(33,91,145,0.08)]">
          <h2 className="text-[16px] font-black text-navy-950">빠른 위험구간 제보</h2>
          <p className="mt-1 text-[11px] font-bold leading-5 text-slate-500">사진을 올리면 위치와 위험유형을 자동 기록합니다.</p>

          <div className="mt-5">
            <h3 className="text-[12px] font-black text-navy-950">위험유형 선택</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {citizenRiskTypes.map((type, index) => (
                <button key={type} type="button" className={`rounded-full px-3 py-1.5 text-[10px] font-black ${index === 0 ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-slate-600'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-[16px] border border-blue-100 bg-slate-50 p-4">
            <p className="text-[12px] font-black text-navy-950">자동 저장 정보</p>
            <p className="mt-2 text-[11px] font-bold leading-5 text-slate-500">
              위치: {selectedReport.location}
              <br />
              시간: {selectedReport.createdAt}
              <br />
              제보 신뢰도: {selectedReport.confidence}%
            </p>
          </div>

          <div className="mt-5 rounded-[16px] border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <Siren className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
              <p className="text-[11px] font-bold leading-5 text-amber-800">이 화면은 보행 위험 참고 안내이며 안전을 보장하지 않습니다.</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <button type="button" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-action-500 px-4 text-[12px] font-black text-white shadow-[0_12px_22px_rgba(36,119,255,0.26)] hover:bg-action-600">
              <Share2 className="h-4 w-4" aria-hidden="true" />
              위험구간 제보하기
            </button>
            <button type="button" className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-civic-200 bg-white px-4 text-[12px] font-black text-civic-700 hover:bg-civic-50">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              내 경로에 반영
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function AdminRoutesPage() {
  const { pathname } = useLocation();
  const recommendedRoute = routeOptions.find((route) => route.recommended) ?? routeOptions[1];

  if (pathname.endsWith('/safe-route')) {
    return <CitizenSafeRouteView />;
  }

  return (
    <div className="route-screen-fit grid h-[1060px] grid-rows-[78px_148px_minmax(0,1fr)] gap-4 overflow-hidden">
      <header className="flex items-start justify-between gap-5">
        <div className="min-w-0 pt-3">
          <p className="text-[12px] font-black leading-4 text-civic-700">환승점 · 시민이동 지도 서비스</p>
          <h1 className="mt-1 text-[34px] font-black leading-9 text-navy-950">무장애 경로 비교 화면</h1>
          <p className="mt-2 text-[13px] font-bold text-slate-500">
            부산역과 초량이바구길 사이의 보행 위험을 비교하고 접근성이 더 나은 길을 안내합니다.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-5">
          <label className="relative block">
            <span className="sr-only">지역, 위험유형, 리포트 검색</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="지역, 위험유형, 리포트 검색"
              className="h-12 w-[360px] rounded-full border border-blue-100 bg-white pl-11 pr-4 text-[13px] font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
            />
          </label>
          <button type="button" className="inline-flex h-12 items-center gap-2 rounded-full border border-blue-100 bg-white px-5 text-[13px] font-black text-navy-900 shadow-sm">
            부산광역시
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-action-500 px-6 text-[13px] font-black text-white shadow-[0_14px_24px_rgba(36,119,255,0.26)] hover:bg-action-600"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            경로 공유
          </button>
        </div>
      </header>

      <section className="grid min-h-0 grid-cols-4 gap-4" aria-label="무장애 경로 요약">
        {routeCards.map((card) => (
          <MetricCard key={card.title} card={card} />
        ))}
      </section>

      <section className="grid min-h-0 grid-cols-[minmax(0,1fr)_420px] gap-4">
        <article className="min-h-0 overflow-hidden rounded-[24px] border border-blue-100/70 bg-white p-4 shadow-[0_20px_45px_rgba(33,91,145,0.09)]">
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex items-start justify-between gap-4 px-1 pb-3">
              <div className="min-w-0">
                <h2 className="text-[18px] font-black leading-6 text-navy-950">부산역 → 초량이바구길 경로 시뮬레이터</h2>
                <p className="mt-1 text-[12px] font-bold text-slate-500">
                  보행 약자 유형과 목적지 접근성을 기준으로 후보 경로를 비교합니다.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap justify-end gap-2">
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

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[18px] bg-blue-50">
              <img src={routeMapImage} alt="부산역에서 초량이바구길까지 무장애 경로를 비교하는 mock 지도" className="h-full w-full object-fill" />
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
                  <h3 className="text-[13px] font-black text-navy-950">시민용 서비스로 확장 시 참고</h3>
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
