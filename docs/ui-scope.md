# UI Scope

## Source Reference

- Product source: `docs/busan_ongil_ai_final_revised_form.docx`
- Visual reference: `docs/부산창업경진대회 3차 ui.pdf`

The PDF is included in the repository as the visual reference. Local extraction tools available in this environment could not read text or render usable page previews from it, so this scope uses the product document plus the requested design direction as the baseline.

## Current Scope

The current implementation is admin-only. All citizen/mobile screens and `/mobile` routes have been removed.

Do not recreate mobile screens unless the user explicitly asks for them again.

## Visual Direction

- Civic-tech, trustworthy, and presentation-ready.
- Primary palette: teal/cyan with deep navy.
- CTA accent: bright blue.
- Background: light blue-gray.
- Cards: white, compact, rounded, soft shadow.
- Admin: structured dashboard SaaS style.
- Screens should remain responsive; on narrow widths the admin layout can stack and use horizontal navigation.

## Navigation Scope

### Admin Routes

- `/` redirects to `/admin`
- `/admin`
- `/admin/zones`
- `/admin/reports`
- `/admin/analysis`
- `/admin/photo-analysis`
- `/admin/routes`
- `/admin/improvements`
- `/admin/field-survey`
- `/admin/settings`
- `/admin/report-export`

## Screen Intent

### Admin Dashboard

Show KPI cards, abstract heatmap, high-risk zones, report trends, and improvement priorities.

### Zones

List dangerous zones by district, risk mix, score, confidence, priority score, status, and recommended action.

### Reports

Show citizen reports, mock AI classification, review status, confidence, and location preview.

### Analysis

Show risk type distribution, score factors, district comparison, and area-level insights.

### Photo Analysis

Show a visual mock of AI photo analysis with CSS bounding boxes, confidence bars, recommendations, and processing checklist.

### Admin Routes

Compare fast, safe, stair-free, and gentle route packages for public institutions and tourism organizations.

### Improvements

Show improvement priorities in kanban-style stages with selected task details.

### Field Survey

Show survey assignments, checklist cards, and user-type risk weighting for field work.

### Settings

Show accessibility data layer toggles and the district accessibility comparison dashboard. Legacy `/admin/layers` redirects to this screen.

### Report Export

Show report settings, printable preview, output option cards, and visual-only download action.

## Map Rules

- Use only abstract mock maps.
- Use SVG paths, labels, pins, heatmap blobs, and simple panels.
- Do not use real screenshots.
- Do not use Google Maps, Naver Map, Kakao Map, Mapbox, or OpenStreetMap tiles.

## Copy Rules

- Use Korean labels for UI.
- Use measured wording for safety-related claims.
- Prefer "참고", "위험 가능성", "접근성 점수", "개선 필요", and "상대적으로 이동이 어려운 구간".
