import L, { type LatLngBoundsExpression, type LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Circle, CircleMarker, MapContainer, Marker, TileLayer, ZoomControl, useMap } from 'react-leaflet';

const reportBounds: LatLngBoundsExpression = [
  [35.0944, 129.0062],
  [35.1238, 129.0586],
];

const heatZones = [
  { id: 'choryang-slope', center: [35.1185, 129.0368] as LatLngExpression, color: '#ef4444', radius: 880 },
  { id: 'busan-station', center: [35.1142, 129.0415] as LatLngExpression, color: '#f97316', radius: 980 },
  { id: 'gamcheon-access', center: [35.1021, 129.0197] as LatLngExpression, color: '#facc15', radius: 1120 },
  { id: 'harbor-walk', center: [35.1102, 129.0506] as LatLngExpression, color: '#14b8a6', radius: 1180 },
];

const priorityPins = [
  { label: '분석 대상지', position: [35.1186, 129.037] as LatLngExpression, tone: 'red' },
] satisfies Array<{
  label: string;
  position: LatLngExpression;
  tone: 'red';
}>;

const riskPoints = [
  { label: '1', description: '감천문화마을 입구', position: [35.1032, 129.0215] as LatLngExpression, color: '#14b8a6' },
  { label: '2', description: '부산역 연결 보행로', position: [35.1141, 129.0402] as LatLngExpression, color: '#2477ff' },
  { label: '3', description: '중구 보행 혼잡 구간', position: [35.1071, 129.0375] as LatLngExpression, color: '#f97316' },
  { label: '4', description: '항만 관광 동선', position: [35.1084, 129.052] as LatLngExpression, color: '#10b981' },
  { label: '5', description: '초량이바구길 급경사', position: [35.1182, 129.0376] as LatLngExpression, color: '#8b5cf6' },
];

type ReportExportLeafletMapProps = {
  compact?: boolean;
  className?: string;
};

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

function createPriorityIcon(pin: (typeof priorityPins)[number]) {
  return L.divIcon({
    className: 'report-export-priority-icon',
    iconAnchor: [22, 36],
    iconSize: [150, 42],
    html: `
      <span
        style="
          display:inline-flex;
          min-width:max-content;
          align-items:center;
          border:1px solid rgba(255,255,255,0.94);
          border-radius:999px;
          background:rgba(255,255,255,0.96);
          padding:8px 14px;
          box-shadow:0 14px 26px rgba(15,29,51,0.16);
          white-space:nowrap;
        "
      >
        <strong style="color:#0b2440;font-size:12px;font-weight:900;line-height:1;">${pin.label}</strong>
      </span>
    `,
  });
}

export function ReportExportLeafletMap({ compact = false, className = '' }: ReportExportLeafletMapProps) {
  return (
    <div
      className={`report-export-leaflet-map relative h-full ${compact ? 'min-h-[220px]' : 'min-h-[280px]'} overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 shadow-sm ${className}`}
      role="region"
      aria-label="감천문화마을 행정 리포트 실제 지도 기반 보행 위험 참고 히트맵"
    >
      <MapContainer center={[35.1095, 129.0332]} zoom={13} zoomControl={false} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {heatZones.map((zone) => (
          <Circle
            key={zone.id}
            center={zone.center}
            pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: zone.id === 'choryang-slope' ? 0.24 : 0.16, opacity: 0.1, weight: 1 }}
            radius={zone.radius}
          />
        ))}
        {riskPoints.map((point) => (
          <CircleMarker
            key={`${point.label}-${point.description}`}
            center={point.position}
            radius={8}
            pathOptions={{ color: '#ffffff', fillColor: point.color, fillOpacity: 0.96, opacity: 1, weight: 2 }}
          />
        ))}
        {priorityPins.map((pin) => (
          <Marker key={pin.label} icon={createPriorityIcon(pin)} interactive={false} position={pin.position} />
        ))}
        <ZoomControl position="bottomright" />
        <FitReportMap />
      </MapContainer>
    </div>
  );
}
