import {
  Accessibility,
  Armchair,
  Camera,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Download,
  Gauge,
  MapPin,
  MessageSquareWarning,
  Moon,
  Mountain,
  Route,
  Search,
  TrafficCone,
  TriangleAlert,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Circle, CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from 'react-leaflet';
import {
  accessibilityComparisonSummary,
  accessibilityDistrictComparisons,
  accessibilityLayerItems,
  accessibilityMapDistricts,
  accessibilityRiskShares,
  accessibilityUserImpacts,
} from '../../data/mockData';

const layerToneClass = {
  cyan: 'bg-cyan-50 text-cyan-600',
  blue: 'bg-blue-50 text-action-600',
  orange: 'bg-orange-50 text-orange-500',
  violet: 'bg-violet-50 text-violet-500',
  emerald: 'bg-emerald-50 text-emerald-600',
  rose: 'bg-rose-50 text-rose-500',
  sky: 'bg-sky-50 text-sky-500',
  amber: 'bg-amber-50 text-amber-500',
};

const summaryToneClass = {
  cyan: {
    icon: 'bg-civic-50 text-civic-600',
    caption: 'text-civic-600',
  },
  blue: {
    icon: 'bg-blue-50 text-action-600',
    caption: 'text-action-600',
  },
  rose: {
    icon: 'bg-rose-50 text-rose-500',
    caption: 'text-rose-500',
  },
  emerald: {
    icon: 'bg-emerald-50 text-emerald-600',
    caption: 'text-emerald-600',
  },
};

const districtToneClass = {
  rose: 'border-rose-100 bg-rose-50 text-rose-500',
  orange: 'border-orange-100 bg-orange-50 text-orange-500',
  amber: 'border-amber-100 bg-amber-50 text-amber-600',
  blue: 'border-blue-100 bg-blue-50 text-action-600',
  emerald: 'border-civic-100 bg-civic-50 text-civic-700',
};

const layerIcons = {
  dem: Mountain,
  road: Route,
  crosswalk: TrafficCone,
  facility: Accessibility,
  survey: Camera,
  'report-density': MessageSquareWarning,
  shelter: Armchair,
  lighting: Moon,
};

const summaryIcons = [MapPin, Gauge, TriangleAlert, CheckCircle2];

const accessibilityMapBounds: LatLngBoundsExpression = [
  [35.094, 129.006],
  [35.126, 129.058],
] as const;

const mapLabelPoints = [
  { label: '초량이바구길', position: [35.1191, 129.0365] as LatLngExpression, color: '#ef4444', tone: 'strong' },
  { label: '산복도로', position: [35.1212, 129.0502] as LatLngExpression, color: '#0f1d33', tone: 'road' },
  { label: '서구', position: [35.1081, 129.0208] as LatLngExpression, color: '#0f1d33', tone: 'district' },
  { label: '부산역', position: [35.1152, 129.0418] as LatLngExpression, color: '#2477ff', tone: 'station' },
  { label: '감천문화마을', position: [35.0988, 129.0108] as LatLngExpression, color: '#0f1d33', tone: 'place' },
  { label: '중구', position: [35.1056, 129.0328] as LatLngExpression, color: '#64748b', tone: 'district' },
  { label: '영도구', position: [35.0952, 129.0468] as LatLngExpression, color: '#64748b', tone: 'district' },
] as const;

const mapRiskPoints = [
  { id: 'choryang-top-risk', label: '', position: [35.1184, 129.0382] as LatLngExpression, color: '#ef4444', radius: 8, permanent: false },
  { id: 'detour-needed', label: '보행 주의', position: [35.1087, 129.0251] as LatLngExpression, color: '#2477ff', radius: 6, permanent: false },
  { id: 'curb-risk', label: '단차', position: [35.1138, 129.0422] as LatLngExpression, color: '#ff8a2a', radius: 6, permanent: false },
  { id: 'shelter', label: '쉼터', position: [35.1216, 129.0492] as LatLngExpression, color: '#7b61ff', radius: 6, permanent: false },
  { id: 'facility', label: '편의시설', position: [35.0961, 129.0456] as LatLngExpression, color: '#18c5ad', radius: 6, permanent: false },
] as const;

const heatCircles = [
  { center: [35.1184, 129.0382] as LatLngExpression, radius: 900, color: '#ef4444', fillOpacity: 0.26 },
  { center: [35.111, 129.027] as LatLngExpression, radius: 1450, color: '#facc15', fillOpacity: 0.2 },
  { center: [35.1002, 129.0126] as LatLngExpression, radius: 1150, color: '#22c55e', fillOpacity: 0.16 },
  { center: [35.1137, 129.042] as LatLngExpression, radius: 760, color: '#fb7185', fillOpacity: 0.14 },
] as const;

function getRiskGradient() {
  const total = accessibilityRiskShares.reduce((sum, item) => sum + item.value, 0);
  let start = 0;

  const stops = accessibilityRiskShares.map((item) => {
    const end = start + (item.value / total) * 100;
    const stop = `${item.color} ${start}% ${end}%`;
    start = end;
    return stop;
  });

  return `conic-gradient(${stops.join(', ')})`;
}

function ToggleSwitch({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <button
      type="button"
      aria-label={`${label} ${enabled ? '켜짐' : '꺼짐'}`}
      className={[
        'relative h-5 w-8 shrink-0 rounded-full transition sm:w-10',
        enabled ? 'bg-civic-500' : 'bg-slate-200',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-1 h-3 w-3 rounded-full bg-white shadow-sm transition',
          enabled ? 'left-4 sm:left-6' : 'left-1',
        ].join(' ')}
      />
    </button>
  );
}

function LayerPanel() {
  return (
    <aside className="flex min-h-0 w-[340px] min-w-0 max-w-[calc(100vw-2rem)] flex-col rounded-[24px] border border-blue-100/80 bg-white/95 p-3 shadow-[0_20px_44px_rgba(33,91,145,0.08)] sm:w-full sm:max-w-full sm:p-4 xl:p-5">
      <header className="shrink-0">
        <p className="text-[11px] font-black leading-4 text-civic-700">GIS 데이터 · 레이어 설정</p>
        <h1 className="mt-1 text-[22px] font-black leading-7 text-navy-950 sm:text-[23px] xl:text-[25px]">보행접근성 데이터 레이어</h1>
        <p className="mt-1.5 text-[12px] font-semibold leading-5 text-slate-500">
          공공데이터·현장조사·시민제보 데이터를 지도 레이어로 관리합니다.
        </p>
      </header>

      <section className="mt-4 flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden rounded-[18px] border border-blue-100/80 bg-white p-3 shadow-[0_10px_24px_rgba(33,91,145,0.05)] sm:p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-black text-navy-950">레이어 목록</h2>
          <span className="text-[10px] font-black text-civic-700">동기화됨</span>
        </div>

        <div className="mt-3 grid min-w-0 gap-2 lg:min-h-0 lg:flex-1 lg:content-start lg:overflow-y-auto lg:pr-1">
          {accessibilityLayerItems.map((layer) => {
            const Icon = layerIcons[layer.id as keyof typeof layerIcons] ?? CircleDot;

            return (
              <article
                key={layer.id}
                className="grid min-h-[50px] min-w-0 grid-cols-[32px_minmax(0,1fr)_32px] items-center gap-2 rounded-[14px] border border-blue-100/70 bg-slate-50/80 px-2.5 sm:grid-cols-[36px_minmax(0,1fr)_42px] sm:gap-2.5 sm:px-3"
              >
                <span className={`grid h-8 w-8 place-items-center rounded-[12px] sm:h-9 sm:w-9 ${layerToneClass[layer.tone]}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <strong className="block truncate text-[12px] font-black text-navy-950">{layer.label}</strong>
                  <span className="mt-0.5 block text-[10px] font-bold text-slate-400">{layer.dateLabel}</span>
                </span>
                <ToggleSwitch enabled={layer.enabled} label={`${layer.label} 레이어`} />
              </article>
            );
          })}
        </div>

        <div className="mt-4 grid shrink-0 grid-cols-2 gap-2">
          <article className="rounded-[14px] border border-cyan-100 bg-civic-50/70 px-3 py-2.5">
            <p className="text-[10px] font-black text-civic-700">레이어 품질</p>
            <strong className="mt-1 block text-[22px] font-black leading-none text-navy-950">94%</strong>
            <span className="mt-1 block text-[10px] font-bold text-slate-500">좌표 정합성 기준</span>
          </article>
          <article className="rounded-[14px] border border-blue-100 bg-blue-50/60 px-3 py-2.5">
            <p className="text-[10px] font-black text-action-600">오늘 갱신</p>
            <strong className="mt-1 block text-[22px] font-black leading-none text-navy-950">37건</strong>
            <span className="mt-1 block text-[10px] font-bold text-slate-500">현장조사 포함</span>
          </article>
        </div>
      </section>
    </aside>
  );
}

function SummaryCard({ index }: { index: number }) {
  const card = accessibilityComparisonSummary[index];
  const Icon = summaryIcons[index];
  const tone = summaryToneClass[card.tone];

  return (
    <article className="grid min-h-[70px] grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border border-blue-100/70 bg-white px-4 shadow-[0_12px_24px_rgba(33,91,145,0.06)]">
      <span className={`grid h-9 w-9 place-items-center rounded-[13px] ${tone.icon}`}>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[10px] font-black text-slate-400">{card.label}</p>
        <strong className="mt-1 block truncate text-[22px] font-black leading-none text-navy-950">{card.value}</strong>
        <p className={`mt-1 truncate text-[10px] font-black ${tone.caption}`}>{card.trend}</p>
      </div>
    </article>
  );
}

function HeaderControls() {
  return (
    <div className="grid w-full min-w-0 gap-2 sm:grid-cols-[minmax(220px,1fr)_auto_auto] xl:w-auto xl:grid-cols-[300px_auto_auto]">
      <label className="relative block min-w-0">
        <span className="sr-only">지역, 위험유형, 리포트 검색</span>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          placeholder="지역, 위험유형, 리포트 검색"
          className="h-10 w-full rounded-[14px] border border-blue-100 bg-white pl-10 pr-3 text-[12px] font-bold text-slate-700 shadow-sm outline-none placeholder:text-slate-400 focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
        />
      </label>
      <button
        type="button"
        className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[14px] border border-blue-100 bg-white px-4 text-[12px] font-black text-navy-800 shadow-sm"
      >
        부산광역시
        <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[14px] bg-action-500 px-4 text-[12px] font-black text-white shadow-[0_10px_18px_rgba(36,119,255,0.24)] hover:bg-action-600"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        엑셀 내보내기
      </button>
    </div>
  );
}

function LeafletResize() {
  const map = useMap();

  useEffect(() => {
    const fitMap = () => {
      map.invalidateSize();
      map.fitBounds(accessibilityMapBounds, { padding: [0, 0], maxZoom: 14 });
    };

    const timer = window.setTimeout(fitMap, 80);
    const resizeObserver = new ResizeObserver(fitMap);
    resizeObserver.observe(map.getContainer());

    return () => {
      window.clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
}

function AccessibilityLeafletMap() {
  return (
    <div
      className="settings-leaflet-map relative h-full min-h-[330px] overflow-hidden rounded-[14px] bg-[#edf7fb]"
      role="region"
      aria-label="부산역과 초량이바구길 주변 접근성 점수를 Leaflet 실제 지도 위에 표시한 지도"
    >
      <MapContainer
        center={[35.1135, 129.039]}
        className="h-full min-h-[330px] w-full"
        dragging
        scrollWheelZoom={false}
        zoom={14}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletResize />

        {heatCircles.flatMap((circle) =>
          [
            { suffix: 'outer', radius: circle.radius, opacity: circle.fillOpacity * 0.34 },
            { suffix: 'middle', radius: circle.radius * 0.62, opacity: circle.fillOpacity * 0.66 },
            { suffix: 'inner', radius: circle.radius * 0.32, opacity: circle.fillOpacity },
          ].map((layer) => (
            <Circle
              key={`${circle.color}-${circle.radius}-${layer.suffix}`}
              center={circle.center}
              radius={layer.radius}
              pathOptions={{
                color: circle.color,
                fillColor: circle.color,
                fillOpacity: layer.opacity,
                opacity: 0,
                weight: 0,
              }}
            />
          )),
        )}

        {mapLabelPoints.map((item) => (
          <CircleMarker
            key={item.label}
            center={item.position}
            radius={item.tone === 'station' ? 4 : 0.1}
            pathOptions={{
              color: item.color,
              fillColor: item.color,
              fillOpacity: item.tone === 'station' ? 0.9 : 0,
              opacity: item.tone === 'station' ? 0.9 : 0,
              weight: item.tone === 'station' ? 2 : 0,
            }}
          >
            <Tooltip permanent direction="top" offset={[0, -6]} className={`ongil-map-label settings-map-label settings-map-label--${item.tone}`}>
              {item.label}
            </Tooltip>
          </CircleMarker>
        ))}

        {mapRiskPoints.map((point) => (
          <CircleMarker
            key={point.id}
            center={point.position}
            radius={point.radius}
            pathOptions={{
              color: '#ffffff',
              fillColor: point.color,
              fillOpacity: 0.96,
              opacity: 0.95,
              weight: 3,
            }}
          >
            {point.label && point.permanent ? (
              <Tooltip permanent direction="right" offset={[8, 0]} className="settings-map-rank-tooltip">
                {point.label}
              </Tooltip>
            ) : point.label ? (
              <Tooltip direction="top" offset={[0, -7]} className="settings-map-rank-tooltip">
                {point.label}
              </Tooltip>
            ) : (
              null
            )}
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute bottom-3 right-3 rounded-[12px] border border-blue-100 bg-white/94 px-3 py-2 shadow-[0_10px_22px_rgba(15,29,51,0.12)]">
        <p className="mb-1.5 text-[10px] font-black text-slate-500">범례</p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-slate-400">낮음</span>
          <span className="h-2.5 w-24 rounded-full bg-[linear-gradient(90deg,#28d5c1,#f7d95b,#ff8a2a,#ff4d55)]" />
          <span className="text-[10px] font-black text-slate-400">높음</span>
        </div>
      </div>
    </div>
  );
}

function MapComparisonPanel() {
  return (
    <section className="flex min-h-[520px] min-w-0 flex-col rounded-[20px] border border-blue-100/70 bg-white p-3 shadow-[0_16px_32px_rgba(33,91,145,0.08)] sm:p-4 xl:min-h-0">
      <header className="shrink-0">
        <h2 className="text-[18px] font-black text-navy-950">구·군 접근성 점수 지도</h2>
        <p className="mt-1 text-[11px] font-semibold text-slate-500">진한 색일수록 개선 우선순위가 높습니다.</p>
      </header>

      <div className="mt-3 min-h-[360px] min-w-0 flex-1 overflow-hidden rounded-[14px] border border-blue-100 bg-[#edf7fb]">
        <AccessibilityLeafletMap />
      </div>

      <div className="mt-3 grid shrink-0 gap-2 sm:grid-cols-5">
        {accessibilityMapDistricts.map((item) => (
          <article key={item.district} className={`min-h-[48px] rounded-[12px] border px-3 py-2 ${districtToneClass[item.tone as keyof typeof districtToneClass]}`}>
            <p className="text-[11px] font-black">{item.district}</p>
            <strong className="mt-1 block text-[15px] font-black leading-none">{item.score}점</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function PriorityPanel() {
  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-[20px] border border-blue-100/70 bg-white p-4 shadow-[0_16px_32px_rgba(33,91,145,0.08)]">
      <h2 className="shrink-0 text-[18px] font-black text-navy-950">개선 우선 구·군 TOP 5</h2>
      <ol className="mt-3 grid gap-2">
        {accessibilityDistrictComparisons.map((item) => (
          <li key={item.district} className="grid min-h-[38px] grid-cols-[26px_minmax(0,1fr)_48px] items-center gap-2 rounded-[11px] border border-blue-100 bg-slate-50/70 px-3">
            <span className={['text-[12px] font-black', item.rank <= 2 ? 'text-rose-500' : item.rank === 3 ? 'text-orange-500' : 'text-action-600'].join(' ')}>
              {item.rank}
            </span>
            <div className="min-w-0">
              <strong className="block truncate text-[12px] font-black text-navy-950">{item.district}</strong>
              <span className="mt-0.5 block truncate text-[10px] font-bold text-slate-500">{item.issue}</span>
            </div>
            <strong className="justify-self-end text-[12px] font-black text-rose-500">{item.score}점</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}

function RiskDistributionPanel() {
  return (
    <section className="flex min-h-[230px] flex-col rounded-[20px] border border-blue-100/70 bg-white p-4 shadow-[0_16px_32px_rgba(33,91,145,0.08)] xl:min-h-0">
      <h2 className="shrink-0 text-[16px] font-black text-navy-950">위험유형별 분포</h2>
      <div className="flex min-h-0 flex-1 items-center justify-center py-3 xl:py-0">
        <div className="relative h-36 w-36 rounded-full sm:h-40 sm:w-40" style={{ background: getRiskGradient() }}>
          <div className="absolute inset-[28px] grid place-items-center rounded-full bg-white shadow-inner sm:inset-[32px]">
            <div className="text-center">
              <strong className="block text-[21px] font-black leading-none text-navy-950">12,248</strong>
              <span className="mt-1 block text-[10px] font-black text-slate-400">전체</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-2 gap-x-3 gap-y-1.5 sm:grid-cols-3">
        {accessibilityRiskShares.map((item) => (
          <span key={item.label} className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-500">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}

function UserImpactPanel() {
  return (
    <section className="flex min-h-[230px] flex-col rounded-[20px] border border-blue-100/70 bg-white p-4 shadow-[0_16px_32px_rgba(33,91,145,0.08)] xl:min-h-0">
      <h2 className="shrink-0 text-[16px] font-black text-navy-950">사용자유형별 영향도</h2>
      <div className="mt-4 grid flex-1 content-center gap-3">
        {accessibilityUserImpacts.map((item) => (
          <div key={item.label} className="grid grid-cols-[76px_minmax(0,1fr)_30px] items-center gap-2.5">
            <span className="truncate text-[11px] font-black text-navy-950">{item.label}</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <span className="block h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
            </span>
            <span className="text-right text-[10px] font-black text-slate-400">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SettingsPage() {
  return (
    <div className="settings-screen-fit grid w-[calc(100vw-2rem)] min-w-0 max-w-full gap-3 overflow-visible sm:w-full lg:grid-cols-[300px_minmax(0,1fr)] lg:overflow-hidden xl:grid-cols-[330px_minmax(0,1fr)] 2xl:grid-cols-[360px_minmax(0,1fr)]">
      <LayerPanel />

      <main className="grid min-h-0 w-full min-w-0 max-w-full gap-3 overflow-visible lg:grid-rows-[auto_auto_minmax(0,1fr)] lg:overflow-hidden">
        <header className="grid shrink-0 gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <div className="min-w-0">
            <p className="text-[11px] font-black leading-4 text-civic-700">통계/현황 · 지역 비교</p>
            <h2 className="text-[24px] font-black leading-8 text-navy-950 xl:text-[27px]">구·군별 접근성 비교 대시보드</h2>
            <p className="text-[12px] font-semibold leading-5 text-slate-500">부산 구·군별 보행접근성 점수와 취약유형 분포를 비교합니다.</p>
          </div>
          <HeaderControls />
        </header>

        <section className="grid shrink-0 gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="접근성 비교 핵심 지표">
          {accessibilityComparisonSummary.map((card, index) => (
            <SummaryCard key={card.label} index={index} />
          ))}
        </section>

        <section className="grid min-h-0 min-w-0 gap-3 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_420px]">
          <MapComparisonPanel />
          <aside className="grid min-h-0 gap-3 lg:grid-cols-2 xl:grid-cols-none xl:grid-rows-[minmax(180px,0.75fr)_minmax(0,1fr)]">
            <PriorityPanel />
            <div className="grid min-h-0 gap-3 lg:col-span-2 lg:grid-cols-2 xl:col-span-1">
              <RiskDistributionPanel />
              <UserImpactPanel />
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
