import { CalendarCheck, Check, ChevronDown, Clock3, MapPin, Plus, Search } from 'lucide-react';
import { LeafFieldSurveyMap } from '../../components/maps/LeafFieldSurveyMap';
import { fieldSurveyAssignments } from '../../data/mockData';

const assignments = [
  {
    team: 'A팀',
    area: fieldSurveyAssignments[0]?.area ?? '감천문화마을 입구',
    points: '12개 지점',
    status: '진행중',
    tone: 'teal',
  },
  {
    team: 'B팀',
    area: '초량이바구길 급경사',
    points: '8개 지점',
    status: '대기',
    tone: 'orange',
  },
  {
    team: 'C팀',
    area: '부산역 복지 산복도로',
    points: '9개 지점',
    status: '완료',
    tone: 'green',
  },
  {
    team: 'D팀',
    area: '영도 절영로 보행로',
    points: '6개 지점',
    status: '검토',
    tone: 'blue',
  },
];

const checklistItems = [
  {
    title: '사전 3D 이상 촬영',
    description: '계단 · 장애 · 위험요소 근접사진',
  },
  {
    title: '경사도 측정',
    description: '평균 · 최대 경사도 입력',
  },
  {
    title: '보도폭 기록',
    description: '최소 통행 폭과 장애물 위치',
  },
  {
    title: '시민제보 매칭',
    description: '중복 제보와 현장 사진 연결',
  },
];

const assignmentTone: Record<string, { badge: string; chip: string; row: string }> = {
  teal: {
    badge: 'bg-civic-50 text-civic-700',
    chip: 'bg-civic-50 text-civic-700',
    row: 'border-civic-100 bg-civic-50/25',
  },
  orange: {
    badge: 'bg-orange-50 text-orange-600',
    chip: 'bg-orange-50 text-orange-600',
    row: 'border-orange-100 bg-orange-50/25',
  },
  green: {
    badge: 'bg-emerald-50 text-emerald-600',
    chip: 'bg-emerald-50 text-emerald-600',
    row: 'border-emerald-100 bg-emerald-50/25',
  },
  blue: {
    badge: 'bg-blue-50 text-action-600',
    chip: 'bg-blue-50 text-action-600',
    row: 'border-blue-100 bg-blue-50/25',
  },
};

