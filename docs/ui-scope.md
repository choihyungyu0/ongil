# UI Scope

## Source Reference

- Product source: `docs/busan_ongil_ai_final_revised_form.docx`
- Visual reference: `docs/부산창업경진대회 3차 ui.pdf`

The PDF is included in the repository as the visual reference. Local extraction tools available in this environment could not read text or render usable page previews from it, so this scope uses the product document plus the requested design direction as the baseline. Future UI tasks can inspect the PDF manually and refine component details.

## Visual Direction

- Civic-tech, trustworthy, and presentation-ready.
- Primary palette: teal/cyan with deep navy.
- CTA accent: bright blue.
- Background: light blue-gray.
- Cards: white, compact, rounded, soft shadow.
- Admin: structured dashboard SaaS style.
- Mobile: polished app mockup style.

## Navigation Scope

### Citizen Mobile Routes

- `/mobile`
- `/mobile/onboarding`
- `/mobile/search`
- `/mobile/routes`
- `/mobile/navigation`
- `/mobile/report`
- `/mobile/profile`

### Admin Routes

- `/admin`
- `/admin/zones`
- `/admin/reports`
- `/admin/analysis`
- `/admin/routes`
- `/admin/improvements`
- `/admin/layers`
- `/admin/report-export`

## Screen Intent

### Mobile Home

Show the user's current accessibility context, nearby risks, a mock map, and quick entry points for route search and reporting.

### Onboarding

Let the user choose a mobility profile such as wheelchair user, visually impaired user, elderly user, stroller user, temporarily injured user, or vulnerable tourist.

### Search

Show destination search, user type filters, avoid-condition chips, and recommended places.

### Routes

Compare mock route options with accessibility scores, walking time, slopes, stairs, and risk summaries.

### Navigation

Show active route guidance, current segment risk, step list, and abstract map progress.

### Report

Show photo-based scan/report preview with mock AI labels and confidence values.

### Profile

Show mobility type, saved preferences, recent reports, and route defaults.

### Admin Dashboard

Show KPI cards, abstract heatmap, high-risk zones, report trends, and improvement priorities.

### Zones

List dangerous zones by district, risk mix, score, confidence, and recommended action.

### Reports

Show citizen reports, mock AI classification, review status, and confidence.

### Analysis

Show risk type distribution, score factors, and area-level insights.

### Admin Routes

Show route packages for tourist sites, hospitals, welfare centers, and event venues.

### Improvements

Show ranked improvement priorities and expected impact.

### Layers

Show map layer toggles such as slope, stairs, curbs, tactile paving, reports, lighting, and shelters.

### Report Export

Show a printable/exportable report preview using mock diagnosis data.

## Map Rules

- Use only abstract mock maps.
- Use SVG paths, labels, pins, heatmap blobs, and simple panels.
- Do not use real screenshots.
- Do not use Google Maps, Naver Map, Kakao Map, Mapbox, or OpenStreetMap tiles.

## Copy Rules

- Use Korean labels for UI.
- Use measured wording for safety-related claims.
- Prefer "참고", "위험 가능성", "접근성 점수", "개선 필요", and "상대적으로 이동이 어려운 구간".

## Current Baseline Status

The first implementation should provide route-ready placeholder pages and mock data. Later work should replace placeholders with fuller interaction and visual fidelity.
