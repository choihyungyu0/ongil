import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Download,
  Search,
  Sparkles,
} from 'lucide-react';
import priorityMapImage from '../../../asset/d44ecfd2-03aa-4757-97ae-169a227f42ac.png';
import { improvementPriorities, priorityDangerZones, type PriorityDangerZone } from '../../data/mockData';

const filters = ['전체', '긴급', '검토', '조치 예정', '완료'];

const audienceByRank = [
  '휠체어·유모차',
  '관광약자',
  '시각장애인',
  '고령자·관광객',
  '휠체어·보행약자',
  '고령자',
  '시각장애인·고령자',
  '관광약자',
  '유모차 동반',
  '관광약자',
];

const nextSteps = ['현장조사', '예산 검토', '공사 예정', '우선 검토', '기관 협의', '모니터링', '조치 예정'];
const owners = ['도로관리팀', '관광시설팀', '복지정책팀', '교통행정팀', '생활안전팀', '도시정비팀'];

const summaryCards = [
  { label: '긴급 보수', value: '8', caption: '90% 이상', tone: 'text-rose-500' },
  { label: '검토 후보', value: '21', caption: '60-89%', tone: 'text-action-600' },
  { label: '조치 예정', value: '15', caption: '담당 배정', tone: 'text-civic-600' },
  { label: '완료 예정', value: '32', caption: '올해 누적', tone: 'text-navy-950' },
];

const processItems = [
  { label: '현장조사', value: 18, width: '84%', tone: 'bg-action-500' },
  { label: '예산 검토', value: 12, width: '62%', tone: 'bg-orange-400' },
  { label: '공사 예정', value: 9, width: '48%', tone: 'bg-civic-500' },
  { label: '기관 협의', value: 7, width: '38%', tone: 'bg-rose-400' },
];

function riskTone(label: string) {
  if (label.includes('급경사')) return 'bg-rose-50 text-rose-500';
  if (label.includes('계단') || label.includes('단차')) return 'bg-orange-50 text-orange-500';
  if (label.includes('점자')) return 'bg-violet-50 text-violet-500';
  if (label.includes('횡단')) return 'bg-blue-50 text-action-600';
  if (label.includes('볼라드')) return 'bg-purple-50 text-purple-500';
  return 'bg-civic-50 text-civic-700';
}

function statusTone(status: PriorityDangerZone['status']) {
  if (status === '긴급') return 'bg-rose-50 text-rose-500';
  if (status === '검토') return 'bg-orange-50 text-orange-500';
  if (status === '접수') return 'bg-blue-50 text-action-600';
  if (status === '예정') return 'bg-emerald-50 text-civic-700';
  return 'bg-slate-100 text-slate-500';
}

function needTone(value: number) {
  if (value >= 82) return 'bg-[#ff6b3d]';
  if (value >= 64) return 'bg-[#ff9f1c]';
  return 'bg-[#0ea5e9]';
}

function difficultyTone(value: number) {
  if (value >= 80) return 'text-rose-500 bg-rose-50';
  if (value >= 64) return 'text-orange-500 bg-orange-50';
  return 'text-action-600 bg-blue-50';
}

