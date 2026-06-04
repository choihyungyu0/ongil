import {
  Check,
  ChevronDown,
  Download,
  MapPinned,
  Search,
  Share2,
  Sparkles,
} from 'lucide-react';
import reportMapImage from '../../../asset/d44ecfd2-03aa-4757-97ae-169a227f42ac.png';
import { reportPreviews } from '../../data/mockData';

const reportItems = [
  {
    title: '보행취약지역 히트맵',
    description: '제보 밀도와 위험도 분포',
    tone: 'bg-teal-50 text-teal-600 border-teal-100',
    statusTone: 'bg-teal-50 text-teal-700',
  },
  {
    title: '위험구간 TOP 10',
    description: '중복 제보 및 접근성 점수 기준',
    tone: 'bg-rose-50 text-rose-500 border-rose-100',
    statusTone: 'bg-teal-50 text-teal-700',
  },
  {
    title: '개선 우선순위',
    description: '예산 검토가 필요한 구간',
    tone: 'bg-orange-50 text-orange-500 border-orange-100',
    statusTone: 'bg-teal-50 text-teal-700',
  },
  {
    title: '추천 개선안',
    description: '경사, 계단, 쉼터 기준 제안',
    tone: 'bg-violet-50 text-violet-500 border-violet-100',
    statusTone: 'bg-teal-50 text-teal-700',
  },
  {
    title: '행정 요약본',
    description: '검토 회의용 1쪽 요약',
    tone: 'bg-blue-50 text-blue-600 border-blue-100',
    statusTone: 'bg-teal-50 text-teal-700',
  },
];

const summarySteps = [
  {
    title: '대상지 개요',
    text: '감천문화마을과 초량이바구길을 잇는 보행 취약 권역 요약',
  },
  {
    title: '접근성 종합 평가',
    text: '경사도, 계단, 단차, 쉼터 부족, 중복제보를 함께 반영',
  },
  {
    title: '위험구간 TOP 10',
    text: '중복 제보 수와 개선 필요도를 종합해 우선 구간 정렬',
  },
  {
    title: '개선 제안',
    text: '우회 안내, 보행 유도선, 쉼터 확보, 현장 점검 항목 제시',
  },
];

const metrics = [
  { label: '위험구간', value: '24곳', caption: '고위험 포함', tone: 'text-navy-950' },
  { label: '평균 경사', value: '52점', caption: '취약지역 기준', tone: 'text-rose-600' },
  { label: '중복 제보', value: '68건', caption: '최근 30일', tone: 'text-action-600' },
  { label: '접근성 점수', value: '58점', caption: '개선 필요', tone: 'text-teal-700' },
];

const priorityRows = [
  { place: '초량이바구길 경사로', detail: '경사도 높음, 쉼터 부족', score: '4.8', badge: '긴급' },
  { place: '감천문화마을 입구', detail: '계단, 단차, 안내 표지 부족', score: '4.5', badge: '검토' },
  { place: '부산역 연결 보행로', detail: '점자블록 손상, 혼잡', score: '4.1', badge: '접수' },
];

