import { useEffect, useState } from 'react';
import {
  Check,
  ChevronDown,
  Download,
  FileText,
  MapPinned,
  Search,
  Share2,
  Sparkles,
  X,
} from 'lucide-react';
import { ReportExportLeafletMap } from '../../components/maps/ReportExportLeafletMap';
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

const previewRiskRows = [
  { rank: 1, label: '입구 계단·단차', value: '92%', tone: 'bg-rose-50 text-rose-600' },
  { rank: 2, label: '전망대 진입 급경사', value: '86%', tone: 'bg-orange-50 text-orange-600' },
  { rank: 3, label: '버스정류장 주변 점자블록', value: '78%', tone: 'bg-amber-50 text-amber-600' },
  { rank: 4, label: '골목 보도블록 파손', value: '64%', tone: 'bg-blue-50 text-action-600' },
  { rank: 5, label: '야간 조도 부족 구간', value: '58%', tone: 'bg-cyan-50 text-civic-700' },
];

const previewOptions = [
  { label: '행정 문서형 PDF', caption: '표지·요약·지도 포함', icon: 'PDF', tone: 'bg-blue-50 text-action-600' },
  { label: '위험구간 데이터', caption: '구간별 점수·제보 수', icon: 'XLS', tone: 'bg-civic-50 text-civic-700' },
  { label: '공유 링크', caption: '내부 검토용 URL', icon: '링크', tone: 'bg-orange-50 text-orange-600' },
];

const previewUsagePoints = [
  { label: '검토', text: '담당 부서와 현장조사 일정을 연결합니다.' },
  { label: '근거', text: '무장애 관광 검토 패키지의 기초자료가 됩니다.' },
];

function ReportPreviewModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-navy-950/45 p-2 backdrop-blur-sm sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-preview-title"
        className="max-h-[calc(100vh-16px)] min-w-0 w-full max-w-[min(1380px,calc(100vw-16px))] overflow-hidden rounded-[28px] bg-[#eef5fb] shadow-[0_32px_80px_rgba(15,29,51,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex max-h-[calc(100vh-16px)] min-h-0 flex-col">
          <header className="flex shrink-0 items-start justify-between gap-4 px-4 pb-3 pt-4 sm:px-7 sm:pt-5">
            <div className="min-w-0">
              <p className="text-[12px] font-black text-civic-700">PC 환경 · 문서 미리보기</p>
              <h2 id="report-preview-title" className="mt-1 text-[24px] font-black leading-7 text-navy-950 sm:text-[28px]">
                분석 리포트 미리보기
              </h2>
              <p className="mt-1 text-[12px] font-semibold text-slate-500">
                위험구간 지도, 접근성 점수, 개선 우선순위를 행정 문서형 화면으로 확인합니다.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-blue-100 bg-white text-slate-500 shadow-sm hover:text-navy-950"
              aria-label="분석 리포트 미리보기 닫기"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div className="min-h-0 overflow-y-auto overflow-x-hidden px-4 pb-4 sm:px-7 sm:pb-6">
            <div className="grid min-h-0 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
              <article className="min-w-0 rounded-2xl bg-white p-4 shadow-[0_18px_44px_rgba(33,91,145,0.1)] sm:p-7 xl:p-8">
                <div className="flex min-w-0 flex-col gap-4 border-b-2 border-navy-950 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                  <div className="min-w-0">
                    <h3 className="text-[21px] font-black leading-7 text-navy-950 sm:text-[24px] sm:leading-8">
                      감천문화마을 보행취약구간 분석 리포트
                    </h3>
                    <p className="mt-2 text-[12px] font-semibold leading-5 text-slate-500">
                      부산 온길 AI · 보행취약지역 탐지·접근성 점수화 기반 행정 리포트 · 2026.05.20
                    </p>
                  </div>
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-[3px] border-civic-500 text-center text-[10px] font-black leading-3 text-civic-700 sm:h-[82px] sm:w-[82px] sm:text-[12px] sm:leading-4">
                    On-gil
                    <br />
                    Report
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <section className="rounded-[14px] border border-blue-100 bg-slate-50/70 p-4">
                    <h4 className="text-[15px] font-black text-navy-950">1. 분석 요약</h4>
                    <p className="mt-3 text-[12px] font-semibold leading-5 text-slate-600">
                      감천문화마을 입구 및 주요 보행 동선에서 계단, 단차, 급경사, 점자블록 단절 위험이 반복 확인되었습니다.
                      현재는 보행 위험 참고 자료이며 현장 검수와 담당 부서 확인이 필요합니다.
                    </p>
                  </section>

                  <section className="rounded-[14px] border border-blue-100 bg-slate-50/70 p-4">
                    <h4 className="text-[15px] font-black text-navy-950">2. 핵심 지표</h4>
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
                      {[
                        { label: '위험구간', value: '24', tone: 'text-navy-950' },
                        { label: '고위험', value: '8', tone: 'text-rose-600' },
                        { label: '제보', value: '68', tone: 'text-action-600' },
                      ].map((metric) => (
                        <div key={metric.label} className="min-w-0 rounded-2xl border border-blue-100 bg-white px-2 py-4 text-center sm:px-3">
                          <p className="text-[11px] font-black text-slate-400">{metric.label}</p>
                          <p className={`mt-1 text-[24px] font-black leading-7 ${metric.tone}`}>{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[14px] border border-blue-100 bg-white p-4">
                    <h4 className="text-[15px] font-black text-navy-950">3. 위험구간 TOP 5</h4>
                    <div className="mt-4 grid gap-3">
                      {previewRiskRows.map((row) => (
                        <div key={row.label} className="grid grid-cols-[24px_minmax(0,1fr)_48px] items-center gap-3">
                          <span className="text-[12px] font-black text-slate-500">{row.rank}</span>
                          <span className="truncate text-[12px] font-bold text-navy-900">{row.label}</span>
                          <span className={`rounded-full px-2 py-1 text-center text-[10px] font-black ${row.tone}`}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[14px] border border-blue-100 bg-white p-4">
                    <h4 className="text-[15px] font-black text-navy-950">4. 추천 개선안</h4>
                    <p className="mt-3 text-[12px] font-semibold leading-5 text-slate-600">
                      경사 완화, 손잡이 설치, 점자블록 정비, 쉼터 설치, 음향신호기 설치 후보를 우선 검토합니다.
                    </p>
                    <div className="mt-4 grid gap-3">
                      {[
                        { label: '경사로', width: '82%', color: 'bg-rose-500', rank: '1순위' },
                        { label: '손잡이', width: '72%', color: 'bg-orange-500', rank: '2순위' },
                      ].map((bar) => (
                        <div key={bar.label} className="grid grid-cols-[62px_minmax(0,1fr)_42px] items-center gap-3">
                          <span className="text-[12px] font-black text-slate-500">{bar.label}</span>
                          <span className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                            <span className={`block h-full rounded-full ${bar.color}`} style={{ width: bar.width }} />
                          </span>
                          <span className="text-right text-[11px] font-black text-slate-500">{bar.rank}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </article>

              <aside className="grid min-w-0 gap-4 xl:grid-rows-[auto_minmax(0,1fr)]">
                <section className="min-w-0 rounded-2xl bg-white p-5 shadow-[0_18px_44px_rgba(33,91,145,0.1)]">
                  <div className="flex items-start justify-between">
                    <h3 className="text-[16px] font-black text-navy-950">출력 옵션</h3>
                    <span className="text-[10px] font-black text-slate-400">PDF / 문서</span>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {previewOptions.map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        className="grid min-w-0 grid-cols-[42px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-blue-100 bg-white px-3 py-3 text-left shadow-sm hover:border-action-200 hover:bg-blue-50/40"
                      >
                        <span className={`grid h-9 w-9 place-items-center rounded-full text-[10px] font-black ${option.tone}`}>
                          {option.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[12px] font-black text-navy-950">{option.label}</span>
                          <span className="mt-0.5 block truncate text-[10px] font-bold text-slate-400">{option.caption}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-[14px] bg-action-500 text-[12px] font-black text-white shadow-[0_12px_22px_rgba(36,119,255,0.22)] hover:bg-action-600"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    리포트 다운로드
                  </button>
                </section>

                <section className="min-w-0 rounded-2xl bg-white p-5 shadow-[0_18px_44px_rgba(33,91,145,0.1)]">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-action-600" aria-hidden="true" />
                    <h3 className="text-[16px] font-black text-navy-950">문서 활용 포인트</h3>
                  </div>
                  <div className="mt-4 rounded-[14px] border border-cyan-100 bg-civic-50 px-4 py-3">
                    <p className="text-[12px] font-bold leading-5 text-civic-800">
                      위험구간 지도, 접근성 점수, 개선 우선순위를 한 문서로 묶어 현장 검수와 예산 우선순위 판단 근거로 사용할 수 있습니다.
                    </p>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {previewUsagePoints.map((point) => (
                      <div key={point.label} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-civic-50 text-[11px] font-black text-civic-700">
                          {point.label}
                        </span>
                        <p className="text-[12px] font-semibold leading-5 text-slate-600">{point.text}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function getInitialPreviewOpen() {
  return new URLSearchParams(window.location.search).get('preview') === '1';
}

export function ReportExportPage() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(getInitialPreviewOpen);
  const report = reportPreviews[0];

  useEffect(() => {
    if (!isPreviewOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPreviewOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreviewOpen]);

  return (
    <div className="report-export-screen flex min-w-0 flex-col gap-3 xl:gap-4">
      <header className="flex shrink-0 flex-col gap-4 xl:flex-row xl:items-start xl:justify-between xl:gap-5">
        <div>
          <p className="text-sm font-black text-civic-700">PC 환경 · 시민제보/AI 검수</p>
          <h1 className="mt-1 text-[31px] font-black leading-none text-navy-950">행정 리포트 출력 설정</h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            감천문화마을 보행취약구간 분석 리포트의 행정 검토·공유용 출력 구성을 설정합니다.
          </p>
        </div>

        <div className="hidden items-center gap-3 2xl:flex">
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
            onClick={() => setIsPreviewOpen(true)}
            aria-haspopup="dialog"
            className="flex h-12 items-center gap-2 rounded-2xl bg-action-500 px-6 text-sm font-black text-white shadow-[0_12px_24px_rgba(36,119,255,0.22)]"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            미리보기
          </button>
        </div>
      </header>

      <section className="grid min-h-0 min-w-0 flex-1 items-start gap-4 xl:grid-cols-[470px_minmax(0,1fr)] 2xl:grid-cols-[500px_minmax(0,1fr)] 2xl:items-stretch">
        <aside className="app-card flex min-h-0 min-w-0 flex-col p-4 xl:p-5">
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
              <button type="button" className="hidden rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-action-600 sm:inline-flex">
                상세
              </button>
            </div>
          </div>

          <div className="mt-4 flex min-h-0 flex-1 flex-col">
            <p className="text-xs font-black text-slate-400">포함 항목</p>
            <div className="mt-3 grid flex-1 content-stretch gap-2.5">
              {reportItems.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="flex h-full min-h-[68px] w-full items-center gap-3 rounded-2xl border border-blue-50 bg-white px-4 py-3 text-left shadow-sm transition hover:border-action-200 hover:bg-blue-50/30"
                  aria-pressed="true"
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl border ${item.tone}`}>
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black text-navy-950">{item.title}</span>
                    <span className="mt-1 block truncate text-xs font-semibold text-slate-500">{item.description}</span>
                  </span>
                  <span className={`hidden rounded-full px-3 py-1 text-xs font-black sm:inline-flex ${item.statusTone}`}>포함</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid shrink-0 gap-2.5">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              aria-haspopup="dialog"
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

        <article className="app-card grid min-h-0 min-w-0 p-4 xl:grid-rows-[auto_1fr] xl:p-5">
          <div className="flex shrink-0 items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-navy-950">리포트 생성 미리보기</h2>
              <p className="mt-1 text-xs font-bold text-slate-400">{report.exportType || 'On-gil Report'}</p>
            </div>
            <span className="text-xs font-black text-slate-400">행정 문서용 요약</span>
          </div>

          <div className="mt-4 grid min-h-0 gap-3 xl:grid-rows-[auto_auto_auto]">
            <div className="grid min-h-0 gap-4 2xl:grid-cols-[minmax(430px,1.35fr)_minmax(280px,0.65fr)]">
              <div className="min-h-[300px] md:min-h-[340px] xl:h-[360px] xl:min-h-0 2xl:h-[400px]">
                <ReportExportLeafletMap />
              </div>

              <div className="flex min-h-0 flex-col gap-3">
                <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-blue-100 bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-civic-600" aria-hidden="true" />
                    <h3 className="text-sm font-black text-navy-950">리포트 목차</h3>
                  </div>
                  <div className="mt-3 grid flex-1 content-around gap-2.5">
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
                  <p className="text-sm font-black leading-5 text-civic-800">자치단체 담당자가 바로 내부 검토자료로 사용할 수 있도록 표지, 요약, 지도, 표, 개선안 순서로 정리됩니다.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 xl:grid-cols-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-blue-50 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-black text-slate-400">{metric.label}</p>
                  <p className={`mt-1 text-2xl font-black ${metric.tone}`}>{metric.value}</p>
                  <p className="text-xs font-bold text-slate-500">{metric.caption}</p>
                </div>
              ))}
            </div>

            <div className="grid min-h-0 gap-4 2xl:grid-cols-[minmax(0,1fr)_420px]">
              <section className="flex min-h-0 min-w-0 flex-col rounded-2xl border border-blue-100 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-navy-950">개선 우선순위 미리보기</h3>
                  <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-600">TOP 3</span>
                </div>
                <div className="mt-3 grid flex-1 content-around gap-3">
                  {priorityRows.map((row, index) => (
                    <div key={row.place} className="grid grid-cols-[36px_minmax(0,1fr)_48px] items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3 sm:grid-cols-[42px_minmax(0,1fr)_64px_56px] sm:gap-3 sm:px-4">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-sm font-black text-action-600 shadow-sm">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-navy-950">{row.place}</p>
                        <p className="mt-0.5 truncate text-xs font-semibold text-slate-500">{row.detail}</p>
                      </div>
                      <p className="text-right text-lg font-black text-rose-600">{row.score}</p>
                      <span className="hidden rounded-full bg-white px-2 py-1 text-center text-xs font-black text-slate-600 shadow-sm sm:inline-block">{row.badge}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex min-h-0 min-w-0 flex-col rounded-2xl border border-blue-100 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <MapPinned className="h-5 w-5 text-action-600" aria-hidden="true" />
                  <h3 className="text-base font-black text-navy-950">출력 문서 요약</h3>
                </div>
                <div className="mt-4 flex flex-1 flex-col justify-center rounded-2xl bg-white p-4 shadow-sm">
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
          </div>
        </article>
      </section>

      {isPreviewOpen ? <ReportPreviewModal onClose={() => setIsPreviewOpen(false)} /> : null}
    </div>
  );
}