function PriorityRow({ zone, index }: { zone: PriorityDangerZone; index: number }) {
  const linkedPriority = improvementPriorities[index % improvementPriorities.length];
  const difficulty = Math.max(42, Math.min(92, zone.improvementNeed - 8 + index * 3));

  return (
    <article className="grid h-[72px] grid-cols-[minmax(220px,1.45fr)_112px_126px_130px_96px_120px_104px] items-center gap-3 border-b border-slate-100 px-4 last:border-b-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-950 text-[11px] font-black text-white">
            {zone.rank}
          </span>
          <strong className="truncate text-[13px] font-black text-navy-950">{zone.name}</strong>
        </div>
        <p className="mt-1 truncate pl-8 text-[11px] font-semibold text-slate-500">{linkedPriority.action}</p>
      </div>
      <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-black ${riskTone(zone.risks[0])}`}>{zone.risks[0]}</span>
      <span className="truncate text-[11px] font-black text-slate-600">{audienceByRank[index]}</span>
      <div>
        <div className="flex items-center justify-between text-[10px] font-black">
          <span className="text-slate-400">필요도</span>
          <span className="text-navy-900">{zone.improvementNeed}%</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
          <span className={`block h-full rounded-full ${needTone(zone.improvementNeed)}`} style={{ width: `${zone.improvementNeed}%` }} />
        </div>
      </div>
      <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-black ${difficultyTone(difficulty)}`}>{difficulty}%</span>
      <span className="truncate text-[11px] font-black text-slate-600">{owners[index % owners.length]}</span>
      <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-black ${statusTone(zone.status)}`}>
        {nextSteps[index % nextSteps.length]}
      </span>
    </article>
  );
}

function SummaryPanel() {
  return (
    <section className="min-h-0 overflow-hidden rounded-2xl border border-blue-100/70 bg-white p-3.5 shadow-[0_16px_36px_rgba(33,91,145,0.08)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black text-navy-950">예산 우선순위 요약</h2>
        <span className="text-[10px] font-black text-slate-400">현재·사고 예방</span>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        {summaryCards.map((card) => (
          <article key={card.label} className="rounded-[14px] border border-slate-100 bg-slate-50/70 px-4 py-2">
            <p className="text-[11px] font-black text-slate-500">{card.label}</p>
            <strong className={`mt-1 block text-[26px] font-black leading-none ${card.tone}`}>{card.value}</strong>
            <span className="mt-1 block text-[10px] font-bold text-slate-400">{card.caption}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function MapPanel() {
  return (
    <section className="flex min-h-0 flex-col rounded-2xl border border-blue-100/70 bg-white p-4 shadow-[0_16px_36px_rgba(33,91,145,0.08)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black text-navy-950">개선 후보 위치</h2>
        <Sparkles className="h-4 w-4 text-action-600" aria-hidden="true" />
      </div>
      <div className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-[14px] bg-blue-50">
        <img src={priorityMapImage} alt="부산 개선 후보 위치 mock 지도" className="h-full w-full object-cover" />
      </div>
    </section>
  );
}

function ProcessPanel() {
  return (
    <section className="grid min-h-0 grid-cols-[1fr_1fr] gap-3 overflow-hidden">
      <div className="min-h-0 overflow-hidden rounded-2xl border border-blue-100/70 bg-white px-4 py-3 shadow-[0_16px_36px_rgba(33,91,145,0.08)]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-navy-950">진행 단계</h2>
          <ClipboardList className="h-4 w-4 text-civic-600" aria-hidden="true" />
        </div>
        <div className="mt-3 space-y-2">
          {processItems.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-[10px] font-black">
                <span className="text-slate-600">{item.label}</span>
                <span className="text-navy-950">{item.value}건</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <span className={`block h-full rounded-full ${item.tone}`} style={{ width: item.width }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="min-h-0 overflow-hidden rounded-2xl border border-blue-100/70 bg-white px-4 py-3 shadow-[0_16px_36px_rgba(33,91,145,0.08)]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-navy-950">검토 메모</h2>
          <CheckCircle2 className="h-4 w-4 text-action-600" aria-hidden="true" />
        </div>
        <ul className="mt-3 space-y-2 text-[10px] font-bold leading-4 text-slate-600">
          <li className="rounded-xl bg-slate-50 px-3 py-2">초량이바구길 급경사는 우회 동선 검토가 우선입니다.</li>
          <li className="rounded-xl bg-slate-50 px-3 py-2">부산역 점자블록 훼손은 현장조사 배정이 필요합니다.</li>
        </ul>
      </div>
    </section>
  );
}

export function PriorityManagementPage() {
  return (
    <div
      data-page="priority-management"
      className="flex min-h-[760px] flex-col gap-3 overflow-hidden"
      style={{ height: 'calc(56.25vw - 8px)' }}
    >
      <header className="flex h-[76px] shrink-0 items-start justify-between gap-4 pt-3">
        <div className="min-w-0">
          <p className="text-[11px] font-black leading-4 text-civic-700">PC 환경 · 개선 우선순위</p>
          <h1 className="text-[30px] font-black leading-8 tracking-tight text-navy-950">개선사업 우선순위 관리</h1>
          <p className="mt-1 text-[12px] font-semibold text-slate-500">주요 개선사업 후보를 접근성 점수와 제보 데이터를 기준으로 검토합니다.</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <label className="relative block">
            <span className="sr-only">지역, 위험유형, 리포트 검색</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="지역, 위험유형, 리포트 검색"
              className="h-11 w-[360px] rounded-2xl border border-blue-100 bg-white pl-10 pr-4 text-xs font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
            />
          </label>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-xs font-black text-navy-800 shadow-sm">
            부산광역시
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-action-500 px-4 text-xs font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.25)] hover:bg-action-600">
            <Download className="h-4 w-4" aria-hidden="true" />
            우선순위 확정
          </button>
        </div>
      </header>

      <section className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_430px] gap-4">
        <section className="flex min-h-0 flex-col rounded-2xl border border-blue-100/70 bg-white shadow-[0_16px_36px_rgba(33,91,145,0.08)]">
          <div className="flex h-[66px] shrink-0 items-center justify-between gap-4 border-b border-blue-50 px-5">
            <div>
              <h2 className="text-lg font-black text-navy-950">개선사업 우선순위 후보</h2>
              <p className="mt-1 text-[11px] font-semibold text-slate-500">상태는 mock 행정 프로세스 기준이며 실제 확정 데이터가 아닙니다.</p>
            </div>
            <div className="flex items-center gap-1.5">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={[
                    'h-8 rounded-full border px-3 text-[10px] font-black transition',
                    index === 0 ? 'border-civic-100 bg-civic-50 text-civic-700' : 'border-slate-100 bg-white text-slate-500 hover:border-blue-200',
                  ].join(' ')}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid h-10 shrink-0 grid-cols-[minmax(220px,1.45fr)_112px_126px_130px_96px_120px_104px] items-center gap-3 border-b border-slate-100 px-4 text-[10px] font-black text-slate-400">
            <span className="pl-8">사업 후보</span>
            <span>위험유형</span>
            <span>영향 사용자</span>
            <span>개선 필요도</span>
            <span>예상 난이도</span>
            <span>담당</span>
            <span>다음 단계</span>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            {priorityDangerZones.map((zone, index) => (
              <PriorityRow key={zone.id} zone={zone} index={index} />
            ))}
          </div>

          <div className="grid h-[78px] shrink-0 grid-cols-3 gap-3 border-t border-blue-50 bg-slate-50/60 px-5 py-3">
            {[
              ['평균 개선 필요도', '68%', '중복 제보와 접근성 점수 반영'],
              ['예산 검토 후보', '21건', '올해 검토 테이블 등록'],
              ['다음 현장조사', '6건', '동구·사하구 우선 배정'],
            ].map(([label, value, caption]) => (
              <article key={label} className="rounded-xl bg-white px-4 py-2">
                <p className="text-[10px] font-black text-slate-400">{label}</p>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <strong className="text-[20px] font-black leading-none text-navy-950">{value}</strong>
                  <span className="truncate text-[10px] font-bold text-slate-500">{caption}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="grid min-h-0 grid-rows-[238px_minmax(0,1fr)_214px] gap-4">
          <SummaryPanel />
          <MapPanel />
          <ProcessPanel />
        </aside>
      </section>

      <div
        data-role="priority-footer"
        className="flex h-9 shrink-0 items-center justify-between rounded-2xl border border-blue-100/70 bg-white px-5 text-[11px] font-black text-slate-500 shadow-[0_10px_22px_rgba(33,91,145,0.06)]"
      >
        <span>온길 점수는 접근성 점수, 중복 제보, 취약 이용자 영향도를 합산한 mock 우선순위입니다.</span>
        <span className="inline-flex items-center gap-1 text-action-600">
          세부 후보 보기
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
