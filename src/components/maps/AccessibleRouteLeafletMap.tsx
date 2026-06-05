import L, { type LatLngBoundsExpression, type LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Circle, MapContainer, Marker, Polyline, TileLayer, ZoomControl, useMap } from 'react-leaflet';

type RoutePath = {
  id: string;
  label: string;
  color: string;
  weight: number;
  dashArray?: string;
  positions: LatLngExpression[];
};

type HeatmapCircle = {
  center: LatLngExpression;
  color: string;
  radius: number;
  fillOpacity?: number;
};

const routeBounds: LatLngBoundsExpression = [
  [35.0969, 129.0098],
  [35.1245, 129.0642],
];

const compactRouteBounds: LatLngBoundsExpression = [
  [35.0967, 129.0088],
  [35.1242, 129.0598],
];

const routePaths = [
  {
    id: 'recommended',
    label: '안전한 길',
    color: '#18c5ad',
    weight: 3,
    positions: [
      [35.10035, 129.0148],
      [35.10365, 129.0213],
      [35.10728, 129.02915],
      [35.11135, 129.0378],
      [35.11568, 129.0462],
      [35.12042, 129.0589],
    ],
  },
  {
    id: 'detour',
    label: '우회 경로',
    color: '#2477ff',
    weight: 2.5,
    dashArray: '10 12',
    positions: [
      [35.1002, 129.0146],
      [35.1024, 129.0249],
      [35.10458, 129.0364],
      [35.10718, 129.04735],
      [35.11325, 129.0571],
      [35.11998, 129.0621],
    ],
  },
  {
    id: 'fast-risk',
    label: '계단·급경사 구간',
    color: '#ef4444',
    weight: 2,
    positions: [
      [35.11335, 129.0278],
      [35.11542, 129.0357],
      [35.11742, 129.0439],
    ],
  },
  {
    id: 'gentle',
    label: '완만한 보행구간',
    color: '#f97316',
    weight: 2,
    positions: [
      [35.1062, 129.0316],
      [35.10955, 129.03735],
      [35.1127, 129.0435],
    ],
  },
  {
    id: 'support',
    label: '쉼터 연결',
    color: '#8b5cf6',
    weight: 2,
    positions: [
      [35.1032, 129.0223],
      [35.1079, 129.0302],
      [35.11205, 129.0386],
      [35.11535, 129.0455],
    ],
  },
] satisfies RoutePath[];

const compactRoutePaths = [
  {
    id: 'safe',
    label: '안전한 길',
    color: '#16b8a5',
    weight: 2.5,
    positions: [
      [35.10005, 129.0146],
      [35.1042, 129.0236],
      [35.10875, 129.032],
      [35.11425, 129.044],
      [35.1209, 129.0564],
    ],
  },
  {
    id: 'fast',
    label: '빠른 길',
    color: '#ef4444',
    weight: 2,
    positions: [
      [35.1026, 129.0125],
      [35.1081, 129.0245],
      [35.1147, 129.0402],
      [35.1222, 129.0574],
    ],
  },
  {
    id: 'stair-free',
    label: '계단 없는 길',
    color: '#2477ff',
    weight: 2,
    positions: [
      [35.09955, 129.0175],
      [35.10475, 129.028],
      [35.1112, 129.0406],
      [35.11965, 129.0553],
    ],
  },
] satisfies RoutePath[];

const routePointMarkers = [
  {
    label: '감천문화마을',
    tone: 'safe',
    position: [35.1006, 129.0146],
  },
  {
    label: '현재 위험구간',
    tone: 'risk',
    position: [35.11545, 129.0361],
  },
  {
    label: '도착 초량이바구길',
    tone: 'place',
    position: [35.1205, 129.0574],
  },
] satisfies Array<{
  label: string;
  tone: 'risk' | 'safe' | 'station' | 'shelter' | 'place';
  position: LatLngExpression;
}>;

const heatmapCircles = [
  { center: [35.11575, 129.0374] as LatLngExpression, color: '#ef4444', radius: 190 },
  { center: [35.1086, 129.0343] as LatLngExpression, color: '#f97316', radius: 240 },
  { center: [35.116, 129.0472] as LatLngExpression, color: '#18c5ad', radius: 210 },
] satisfies HeatmapCircle[];

