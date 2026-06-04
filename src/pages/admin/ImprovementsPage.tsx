import { ChevronDown, ClipboardCheck, Plus, Search } from 'lucide-react';
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
        'group w-full rounded-[18px] border bg-white p-3 text-left shadow-[0_14px_30px_rgba(33,91,145,0.08)] transition',
        active ? 'border-action-500 ring-2 ring-action-500/20' : 'border-blue-100/80 hover:-translate-y-0.5 hover:border-blue-200',
      ].join(' ')}
    >
      <div className="h-[126px] overflow-hidden rounded-[14px] bg-slate-100">
        <img
          src={imageById[item.id] ?? rootPhoto}
          alt={`${item.area} ${item.action} mock 현장 사진`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-3 min-w-0">
        <h3 className="truncate text-[14px] font-black leading-5 text-navy-950">{item.area}</h3>
        <p className="mt-0.5 truncate text-[11px] font-bold text-slate-500">{item.action}</p>
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
    <section className="grid h-[170px] shrink-0 grid-cols-[minmax(0,1fr)_300px] gap-6 rounded-[22px] border border-blue-100/80 bg-white px-7 py-5 shadow-[0_18px_45px_rgba(33,91,145,0.10)]">
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[17px] font-black leading-6 text-navy-950">선택 개선안 상세</h2>
            <p className="mt-1 truncate text-[12px] font-semibold text-slate-500">
              {item.area} · {item.action} · 예상 개선 온길 점수 {item.progress}%
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-[11px] font-black">
            <span className="rounded-full bg-slate-50 px-3 py-1.5 text-slate-500">{item.district}</span>
            <span className="rounded-full bg-civic-50 px-3 py-1.5 text-civic-700">{item.targetUser}</span>
          </div>
        </div>

        <div className="relative mt-5 px-2">
          <div className="absolute left-[34px] right-[34px] top-[15px] h-[3px] rounded-full bg-slate-200" />
          <div
            className="absolute left-[34px] top-[15px] h-[3px] max-w-[calc(100%-68px)] rounded-full bg-action-500"
            style={{ width: `calc((100% - 68px) * ${progress / 100})` }}
          />
          <div className="relative grid grid-cols-5">
            {detailSteps.map((step, index) => {
              const stepProgress = index * 25;
              const complete = progress >= stepProgress;
              const current = progress >= stepProgress && progress < stepProgress + 25;

              return (
                <div key={step} className="flex flex-col items-center gap-2">
                  <span
                    className={[
                      'grid h-8 w-8 place-items-center rounded-full border-4 text-[10px] font-black shadow-sm',
                      complete ? 'border-blue-100 bg-action-500 text-white' : 'border-slate-100 bg-slate-200 text-slate-500',
                      current ? 'ring-4 ring-orange-100' : '',
                    ].join(' ')}
                  >
                    {index + 1}
                  </span>
                  <span className={complete ? 'text-[11px] font-black text-navy-950' : 'text-[11px] font-black text-slate-400'}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="flex min-w-0 flex-col justify-between rounded-[18px] bg-slate-50 px-5 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-black text-slate-400">담당 부서</p>
            <p className="mt-1 truncate text-[12px] font-black text-navy-950">{item.owner}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400">예상 예산</p>
            <p className="mt-1 text-[12px] font-black text-navy-950">{item.budget}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] font-black text-slate-400">일정</p>
            <p className="mt-1 text-[12px] font-black text-navy-950">{item.due}</p>
          </div>
        </div>
        <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-[16px] bg-action-500 px-4 text-[12px] font-black text-white shadow-[0_10px_22px_rgba(36,119,255,0.28)] hover:bg-action-600">
          <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
          행정 검토 요청
        </button>
      </aside>
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

  return (
    <div data-page="improvements" className="improvements-screen-fit flex min-h-[760px] flex-col gap-3 overflow-hidden">
      <header className="flex h-[76px] shrink-0 items-start justify-between gap-5 pt-2">
        <div className="min-w-0">
          <p className="text-[11px] font-black leading-4 text-civic-700">사업 계획 · 실행관리</p>
          <h1 className="truncate text-[30px] font-black leading-9 tracking-tight text-navy-950">개선사업 진행현황 트래커</h1>
          <p className="mt-1 text-[12px] font-semibold text-slate-500">
            위험구간의 검토·예산·공사·완료 단계를 한 화면에서 추적합니다.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <label className="relative block">
            <span className="sr-only">지역, 위험유형, 리포트 검색</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="지역, 위험유형, 리포트 검색"
              className="h-11 w-[360px] rounded-[16px] border border-blue-100 bg-white pl-10 pr-4 text-[12px] font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
            />
          </label>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-[16px] border border-blue-100 bg-white px-4 text-[12px] font-black text-navy-800 shadow-sm">
            부산광역시
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-[16px] bg-action-500 px-4 text-[12px] font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.24)] hover:bg-action-600">
            <Plus className="h-4 w-4" aria-hidden="true" />
            개선안 추가
          </button>
        </div>
      </header>

      <section className="grid min-h-0 flex-1 grid-cols-4 gap-4">
        {columns.map((column) => {
          const items = itemsByStage[column.stage];

          return (
            <section key={column.stage} className="flex min-h-0 flex-col rounded-[22px] border border-blue-100/80 bg-[#f8fbff] p-4 shadow-[0_14px_36px_rgba(33,91,145,0.06)]">
              <div className="flex h-10 shrink-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${column.accent}`} aria-hidden="true" />
                    <h2 className="text-[14px] font-black leading-5 text-navy-950">{column.stage}</h2>
                  </div>
                  <p className="mt-0.5 truncate text-[10px] font-bold text-slate-400">{column.caption}</p>
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-slate-500 shadow-sm">{items.length}건</span>
              </div>

              <div className="mt-3 grid gap-3 overflow-hidden">
                {items.map((item) => (
                  <StageCard key={item.id} item={item} active={item.id === selected.id} onSelect={() => setSelectedId(item.id)} />
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <DetailPanel item={selected} />
    </div>
  );
}
