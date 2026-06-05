import {
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import analysisPhoto from '../../../asset/282cb8b8-63bd-48f5-8aa4-b375bc493ed5.png';
import bollardPhoto from '../../../asset/cb44152e-dc52-498f-9458-c1f065adf032.png';
import surfacePhoto from '../../../asset/d47adf62-6bb4-40fc-9b06-213e50e59d14.png';
import tactilePhoto from '../../../asset/166ffa68-77be-40bf-8119-1a42895f7ecc.png';

const resultBars = [
  { label: '점자블록 손상', value: 92, color: 'from-violet-500 to-violet-400' },
  { label: '보도블록 파손', value: 84, color: 'from-action-500 to-sky-400' },
  { label: '단차 4cm 추정', value: 60, color: 'from-orange-500 to-orange-300' },
  { label: '불규칙 보행 흔적', value: 28, color: 'from-civic-500 to-cyan-300' },
  { label: '횡단보도 위험', value: 18, color: 'from-emerald-500 to-emerald-300' },
];

const thumbnails = [
  { label: '점자블록', image: tactilePhoto, position: 'center' },
  { label: '보도파손', image: surfacePhoto, position: 'center' },
  { label: '볼라드', image: bollardPhoto, position: 'center' },
  { label: '단차', image: analysisPhoto, position: '68% 62%' },
];

const processSteps = [
  { label: '사진 품질 확인', status: '완료', tone: 'text-civic-700 bg-civic-50' },
  { label: 'GPS 위치 매칭', status: '완료', tone: 'text-civic-700 bg-civic-50' },
  { label: '위험요소 객체 탐지', status: '검토 필요', tone: 'text-orange-600 bg-orange-50' },
  { label: '중복 제보 후보 검색', status: '완료', tone: 'text-civic-700 bg-civic-50' },
];

const recommendations = [
  {
    title: '점자블록 정비',
    description: '단절·파손 구간을 연속 보행 기준으로 보수하고 임시 안내를 배치합니다.',
    tone: 'bg-violet-50 text-violet-600',
  },
  {
    title: '단차 완화',
    description: '4cm 내외 단차를 경사 처리하고 배수로 주변 보도블록을 재정렬합니다.',
    tone: 'bg-orange-50 text-orange-600',
  },
  {
    title: '현장 재확인 요청',
    description: '야간 조도와 보도블록 미끄럼 위험을 현장 조사 일정에 포함합니다.',
    tone: 'bg-civic-50 text-civic-700',
  },
];

function ResultBar({ item }: { item: (typeof resultBars)[number] }) {
  return (
    <div className="grid grid-cols-[112px_minmax(0,1fr)_38px] items-center gap-3">
      <span className="text-[13px] font-black text-navy-900">{item.label}</span>
      <span className="h-3 overflow-hidden rounded-full bg-slate-100">
        <span
          className={`block h-full rounded-full bg-gradient-to-r ${item.color}`}
          style={{ width: `${item.value}%` }}
          aria-hidden="true"
        />
      </span>
      <span className="text-right text-[12px] font-black text-action-600">{item.value}%</span>
    </div>
  );
}

export function PhotoAnalysisPage() {
  return (
    <div className="flex min-h-[900px] flex-col">
      <header className="flex shrink-0 flex-col gap-3 pb-3 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[11px] font-black leading-4 text-civic-700">AI 분석 · On-gil Scan</p>
          <h1 className="text-[25px] font-black leading-8 tracking-normal text-navy-950">현장 사진 AI 분석 화면</h1>
          <p className="text-[12px] font-semibold leading-4 text-slate-500">
            업로드된 현장 사진에서 위험요소를 탐지하고 행정 검토 항목으로 분류합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="relative block">
            <span className="sr-only">지역, 위험유형, 리포트 검색</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="지역, 위험유형, 리포트 검색"
              className="h-10 w-[292px] rounded-2xl border border-blue-100 bg-white pl-10 pr-4 text-xs font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
            />
          </label>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-xs font-black text-navy-800 shadow-sm"
          >
            부산광역시
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-2xl bg-action-500 px-4 text-xs font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.25)] hover:bg-action-600"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            분석 저장
          </button>
        </div>
      </header>

      <section
        className="grid min-h-[760px] gap-5 xl:grid-cols-[minmax(0,1.27fr)_minmax(430px,0.73fr)]"
        style={{ height: '100vh' }}
      >
        <article className="flex min-h-0 flex-col rounded-[22px] border border-blue-100/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,29,51,0.08)]">
          <div className="flex shrink-0 items-start justify-between gap-4">
            <div>
              <h2 className="text-[21px] font-black leading-6 text-navy-950">현장 사진 분석</h2>
              <p className="mt-1 text-[12px] font-semibold text-slate-500">위치: 부산역 중앙보행로 · 2025.05.20 14:12</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-civic-50 px-3 py-1 text-[11px] font-black text-civic-700">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              mock 분석
            </span>
          </div>

          <div className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-[18px] border border-slate-100 bg-slate-100">
            <img
              src={analysisPhoto}
              alt="점자블록 손상, 보도블록 파손, 단차가 표시된 현장 사진"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-navy-900 shadow-sm">
              분석 신뢰도 86%
            </div>
          </div>

          <div className="mt-4 grid shrink-0 grid-cols-4 gap-4">
            {thumbnails.map((item) => (
              <button
                type="button"
                key={item.label}
                className="group relative h-[82px] overflow-hidden rounded-[16px] border border-slate-100 bg-slate-100 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-500"
              >
                <img
                  src={item.image}
                  alt={`${item.label} 후보 사진`}
                  className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                  style={{ objectPosition: item.position }}
                />
                <span className="absolute inset-x-3 bottom-2 rounded-full bg-white/92 px-2 py-1 text-[11px] font-black text-navy-900 shadow-sm">
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 shrink-0">
            <h3 className="text-[15px] font-black text-navy-950">AI 처리 단계</h3>
            <ul className="mt-3 grid gap-2">
              {processSteps.map((step, index) => (
                <li key={step.label} className="grid grid-cols-[26px_minmax(0,1fr)_74px] items-center gap-3 text-[13px] font-black text-slate-700">
                  <span
                    className={[
                      'grid h-6 w-6 place-items-center rounded-full',
                      index === 2 ? 'bg-orange-50 text-orange-500' : 'bg-civic-50 text-civic-700',
                    ].join(' ')}
                  >
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>{step.label}</span>
                  <span className={`rounded-full px-2 py-1 text-center text-[11px] font-black ${step.tone}`}>{step.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="grid min-h-0 gap-5 xl:grid-rows-[minmax(250px,0.7fr)_minmax(490px,1.3fr)]">
          <section className="flex min-h-0 flex-col rounded-[22px] border border-blue-100/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,29,51,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-black text-civic-700">온길 스캔 결과</p>
                <h2 className="mt-1 text-[20px] font-black text-navy-950">AI 판단 결과</h2>
              </div>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-500">검토값 요약</span>
            </div>

            <div className="mt-5 grid min-h-0 flex-1 content-center gap-4">
              {resultBars.map((item) => (
                <ResultBar key={item.label} item={item} />
              ))}
            </div>
          </section>

          <section className="flex min-h-0 flex-col overflow-hidden rounded-[22px] border border-blue-100/70 bg-white p-6 shadow-[0_18px_45px_rgba(15,29,51,0.08)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-black text-civic-700">개선 우선순위</p>
                <h2 className="mt-1 text-[20px] font-black text-navy-950">추천 개선안</h2>
              </div>
              <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-500">행정 검토 필요</span>
            </div>

            <div className="mt-5 grid min-h-0 flex-1 content-start gap-4 overflow-y-auto pr-1">
              {recommendations.map((item) => (
                <article key={item.title} className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 rounded-[16px] border border-slate-100 bg-slate-50/70 p-4">
                  <span className={`grid h-8 w-8 place-items-center rounded-xl ${item.tone}`}>
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[13px] font-black text-navy-950">{item.title}</h3>
                    <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-2xl bg-action-500 px-3 text-center text-[12px] font-black leading-4 text-white shadow-[0_10px_18px_rgba(36,119,255,0.24)] hover:bg-action-600"
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0">개선 승인 및 접수</span>
              </button>
              <button
                type="button"
                className="inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-3 text-center text-[12px] font-black leading-4 text-action-600 shadow-sm hover:bg-blue-50"
              >
                <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0">리포트 후보로 이동</span>
              </button>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
