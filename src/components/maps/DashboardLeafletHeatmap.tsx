import { useEffect } from 'react';
import { CRS, type LatLngBoundsExpression, type LatLngExpression } from 'leaflet';
import { ImageOverlay, MapContainer, useMap } from 'react-leaflet';
import dashboardMapImage from '../../../asset/d44ecfd2-03aa-4757-97ae-169a227f42ac (1).png';

const mapWidth = 1680;
const mapHeight = 944;
const imageBounds: LatLngBoundsExpression = [
  [0, 0],
  [mapHeight, mapWidth],
];
const mapCenter: LatLngExpression = [mapHeight / 2, mapWidth / 2];

function DashboardMapViewport() {
  const map = useMap();

  useEffect(() => {
    const applyCoverView = () => {
      const size = map.getSize();
      const scale = Math.max(size.x / mapWidth, size.y / mapHeight);
      const zoom = Math.log2(scale);

      map.setMinZoom(zoom);
      map.setMaxBounds(imageBounds);
      map.setView(mapCenter, zoom, { animate: false });
    };

    applyCoverView();

    const timeoutId = window.setTimeout(() => {
      map.invalidateSize({ animate: false });
      applyCoverView();
    }, 80);

    map.on('resize', applyCoverView);

    return () => {
      window.clearTimeout(timeoutId);
      map.off('resize', applyCoverView);
    };
  }, [map]);

  return null;
}

export function DashboardLeafletHeatmap() {
  return (
    <div className="dashboard-leaflet-map h-full w-full" aria-label="부산 보행취약지역 위험도 Leaflet mock 지도">
      <MapContainer
        center={mapCenter}
        zoom={-0.2}
        minZoom={-2.4}
        maxZoom={1.4}
        zoomSnap={0.05}
        zoomDelta={0.2}
        crs={CRS.Simple}
        maxBounds={imageBounds}
        maxBoundsViscosity={1}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        attributionControl={false}
        zoomControl={false}
        className="h-full w-full"
      >
        <DashboardMapViewport />
        <ImageOverlay url={dashboardMapImage} bounds={imageBounds} opacity={1} />
      </MapContainer>
    </div>
  );
}
