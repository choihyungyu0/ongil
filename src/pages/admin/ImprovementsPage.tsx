import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  MapPin,
  Plus,
  Search,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import busPhoto from '../../../asset/cb44152e-dc52-498f-9458-c1f065adf032.png';
import crosswalkPhoto from '../../../asset/14e56490-f811-47a9-bdb1-636acd93ef85.png';
import pavingPhoto from '../../../asset/e91ea794-0169-4191-8d4c-8af82a270a34.png';
import rootPhoto from '../../../asset/0bd632c8-4f8d-4080-a65e-2a44c8e049ac.png';
import slopePhoto from '../../../asset/713a0cc0-a10a-4384-b5d8-ae8bd1aaf433.png';
import tactilePhoto from '../../../asset/166ffa68-77be-40bf-8119-1a42895f7ecc.png';
import bollardPhoto from '../../../asset/d47adf62-6bb4-40fc-9b06-213e50e59d14.png';
import { improvementPriorities, type ImprovementStage } from '../../data/mockData';

type ImprovementItem = (typeof improvementPriorities)[number];

const columns: Array<{
  stage: ImprovementStage;
  caption: string;
  accent: string;
}> = [
  { stage: '검토 대기', caption: '제보 검토 및 현장 확인', accent: 'bg-slate-400' },
  { stage: '예산 협의', caption: '구·군 예산 배정 협의', accent: 'bg-orange-400' },
  { stage: '공사 진행', caption: '시공 및 현장 점검', accent: 'bg-action-500' },
  { stage: '완료', caption: '정비 완료 후 모니터링', accent: 'bg-civic-500' },
];

const detailSteps = ['접수', '확인', '설계', '공사', '완료'] as const;

const metricToneClasses = {
  blue: 'bg-blue-50 text-action-600',
  cyan: 'bg-civic-50 text-civic-700',
  orange: 'bg-orange-50 text-orange-500',
  slate: 'bg-slate-100 text-slate-600',
};

const stageBarTone: Record<ImprovementStage, string> = {
  '검토 대기': 'bg-slate-400',
  '예산 협의': 'bg-orange-400',
  '공사 진행': 'bg-action-500',
  완료: 'bg-civic-500',
};

const imageById: Record<string, string> = {
  'I-129': rootPhoto,
  'I-130': busPhoto,
  'I-128': slopePhoto,
  'I-124': crosswalkPhoto,
  'I-126': pavingPhoto,
  'I-125': bollardPhoto,
  'I-121': tactilePhoto,
};

function statusTone(label: string) {
  if (label.includes('완료')) return 'bg-civic-50 text-civic-700';
  if (label.includes('필요')) return 'bg-orange-50 text-orange-500';
  return 'bg-blue-50 text-action-600';
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
  caption,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  caption: string;
  tone: keyof typeof metricToneClasses;
}) {
  return (
    <section className="rounded-[18px] border border-blue-100/80 bg-white p-4 shadow-[0_14px_30px_rgba(33,91,145,0.07)]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-black text-slate-400">{label}</p>
          <p className="mt-1 text-[22px] font-black leading-7 text-navy-950">{value}</p>
        </div>
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[12px] ${metricToneClasses[tone]}`}>
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-2 truncate text-[11px] font-bold text-slate-500">{caption}</p>
    </section>
  );
}

function StageCard({
  item,
  active,
  onSelect,
}: {
  item: ImprovementItem;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={[
        'group w-full rounded-[16px] border bg-white p-3 text-left shadow-[0_14px_30px_rgba(33,91,145,0.08)] transition sm:p-3.5',
        active ? 'border-action-500 ring-2 ring-action-500/20' : 'border-blue-100/80 hover:-translate-y-0.5 hover:border-blue-200',
      ].join(' ')}
    >
      <div className="h-[112px] overflow-hidden rounded-[12px] bg-slate-100 sm:h-[118px] 2xl:h-[108px]">
        <img
          src={imageById[item.id] ?? rootPhoto}
          alt={`${item.area} ${item.action} mock 현장 사진`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-3 min-w-0">
        <h3 className="truncate text-[14px] font-black leading-5 text-navy-950">{item.area}</h3>
        <p className="mt-0.5 truncate text-[11px] font-bold text-slate-500">{item.action}</p>
        <p className="mt-2 line-clamp-2 min-h-[32px] text-[11px] font-semibold leading-4 text-slate-500">{item.impact}</p>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between gap-2 text-[10px] font-black">
          <span className="text-slate-400">진행률</span>
          <span className="text-navy-950">{item.progress}%</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-action-500" style={{ width: `${item.progress}%` }} />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black text-action-600">{item.id}</span>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${statusTone(item.urgency)}`}>{item.urgency}</span>
      </div>
    </button>
  );
}

