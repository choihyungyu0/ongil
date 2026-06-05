import { ChevronDown, Plus, Search } from 'lucide-react';
import { PriorityLeafletMap } from '../../components/maps/PriorityLeafletMap';
import {
  fieldSurveyAssignments,
  improvementPriorities,
  priorityDangerZones,
  riskSummary,
  type ImprovementStage,
  type PriorityDangerZone,
} from '../../data/mockData';

const filters = ['전체', '급경사', '계단·단차', '점자블록', '횡단보도'];

const statusTone: Record<PriorityDangerZone['status'], string> = {
  긴급: 'bg-rose-50 text-rose-500',
  검토: 'bg-orange-50 text-orange-500',
  접수: 'bg-blue-50 text-action-600',
  예정: 'bg-emerald-50 text-civic-700',
  모니터링: 'bg-slate-100 text-slate-500',
};

const stageTone: Record<ImprovementStage, string> = {
  '검토 대기': 'bg-slate-100 text-slate-600',
  '예산 협의': 'bg-blue-50 text-action-600',
  '공사 진행': 'bg-orange-50 text-orange-600',
  완료: 'bg-emerald-50 text-civic-700',
};

const criteria = [
  {
    title: '접근성 점수',
    description: '경사도, 계단, 단차, 노면상태, 점자블록, 횡단보도 안전성 반영',
  },
  {
    title: '중복 제보 수',
    description: '같은 위치·유형 제보를 병합해 반복 민원 가능성 확인',
  },
  {
    title: '개선 필요도',
    description: '행정 담당자가 바로 예산 우선순위를 볼 수 있도록 점수화',
  },
];

function riskTone(label: string) {
  if (label.includes('급경사')) return 'bg-rose-50 text-rose-500';
  if (label.includes('계단') || label.includes('단차')) return 'bg-orange-50 text-orange-500';
  if (label.includes('점자')) return 'bg-violet-50 text-violet-500';
  if (label.includes('횡단')) return 'bg-blue-50 text-action-600';
  if (label.includes('야간')) return 'bg-slate-100 text-slate-500';
  if (label.includes('볼라드')) return 'bg-purple-50 text-purple-500';
  return 'bg-civic-50 text-civic-700';
}

function scoreTone(score: number) {
  if (score <= 50) return 'text-rose-500';
  if (score <= 60) return 'text-orange-500';
  return 'text-civic-600';
}

function needTone(value: number) {
  if (value >= 82) return 'bg-[#ff6b3d]';
  if (value >= 64) return 'bg-[#f6a400]';
  return 'bg-civic-500';
}

