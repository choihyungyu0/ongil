import L, { type LatLngBoundsExpression, type LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Circle, MapContainer, Marker, Polyline, TileLayer, ZoomControl, useMap } from 'react-leaflet';

const routeBounds: LatLngBoundsExpression = [
  [35.11405, 129.03365],
  [35.12255, 129.04445],
];

const routePaths = [
  {
    id: 'recommended',
    label: '권장한 길',
    color: '#18c5ad',
    weight: 9,
    positions: [
      [35.11555, 129.04195],
      [35.11605, 129.04075],
      [35.11655, 129.03972],
      [35.11735, 129.03852],
      [35.11828, 129.03745],
      [35.11933, 129.03626],
      [35.12055, 129.03495],
    ],
  },
  {
    id: 'detour',
    label: '우회 경로',
    color: '#2477ff',
    weight: 7,
    dashArray: '12 12',
    positions: [
      [35.11492, 129.04295],
      [35.11518, 129.04162],
      [35.11546, 129.03995],
      [35.11602, 129.03812],
      [35.11698, 129.03682],
      [35.11817, 129.03562],
      [35.11972, 129.03445],
      [35.12035, 129.0342],
    ],
  },
  {
    id: 'fast-risk',
    label: '계단·급경사 구간',
    color: '#ef4444',
    weight: 8,
    positions: [
      [35.11638, 129.04012],
      [35.11695, 129.03918],
      [35.11747, 129.03825],
    ],
  },
  {
    id: 'gentle',
    label: '완만한 보행구간',
    color: '#f97316',
    weight: 7,
    positions: [
      [35.11567, 129.03958],
      [35.11616, 129.03855],
      [35.11666, 129.0376],
      [35.11708, 129.03688],
    ],
  },
  {
    id: 'support',
    label: '쉼터 연결',
    color: '#8b5cf6',
    weight: 6,
    positions: [
      [35.11515, 129.04168],
      [35.11582, 129.04092],
      [35.11655, 129.03992],
    ],
  },
] satisfies Array<{
  id: string;
  label: string;
  color: string;
  weight: number;
  dashArray?: string;
  positions: LatLngExpression[];
}>;

const guideMarkers = [
  {
    index: 1,
    label: '부산역 광장 출발',
    detail: '0m',
    tone: 'mint',
    position: [35.11555, 129.04195],
  },
  {
    index: 2,
    label: '중앙대로 횡단 구간',
    detail: '210m',
    tone: 'blue',
    position: [35.11655, 129.03972],
  },
  {
    index: 3,
    label: '급경사 우회',
    detail: '420m',
    tone: 'orange',
    position: [35.11747, 129.03825],
  },
  {
    index: 4,
    label: '쉼터 후보',
    detail: '520m',
    tone: 'cyan',
    position: [35.11828, 129.03745],
  },
  {
    index: 5,
    label: '초량이바구길 도착',
    detail: '610m',
    tone: 'green',
    position: [35.12055, 129.03495],
  },
] satisfies Array<{
  index: number;
  label: string;
  detail: string;
  tone: 'mint' | 'blue' | 'orange' | 'cyan' | 'green';
  position: LatLngExpression;
}>;

const areaLabels = [
  {
    label: '초량이바구길',
    tone: 'place',
    position: [35.12035, 129.03535],
  },
  {
    label: '아트 웨이 구간',
    tone: 'risk',
    position: [35.11745, 129.03855],
  },
  {
    label: '도보 보행구간',
    tone: 'route',
    position: [35.1201, 129.03432],
  },
] satisfies Array<{
  label: string;
  tone: 'place' | 'risk' | 'route';
  position: LatLngExpression;
}>;

const heatmapCircles = [
  { center: [35.11755, 129.0383] as LatLngExpression, color: '#ef4444', radius: 72 },
  { center: [35.11618, 129.03878] as LatLngExpression, color: '#f97316', radius: 86 },
  { center: [35.11852, 129.03692] as LatLngExpression, color: '#18c5ad', radius: 96 },
];

type AccessibleRouteLeafletMapProps = {
  className?: string;
  compact?: boolean;
};

