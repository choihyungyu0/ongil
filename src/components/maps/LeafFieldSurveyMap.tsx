import 'leaflet/dist/leaflet.css';

import L, { type LatLngBoundsExpression, type LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Circle, MapContainer, Marker, Polyline, TileLayer, Tooltip, ZoomControl, useMap } from 'react-leaflet';

const surveyBounds: LatLngBoundsExpression = [
  [35.0925, 129.006],
  [35.1248, 129.049],
];

const routeLines = [
  {
    id: 'recommended',
    label: '현장조사 추천 동선',
    color: '#18c5ad',
    weight: 8,
    positions: [
      [35.0971, 129.0099],
      [35.1002, 129.0142],
      [35.1044, 129.0219],
      [35.1085, 129.0301],
      [35.1134, 129.0398],
      [35.1166, 129.0443],
    ],
  },
  {
    id: 'fast',
    label: '빠른 길',
    color: '#ef4444',
    weight: 7,
    positions: [
      [35.098, 129.011],
      [35.1035, 129.019],
      [35.1089, 129.0278],
      [35.1149, 129.036],
      [35.1206, 129.0435],
    ],
  },
  {
    id: 'review',
    label: '검수 연결',
    color: '#2477ff',
    weight: 5,
    dashArray: '10 10',
    positions: [
      [35.0957, 129.0125],
      [35.0984, 129.0192],
      [35.1021, 129.0277],
      [35.1072, 129.0355],
      [35.1124, 129.0422],
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

const surveySites = [
  {
    id: 'gamcheon',
    label: '감천 입구',
    shortLabel: '촬',
    detail: '경사도·계단 우회',
    tone: 'teal',
    position: [35.0971, 129.0099],
  },
  {
    id: 'slope',
    label: '초량 위험 4.8',
    shortLabel: '급',
    detail: '급경사 밀집',
    tone: 'blue',
    position: [35.1191, 129.0371],
  },
  {
    id: 'stairs',
    label: '계단·단차',
    shortLabel: '계',
    detail: '보도턱 검수',
    tone: 'orange',
    position: [35.1139, 129.0355],
  },
  {
    id: 'station',
    label: '부산역 검수',
    shortLabel: '보',
    detail: '복지관 접근',
    tone: 'purple',
    position: [35.1152, 129.0422],
  },
  {
    id: 'welfare',
    label: '복지관 접근',
    shortLabel: '원',
    detail: '이동 지원 동선',
    tone: 'green',
    position: [35.117, 129.045],
  },
] satisfies Array<{
  id: string;
  label: string;
  shortLabel: string;
  detail: string;
  tone: 'teal' | 'blue' | 'orange' | 'purple' | 'green';
  position: LatLngExpression;
}>;

const areaLabels = [
  { id: 'gamcheon-label', label: '감천문화마을', tone: 'place', position: [35.0984, 129.0122] },
  { id: 'cho-label', label: '초량이바구길', tone: 'risk', position: [35.1202, 129.0358] },
  { id: 'station-label', label: '부산역', tone: 'place', position: [35.1154, 129.0428] },
  { id: 'road-label', label: '산복도로', tone: 'route', position: [35.1184, 129.0401] },
] satisfies Array<{
  id: string;
  label: string;
  tone: 'place' | 'risk' | 'route';
  position: LatLngExpression;
}>;

const heatZones = [
  { id: 'gamcheon-heat', center: [35.098, 129.0115] as LatLngExpression, color: '#f59e0b', radius: 520 },
  { id: 'cho-heat', center: [35.119, 129.0372] as LatLngExpression, color: '#ef4444', radius: 430 },
  { id: 'station-heat', center: [35.1146, 129.0413] as LatLngExpression, color: '#f97316', radius: 330 },
];

function FitSurveyBounds() {
  const map = useMap();

  useEffect(() => {
    const fitMap = () => {
      map.invalidateSize();
      map.fitBounds(surveyBounds, { padding: [28, 28], maxZoom: 15 });
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

function createSiteIcon(site: (typeof surveySites)[number]) {
  return L.divIcon({
    className: 'field-survey-div-icon',
    iconAnchor: [18, 18],
    iconSize: [36, 36],
    html: `<span class="field-survey-marker field-survey-marker--${site.tone}">${site.shortLabel}</span>`,
  });
}

function createAreaLabelIcon(label: (typeof areaLabels)[number]) {
  return L.divIcon({
    className: 'field-survey-div-icon',
    iconAnchor: [58, 16],
    iconSize: [116, 32],
    html: `<span class="field-survey-area-label field-survey-area-label--${label.tone}">${label.label}</span>`,
  });
}

export function LeafFieldSurveyMap() {
  return (
    <div
      className="field-survey-real-map relative h-full min-h-[360px] overflow-hidden rounded-[18px] border border-blue-100 bg-blue-50"
      role="region"
      aria-label="부산 현장조사 대상 실제 Leaflet 지도"
    >
      <MapContainer
        center={[35.109, 129.026]}
        className="h-full w-full"
        dragging
        scrollWheelZoom={false}
        zoom={14}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {heatZones.map((zone) => (
          <Circle
            key={zone.id}
            center={zone.center}
            pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.16, opacity: 0.18, weight: 2 }}
            radius={zone.radius}
          />
        ))}
        {routeLines.map((route) => (
          <Polyline
            key={route.id}
            pathOptions={{
              color: route.color,
              dashArray: route.dashArray,
              lineCap: 'round',
              lineJoin: 'round',
              opacity: route.id === 'recommended' ? 0.96 : 0.84,
              weight: route.weight,
            }}
            positions={route.positions}
          />
        ))}
        {areaLabels.map((label) => (
          <Marker key={label.id} icon={createAreaLabelIcon(label)} interactive={false} position={label.position} />
        ))}
        {surveySites.map((site) => (
          <Marker key={site.id} icon={createSiteIcon(site)} position={site.position}>
            <Tooltip className="field-survey-leaflet-tooltip field-survey-leaflet-tooltip--strong" direction="right" offset={[14, 0]} opacity={1} permanent>
              <span>{site.label}</span>
            </Tooltip>
          </Marker>
        ))}
        <ZoomControl position="topright" />
        <FitSurveyBounds />
      </MapContainer>

      <div className="field-survey-route-chip pointer-events-none absolute bottom-4 left-4 z-[500] rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_14px_32px_rgba(15,29,51,0.14)] backdrop-blur">
        <p className="text-[12px] font-black text-navy-950">현장조사 추천 동선</p>
        <div className="mt-2 h-1.5 w-36 rounded-full bg-[#18c5ad]" />
      </div>

      <div className="field-survey-map-legend pointer-events-none absolute bottom-4 right-4 z-[500] w-[180px] rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_14px_32px_rgba(15,29,51,0.14)] backdrop-blur">
        <p className="text-[12px] font-black text-navy-950">범례</p>
        <div className="mt-3 space-y-2 text-[11px] font-black text-slate-600">
          {routeLines.map((route) => (
            <span key={route.id} className="flex items-center gap-2">
              <span
                className="h-1.5 w-9 rounded-full"
                style={{
                  backgroundColor: route.dashArray ? 'transparent' : route.color,
                  borderTop: route.dashArray ? `3px dashed ${route.color}` : undefined,
                }}
              />
              {route.label === '현장조사 추천 동선' ? '안전한 길' : route.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
