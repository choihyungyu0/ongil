import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import busNightPhoto from '../../../asset/08f63d83-7fb3-40c2-b5fa-efeb7b7babf8.png';
import tactileDamagePhoto from '../../../asset/166ffa68-77be-40bf-8119-1a42895f7ecc.png';
import treeWalkwayPhoto from '../../../asset/464f37ab-dfc1-4fa8-b954-19e479a945be.png';
import mapPreviewImage from '../../../asset/98c5316a-7e56-4304-93da-8e5f9f0ebbd9.png';
import tactilePathPhoto from '../../../asset/b915f762-f370-4fa6-9437-092d8f7daea1.png';
import busStopPhoto from '../../../asset/cb44152e-dc52-498f-9458-c1f065adf032.png';
import bollardPhoto from '../../../asset/d47adf62-6bb4-40fc-9b06-213e50e59d14.png';
import { photoAnalysis, reportReviewItems } from '../../data/mockData';

const photoByKey: Record<string, string> = {
  busNight: busNightPhoto,
  tactileDamage: tactileDamagePhoto,
  treeWalkway: treeWalkwayPhoto,
  tactilePath: tactilePathPhoto,
  busStop: busStopPhoto,
  bollard: bollardPhoto,
};

const tagTone: Record<string, string> = {
  계단: 'bg-orange-50 text-orange-700',
  단차: 'bg-rose-50 text-rose-600',
  '점자블록 파손': 'bg-violet-50 text-violet-700',
  급경사: 'bg-rose-50 text-rose-600',
  '쉼터 부족': 'bg-amber-50 text-amber-700',
  '횡단보도 위험': 'bg-blue-50 text-action-600',
  '볼라드 간격': 'bg-violet-50 text-violet-700',
  '보행폭 부족': 'bg-cyan-50 text-civic-700',
  '야간 조도': 'bg-blue-50 text-action-600',
  '노면 파손': 'bg-rose-50 text-rose-600',
};

const statusTone: Record<string, string> = {
  '검수 필요': 'bg-orange-50 text-orange-700',
  접수: 'bg-blue-50 text-action-600',
  긴급: 'bg-rose-50 text-rose-600',
  검토: 'bg-amber-50 text-amber-700',
  '조치 예정': 'bg-emerald-50 text-emerald-700',
  모니터링: 'bg-slate-100 text-slate-600',
};

