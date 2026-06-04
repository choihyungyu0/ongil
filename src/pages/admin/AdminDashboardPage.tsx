import {
  Accessibility,
  Baby,
  ChevronDown,
  Download,
  Eye,
  Search,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import tactileIcon from '../../../asset/image-removebg-preview (2).png';
import tactileAltIcon from '../../../asset/image-removebg-preview (3).png';
import stairIcon from '../../../asset/image-removebg-preview (1).png';
import bollardIcon from '../../../asset/image-removebg-preview (6).png';
import dashboardMapImage from '../../../asset/d44ecfd2-03aa-4757-97ae-169a227f42ac (1).png';
import { dangerZones } from '../../data/mockData';

const metricCards = [
  {
    label: '전체 위험구간',
    value: '1,248',
    delta: '▲ 5.2% 전일 대비',
    accent: 'bg-blue-50 text-action-600',
    badge: '위',
    deltaTone: 'text-rose-500',
  },
  {
    label: '오늘 신규 제보',
    value: '87',
    delta: '▲ 12.1% 전일 대비',
    accent: 'bg-orange-50 text-orange-500',
    badge: '제',
    deltaTone: 'text-rose-500',
  },
  {
    label: '조치 완료',
    value: '632',
    delta: '▲ 8.7%',
    accent: 'bg-emerald-50 text-emerald-600',
    badge: '완',
    deltaTone: 'text-civic-600',
  },
  {
    label: '평균 위험도',
    value: '3.7',
    delta: '▲ 0.3',
    accent: 'bg-rose-50 text-rose-500',
    badge: '정',
    deltaTone: 'text-rose-500',
  },
];

const mapFilters = [
  { label: '전체', active: true },
  { label: '휠체어 사용자', icon: Accessibility },
  { label: '시각장애인', icon: Eye },
  { label: '고령자' },
  { label: '유모차 이용자', icon: Baby },
  { label: '관광약자', icon: Users },
];

const monthlyBars = [
  { label: '12월', value: 58, color: 'linear-gradient(180deg, #2477ff, #0ea5e9)' },
  { label: '1월', value: 74, color: 'linear-gradient(180deg, #fb923c, #f59e0b)' },
  { label: '2월', value: 88, color: 'linear-gradient(180deg, #f43f5e, #ef4444)' },
  { label: '3월', value: 64, color: 'linear-gradient(180deg, #2477ff, #0891b2)' },
  { label: '4월', value: 82, color: 'linear-gradient(180deg, #fb923c, #f97316)' },
  { label: '5월', value: 96, color: 'linear-gradient(180deg, #fb7185, #ef4444)' },
];

const reportStatus = [
  { label: '신고 현황', value: 388, width: '76%', color: 'bg-action-500' },
  { label: '해결 현황', value: 246, width: '54%', color: 'bg-civic-500' },
  { label: '개선 예정', value: 74, width: '31%', color: 'bg-orange-500' },
];

const riskCards = [
  {
    label: '급경사 구간',
    count: '312건',
    delta: '▲ 8%',
    image: stairIcon,
    color: '#fb7185',
    bg: 'bg-rose-50',
    values: [26, 58, 32, 72, 41, 68],
  },
  {
    label: '계단/단차',
    count: '487건',
    delta: '▲ 14%',
    image: stairIcon,
    color: '#fb923c',
    bg: 'bg-orange-50',
    values: [62, 38, 50, 76, 53, 44],
  },
  {
    label: '점자블록 문제',
    count: '832건',
    delta: '▲ 21%',
    image: tactileIcon,
    color: '#f59e0b',
    bg: 'bg-amber-50',
    values: [44, 72, 46, 82, 48, 65],
  },
  {
    label: '보도블록 파손',
    count: '641건',
    delta: '▲ 16%',
    image: tactileAltIcon,
    color: '#8b5cf6',
    bg: 'bg-violet-50',
    values: [40, 63, 45, 80, 52, 66],
  },
  {
    label: '볼라드 간격',
    count: '278건',
    delta: '▲ 9%',
    image: bollardIcon,
    color: '#14b8a6',
    bg: 'bg-cyan-50',
    values: [54, 34, 67, 42, 58, 36],
  },
  {
    label: '횡단보도 위험',
    count: '296건',
    delta: '▲ 11%',
    image: tactileIcon,
    color: '#3b82f6',
    bg: 'bg-blue-50',
    values: [50, 70, 38, 76, 43, 62],
  },
];

const levelTone: Record<string, string> = {
  '매우 높음': 'bg-rose-50 text-rose-500',
  높음: 'bg-orange-50 text-orange-500',
  주의: 'bg-blue-50 text-action-600',
  낮음: 'bg-emerald-50 text-emerald-600',
};

function shortRiskLabel(label: string) {
  if (label.includes('급경사')) return '급경사';
  if (label.includes('계단')) return '계단';
  if (label.includes('단차')) return '단차';
  if (label.includes('점자')) return '점자블록';
  if (label.includes('볼라드')) return '볼라드';
  if (label.includes('쉼터')) return '쉼터';
  if (label.includes('혼잡')) return '혼잡';
  if (label.includes('횡단')) return '횡단';
  if (label.includes('노면')) return '노면 파손';
  return label;
}

function MiniSparkline({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 38 - ((value - min) / Math.max(max - min, 1)) * 28;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className="h-6 w-full" viewBox="0 0 100 42" preserveAspectRatio="none" aria-hidden="true">
      <polyline fill="none" points={points} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d={`M0,40 L${points.replace(/ /g, ' L')} L100,42 L0,42 Z`} fill={color} opacity="0.12" />
    </svg>
  );
}

function StatCard({ card }: { card: (typeof metricCards)[number] }) {
  return (
    <article className="h-[72px] rounded-[18px] border border-blue-100/70 bg-white px-5 py-2 shadow-[0_12px_30px_rgba(33,91,145,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold text-slate-500">{card.label}</p>
          <strong className="block text-[25px] font-black leading-none tracking-tight text-navy-950">{card.value}</strong>
          <span className={`mt-0.5 block text-[10px] font-black ${card.deltaTone}`}>{card.delta}</span>
        </div>
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-2xl text-xs font-black ${card.accent}`}>
          {card.badge}
        </span>
      </div>
    </article>
  );
}

function HeatmapPanel() {
  return (
    <section className="flex h-full min-h-0 flex-col rounded-[18px] border border-blue-100/70 bg-white p-3 shadow-[0_12px_30px_rgba(33,91,145,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-black tracking-tight text-navy-950">부산 보행취약지역 히트맵</h2>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
          <span>낮음</span>
          <span className="h-2 w-24 rounded-full bg-[linear-gradient(90deg,#14b8a6,#facc15,#fb923c,#ef4444)]" />
          <span>높음</span>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {mapFilters.map(({ label, active, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className={[
              'inline-flex h-7 items-center gap-1.5 rounded-full border px-3 text-[11px] font-extrabold transition',
              active ? 'border-civic-200 bg-civic-50 text-civic-700' : 'border-slate-200 bg-white text-slate-500 hover:border-blue-200',
            ].join(' ')}
          >
            {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
            {label}
          </button>
        ))}
      </div>

      <div
        className="relative mt-2 min-h-0 flex-1 overflow-hidden rounded-[14px] border border-blue-100 bg-[#dcebf4]"
        role="img"
        aria-label="부산 보행취약지역 위험도 히트맵 mock 지도"
      >
        <img
          src={dashboardMapImage}
          alt="부산 보행취약지역 히트맵 mock 지도"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

function TopZonePanel() {
  return (
    <section className="flex min-h-0 flex-col rounded-[18px] border border-blue-100/70 bg-white p-3 shadow-[0_12px_30px_rgba(33,91,145,0.08)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black text-navy-950">위험구간 TOP 10</h2>
        <Link to="/admin/zones" className="text-[11px] font-black text-slate-400 hover:text-action-600">
          더보기 &gt;
        </Link>
      </div>
      <ol className="mt-2 grid flex-1 content-between">
        {dangerZones.slice(0, 10).map((zone, index) => (
          <li key={zone.id} className="grid h-3.5 grid-cols-[16px_minmax(0,1fr)_50px_28px] items-center gap-2 text-[9px] leading-none">
            <span className="font-black text-navy-900">{index + 1}</span>
            <span className="truncate font-extrabold text-slate-700">{zone.name}</span>
            <span className={`h-3.5 max-w-[50px] truncate whitespace-nowrap rounded-full px-1.5 text-center text-[9px] font-black leading-[14px] ${levelTone[zone.level]}`}>
              {shortRiskLabel(zone.primaryRisks[0])}
            </span>
            <span className="justify-self-end font-black text-rose-500">{(zone.priority / 20).toFixed(1)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function MonthlyTrendPanel() {
  return (
    <section className="flex min-h-0 flex-col rounded-[18px] border border-blue-100/70 bg-white p-3 shadow-[0_12px_30px_rgba(33,91,145,0.08)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black text-navy-950">월별 위험유형 추이</h2>
        <span className="text-[11px] font-black text-slate-400">최근 6개월</span>
      </div>
      <div className="mt-3 flex min-h-0 flex-1 items-end gap-4 px-1">
        {monthlyBars.map((bar) => (
          <div key={bar.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
            <div className="flex min-h-0 w-full flex-1 items-end justify-center">
              <span
                className="w-full max-w-[28px] rounded-t-[10px]"
                style={{ height: `${bar.value}%`, background: bar.color }}
                aria-label={`${bar.label} 위험유형 지수 ${bar.value}`}
              />
            </div>
            <span className="text-[10px] font-black text-slate-400">{bar.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 space-y-1">
        {reportStatus.map((item) => (
          <div key={item.label} className="grid grid-cols-[58px_minmax(0,1fr)_32px] items-center gap-2 text-[9px] font-black">
            <span className="text-slate-500">{item.label}</span>
            <span className="h-2 overflow-hidden rounded-full bg-slate-100">
              <span className={`block h-full rounded-full ${item.color}`} style={{ width: item.width }} />
            </span>
            <span className="text-right text-slate-500">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RiskTypeCards() {
  return (
    <section className="shrink-0 rounded-[18px] border border-blue-100/70 bg-white p-2.5 shadow-[0_12px_30px_rgba(33,91,145,0.08)]">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black tracking-tight text-navy-950">주요 위험 유형 현황</h2>
        <Link to="/admin/analysis" className="text-xs font-black text-slate-400 hover:text-action-600">
          자세히 보기 &gt;
        </Link>
      </div>
      <div className="mt-1.5 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {riskCards.map((risk) => (
          <article key={risk.label} className="rounded-[14px] border border-slate-100 bg-white p-2 shadow-[0_8px_18px_rgba(33,91,145,0.05)]">
            <div className="flex items-start gap-2">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${risk.bg}`}>
                <img src={risk.image} alt="" className="h-6 w-6 object-contain" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-black text-navy-950">{risk.label}</p>
                <p className="text-[10px] font-extrabold text-slate-500">{risk.count}</p>
                <p className="text-[10px] font-black text-rose-500">{risk.delta}</p>
              </div>
            </div>
            <div>
              <MiniSparkline values={risk.values} color={risk.color} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AdminDashboardPage() {
  return (
    <div className="dashboard-screen-fit">
      <header className="flex flex-col gap-2 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[10px] font-black leading-3 text-civic-700">PC 환경 · 지자체/행정 담당자용</p>
          <h1 className="text-[24px] font-black leading-7 tracking-tight text-navy-950">
            부산 보행접근성 대시보드
          </h1>
          <p className="text-[11px] font-semibold leading-3 text-slate-500">
            부산 지도 기반의 보행취약지역 히트맵과 위험구간 TOP 10을 한눈에 확인합니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative block">
            <span className="sr-only">지역, 위험유형, 리포트 검색</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="지역, 위험유형, 리포트 검색"
              className="h-10 w-[270px] rounded-2xl border border-blue-100 bg-white pl-10 pr-4 text-xs font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
            />
          </label>
          <button type="button" className="inline-flex h-10 items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-xs font-black text-navy-800 shadow-sm">
            부산광역시
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
          <button type="button" className="inline-flex h-10 items-center gap-2 rounded-2xl bg-action-500 px-4 text-xs font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.25)] hover:bg-action-600">
            <Download className="h-4 w-4" aria-hidden="true" />
            리포트 출력
          </button>
        </div>
      </header>

      <section className="grid shrink-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => (
          <StatCard key={card.label} card={card} />
        ))}
      </section>

      <section
        className="dashboard-main-grid grid shrink-0 gap-3 xl:grid-cols-[minmax(0,1fr)_300px]"
        style={{ height: 'calc(100vh - 320px)' }}
      >
        <HeatmapPanel />
        <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-3">
          <TopZonePanel />
          <MonthlyTrendPanel />
        </div>
      </section>

      <RiskTypeCards />
    </div>
  );
}