export function FieldSurveyPage() {
  return (
    <div
      data-page="field-survey"
      className="flex w-full max-w-full min-w-0 flex-col gap-4 overflow-x-hidden pb-4 pt-3 2xl:h-[calc(100vh-8px)] 2xl:min-h-[760px] 2xl:overflow-hidden 2xl:pb-0"
    >
      <header className="flex w-full max-w-full shrink-0 flex-col gap-4 2xl:h-[78px] 2xl:flex-row 2xl:items-start 2xl:justify-between 2xl:gap-5">
        <div className="min-w-0">
          <p className="text-[12px] font-black leading-4 text-civic-700">현장조사 · 데이터 갱신</p>
          <h1 className="text-[25px] font-black leading-8 text-navy-950 sm:text-[31px] sm:leading-9">현장조사 일정 및 검수 배정</h1>
          <p className="mt-1 text-[13px] font-semibold text-slate-500">
            MVP 구간의 현장조사 동선을 만들고 사진 검수 담당자를 배정합니다.
          </p>
        </div>

        <div className="grid w-full max-w-full min-w-0 gap-2 pt-1 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center 2xl:w-auto 2xl:shrink-0 2xl:gap-3">
          <label className="relative block min-w-0">
            <span className="sr-only">지역, 위험유형, 리포트 검색</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="지역, 위험유형, 리포트 검색"
              className="h-11 w-full rounded-2xl border border-blue-100 bg-white pl-11 pr-4 text-xs font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20 2xl:w-[390px]"
            />
          </label>
          <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-xs font-black text-navy-800 shadow-sm">
            부산광역시
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-action-500 px-5 text-xs font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.25)] hover:bg-action-600"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            일정 생성
          </button>
        </div>
      </header>

      <section className="grid min-h-0 w-full max-w-full flex-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_minmax(360px,430px)]">
        <section className="flex min-w-0 flex-col rounded-[20px] border border-blue-100/70 bg-white p-4 shadow-[0_18px_45px_rgba(33,91,145,0.08)] sm:p-6 2xl:min-h-0 2xl:rounded-[24px] 2xl:p-7">
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 2xl:h-[52px]">
            <div>
              <h2 className="text-[19px] font-black leading-6 text-navy-950">오늘의 조사 대상 지도</h2>
              <p className="mt-1 text-[12px] font-semibold text-slate-500">감천문화마을 · 초량이바구길 · 부산역 복합 산복도로</p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-action-600">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              추천 동선
            </span>
          </div>

          <div className="relative mt-4 h-[430px] min-h-0 w-full max-w-full overflow-hidden rounded-[18px] sm:h-[520px] 2xl:h-auto 2xl:flex-1">
            <LeafFieldSurveyMap />
          </div>
        </section>

        <aside className="flex min-w-0 flex-col rounded-[20px] border border-blue-100/70 bg-white p-4 shadow-[0_18px_45px_rgba(33,91,145,0.08)] sm:p-6 2xl:min-h-0 2xl:rounded-[24px] 2xl:p-7">
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4 2xl:h-[52px]">
            <h2 className="text-[19px] font-black leading-6 text-navy-950">현장조사 배정</h2>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-slate-400">
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              오늘 09:00 기준
            </span>
          </div>

          <div className="mt-4 grid flex-1 content-start gap-3 sm:grid-cols-2 2xl:grid-cols-1 2xl:gap-4">
            {assignments.map((assignment) => {
              const tone = assignmentTone[assignment.tone];

              return (
                <article
                  key={assignment.team}
                  className={`grid min-h-[96px] min-w-0 grid-cols-[48px_minmax(0,1fr)] items-center gap-3 rounded-[18px] border px-4 py-4 sm:grid-cols-[48px_minmax(0,1fr)_auto] 2xl:min-h-[100px] 2xl:grid-cols-[56px_minmax(0,1fr)_auto] 2xl:gap-4 2xl:px-5 ${tone.row}`}
                >
                  <span className={`grid h-11 w-11 place-items-center rounded-full text-[13px] font-black ${tone.badge}`}>{assignment.team}</span>
                  <div className="min-w-0">
                    <strong className="block truncate text-[15px] font-black text-navy-950">{assignment.area}</strong>
                    <span className="mt-1 block text-[12px] font-bold text-slate-500">{assignment.points}</span>
                  </div>
                  <span className={`col-start-2 w-fit rounded-full px-3 py-1.5 text-[11px] font-black sm:col-start-auto ${tone.chip}`}>{assignment.status}</span>
                </article>
              );
            })}
          </div>
        </aside>
      </section>

      <section
        className="flex w-full max-w-full shrink-0 flex-col rounded-[20px] border border-blue-100/70 bg-white px-4 py-5 shadow-[0_18px_45px_rgba(33,91,145,0.08)] sm:px-6 2xl:h-[172px] 2xl:rounded-[24px] 2xl:px-7"
      >
        <div className="flex shrink-0 items-center justify-between">
          <h2 className="text-[19px] font-black text-navy-950">조사 체크리스트</h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-civic-50 px-3 py-1.5 text-[11px] font-black text-civic-700">
            <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
            필수 항목
          </span>
        </div>

        <div className="mt-4 grid min-h-0 flex-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4 2xl:gap-5">
          {checklistItems.map((item) => (
            <article key={item.title} className="grid min-h-0 min-w-0 grid-cols-[42px_minmax(0,1fr)] gap-4 rounded-[18px] border border-blue-100 bg-slate-50/70 px-4 py-4 2xl:px-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-civic-50 text-civic-700">
                <Check className="h-4 w-4 stroke-[3]" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <strong className="block truncate text-[14px] font-black text-navy-950">{item.title}</strong>
                <p className="mt-1.5 line-clamp-2 text-[12px] font-semibold leading-5 text-slate-500">{item.description}</p>
                <span className="mt-2 inline-flex rounded-full bg-civic-50 px-2.5 py-1 text-[10px] font-black text-civic-700">필수</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
