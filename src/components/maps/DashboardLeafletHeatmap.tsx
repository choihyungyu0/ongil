import L, { type LatLngBoundsExpression, type LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { Circle, CircleMarker, MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';

const dashboardBounds: LatLngBoundsExpression = [
  [35.0954, 129.0084],
  [35.1262, 129.0646],
];

const mapCenter: LatLngExpression = [35.1128, 129.0392];

const heatZones = [
  { id: 'choryang-risk', center: [35.1191, 129.0368] as LatLngExpression, color: '#ef4444', radius: 980 },
  { id: 'busan-station-risk', center: [35.1138, 129.0414] as LatLngExpression, color: '#f97316', radius: 1120 },
  { id: 'gamcheon-risk', center: [35.1012, 129.0188] as LatLngExpression, color: '#facc15', radius: 1320 },
  { id: 'port-care', center: [35.1118, 129.0535] as LatLngExpression, color: '#14b8a6', radius: 1360 },
];

const pinMarkers = [
  { id: 'risk', label: '위험도 4.8', detail: '초량이바구길 급경사', position: [35.1192, 129.0369] as LatLngExpression, tone: 'red' },
  { id: 'stairs', label: '계단·단차', detail: '부산역 연결부', position: [35.1142, 129.0424] as LatLngExpression, tone: 'orange' },
  { id: 'detour', label: '우회 필요', detail: '감천문화마을 접근', position: [35.1035, 129.0202] as LatLngExpression, tone: 'blue' },
] satisfies Array<{
  id: string;
  label: string;
  detail: string;
  position: LatLngExpression;
  tone: 'red' | 'orange' | 'blue';
}>;

const placeLabels = [
  { label: '초량이바구길', position: [35.1183, 129.0359] as LatLngExpression, tone: 'strong' },
  { label: '부산역', position: [35.1154, 129.0424] as LatLngExpression, tone: 'station' },
  { label: '부산항연안여객터미널', position: [35.1184, 129.0529] as LatLngExpression, tone: 'place' },
  { label: '산복도로', position: [35.1169, 129.0551] as LatLngExpression, tone: 'road' },
  { label: '부산항', position: [35.1031, 129.0589] as LatLngExpression, tone: 'place' },
  { label: '서구', position: [35.1062, 129.0186] as LatLngExpression, tone: 'district' },
  { label: '중구', position: [35.1047, 129.0396] as LatLngExpression, tone: 'district' },
] satisfies Array<{
  label: string;
  position: LatLngExpression;
  tone: 'strong' | 'station' | 'place' | 'road' | 'district';
}>;

const pointMarkers = [
  { label: '1', position: [35.1084, 129.0247] as LatLngExpression, color: '#2477ff' },
  { label: '1', position: [35.1033, 129.0216] as LatLngExpression, color: '#14b8a6' },
  { label: '↴', position: [35.1134, 129.0411] as LatLngExpression, color: '#f97316' },
  { label: '⚓', position: [35.1129, 129.0537] as LatLngExpression, color: '#8b5cf6' },
  { label: '♿', position: [35.1076, 129.0521] as LatLngExpression, color: '#14b8a6' },
];

function FitDashboardMap() {
  const map = useMap();

  useEffect(() => {
    const fitMap = () => {
      map.invalidateSize();
      map.fitBounds(dashboardBounds, { padding: [0, 0], maxZoom: 14 });
    };

    const timer = window.setTimeout(fitMap, 120);
    const resizeObserver = new ResizeObserver(fitMap);
    resizeObserver.observe(map.getContainer());

    return () => {
      window.clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [map]);

  return null;
}

function createPinIcon(marker: (typeof pinMarkers)[number]) {
  return L.divIcon({
    className: 'dashboard-leaflet-div-icon',
    iconAnchor: [18, 34],
    iconSize: [172, 42],
    html: `
      <span class="dashboard-map-pin dashboard-map-pin--${marker.tone}">
        <i></i>
        <strong>${marker.label}</strong>
      </span>
    `,
  });
}

function createPlaceIcon(place: (typeof placeLabels)[number]) {
  return L.divIcon({
    className: 'dashboard-leaflet-div-icon',
    iconAnchor: [58, 16],
    iconSize: [150, 30],
    html: `<span class="dashboard-map-place dashboard-map-place--${place.tone}">${place.label}</span>`,
  });
}

export function DashboardLeafletHeatmap() {
  return (
    <div className="dashboard-leaflet-map h-full w-full" aria-label="부산 보행취약지역 위험도 실제 Leaflet 지도">
      <MapContainer
        center={mapCenter}
        zoom={14}
        minZoom={12}
        maxZoom={17}
        zoomSnap={0.25}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {heatZones.map((zone) => (
          <Circle
            key={zone.id}
            center={zone.center}
            pathOptions={{
              color: zone.color,
              fillColor: zone.color,
              fillOpacity: zone.id === 'choryang-risk' ? 0.24 : 0.17,
              opacity: 0.1,
              weight: 1,
            }}
            radius={zone.radius}
          />
        ))}
        {placeLabels.map((place) => (
          <Marker key={place.label} icon={createPlaceIcon(place)} interactive={false} position={place.position} />
        ))}
        {pointMarkers.map((point) => (
          <CircleMarker
            key={`${point.label}-${point.color}-${String(point.position)}`}
            center={point.position}
            radius={10}
            pathOptions={{ color: '#ffffff', fillColor: point.color, fillOpacity: 0.96, opacity: 1, weight: 3 }}
          >
            <Tooltip permanent direction="center" className="dashboard-point-tooltip">
              {point.label}
            </Tooltip>
          </CircleMarker>
        ))}
        {pinMarkers.map((marker) => (
          <Marker key={marker.id} icon={createPinIcon(marker)} position={marker.position}>
            <Popup className="dashboard-map-popup">
              <strong>{marker.label}</strong>
              <span>{marker.detail}</span>
            </Popup>
          </Marker>
        ))}
        <FitDashboardMap />
      </MapContainer>
    </div>
  );
}