function DetailPanel({ item }: { item: ImprovementItem }) {
  const progress = Math.max(0, Math.min(100, item.progress));

  return (
    <section className="flex min-h-0 flex-col rounded-[20px] border border-blue-100/80 bg-white p-4 shadow-[0_18px_45px_rgba(33,91,145,0.10)] sm:p-5 xl:h-full">
      <div className="min-w-0">
        <p className="text-[11px] font-black text-civic-700">선택 개선안 상세</p>
        <h2 className="mt-1 text-[22px] font-black leading-7 text-navy-950">{item.area}</h2>
        <p className="mt-1 text-[12px] font-semibold leading-5 text-slate-500">{item.action}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-black">
        <span className="rounded-full bg-slate-50 px-3 py-1.5 text-slate-600">{item.district}</span>
        <span className="rounded-full bg-civic-50 px-3 py-1.5 text-civic-700">{item.targetUser}</span>
        <span className={`rounded-full px-3 py-1.5 ${statusTone(item.urgency)}`}>{item.urgency}</span>
      </div>

      <div className="mt-5 rounded-[16px] bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black text-slate-400">예상 개선 온길 점수</p>
            <p className="mt-1 text-[22px] font-black leading-7 text-navy-950">{progress}%</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-action-600 shadow-sm">{item.id}</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white">
          <div className="h-full rounded-full bg-action-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {detailSteps.map((step, index) => {
          const stepProgress = index * 25;
          const complete = progress >= stepProgress;
          const current = progress === 100 ? index === detailSteps.length - 1 : progress >= stepProgress && progress < stepProgress + 25;
          const stateLabel = current ? '진행 중' : complete ? '완료됨' : '대기';

          return (
            <div key={step} className="flex items-center gap-3">
              <span
                className={[
                  'grid h-8 w-8 shrink-0 place-items-center rounded-full border-4 text-[10px] font-black shadow-sm',
                  complete ? 'border-blue-100 bg-action-500 text-white' : 'border-slate-100 bg-slate-200 text-slate-500',
                  current ? 'ring-4 ring-orange-100' : '',
                ].join(' ')}
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className={complete ? 'text-[12px] font-black text-navy-950' : 'text-[12px] font-black text-slate-400'}>{step}</p>
                <p className="mt-0.5 text-[10px] font-bold text-slate-400">{stateLabel}</p>
              </div>
            </div>
          );
        })}
      </div>

      <dl className="mt-5 grid gap-3 rounded-[16px] bg-slate-50 p-4 sm:grid-cols-3 xl:grid-cols-1">
        <div>
          <dt className="text-[10px] font-black text-slate-400">담당 부서</dt>
          <dd className="mt-1 truncate text-[12px] font-black text-navy-950">{item.owner}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-black text-slate-400">예상 예산</dt>
          <dd className="mt-1 text-[12px] font-black text-navy-950">{item.budget}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-black text-slate-400">일정</dt>
          <dd className="mt-1 text-[12px] font-black text-navy-950">{item.due}</dd>
        </div>
      </dl>

      <div className="mt-5 rounded-[16px] border border-cyan-100 bg-civic-50/70 p-4">
        <p className="text-[11px] font-black text-civic-700">검토 포인트</p>
        <p className="mt-2 text-[12px] font-semibold leading-5 text-slate-600">{item.impact}</p>
      </div>

      <div className="mt-auto pt-5">
        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[14px] bg-action-500 px-4 text-[12px] font-black text-white shadow-[0_10px_22px_rgba(36,119,255,0.28)] hover:bg-action-600"
        >
          <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
          행정 검토 요청
        </button>
      </div>
    </section>
  );
}

