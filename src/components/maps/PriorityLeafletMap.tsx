import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';
import { Circle, CircleMarker, MapContainer, Polyline, Popup, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import { priorityDangerZones, type PriorityDangerZone } from '../../data/mockData';

const center: LatLngExpression = [35.116, 129.037];

const zoneCoordinates: Record<string, LatLngExpression> = {
  'priority-001': [35.119, 129.037],
  'priority-002': [35.098, 129.01],
  'priority-003': [35.115, 129.041],
  'priority-004': [35.098, 129.032],
  'priority-005': [35.091, 129.055],
  'priority-006': [35.102, 129.019],
  'priority-007': [35.096, 129.03],
  'priority-008': [35.167, 129.057],
  'priority-009': [35.153, 129.118],
  'priority-010': [35.163, 129.161],
};

const hillsideBelt: LatLngExpression[] = [
  [35.073, 128.985],
  [35.099, 129.003],
  [35.118, 129.035],
  [35.142, 129.07],
  [35.169, 129.112],
];

const centralCorridor: LatLngExpression[] = [
  [35.09, 129.012],
  [35.101, 129.024],
  [35.115, 129.041],
  [35.132, 129.057],
  [35.152, 129.075],
];

const coastalCorridor: LatLngExpression[] = [
  [35.088, 129.018],
  [35.095, 129.031],
  [35.1, 129.051],
  [35.125, 129.089],
  [35.153, 129.118],
  [35.163, 129.161],
];

function markerTone(zone: PriorityDangerZone) {
  if (zone.status === '긴급') return '#f43f5e';
  if (zone.status === '검토') return '#f59e0b';
  if (zone.status === '접수') return '#2477ff';
  if (zone.status === '예정') return '#0d8794';
  return '#64748b';
}

function markerRadius(zone: PriorityDangerZone) {
  if (zone.rank <= 2) return 9;
  if (zone.rank <= 5) return 7;
  return 6;
}

export function PriorityLeafletMap() {
  const zones = priorityDangerZones.map((zone) => ({
    zone,
    position: zoneCoordinates[zone.id] ?? center,
  }));

  return (
    <div
      className="priority-leaflet-map relative h-full min-h-[230px] overflow-hidden rounded-xl border border-cyan-100 bg-civic-50"
      role="region"
      aria-label="부산 위험구간 우선순위 Leaflet 지도"
    >
      <MapContainer
        center={center}
        zoom={12}
        minZoom={10}
        maxZoom={17}
        scrollWheelZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <Circle center={[35.112, 129.025]} radius={2700} pathOptions={{ color: '#fb7185', fillColor: '#fb7185', fillOpacity: 0.16, opacity: 0 }} />
        <Circle center={[35.116, 129.046]} radius={2300} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.15, opacity: 0 }} />
        <Circle center={[35.153, 129.122]} radius={2700} pathOptions={{ color: '#14b8a6', fillColor: '#14b8a6', fillOpacity: 0.13, opacity: 0 }} />
        <Polyline positions={hillsideBelt} pathOptions={{ color: '#0d8794', opacity: 0.58, weight: 8, lineCap: 'round' }} interactive={false} />
        <Polyline positions={centralCorridor} pathOptions={{ color: '#2477ff', opacity: 0.55, weight: 5, lineCap: 'round' }} interactive={false} />
        <Polyline
          positions={coastalCorridor}
          pathOptions={{ color: '#14304d', dashArray: '8 9', opacity: 0.38, weight: 4, lineCap: 'round' }}
          interactive={false}
        />
        {zones.map(({ zone, position }) => (
          <CircleMarker
            key={zone.id}
            center={position}
            radius={markerRadius(zone)}
            pathOptions={{
              color: '#ffffff',
              fillColor: markerTone(zone),
              fillOpacity: 0.92,
              opacity: 1,
              weight: 2,
            }}
          >
            {zone.rank <= 3 ? (
              <Tooltip permanent direction="top" offset={[0, -8]} className="priority-zone-tooltip">
                {zone.rank}. {zone.name}
              </Tooltip>
            ) : (
              <Tooltip direction="top" offset={[0, -8]} className="priority-zone-tooltip">
                {zone.rank}. {zone.name}
              </Tooltip>
            )}
            <Popup className="priority-map-popup">
              <strong>{zone.name}</strong>
              <span>{zone.location}</span>
              <span>
                접근성 {zone.accessScore}점 · 중복 제보 {zone.duplicateReports}건
              </span>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[10px] font-black text-navy-800 shadow-sm">
        Leaflet 지도
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap gap-1.5">
        {[
          ['긴급', '#f43f5e'],
          ['검토', '#f59e0b'],
          ['접수', '#2477ff'],
        ].map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-black text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
