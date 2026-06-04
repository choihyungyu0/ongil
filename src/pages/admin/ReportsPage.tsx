import { useState } from 'react';
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  FilePlus2,
  Layers3,
  Merge,
  Search,
  ShieldCheck,
} from 'lucide-react';
import busNightPhoto from '../../../asset/08f63d83-7fb3-40c2-b5fa-efeb7b7babf8.png';
import tactileDamagePhoto from '../../../asset/166ffa68-77be-40bf-8119-1a42895f7ecc.png';
import treeWalkwayPhoto from '../../../asset/464f37ab-dfc1-4fa8-b954-19e479a945be.png';
import tactilePathPhoto from '../../../asset/b915f762-f370-4fa6-9437-092d8f7daea1.png';
import busStopPhoto from '../../../asset/cb44152e-dc52-498f-9458-c1f065adf032.png';
import bollardPhoto from '../../../asset/d47adf62-6bb4-40fc-9b06-213e50e59d14.png';
import mapPreviewImage from '../../../asset/ongil_map_second_image.png';
import { reportInboxItems, reportInboxStats, type ReportInboxItem, type ReportInboxStatus } from '../../data/reportInboxData';

const photoByKey: Record<ReportInboxItem['photoKey'], string> = {
  busNight: busNightPhoto,
  tactileDamage: tactileDamagePhoto,
  treeWalkway: treeWalkwayPhoto,
  tactilePath: tactilePathPhoto,
  busStop: busStopPhoto,
  bollard: bollardPhoto,
};

const statusTone: Record<ReportInboxStatus, string> = {
  검수중: 'border-orange-100 bg-orange-50 text-orange-700',
  접수: 'border-blue-100 bg-blue-50 text-action-600',
  긴급: 'border-rose-100 bg-rose-50 text-rose-600',
  병합: 'border-violet-100 bg-violet-50 text-violet-700',
  현장확인: 'border-rose-100 bg-rose-50 text-rose-600',
  조치예정: 'border-emerald-100 bg-emerald-50 text-emerald-700',
};

const riskTone: Record<string, string> = {
  '계단·단차': 'bg-rose-50 text-rose-600',
  급경사: 'bg-orange-50 text-orange-700',
  점자블록: 'bg-violet-50 text-violet-700',
  보도파손: 'bg-amber-50 text-amber-700',
  볼라드: 'bg-orange-50 text-orange-700',
  횡단위험: 'bg-blue-50 text-action-600',
  단차: 'bg-orange-50 text-orange-700',
  쉼터부족: 'bg-cyan-50 text-civic-700',
};

const statDecorations = [
  { icon: AlertTriangle, iconClass: 'bg-orange-50 text-orange-500', valueClass: 'text-action-600' },
  { icon: Clock3, iconClass: 'bg-rose-50 text-rose-500', valueClass: 'text-rose-600' },
  { icon: Merge, iconClass: 'bg-violet-50 text-violet-600', valueClass: 'text-action-600' },
  { icon: ShieldCheck, iconClass: 'bg-civic-50 text-civic-600', valueClass: 'text-civic-700' },
];

const detailMetrics = [
  { label: '중복 제보', key: 'duplicateCount', suffix: '건', tone: 'text-action-600' },
  { label: 'AI 신뢰도', key: 'confidence', suffix: '', tone: 'text-civic-700' },
  { label: '예상 점수', key: 'accessScore', suffix: '점', tone: 'text-rose-600' },
  { label: '개선 필요도', key: 'riskScore', suffix: '%', tone: 'text-orange-600' },
] as const;

function PageControls() {
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-blue-100 bg-white px-3 text-[12px] font-extrabold text-slate-500 shadow-sm"
      >
        <CalendarDays className="h-4 w-4 text-slate-400" aria-hidden="true" />
        2026.05.11 ~ 2026.06.07
      </button>
      <label className="relative block">
        <span className="sr-only">지역, 위험유형, 리포트 검색</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="지역, 위험유형, 리포트 검색"
          className="h-10 w-[330px] rounded-[14px] border border-blue-100 bg-white pl-11 pr-4 text-[12px] font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
        />
      </label>
      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-[14px] border border-blue-100 bg-white px-3 text-[12px] font-black text-navy-800 shadow-sm"
      >
        부산광역시
        <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-[14px] bg-action-500 px-4 text-[12px] font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.24)] hover:bg-action-600"
      >
        <FilePlus2 className="h-4 w-4" aria-hidden="true" />
        제보 등록
      </button>
    </div>
  );
}