export function ReportExportPage() {
  const report = reportPreviews[0];

  return (
    <div className="report-export-screen flex flex-col gap-4">
      <header className="flex shrink-0 items-start justify-between gap-5">
        <div>
          <p className="text-sm font-black text-civic-700">PC 환경 · 시민제보/AI 검수</p>
          <h1 className="mt-1 text-[31px] font-black leading-none text-navy-950">행정 리포트 출력 설정</h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            감천문화마을 보행취약구간 분석 리포트의 행정 검토·공유용 출력 구성을 설정합니다.
          </p>
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <label className="flex h-12 w-[430px] items-center gap-3 rounded-2xl border border-blue-100 bg-white px-5 text-sm font-bold text-slate-500 shadow-sm">
            <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
            <span>지역, 위험유형, 리포트 검색</span>
          </label>
          <button
            type="button"
            className="flex h-12 items-center gap-2 rounded-2xl border border-blue-100 bg-white px-5 text-sm font-black text-navy-950 shadow-sm"
          >
            부산광역시
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex h-12 items-center gap-2 rounded-2xl bg-action-500 px-6 text-sm font-black text-white shadow-[0_12px_24px_rgba(36,119,255,0.22)]"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            미리보기
          </button>
        </div>
      </header>

      <section className="grid min-h-0 flex-1 gap-5 xl:min-h-[960px] xl:grid-cols-[500px_minmax(0,1fr)]">
        <aside className="app-card flex min-h-0 flex-col overflow-hidden p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-navy-950">리포트 출력 설정</h2>
              <p className="mt-1 text-xs font-bold text-slate-400">On-gil Report</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-action-600">행정 검토용</span>
          </div>

          <div className="mt-5">
            <p className="text-xs font-black text-slate-400">대상지</p>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-4 shadow-sm">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-sm font-black text-action-600">
                지
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-black text-navy-950">감천문화마을</p>
                <p className="mt-1 text-xs font-bold text-slate-500">사하구 감천동 보행취약구간</p>
              </div>
              <button type="button" className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-action-600">
                상세
              </button>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-black text-slate-400">포함 항목</p>
            <div className="mt-3 space-y-3">
              {reportItems.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl border border-blue-50 bg-white px-4 py-3.5 text-left shadow-sm transition hover:border-action-200 hover:bg-blue-50/30"
                  aria-pressed="true"
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl border ${item.tone}`}>
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black text-navy-950">{item.title}</span>
                    <span className="mt-1 block truncate text-xs font-semibold text-slate-500">{item.description}</span>
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${item.statusTone}`}>포함</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid shrink-0 gap-3">
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-action-500 text-sm font-black text-white shadow-[0_12px_22px_rgba(36,119,255,0.2)]"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              감천문화마을 보행취약구간 분석 리포트 출력
            </button>
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-blue-50 text-sm font-black text-action-600"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              공유용 링크 생성
            </button>
          </div>
        </aside>

        <article className="app-card flex min-h-0 flex-col overflow-hidden p-5">
          <div className="flex shrink-0 items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-navy-950">리포트 생성 미리보기</h2>
              <p className="mt-1 text-xs font-bold text-slate-400">{report.exportType || 'On-gil Report'}</p>
            </div>
            <span className="text-xs font-black text-slate-400">행정 문서용 요약</span>
          </div>

          <div className="mt-4 grid shrink-0 gap-5 xl:grid-cols-[560px_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-2xl border border-blue-100 bg-slate-100 shadow-sm">
              <div className="relative h-[332px]">
                <img src={reportMapImage} alt="감천문화마을 보행 위험구간 미리보기 지도" className="h-full w-full object-cover" />
                <div className="absolute left-[45%] top-[28%] rounded-full bg-white px-3 py-2 text-xs font-black text-navy-950 shadow-lg">
                  <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
                  분석 대상지
                </div>
                <div className="absolute bottom-4 left-4 rounded-2xl bg-white/92 px-4 py-3 shadow-lg backdrop-blur">
                  <p className="text-[11px] font-black text-slate-500">주요 분석 권역</p>
                  <p className="mt-1 text-sm font-black text-navy-950">초량이바구길 · 부산역 · 감천문화마을</p>
                </div>
              </div>
            </div>

            <div className="flex min-h-0 flex-col gap-3">
              <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-civic-600" aria-hidden="true" />
                  <h3 className="text-sm font-black text-navy-950">리포트 목차</h3>
                </div>
                <div className="mt-3 space-y-2.5">
                  {summarySteps.map((step, index) => (
                    <div key={step.title} className="grid grid-cols-[34px_1fr] gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-civic-50 text-sm font-black text-civic-700">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-black text-navy-950">{step.title}</p>
                        <p className="mt-0.5 text-xs font-semibold leading-5 text-slate-500">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-100 bg-civic-50 px-4 py-3">
                <p className="text-sm font-black text-civic-800">자치단체 담당자가 바로 내부 검토자료로 사용할 수 있도록 표지, 요약, 지도, 표, 개선안 순서로 정리됩니다.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid shrink-0 gap-3 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-4">
                <p className="text-xs font-black text-slate-400">{metric.label}</p>
                <p className={`mt-1 text-2xl font-black ${metric.tone}`}>{metric.value}</p>
                <p className="text-xs font-bold text-slate-500">{metric.caption}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
            <section className="rounded-2xl border border-blue-100 bg-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-navy-950">개선 우선순위 미리보기</h3>
                <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-600">TOP 3</span>
              </div>
              <div className="mt-3 grid gap-3">
                {priorityRows.map((row, index) => (
                  <div key={row.place} className="grid grid-cols-[42px_1fr_72px_58px] items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-sm font-black text-action-600 shadow-sm">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-navy-950">{row.place}</p>
                      <p className="mt-0.5 truncate text-xs font-semibold text-slate-500">{row.detail}</p>
                    </div>
                    <p className="text-right text-lg font-black text-rose-600">{row.score}</p>
                    <span className="rounded-full bg-white px-2 py-1 text-center text-xs font-black text-slate-600 shadow-sm">{row.badge}</span>
                  </div>
                ))}
              </div>

            </section>

            <section className="flex min-h-0 flex-col rounded-2xl border border-blue-100 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <MapPinned className="h-5 w-5 text-action-600" aria-hidden="true" />
                <h3 className="text-base font-black text-navy-950">출력 문서 요약</h3>
              </div>
              <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black text-slate-400">리포트 제목</p>
                <p className="mt-2 text-lg font-black leading-6 text-navy-950">감천문화마을 보행취약구간 분석 리포트</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                  부산 사하구 감천동 일대의 보행 위험 참고 자료입니다. 실제 행정 판단 전 현장 검수와 담당 부서 확인이 필요합니다.
                </p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-black text-slate-400">기준 기간</p>
                  <p className="mt-2 text-base font-black text-navy-950">2026.05</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-black text-slate-400">담당 부서</p>
                  <p className="mt-2 text-base font-black text-navy-950">보행환경팀</p>
                </div>
              </div>
            </section>
          </div>
        </article>
      </section>

    </div>
  );
}
