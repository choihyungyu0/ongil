import 'leaflet/dist/leaflet.css';
import L, { type LatLngBoundsExpression, type LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Circle, CircleMarker, MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { priorityDangerZones, type PriorityDangerZone } from '../../data/mockData';

const center: LatLngExpression = [35.122, 129.065];

const priorityBounds: LatLngBoundsExpression = [
  [35.073, 128.972],
  [35.188, 129.178],
];

const zoneCoordinates: Record<string, LatLngExpression> = {
  'priority-001': [35.15, 129.046],
  'priority-002': [35.104, 129.01],
  'priority-003': [35.116, 129.036],
  'priority-004': [35.109, 129.057],
  'priority-005': [35.093, 129.122],
  'priority-006': [35.111, 129.084],
  'priority-007': [35.128, 129.099],
  'priority-008': [35.142, 129.06],
  'priority-009': [35.136, 129.124],
  'priority-010': [35.097, 129.043],
};

const heatSpots = [
  { id: 'highest-risk', center: [35.148, 129.045] as LatLngExpression, color: '#ef4444', radius: 2600 },
  { id: 'gamcheon-density', center: [35.104, 129.015] as LatLngExpression, color: '#facc15', radius: 3900 },
  { id: 'port-access', center: [35.106, 129.073] as LatLngExpression, color: '#22c55e', radius: 3600 },
  { id: 'suyeong-care', center: [35.126, 129.104] as LatLngExpression, color: '#2dd4bf', radius: 3800 },
  { id: 'east-review', center: [35.134, 129.119] as LatLngExpression, color: '#8b5cf6', radius: 2400 },
];

function markerTone(zone: PriorityDangerZone) {
  if (zone.rank <= 2) return '#ef4444';
  if (zone.rank === 3) return '#3b82f6';
  if (zone.rank === 4) return '#f97316';
  if (zone.rank === 5) return '#22c55e';
  if (zone.rank === 6) return '#0ea5e9';
  if (zone.rank === 7) return '#8b5cf6';
  if (zone.rank === 8) return '#14b8a6';
  return '#64748b';
}

function rankLabel(zone: PriorityDangerZone) {
  if (zone.rank === 1) return '1위';
  return null;
}

function markerRadius(zone: PriorityDangerZone) {
  if (zone.rank === 1) return 8;
  if (zone.rank <= 5) return 7;
  return 5;
}

function createAreaLabel(label: string) {
  return L.divIcon({
    className: 'priority-area-label-icon',
    html: `<span>${label}</span>`,
    iconAnchor: [44, 10],
    iconSize: [88, 20],
  });
}

function FitPriorityMap() {
  const map = useMap();

  useEffect(() => {
    const fitMap = () => {
      map.invalidateSize();
      map.fitBounds(priorityBounds, { padding: [0, 0], maxZoom: 12 });
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
      <MapContainer center={center} zoom={12} minZoom={10} maxZoom={17} scrollWheelZoom={false} zoomControl={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitPriorityMap />
        {heatSpots.flatMap((spot) => [
          <Circle
            key={`${spot.id}-outer`}
            center={spot.center}
            radius={spot.radius}
            pathOptions={{ color: spot.color, fillColor: spot.color, fillOpacity: 0.08, opacity: 0, weight: 0 }}
            interactive={false}
          />,
          <Circle
            key={`${spot.id}-middle`}
            center={spot.center}
            radius={spot.radius * 0.62}
            pathOptions={{ color: spot.color, fillColor: spot.color, fillOpacity: 0.14, opacity: 0, weight: 0 }}
            interactive={false}
          />,
          <Circle
            key={`${spot.id}-inner`}
            center={spot.center}
            radius={spot.radius * 0.34}
            pathOptions={{ color: spot.color, fillColor: spot.color, fillOpacity: 0.19, opacity: 0, weight: 0 }}
            interactive={false}
          />,
        ])}
        {[
          { label: '초량 이바구길', position: [35.151, 129.047] as LatLngExpression },
          { label: '감천문화마을', position: [35.101, 129.013] as LatLngExpression },
          { label: '부산항', position: [35.099, 129.111] as LatLngExpression },
        ].map((place) => (
          <Marker key={place.label} icon={createAreaLabel(place.label)} interactive={false} position={place.position} />
        ))}
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
            {rankLabel(zone) ? (
              <Tooltip permanent direction="right" offset={[8, 0]} className="priority-rank-tooltip">
                {rankLabel(zone)}
              </Tooltip>
            ) : null}
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
    </div>
  );
}