function ExecutionQueue({
  items,
  selectedId,
  onSelect,
}: {
  items: ImprovementItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const queueItems = [...items].sort((a, b) => a.progress - b.progress).slice(0, 4);

  return (
    <section className="rounded-[20px] border border-blue-100/80 bg-white p-4 shadow-[0_14px_30px_rgba(33,91,145,0.07)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-black text-civic-700">이번 주 실행 큐</p>
          <h2 className="mt-1 text-[17px] font-black leading-6 text-navy-950">확인이 필요한 개선안</h2>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-action-600">우선 검토</span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        {queueItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={[
              'rounded-[14px] border p-3 text-left transition',
              item.id === selectedId ? 'border-action-500 bg-blue-50/60' : 'border-blue-100/80 bg-slate-50 hover:border-blue-200 hover:bg-white',
            ].join(' ')}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-black text-navy-950">{item.area}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.owner}</span>
                </p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black ${statusTone(item.urgency)}`}>{item.urgency}</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 text-[10px] font-black text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                {item.due}
              </span>
              <span>{item.progress}%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full rounded-full bg-action-500" style={{ width: `${item.progress}%` }} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function StageSummaryPanel({ itemsByStage }: { itemsByStage: Record<ImprovementStage, ImprovementItem[]> }) {
  const total = improvementPriorities.length;

  return (
    <section className="rounded-[20px] border border-blue-100/80 bg-white p-4 shadow-[0_14px_30px_rgba(33,91,145,0.07)]">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-civic-50 text-civic-700">
          <BarChart3 className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[11px] font-black text-civic-700">단계별 현황</p>
          <h2 className="text-[17px] font-black leading-6 text-navy-950">작업 분포</h2>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {columns.map((column) => {
          const count = itemsByStage[column.stage].length;
          const percent = total > 0 ? Math.round((count / total) * 100) : 0;

          return (
            <div key={column.stage}>
              <div className="flex items-center justify-between gap-3 text-[11px] font-black">
                <span className="text-navy-950">{column.stage}</span>
                <span className="text-slate-500">{count}건</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${stageBarTone[column.stage]}`} style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-1 text-[10px] font-bold text-slate-400">{column.caption}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ImprovementsPage() {
  const [selectedId, setSelectedId] = useState(improvementPriorities[0].id);
  const selected = improvementPriorities.find((item) => item.id === selectedId) ?? improvementPriorities[0];
  const itemsByStage = useMemo(
    () =>
      columns.reduce(
        (acc, column) => ({
          ...acc,
          [column.stage]: improvementPriorities.filter((item) => item.stage === column.stage),
        }),
        {} as Record<ImprovementStage, ImprovementItem[]>,
      ),
    [],
  );
  const activeCount = improvementPriorities.filter((item) => item.stage !== '완료').length;
  const averageProgress = Math.round(improvementPriorities.reduce((sum, item) => sum + item.progress, 0) / improvementPriorities.length);
  const totalBudget = improvementPriorities.reduce((sum, item) => sum + Number.parseFloat(item.budget), 0).toFixed(1);

  return (
    <div data-page="improvements" className="flex min-h-0 flex-col gap-4 overflow-visible xl:h-[calc(100vh-20px)] xl:overflow-hidden">
      <header className="grid shrink-0 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
        <div className="min-w-0">
          <p className="text-[11px] font-black leading-4 text-civic-700">사업 계획 · 실행관리</p>
          <h1 className="text-[24px] font-black leading-8 text-navy-950 sm:text-[30px] sm:leading-9">개선사업 진행현황 트래커</h1>
          <p className="mt-1 text-[12px] font-semibold leading-5 text-slate-500">
            위험구간의 검토·예산·공사·완료 단계를 한 화면에서 추적합니다.
          </p>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-[minmax(220px,1fr)_auto_auto] lg:w-auto lg:grid-cols-[360px_auto_auto]">
          <label className="relative block min-w-0">
            <span className="sr-only">지역, 위험유형, 리포트 검색</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="지역, 위험유형, 리포트 검색"
              className="h-11 w-full rounded-[14px] border border-blue-100 bg-white pl-10 pr-4 text-[12px] font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
            />
          </label>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[14px] border border-blue-100 bg-white px-4 text-[12px] font-black text-navy-800 shadow-sm"
          >
            부산광역시
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[14px] bg-action-500 px-4 text-[12px] font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.24)] hover:bg-action-600"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            개선안 추가
          </button>
        </div>
      </header>

      <main className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="min-h-0 space-y-4 xl:overflow-y-auto xl:pr-1">
          <section className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4" aria-label="개선사업 요약 지표">
            <SummaryMetric icon={ClipboardCheck} label="전체 개선안" value={`${improvementPriorities.length}건`} caption="mock 검토 대상" tone="blue" />
            <SummaryMetric icon={AlertTriangle} label="진행 중" value={`${activeCount}건`} caption="완료 제외 추적" tone="orange" />
            <SummaryMetric icon={TrendingUp} label="평균 진행률" value={`${averageProgress}%`} caption="온길 점수 개선 참고" tone="cyan" />
            <SummaryMetric icon={CheckCircle2} label="mock 예산" value={`${totalBudget}억`} caption="행정 검토 참고" tone="slate" />
          </section>

          <section className="grid min-h-0 items-start gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {columns.map((column) => {
              const items = itemsByStage[column.stage];

              return (
                <section key={column.stage} className="flex min-w-0 flex-col rounded-[20px] border border-blue-100/80 bg-[#f8fbff] p-3 shadow-[0_14px_36px_rgba(33,91,145,0.06)] sm:p-4">
                  <div className="flex min-h-10 shrink-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${column.accent}`} aria-hidden="true" />
                        <h2 className="text-[14px] font-black leading-5 text-navy-950">{column.stage}</h2>
                      </div>
                      <p className="mt-0.5 truncate text-[10px] font-bold text-slate-400">{column.caption}</p>
                    </div>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-slate-500 shadow-sm">{items.length}건</span>
                  </div>

                  <div className="mt-3 grid gap-3">
                    {items.map((item) => (
                      <StageCard key={item.id} item={item} active={item.id === selected.id} onSelect={() => setSelectedId(item.id)} />
                    ))}
                  </div>
                </section>
              );
            })}
          </section>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)]">
            <ExecutionQueue items={improvementPriorities} selectedId={selected.id} onSelect={setSelectedId} />
            <StageSummaryPanel itemsByStage={itemsByStage} />
          </div>
        </div>

        <DetailPanel item={selected} />
      </main>
    </div>
  );
}