function PriorityRow({ zone }: { zone: PriorityDangerZone }) {
  return (
    <tr className="h-[46px] border-b border-slate-100 align-middle last:border-b-0 lg:h-[44px]">
      <td className="px-2 text-center text-[11px] font-black text-slate-600">{zone.rank}</td>
      <td className="px-2">
        <p className="truncate text-[12px] font-black text-navy-950">{zone.name}</p>
      </td>
      <td className="px-2">
        <p className="truncate text-[11px] font-extrabold text-slate-500">{zone.location}</p>
      </td>
      <td className="px-2">
        <div className="flex flex-wrap gap-1">
          {zone.risks.map((risk) => (
            <span key={risk} className={`rounded-full px-2 py-0.5 text-[10px] font-black ${riskTone(risk)}`}>
              {risk}
            </span>
          ))}
        </div>
      </td>
      <td className={`px-2 text-center text-[18px] font-black ${scoreTone(zone.accessScore)}`}>{zone.accessScore}</td>
      <td className="px-2 text-center text-[12px] font-black text-slate-600">{zone.duplicateReports}건</td>
      <td className="px-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100" aria-label={`${zone.name} 개선 필요도 ${zone.improvementNeed}%`}>
          <span className={`block h-full rounded-full ${needTone(zone.improvementNeed)}`} style={{ width: `${zone.improvementNeed}%` }} />
        </div>
      </td>
      <td className="px-2 text-center">
        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-black ${statusTone[zone.status]}`}>{zone.status}</span>
      </td>
    </tr>
  );
}

function PriorityCard({ zone }: { zone: PriorityDangerZone }) {
  return (
    <article className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[11px] font-black text-navy-900 shadow-sm">
            {zone.rank}
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-[13px] font-black text-navy-950">{zone.name}</strong>
            <span className="mt-0.5 block truncate text-[11px] font-bold text-slate-500">{zone.location}</span>
          </span>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${statusTone[zone.status]}`}>{zone.status}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {zone.risks.map((risk) => (
          <span key={risk} className={`rounded-full px-2 py-0.5 text-[10px] font-black ${riskTone(risk)}`}>
            {risk}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-[54px_54px_minmax(0,1fr)] items-center gap-3">
        <span>
          <span className="block text-[10px] font-black text-slate-400">접근성</span>
          <strong className={`text-[17px] font-black ${scoreTone(zone.accessScore)}`}>{zone.accessScore}</strong>
        </span>
        <span>
          <span className="block text-[10px] font-black text-slate-400">중복 제보</span>
          <strong className="text-[13px] font-black text-navy-900">{zone.duplicateReports}건</strong>
        </span>
        <span>
          <span className="block text-[10px] font-black text-slate-400">개선 필요도</span>
          <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-white">
            <span className={`block h-full rounded-full ${needTone(zone.improvementNeed)}`} style={{ width: `${zone.improvementNeed}%` }} />
          </span>
        </span>
      </div>
    </article>
  );
}

function ActionQueuePanel() {
  return (
    <section className="zones-bottom-card flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-blue-100/70 bg-white p-4 shadow-[0_16px_36px_rgba(33,91,145,0.08)] lg:min-h-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-black text-navy-950">개선 우선순위 큐</h2>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-black text-action-600">5개 과제</span>
      </div>
      <div className="mt-2.5 grid flex-1 auto-rows-fr gap-1.5">
        {improvementPriorities.slice(0, 5).map((item, index) => (
          <article key={item.id} className="grid grid-cols-[26px_minmax(0,1fr)_84px] items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-1.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-black text-navy-900 shadow-sm">{index + 1}</span>
            <span className="min-w-0">
              <strong className="block truncate text-[12px] font-black text-navy-950">{item.area}</strong>
              <span className="mt-0.5 block truncate text-[11px] font-bold text-slate-500">{item.action}</span>
            </span>
            <span className={`justify-self-end rounded-full px-2.5 py-1 text-[10px] font-black ${stageTone[item.stage]}`}>{item.stage}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function RiskDistributionPanel() {
  return (
    <section className="zones-bottom-card flex min-h-[360px] flex-col rounded-2xl border border-blue-100/70 bg-white p-4 shadow-[0_16px_36px_rgba(33,91,145,0.08)] lg:min-h-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-black text-navy-950">위험유형별 개선 필요도</h2>
        <span className="text-[11px] font-black text-slate-400">최근 제보 기준</span>
      </div>
      <div className="mt-4 flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-3">
          {riskSummary.map((risk) => (
            <div key={risk.label}>
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span className="text-[12px] font-black text-navy-900">{risk.label}</span>
                <span className="text-[11px] font-black text-slate-500">{risk.count}건 · {risk.value}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <span className={`block h-full rounded-full ${needTone(risk.value)}`} style={{ width: `${risk.value}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            ['긴급', '2구간', 'text-rose-500 bg-rose-50'],
            ['검토', '3구간', 'text-orange-600 bg-orange-50'],
            ['접수', '2구간', 'text-action-600 bg-blue-50'],
          ].map(([label, value, tone]) => (
            <div key={label} className={`rounded-xl px-3 py-2 ${tone}`}>
              <p className="text-[10px] font-black">{label}</p>
              <strong className="mt-1 block text-[17px] font-black leading-none">{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FieldSchedulePanel() {
  return (
    <section className="zones-bottom-card flex min-h-[360px] flex-col rounded-2xl border border-blue-100/70 bg-white p-4 shadow-[0_16px_36px_rgba(33,91,145,0.08)] lg:min-h-0">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-black text-navy-950">현장 확인 일정</h2>
        <span className="rounded-full bg-civic-50 px-3 py-1 text-[11px] font-black text-civic-700">다음 주</span>
      </div>
      <div className="mt-3 grid flex-1 auto-rows-fr gap-3">
        {fieldSurveyAssignments.map((survey) => (
          <article key={survey.id} className="rounded-xl border border-cyan-100 bg-civic-50/60 px-3 py-3">
            <div className="flex items-start justify-between gap-3">
              <span className="min-w-0">
                <strong className="block truncate text-[12px] font-black text-navy-950">{survey.area}</strong>
                <span className="mt-1 block text-[11px] font-bold text-slate-500">{survey.inspector} · {survey.date}</span>
              </span>
              <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-black text-civic-700 shadow-sm">{survey.id}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {survey.focus.map((item) => (
                <span key={item} className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-slate-500">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ZonesPage() {
  return (
    <div className="zones-screen-fit flex flex-col gap-3">
      <header className="flex shrink-0 flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 pt-0.5">
          <p className="text-[11px] font-black leading-3 text-civic-700">PC 환경 · 위험구간 우선순위</p>
          <h1 className="text-[27px] font-black leading-8 tracking-normal text-navy-950">위험구간 TOP 10 관리</h1>
          <p className="text-[12px] font-semibold leading-5 text-slate-500">
            접근성 점수, 중복 제보 수, 개선 필요도를 기준으로 우선순위를 정리합니다.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto] lg:w-auto lg:flex lg:flex-nowrap lg:items-center lg:pt-3">
          <label className="relative block min-w-0">
            <span className="sr-only">지역, 위험유형, 리포트 검색</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="지역, 위험유형, 리포트 검색"
              className="h-9 w-full rounded-xl border border-blue-100 bg-white pl-9 pr-3 text-[11px] font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20 lg:w-[230px]"
            />
          </label>
          <button type="button" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-blue-100 bg-white px-3 text-[11px] font-black text-navy-800 shadow-sm">
            부산광역시
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
          </button>
          <button type="button" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-action-500 px-3.5 text-[11px] font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.25)] hover:bg-action-600">
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            선택 리포트 추가
          </button>
        </div>
      </header>

      <section className="zones-top-grid grid gap-3 lg:grid-cols-[minmax(0,1fr)_clamp(330px,22vw,400px)]">
        <div className="zones-fill-card flex min-h-[560px] flex-col rounded-2xl border border-blue-100/70 bg-white px-4 py-4 shadow-[0_16px_36px_rgba(33,91,145,0.08)] lg:min-h-0">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-black text-navy-950">위험구간 TOP 10 우선순위</h2>
            <div className="flex flex-wrap justify-end gap-1.5">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={[
                    'h-7 rounded-full border px-3 text-[10px] font-black transition',
                    index === 0 ? 'border-civic-100 bg-civic-50 text-civic-700' : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200',
                  ].join(' ')}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 space-y-2 sm:hidden">
            {priorityDangerZones.map((zone) => (
              <PriorityCard key={zone.id} zone={zone} />
            ))}
          </div>

          <div className="mt-3 hidden flex-1 overflow-x-auto overflow-y-visible sm:block">
            <table className="w-full min-w-[820px] table-fixed text-left">
              <colgroup>
                <col className="w-[34px]" />
                <col className="w-[126px]" />
                <col className="w-[104px]" />
                <col className="w-[138px]" />
                <col className="w-[56px]" />
                <col className="w-[56px]" />
                <col className="w-[74px]" />
                <col className="w-[62px]" />
              </colgroup>
              <thead>
                <tr className="h-9 border-b border-slate-100 text-[10px] font-black text-slate-400">
                  <th className="px-2 text-center">순위</th>
                  <th className="px-2">위험구간</th>
                  <th className="px-2">위치</th>
                  <th className="px-2">주요 위험유형</th>
                  <th className="px-2 text-center">접근성 점수</th>
                  <th className="px-2 text-center">중복 제보</th>
                  <th className="px-2">개선 필요도</th>
                  <th className="px-2 text-center">상태</th>
                </tr>
              </thead>
              <tbody>
                {priorityDangerZones.map((zone) => (
                  <PriorityRow key={zone.id} zone={zone} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="zones-fill-card flex min-h-[520px] flex-col rounded-2xl border border-blue-100/70 bg-white p-3 shadow-[0_16px_36px_rgba(33,91,145,0.08)] lg:min-h-0">
          <h2 className="px-1 text-base font-black text-navy-950">우선순위 분포</h2>
          <div className="mt-2 h-[280px] shrink-0 lg:h-[248px] 2xl:h-[260px]">
            <PriorityLeafletMap />
          </div>

          <div className="mt-3 shrink-0 px-1">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-black text-navy-950">개선 판단 기준</h3>
              <span className="text-[10px] font-black text-slate-300">On-gil Score</span>
            </div>
            <ol className="mt-3 space-y-2.5">
              {criteria.map((criterion, index) => (
                <li key={criterion.title} className="grid grid-cols-[26px_minmax(0,1fr)] gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-civic-100 text-[11px] font-black text-civic-700">
                    {index + 1}
                  </span>
                  <span>
                    <strong className="block text-[12px] font-black text-navy-900">{criterion.title}</strong>
                    <span className="mt-0.5 block text-[11px] font-bold leading-4 text-slate-500">{criterion.description}</span>
                  </span>
                </li>
              ))}
            </ol>
            <button type="button" className="mt-3 h-10 w-full rounded-xl bg-action-500 text-[12px] font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.25)] hover:bg-action-600">
              선택 구간 상세보기
            </button>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ['긴급', '2'],
                ['검토', '3'],
                ['접수', '2'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 px-2 py-2 text-center">
                  <p className="text-[10px] font-black text-slate-400">{label}</p>
                  <strong className="mt-1 block text-[16px] font-black leading-none text-navy-950">{value}건</strong>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="zones-bottom-grid grid items-stretch gap-3 lg:flex-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,0.9fr)]">
        <ActionQueuePanel />
        <RiskDistributionPanel />
        <FieldSchedulePanel />
      </section>
    </div>
  );
}
