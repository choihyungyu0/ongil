import 'leaflet/dist/leaflet.css';

import L, { type LatLngBoundsExpression, type LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Circle, MapContainer, Marker, Polyline, TileLayer, ZoomControl, useMap } from 'react-leaflet';

const surveyBounds: LatLngBoundsExpression = [
  [35.0948, 129.008],
  [35.1232, 129.0485],
];

const routeLines = [
  {
    id: 'safe',
    label: '안전한 길',
    color: '#18c5ad',
    weight: 8,
    positions: [
      [35.102, 129.0134],
      [35.1066, 129.0212],
      [35.1097, 129.027],
      [35.1132, 129.0312],
      [35.1164, 129.0378],
      [35.1202, 129.0432],
    ],
  },
  {
    id: 'detour',
    label: '우회 경로',
    color: '#2477ff',
    weight: 4,
    dashArray: '8 9',
    positions: [
      [35.1097, 129.027],
      [35.1128, 129.033],
      [35.1164, 129.0378],
      [35.1202, 129.0432],
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

type SurveyPoint = {
  id: string;
  number: number;
  title: string;
  distance: string;
  tone: 'teal' | 'blue' | 'orange' | 'cyan' | 'green';
  position: LatLngExpression;
  labelSide: 'left' | 'right';
};

const surveyPoints: SurveyPoint[] = [
  {
    id: 'start',
    number: 1,
    title: '부산역 광장 출발',
    distance: '0m',
    tone: 'teal',
    position: [35.102, 129.0134],
    labelSide: 'right',
  },
  {
    id: 'gentle',
    number: 2,
    title: '완만한 보행구간',
    distance: '210m',
    tone: 'blue',
    position: [35.1097, 129.027],
    labelSide: 'right',
  },
  {
    id: 'current',
    number: 3,
    title: '현재 위치',
    distance: '420m',
    tone: 'orange',
    position: [35.1157, 129.0332],
    labelSide: 'left',
  },
  {
    id: 'shelter',
    number: 4,
    title: '쉼터 후보',
    distance: '520m',
    tone: 'cyan',
    position: [35.1164, 129.0378],
    labelSide: 'right',
  },
  {
    id: 'destination',
    number: 5,
    title: '초량이바구길 도착',
    distance: '610m',
    tone: 'green',
    position: [35.1202, 129.0432],
    labelSide: 'right',
  },
];

const heatZones = [
  { id: 'gentle-area', center: [35.1097, 129.027] as LatLngExpression, color: '#38bdf8', radius: 360 },
  { id: 'shelter-area', center: [35.1164, 129.0378] as LatLngExpression, color: '#14b8a6', radius: 340 },
];

function FitSurveyBounds() {
  const map = useMap();

  useEffect(() => {
    const fitMap = () => {
      map.invalidateSize();
      map.fitBounds(surveyBounds, { padding: [20, 20], maxZoom: 15 });
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

function createSurveyPointIcon(point: (typeof surveyPoints)[number]) {
  const isLeft = point.labelSide === 'left';

  return L.divIcon({
    className: 'field-survey-real-div-icon',
    iconAnchor: isLeft ? [144, 19] : [19, 19],
    iconSize: [160, 38],
    html: `
      <span class="field-survey-real-point field-survey-real-point--${point.tone} field-survey-real-point--${point.labelSide}">
        <span class="field-survey-real-point-badge">${point.number}</span>
        <span class="field-survey-real-point-copy">
          <span class="field-survey-real-point-title">${point.title}</span>
          <span class="field-survey-real-point-distance">${point.distance}</span>
        </span>
      </span>
    `,
  });
}

export function LeafFieldSurveyMap() {
  return (
    <div
      className="field-survey-real-map relative h-full min-h-[360px] overflow-hidden rounded-[18px] border border-blue-100 bg-blue-50"
      role="region"
      aria-label="부산 현장조사 대상 실제 지도"
    >
      <MapContainer
        center={[35.109, 129.028]}
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
            pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.18, opacity: 0.1, weight: 1 }}
            radius={zone.radius}
          />
        ))}
        {routeLines.map((route) => (
          <Polyline
            key={`${route.id}-halo`}
            pathOptions={{
              color: '#ffffff',
              dashArray: route.dashArray,
              lineCap: 'round',
              lineJoin: 'round',
              opacity: 0.95,
              weight: route.weight + 5,
            }}
            positions={route.positions}
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
              opacity: 0.92,
              weight: route.weight,
            }}
            positions={route.positions}
          />
        ))}
        {surveyPoints.map((point) => (
          <Marker
            key={point.id}
            icon={createSurveyPointIcon(point)}
            interactive={false}
            position={point.position}
            zIndexOffset={point.id === 'shelter' ? 900 : 520 + point.number * 40}
          />
        ))}
        <ZoomControl position="topright" />
        <FitSurveyBounds />
      </MapContainer>

      <div className="field-survey-filter-chips pointer-events-none absolute left-4 top-4 z-[500] flex max-w-[calc(100%-5rem)] flex-wrap gap-2" role="list" aria-label="현장조사 경로 조건">
        {['휠체어 사용자', '계단 회피', '완만한 경사', '쉼터 표시'].map((label) => (
          <span key={label} role="listitem" className="field-survey-filter-chip">
            {label}
          </span>
        ))}
      </div>

      <div className="field-survey-map-legend pointer-events-none absolute bottom-4 left-4 z-[500] w-[300px] rounded-2xl border border-white/80 bg-white/95 px-5 py-4 shadow-[0_14px_32px_rgba(15,29,51,0.14)] backdrop-blur">
        <div className="flex items-center gap-7 text-[13px] font-black text-slate-700">
          {routeLines.map((route) => (
            <span key={route.id} className="flex items-center gap-2">
              <span
                className="h-1.5 w-11 rounded-full"
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
    </div>
  );
}