const compactHeatmapCircles = [
  { center: [35.1112, 129.0325] as LatLngExpression, color: '#facc15', radius: 520, fillOpacity: 0.18 },
  { center: [35.1194, 129.0404] as LatLngExpression, color: '#ef4444', radius: 370, fillOpacity: 0.13 },
  { center: [35.1042, 129.0218] as LatLngExpression, color: '#18c5ad', radius: 260, fillOpacity: 0.12 },
] satisfies HeatmapCircle[];

const compactPointMarkers = [
  {
    label: '초량이바구길 위험 4.8',
    tone: 'risk',
    position: [35.12065, 129.0384],
  },
  {
    label: '감천문화마을',
    tone: 'safe',
    position: [35.10105, 129.0145],
  },
  {
    label: '계단·단차',
    tone: 'warning',
    position: [35.1132, 129.0427],
  },
] satisfies Array<{
  label: string;
  tone: 'risk' | 'safe' | 'warning';
  position: LatLngExpression;
}>;

const pointToneColors = {
  place: '#22c55e',
  risk: '#ef4444',
  safe: '#16b8a5',
  shelter: '#8b5cf6',
  station: '#2477ff',
  warning: '#f97316',
} satisfies Record<'place' | 'risk' | 'safe' | 'shelter' | 'station' | 'warning', string>;

type AccessibleRouteLeafletMapProps = {
  className?: string;
  compact?: boolean;
};

function FitRouteBounds({
  bounds,
  maxZoom,
  padding,
}: {
  bounds: LatLngBoundsExpression;
  maxZoom: number;
  padding: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    const fitMap = () => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding, maxZoom });
    };

    const timer = window.setTimeout(fitMap, 80);
    const resizeObserver = new ResizeObserver(fitMap);
    resizeObserver.observe(map.getContainer());

    return () => {
      window.clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [bounds, map, maxZoom, padding]);

  return null;
}

function createRoutePointIcon(point: (typeof routePointMarkers)[number]) {
  const color = pointToneColors[point.tone];

  return L.divIcon({
    className: 'ongil-leaflet-div-icon',
    iconAnchor: [9, 9],
    iconSize: [132, 24],
    html: `
      <div style="display:inline-flex;width:max-content;max-width:132px;align-items:center;gap:4px;border-radius:999px;background:rgba(255,255,255,0.9);padding:3px 7px 3px 4px;box-shadow:0 7px 14px rgba(15,29,51,0.1);white-space:nowrap;">
        <span style="display:block;width:8px;height:8px;flex:0 0 auto;border:1.5px solid #fff;border-radius:999px;background:${color};box-shadow:0 4px 9px rgba(15,29,51,0.16);"></span>
        <strong style="overflow:hidden;color:${point.tone === 'risk' ? '#b91c1c' : '#14304d'};font-size:9px;font-weight:900;letter-spacing:0;line-height:1.05;text-overflow:ellipsis;">${point.label}</strong>
      </div>
    `,
  });
}

function createCompactPointIcon(point: (typeof compactPointMarkers)[number]) {
  const color = pointToneColors[point.tone];

  return L.divIcon({
    className: 'ongil-leaflet-div-icon',
    iconAnchor: [10, 10],
    iconSize: [148, 32],
    html: `
      <div style="display:inline-flex;width:max-content;max-width:160px;align-items:center;gap:5px;border-radius:999px;background:rgba(255,255,255,0.9);padding:4px 7px 4px 4px;box-shadow:0 8px 16px rgba(15,29,51,0.1);white-space:nowrap;">
        <span style="display:block;width:13px;height:13px;flex:0 0 auto;border:2px solid #fff;border-radius:999px;background:${color};box-shadow:0 5px 12px rgba(15,29,51,0.18);"></span>
        <strong style="overflow:hidden;color:${point.tone === 'risk' ? '#b91c1c' : '#14304d'};font-size:9px;font-weight:900;letter-spacing:0;line-height:1.05;text-overflow:ellipsis;">${point.label}</strong>
      </div>
    `,
  });
}

