import L, { type LatLngBoundsExpression, type LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Circle, CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip, ZoomControl, useMap } from 'react-leaflet';

const reportBounds: LatLngBoundsExpression = [
  [35.0924, 129.0024],
  [35.1238, 129.0453],
];

const analysisCorridor: LatLngExpression[] = [
  [35.11545, 129.04162],
  [35.1132, 129.03785],
  [35.1098, 129.0327],
  [35.1055, 129.0265],
  [35.1014, 129.0183],
  [35.0977, 129.0108],
];

const detourCorridor: LatLngExpression[] = [
  [35.11512, 129.0421],
  [35.1124, 129.0396],
  [35.1089, 129.0354],
  [35.1042, 129.0292],
  [35.0999, 129.0209],
  [35.0967, 129.0124],
];

const focusPlaces = [
  {
    label: '감천문화마을',
    shortLabel: '감천마을',
    detail: '분석 대상지',
    position: [35.0976, 129.0107],
    tone: 'red',
  },
  {
    label: '초량이바구길',
    shortLabel: '초량길',
    detail: '급경사 참고 구간',
    position: [35.1192, 129.0372],
    tone: 'orange',
  },
  {
    label: '부산역',
    shortLabel: '부산역',
    detail: '보행 연결 지점',
    position: [35.1152, 129.041],
    tone: 'blue',
  },
] satisfies Array<{
  label: string;
  shortLabel: string;
  detail: string;
  position: LatLngExpression;
  tone: 'red' | 'orange' | 'blue';
}>;

const riskPoints = [
  { label: '계단 밀집', position: [35.1006, 129.0145] as LatLngExpression, color: '#f43f5e', radius: 140 },
  { label: '급경사', position: [35.118, 129.0377] as LatLngExpression, color: '#f97316', radius: 120 },
  { label: '쉼터 부족', position: [35.1067, 129.0284] as LatLngExpression, color: '#0d8794', radius: 155 },
  { label: '점자블록 손상', position: [35.1141, 129.0402] as LatLngExpression, color: '#2477ff', radius: 95 },
];

function FitReportMap() {
  const map = useMap();

  useEffect(() => {
    const fitMap = () => {
      map.invalidateSize();
      map.fitBounds(reportBounds, { padding: [24, 24], maxZoom: 14 });
    };

    const timer = window.setTimeout(fitMap, 90);
    const resizeObserver = new ResizeObserver(fitMap);
    resizeObserver.observe(map.getContainer());

    return () => {
      window.clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
}

function createPlaceIcon(place: (typeof focusPlaces)[number]) {
  return L.divIcon({
    className: 'report-export-place-icon',
    iconAnchor: [16, 30],
    iconSize: [96, 32],
    html: `
      <span class="report-export-place-marker report-export-place-marker--${place.tone}">
        <strong>${place.shortLabel}</strong>
      </span>
    `,
  });
}

export function ReportExportLeafletMap() {
  return (
    <div
      className="report-export-leaflet-map relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 shadow-sm"
      role="region"
      aria-label="감천문화마을 행정 리포트 실제 Leaflet 지도"
    >
      <MapContainer center={[35.1068, 129.0245]} zoom={13} zoomControl={false} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle center={[35.1014, 129.0184]} radius={720} pathOptions={{ color: '#fb7185', fillColor: '#fb7185', fillOpacity: 0.14, opacity: 0.24, weight: 2 }} />
        <Circle center={[35.1158, 129.0386]} radius={620} pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.12, opacity: 0.22, weight: 2 }} />
        <Polyline
          positions={analysisCorridor}
          pathOptions={{ color: '#18c5ad', lineCap: 'round', lineJoin: 'round', opacity: 0.95, weight: 7 }}
        />
        <Polyline
          positions={detourCorridor}
          pathOptions={{ color: '#2477ff', dashArray: '10 10', lineCap: 'round', lineJoin: 'round', opacity: 0.78, weight: 5 }}
        />
        {riskPoints.map((point) => (
          <CircleMarker
            key={point.label}
            center={point.position}
            radius={7}
            pathOptions={{ color: '#ffffff', fillColor: point.color, fillOpacity: 0.96, opacity: 1, weight: 2 }}
          >
            <Tooltip direction="top" offset={[0, -9]} className="report-export-risk-tooltip">
              {point.label}
            </Tooltip>
            <Popup className="report-export-map-popup">
              <strong>{point.label}</strong>
              <span>행정 리포트용 보행 위험 참고 지점</span>
            </Popup>
          </CircleMarker>
        ))}
        {focusPlaces.map((place) => (
          <Marker key={place.label} icon={createPlaceIcon(place)} position={place.position}>
            <Popup className="report-export-map-popup">
              <strong>{place.label}</strong>
              <span>{place.detail}</span>
            </Popup>
          </Marker>
        ))}
        <ZoomControl position="bottomright" />
        <FitReportMap />
      </MapContainer>

      <div className="report-export-map-note pointer-events-none absolute bottom-3 left-3 z-[500] max-w-[calc(100%-88px)] rounded-xl border border-white/80 bg-white/94 px-3 py-2 shadow-lg backdrop-blur">
        <p className="text-[10px] font-black text-slate-500">주요 분석 권역</p>
        <p className="mt-0.5 text-xs font-black leading-4 text-navy-950">초량 · 부산역 · 감천</p>
      </div>

      <div className="report-export-map-legend pointer-events-none absolute right-3 top-3 z-[500] flex max-w-[calc(100%-24px)] flex-wrap justify-end gap-1.5">
        {[
          ['권장 검토축', '#18c5ad'],
          ['우회 참고', '#2477ff'],
          ['위험 지점', '#f43f5e'],
        ].map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/94 px-2.5 py-1 text-[10px] font-black text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