function SummaryCards() {
  return (
    <section className="grid shrink-0 gap-3 xl:grid-cols-4" aria-label="제보 검수 요약">
      {reportInboxStats.map((item, index) => {
        const decoration = statDecorations[index];
        const Icon = decoration.icon;

        return (
          <article key={item.label} className="grid min-h-[72px] grid-cols-[42px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-blue-100/80 bg-white px-4 py-3 shadow-sm">
            <span className={`grid h-9 w-9 place-items-center rounded-full ${decoration.iconClass}`}>
              <Icon className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-black text-slate-500">{item.label}</span>
              <span className={`mt-0.5 block text-[22px] font-black leading-6 ${decoration.valueClass}`}>{item.value}</span>
              <span className="mt-0.5 flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <span>{item.caption}</span>
                <span className="text-orange-500">{item.trend}</span>
              </span>
            </span>
          </article>
        );
      })}
    </section>
  );
}

function ReportTable({
  selectedReport,
  onSelect,
}: {
  selectedReport: ReportInboxItem;
  onSelect: (reportId: string) => void;
}) {
  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-[18px] border border-blue-100/80 bg-white shadow-[0_18px_44px_rgba(33,91,145,0.08)]">
      <div className="flex shrink-0 items-center justify-between gap-3 px-5 pb-3 pt-4">
        <div>
          <h2 className="text-[18px] font-black leading-6 text-navy-950">제보 목록</h2>
          <p className="mt-0.5 text-[11px] font-bold text-slate-400">최근 30일 기준 · 행을 선택하면 상세 검수 화면이 갱신됩니다.</p>
        </div>
        <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-black text-slate-500">최근 30일</span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4">
        <div className="grid h-full min-w-[790px] grid-rows-[34px_repeat(8,minmax(48px,1fr))] overflow-hidden rounded-[12px] border border-slate-100">
          <div className="grid grid-cols-[78px_minmax(150px,1.1fr)_106px_84px_78px_94px_70px] items-center gap-3 bg-slate-50/70 px-3 text-[11px] font-black text-slate-400">
            <span>ID</span>
            <span>위치</span>
            <span>위험유형</span>
            <span>사용자</span>
            <span>신뢰도</span>
            <span>상태</span>
            <span>접수일</span>
          </div>

          {reportInboxItems.map((report) => {
            const isSelected = report.id === selectedReport.id;

            return (
              <button
                key={report.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(report.id)}
                className={[
                  'grid grid-cols-[78px_minmax(150px,1.1fr)_106px_84px_78px_94px_70px] items-center gap-3 border-t border-slate-100 px-3 text-left transition',
                  isSelected ? 'bg-civic-50/70 shadow-[inset_4px_0_0_#1aa6b0]' : 'bg-white hover:bg-blue-50/50',
                ].join(' ')}
              >
                <span className="text-[12px] font-black text-action-600">{report.id}</span>
                <span className="truncate text-[13px] font-black text-navy-900">{report.location}</span>
                <span className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-black ${riskTone[report.riskType] ?? 'bg-slate-100 text-slate-600'}`}>
                  {report.riskType}
                </span>
                <span className="truncate text-[12px] font-extrabold text-slate-500">{report.reporter}</span>
                <span className="text-[12px] font-black text-civic-700">{report.confidence.toFixed(2)}</span>
                <span className={`w-fit rounded-full border px-2.5 py-1 text-[11px] font-black ${statusTone[report.status]}`}>{report.status}</span>
                <span className="text-[11px] font-bold text-slate-400">{report.createdAt}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DetailMetric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-[12px] border border-blue-100 bg-slate-50/60 px-4 py-3">
      <p className="text-[11px] font-black text-slate-400">{label}</p>
      <p className={`mt-1 text-[22px] font-black leading-6 ${tone}`}>{value}</p>
    </div>
  );
}

function ReportDetail({ report }: { report: ReportInboxItem }) {
  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-[18px] border border-blue-100/80 bg-white shadow-[0_18px_44px_rgba(33,91,145,0.08)]">
      <div className="flex shrink-0 items-center justify-between gap-3 px-5 pb-3 pt-4">
        <h2 className="text-[18px] font-black leading-6 text-navy-950">선택 제보 상세</h2>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700">AI 분석 완료</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 px-5 pb-5">
        <div className="grid min-h-[230px] flex-[1.15] grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-3">
          <div className="relative overflow-hidden rounded-[16px] bg-slate-100 shadow-sm">
            <img src={photoByKey[report.photoKey]} alt={`${report.location} 제보 사진`} className="h-full w-full object-cover" />
            <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-black text-white shadow-sm">{report.id}</span>
            <span className="absolute bottom-3 left-3 rounded-full bg-white/92 px-4 py-1.5 text-[11px] font-black text-navy-900 shadow-sm">
              {report.riskTags[0]}
            </span>
          </div>

          <div className="relative overflow-hidden rounded-[16px] border border-blue-100 bg-blue-50 shadow-sm">
            <img src={mapPreviewImage} alt="제보 위치 mock 지도" className="h-full w-full object-cover" />
            <span className="absolute left-[47%] top-[33%] rounded-full bg-white px-3 py-1 text-[11px] font-black text-navy-900 shadow-[0_4px_14px_rgba(15,29,51,0.14)]">
              <span className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-500" />
              {report.id}
            </span>
            <span className="absolute bottom-3 right-3 rounded-full bg-civic-600 px-3 py-1 text-[11px] font-black text-white shadow-sm">위치 확인</span>
          </div>
        </div>

        <div className="shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            {report.riskTags.map((tag) => (
              <span key={tag} className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-black text-action-600">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-3 text-[21px] font-black leading-7 text-navy-950">{report.title}</h3>
          <p className="mt-1.5 text-[12px] font-semibold leading-5 text-slate-500">{report.summary}</p>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-3">
          {detailMetrics.map((metric) => {
            const rawValue = report[metric.key];
            const value = metric.key === 'confidence' ? (rawValue as number).toFixed(2) : `${rawValue}${metric.suffix}`;

            return <DetailMetric key={metric.label} label={metric.label} value={value} tone={metric.tone} />;
          })}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_180px] gap-3">
          <div className="rounded-[14px] border border-civic-100 bg-civic-50/70 px-4 py-3">
            <p className="text-[12px] font-black text-civic-700">관리자 메모</p>
            <p className="mt-2 text-[12px] font-semibold leading-5 text-slate-600">{report.managementNote}</p>
          </div>
          <div className="rounded-[14px] border border-blue-100 bg-white px-4 py-3">
            <p className="text-[12px] font-black text-slate-500">관리 상태</p>
            <p className="mt-2 text-[18px] font-black text-navy-950">{report.priorityLabel}</p>
            <p className="mt-1 text-[11px] font-bold text-slate-400">{report.duplicateCount}건 묶음 검토</p>
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-3 gap-2">
          <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-civic-600 text-[12px] font-black text-white hover:bg-civic-700">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {report.priorityLabel}
          </button>
          <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-action-500 text-[12px] font-black text-white hover:bg-action-600">
            <Layers3 className="h-4 w-4" aria-hidden="true" />
            중복구간 병합
          </button>
          <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-blue-100 bg-white text-[12px] font-black text-slate-600 hover:border-action-500 hover:text-action-600">
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            보류
          </button>
        </div>
      </div>
    </section>
  );
}

export function ReportsPage() {
  const [selectedReportId, setSelectedReportId] = useState(reportInboxItems[0].id);
  const selectedReport = reportInboxItems.find((report) => report.id === selectedReportId) ?? reportInboxItems[0];

  return (
    <div className="reports-detail-screen flex flex-col gap-3 overflow-hidden py-0">
      <header className="flex shrink-0 flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <p className="text-[12px] font-black leading-4 text-civic-700">PC 환경 · 시민제보/AI 검수</p>
          <h1 className="mt-0.5 text-[30px] font-black leading-9 text-navy-950">시민 기반 위험구간 제보함</h1>
          <p className="text-[13px] font-semibold leading-5 text-slate-500">사진·위치·위험유형 제보를 분류하고 중복 제보를 병합합니다.</p>
        </div>
        <PageControls />
      </header>

      <SummaryCards />

      <div className="grid min-h-0 flex-1 gap-3 xl:grid-cols-[minmax(680px,1.05fr)_minmax(520px,0.95fr)]">
        <ReportTable selectedReport={selectedReport} onSelect={setSelectedReportId} />
        <ReportDetail report={selectedReport} />
      </div>

      <div className="sr-only" aria-live="polite">
        선택된 제보는 {selectedReport.title}이며 AI 신뢰도는 {selectedReport.confidence.toFixed(2)}입니다.
      </div>
    </div>
  );
}