const reviewSteps = [
  {
    title: '사진 업로드',
    description: '위치와 사진 메타정보로 제보 설명을 함께 수집합니다.',
  },
  {
    title: '위험요소 태깅',
    description: '계단, 단차, 보도블록 파손, 점자블록 파손, 볼라드 간격 등을 분류합니다.',
  },
  {
    title: '중복 제보 병합',
    description: '동일 위치와 유형을 묶어 신뢰도와 개선 필요도를 계산합니다.',
  },
];

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className={`rounded-full px-2.5 py-1 text-[11px] font-black ${tagTone[tag] ?? 'bg-slate-100 text-slate-600'}`}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function ReportsTable() {
  return (
    <section className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-[22px] border border-blue-100/70 bg-white shadow-[0_18px_45px_rgba(33,91,145,0.08)]">
      <div className="flex shrink-0 items-center justify-between gap-4 px-7 pb-2 pt-5">
        <h2 className="text-[17px] font-black text-navy-950">사진 기반 위험구간 제보 · AI 검수</h2>
        <div className="flex items-center gap-2">
          {['전체 제보', '검수 필요', '중복 병합', '조치 완료'].map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={[
                'h-8 rounded-full border px-4 text-[11px] font-black transition',
                index === 0
                  ? 'border-civic-100 bg-civic-50 text-civic-700'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-navy-900',
              ].join(' ')}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-6 pb-5">
        <div className="grid grid-cols-[112px_minmax(140px,1fr)_180px_78px_70px_106px_112px] items-center gap-4 border-b border-slate-100 px-2 py-3 text-[11px] font-black text-slate-400">
          <span>제보</span>
          <span>위치</span>
          <span>AI 분류</span>
          <span>신뢰도</span>
          <span>중복</span>
          <span>관리 상태</span>
          <span className="text-center">사진</span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {reportReviewItems.slice(0, 6).map((report) => (
            <article
              key={report.id}
              className="grid min-h-[82px] flex-1 grid-cols-[112px_minmax(140px,1fr)_180px_78px_70px_106px_112px] items-center gap-4 border-b border-slate-100 px-2 py-3 last:border-b-0"
            >
              <div>
                <p className="text-[13px] font-black text-navy-900">{report.id}</p>
                <p className="mt-1 text-[11px] font-bold text-slate-400">{report.receivedAt}</p>
              </div>
              <p className="truncate text-[13px] font-black text-slate-700">{report.location}</p>
              <TagList tags={report.aiTags} />
              <span className="font-black text-navy-800">{report.confidence.toFixed(2)}</span>
              <p className="text-[13px] font-black text-navy-800">{report.duplicates}건</p>
              <span className={`w-fit rounded-full px-3 py-1 text-[11px] font-black ${statusTone[report.managementStatus]}`}>
                {report.managementStatus}
              </span>
              <div className="justify-self-center">
                <div className="relative h-[58px] w-[90px] overflow-hidden rounded-2xl shadow-sm">
                  <img src={photoByKey[report.photoKey]} alt={`${report.location} 제보 사진`} className="h-full w-full object-cover" />
                  <span className="absolute bottom-1.5 right-2 rounded-full bg-navy-950/55 px-2 py-0.5 text-[10px] font-black text-white">
                    사진
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiFlowCard() {
  return (
    <section className="rounded-[22px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_45px_rgba(33,91,145,0.08)]">
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-black text-navy-950">AI 분류 흐름</h2>
        <span className="text-[11px] font-black text-slate-400">On-gil Scan</span>
      </div>

      <ol className="mt-4 space-y-3">
        {reviewSteps.map((step, index) => (
          <li key={step.title} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-civic-50 text-sm font-black text-civic-700">{index + 1}</span>
            <span>
              <strong className="block text-[13px] font-black text-navy-900">{step.title}</strong>
              <span className="mt-0.5 block text-[11px] font-semibold leading-4 text-slate-500">{step.description}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MapPreviewCard() {
  return (
    <section className="flex h-full min-h-0 flex-1 flex-col rounded-[22px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_45px_rgba(33,91,145,0.08)]">
      <h2 className="shrink-0 text-[17px] font-black text-navy-950">제보 위치 미리보기</h2>
      <div className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50">
        <img src={mapPreviewImage} alt="부산 제보 위치 미리보기 mock 지도" className="h-full w-full object-cover" />
      </div>
      <div className="mt-4 rounded-2xl border border-civic-100 bg-civic-50 px-4 py-3">
        <p className="text-[12px] font-bold leading-5 text-civic-700">
          관리자는 AI 판독 오류를 줄이기 위해 신뢰도와 사진 검수 상태를 함께 확인합니다.
        </p>
      </div>
    </section>
  );
}

export function ReportsPage() {
  const primaryResult = photoAnalysis.resultBars[0];

  return (
    <div className="flex min-h-screen flex-col gap-4 py-2 md:h-[calc(100vh-20px)] md:min-h-[calc(100vh-20px)] md:py-0">
      <header className="flex shrink-0 flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[12px] font-black leading-4 text-civic-700">PC 환경 · 시민제보/AI 검수</p>
          <h1 className="text-[30px] font-black leading-9 text-navy-950">사진 기반 위험구간 제보 관리</h1>
          <p className="text-[13px] font-semibold leading-5 text-slate-500">
            사진 업로드 제보를 AI가 위험유형으로 분류하고, 관리자가 검수할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative block">
            <span className="sr-only">지역, 위험유형, 리포트 검색</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="지역, 위험유형, 리포트 검색"
              className="h-11 w-[340px] rounded-2xl border border-blue-100 bg-white pl-11 pr-4 text-xs font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
            />
          </label>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-xs font-black text-navy-800 shadow-sm">
            부산광역시
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-action-500 px-5 text-xs font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.25)] hover:bg-action-600">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            검수 일괄처리
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <ReportsTable />
        <aside className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4">
          <AiFlowCard />
          <MapPreviewCard />
        </aside>
      </div>

      <div className="sr-only" aria-live="polite">
        주요 mock AI 분류 결과는 {primaryResult.label} {primaryResult.value}%입니다.
      </div>
    </div>
  );
}