function FitRouteBounds() {
  const map = useMap();

  useEffect(() => {
    const fitMap = () => {
      map.invalidateSize();
      map.fitBounds(routeBounds, { padding: [28, 28], maxZoom: 16 });
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

function createGuideIcon(marker: (typeof guideMarkers)[number]) {
  return L.divIcon({
    className: 'ongil-leaflet-div-icon',
    iconAnchor: [18, 34],
    iconSize: [188, 40],
    html: `
      <div class="ongil-guide-marker ongil-guide-${marker.tone}">
        <span class="ongil-guide-number">${marker.index}</span>
        <span class="ongil-guide-copy">
          <strong>${marker.label}</strong>
          <em>${marker.detail}</em>
        </span>
      </div>
    `,
  });
}

function createAreaLabelIcon(label: (typeof areaLabels)[number]) {
  return L.divIcon({
    className: 'ongil-leaflet-div-icon',
    iconAnchor: [70, 18],
    iconSize: [148, 34],
    html: `<div class="ongil-area-label ongil-area-${label.tone}">${label.label}</div>`,
  });
}

export function AccessibleRouteLeafletMap({ className = '', compact = false }: AccessibleRouteLeafletMapProps) {
  return (
    <div
      className={`ongil-route-map relative h-full min-h-[360px] overflow-hidden rounded-[18px] border border-blue-100 bg-blue-50 ${className}`}
      role="region"
      aria-label="부산역에서 초량이바구길까지 실제 지도 배경 위에 표시한 무장애 경로 비교"
    >
      <MapContainer
        center={[35.1182, 129.0384]}
        className="h-full w-full"
        dragging
        scrollWheelZoom={false}
        zoom={15}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {heatmapCircles.map((circle) => (
          <Circle
            key={`${circle.color}-${circle.radius}`}
            center={circle.center}
            pathOptions={{ color: circle.color, fillColor: circle.color, fillOpacity: 0.16, opacity: 0.18, weight: 2 }}
            radius={circle.radius}
          />
        ))}
        {routePaths.map((route) => (
          <Polyline
            key={route.id}
            pathOptions={{
              color: route.color,
              dashArray: route.dashArray,
              lineCap: 'round',
              lineJoin: 'round',
              opacity: route.id === 'recommended' ? 0.96 : 0.82,
              weight: route.weight,
            }}
            positions={route.positions}
          />
        ))}
        {areaLabels.map((label) => (
          <Marker key={label.label} icon={createAreaLabelIcon(label)} interactive={false} position={label.position} />
        ))}
        {guideMarkers.map((marker) => (
          <Marker key={marker.label} icon={createGuideIcon(marker)} interactive={false} position={marker.position} />
        ))}
        <ZoomControl position="bottomright" />
        <FitRouteBounds />
      </MapContainer>

      <div className="pointer-events-none absolute left-3 top-3 z-[500] flex max-w-[calc(100%-24px)] flex-wrap gap-2 sm:left-4 sm:top-4">
        {['휠체어 사용자', '계단 회피', '급경사 우회', '쉼터 표시'].slice(0, compact ? 3 : 4).map((label, index) => (
          <span
            key={label}
            className={[
              'rounded-full border px-3 py-1.5 text-[11px] font-black shadow-[0_8px_18px_rgba(15,29,51,0.08)] backdrop-blur sm:px-4 sm:py-2 sm:text-[12px]',
              index === 0 ? 'border-civic-100 bg-civic-50/95 text-civic-700' : 'border-white/80 bg-white/95 text-civic-700',
            ].join(' ')}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 z-[500] flex max-w-[calc(100%-86px)] flex-wrap items-center gap-3 rounded-[14px] border border-white/80 bg-white/95 px-3 py-2 shadow-[0_10px_24px_rgba(15,29,51,0.1)] backdrop-blur sm:bottom-4 sm:left-4 sm:gap-5 sm:px-5">
        {routePaths.slice(0, compact ? 3 : 5).map((route) => (
          <span key={route.id} className="inline-flex items-center gap-2 text-[11px] font-black text-slate-600 sm:text-[12px]">
            <span
              className="h-0.5 w-7 rounded-full sm:w-9"
              style={{
                backgroundColor: route.dashArray ? 'transparent' : route.color,
                borderTop: route.dashArray ? `3px dashed ${route.color}` : undefined,
              }}
            />
            {route.label}
          </span>
        ))}
      </div>
    </div>
  );
}