export function AccessibleRouteLeafletMap({ className = '', compact = false }: AccessibleRouteLeafletMapProps) {
  const activeBounds = compact ? compactRouteBounds : routeBounds;
  const activeHeatmapCircles: HeatmapCircle[] = compact ? compactHeatmapCircles : heatmapCircles;
  const activeRoutePaths: RoutePath[] = compact ? compactRoutePaths : routePaths;

  return (
    <div
      className={`ongil-route-map ${compact ? 'ongil-route-map--compact' : ''} relative h-full min-h-[360px] overflow-hidden rounded-[18px] border border-blue-100 bg-blue-50 ${className}`}
      role="region"
      aria-label="부산역에서 초량이바구길까지 실제 지도 배경 위에 표시한 무장애 경로 비교"
    >
      <MapContainer
        center={compact ? [35.1115, 129.0348] : [35.1182, 129.0384]}
        className="h-full w-full"
        dragging
        scrollWheelZoom={false}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {activeHeatmapCircles.map((circle) => (
          <Circle
            key={`${circle.color}-${circle.radius}`}
            center={circle.center}
            pathOptions={{
              color: circle.color,
              fillColor: circle.color,
              fillOpacity: 'fillOpacity' in circle ? circle.fillOpacity : 0.16,
              opacity: compact ? 0.08 : 0.18,
              weight: compact ? 0 : 2,
            }}
            radius={circle.radius}
          />
        ))}
        {activeRoutePaths.map((route) => (
          <Polyline
            key={route.id}
            pathOptions={{
              color: route.color,
              dashArray: route.dashArray,
              lineCap: 'round',
              lineJoin: 'round',
              opacity: compact ? (route.id === 'safe' ? 0.54 : 0.42) : route.id === 'recommended' ? 0.6 : 0.48,
              weight: route.weight,
            }}
            positions={route.positions}
          />
        ))}
        {compact
          ? compactPointMarkers.map((marker) => (
              <Marker key={marker.label} icon={createCompactPointIcon(marker)} interactive={false} position={marker.position} />
            ))
          : routePointMarkers.map((marker) => (
              <Marker key={marker.label} icon={createRoutePointIcon(marker)} interactive={false} position={marker.position} />
            ))}
        {!compact && <ZoomControl position="bottomright" />}
        <FitRouteBounds bounds={activeBounds} maxZoom={compact ? 13 : 14} padding={compact ? [10, 10] : [18, 18]} />
      </MapContainer>

      {!compact && (
        <div className="pointer-events-none absolute left-3 top-3 z-[500] flex max-w-[calc(100%-24px)] flex-wrap gap-2 sm:left-4 sm:top-4">
          {['휠체어 사용자', '계단 회피', '완만한 경사', '쉼터 표시'].map((label, index) => (
            <span
              key={label}
              className={[
                'rounded-full border px-2.5 py-1 text-[9px] font-black shadow-[0_8px_18px_rgba(15,29,51,0.08)] backdrop-blur sm:px-3 sm:py-1.5 sm:text-[10px]',
                index === 0 ? 'border-civic-100 bg-civic-50/95 text-civic-700' : 'border-white/80 bg-white/95 text-civic-700',
              ].join(' ')}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <div
        className={[
          'pointer-events-none absolute z-[500] rounded-[14px] border border-white/80 bg-white/95 px-3 py-2 shadow-[0_10px_24px_rgba(15,29,51,0.1)] backdrop-blur',
          compact
            ? 'ongil-compact-legend bottom-3 right-3 grid min-w-[132px] gap-1.5'
            : 'bottom-3 left-3 flex max-w-[calc(100%-86px)] flex-wrap items-center gap-3 sm:bottom-4 sm:left-4 sm:gap-5 sm:px-5',
        ].join(' ')}
      >
        {compact && <strong className="text-[10px] font-black leading-4 text-navy-950">범례</strong>}
        {activeRoutePaths.slice(0, compact ? activeRoutePaths.length : 2).map((route) => {
          const dashArray = 'dashArray' in route ? route.dashArray : undefined;

          return (
            <span key={route.id} className="inline-flex items-center gap-2 text-[10px] font-black text-slate-600 sm:text-[12px]">
              <span
                className="h-0.5 w-7 rounded-full sm:w-9"
                style={{
                  backgroundColor: dashArray ? 'transparent' : route.color,
                  borderTop: dashArray ? `3px dashed ${route.color}` : undefined,
                }}
              />
              {route.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
