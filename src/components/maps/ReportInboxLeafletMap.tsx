import L, { type LatLngExpression } from 'leaflet';
import { useEffect, useMemo } from 'react';
import { Circle, CircleMarker, MapContainer, Popup, TileLayer, Tooltip, ZoomControl, useMap } from 'react-leaflet';
import { reportInboxItems, type ReportInboxItem, type ReportInboxStatus } from '../../data/reportInboxData';
import '../../styles/reportInboxLeaflet.css';

const defaultCenter: LatLngExpression = [35.116, 129.037];

const statusColors: Record<ReportInboxStatus, string> = {
  검수중: '#f97316',
  접수: '#2477ff',
  긴급: '#f43f5e',
  병합: '#8b5cf6',
  현장확인: '#e11d48',
  조치예정: '#0d8794',
};

type ReportInboxLeafletMapProps = {
  reports?: ReportInboxItem[];
  selectedReport?: ReportInboxItem;
  compact?: boolean;
  className?: string;
};

function reportPosition(report: ReportInboxItem): LatLngExpression {
  return report.coordinates;
}

function markerColor(report: ReportInboxItem) {
  return statusColors[report.status] ?? '#2477ff';
}

function FitReportInboxMap({
  reports,
  selectedReport,
  compact,
  positionKey,
}: {
  reports: ReportInboxItem[];
  selectedReport?: ReportInboxItem;
  compact: boolean;
  positionKey: string;
}) {
  const map = useMap();

  useEffect(() => {
    const fitMap = () => {
      map.invalidateSize();

      if (selectedReport) {
        map.setView(reportPosition(selectedReport), compact ? 15 : 14, { animate: false });
        return;
      }

      const bounds = L.latLngBounds(reports.map((report) => report.coordinates));
      map.fitBounds(bounds, { padding: compact ? [18, 18] : [26, 26], maxZoom: compact ? 15 : 13 });
    };

    const timer = window.setTimeout(fitMap, 90);
    const resizeObserver = new ResizeObserver(fitMap);
    resizeObserver.observe(map.getContainer());

    return () => {
      window.clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [compact, map, positionKey, reports, selectedReport]);

  return null;
}

export function ReportInboxLeafletMap({
  reports = reportInboxItems,
  selectedReport,
  compact = false,
  className = '',
}: ReportInboxLeafletMapProps) {
  const visibleReports = useMemo(() => {
    if (!selectedReport || reports.some((report) => report.id === selectedReport.id)) return reports;

    return [selectedReport, ...reports];
  }, [reports, selectedReport]);
  const initialCenter = selectedReport ? reportPosition(selectedReport) : defaultCenter;
  const positionKey = visibleReports.map((report) => `${report.id}:${report.coordinates.join(',')}`).join('|');

  return (
    <div
      className={`report-inbox-leaflet-map relative h-full min-h-[260px] overflow-hidden rounded-[16px] border border-blue-100 bg-blue-50 ${className}`}
      role="region"
      aria-label="부산 제보 위치 실제 Leaflet 지도"
    >
      <MapContainer
        center={initialCenter}
        className="h-full w-full"
        dragging
        maxZoom={17}
        minZoom={10}
        scrollWheelZoom={false}
        zoom={selectedReport ? 15 : 12}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {visibleReports.map((report) => {
          const isSelected = selectedReport?.id === report.id;
          const color = markerColor(report);

          return (
            <Circle
              key={`${report.id}-range`}
              center={reportPosition(report)}
              pathOptions={{ color, fillColor: color, fillOpacity: isSelected ? 0.16 : 0.08, opacity: 0.08, weight: 1 }}
              radius={Math.min(760, 240 + report.duplicateCount * 22)}
            />
          );
        })}

        {visibleReports.map((report) => {
          const isSelected = selectedReport?.id === report.id;
          const color = markerColor(report);
          const showLabel = isSelected || report.status === '긴급' || (!compact && report.duplicateCount >= 10);

          return (
            <CircleMarker
              key={report.id}
              center={reportPosition(report)}
              radius={isSelected ? 10 : compact ? 6 : 8}
              pathOptions={{
                color: '#ffffff',
                fillColor: color,
                fillOpacity: 0.96,
                opacity: 1,
                weight: isSelected ? 4 : 3,
              }}
            >
              {showLabel ? (
                <Tooltip
                  permanent
                  direction="top"
                  offset={[0, isSelected ? -10 : -8]}
                  className={`report-inbox-tooltip ${isSelected ? 'report-inbox-tooltip--selected' : ''}`}
                >
                  {isSelected ? `${report.id} · ${report.location}` : report.id}
                </Tooltip>
              ) : (
                <Tooltip direction="top" offset={[0, -8]} className="report-inbox-tooltip">
                  {report.id} · {report.location}
                </Tooltip>
              )}
              <Popup className="report-inbox-map-popup">
                <strong>{report.location}</strong>
                <span>
                  {report.id} · {report.status}
                </span>
                <span>
                  {report.riskTags.slice(0, 2).join(', ')} · 중복 {report.duplicateCount}건
                </span>
              </Popup>
            </CircleMarker>
          );
        })}

        <ZoomControl position={compact ? 'topright' : 'bottomright'} />
        <FitReportInboxMap compact={compact} positionKey={positionKey} reports={visibleReports} selectedReport={selectedReport} />
      </MapContainer>

      <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-full border border-white/80 bg-white/92 px-2.5 py-1 text-[10px] font-black text-navy-800 shadow-sm">
        Leaflet · OSM
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 z-[500] flex flex-wrap gap-1.5">
        {(['긴급', '검수중', '접수'] as const).map((status) => (
          <span key={status} className="inline-flex items-center gap-1 rounded-full bg-white/92 px-2 py-1 text-[10px] font-black text-slate-600 shadow-sm">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusColors[status] }} />
            {status}
          </span>
        ))}
      </div>
    </div>
  );
}
