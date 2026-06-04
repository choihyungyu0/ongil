# AGENTS.md

## Project Overview

Busan On-gil AI is a frontend-only React and TypeScript prototype for a Busan walking accessibility data platform. The product helps vulnerable pedestrians and civic operators understand sidewalk risks, accessibility scores, dangerous zones, reports, route options, and improvement priorities.

The prototype is for startup and competition presentation use. It should feel polished enough to demo, while staying simple enough for a beginner developer to continue.

## Absolute Rules

- Frontend-only prototype.
- No backend.
- No database.
- No authentication.
- No real AI inference.
- No real map API or real map tiles.
- No external civic data integrations in the UI.
- Use local mock data only.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React for common UI icons
- Static mock data in `src/data/mockData.ts`

## UI Fidelity Rules

- Use a clean civic-tech look: teal/cyan, deep navy, bright blue CTAs, and very light blue-gray backgrounds.
- Mobile screens should feel like app mockups.
- Admin screens should feel like a practical government dashboard SaaS.
- Cards can use white backgrounds, subtle borders, rounded corners, and soft shadows.
- Use abstract mock maps made with HTML/CSS/SVG lines, pins, heatmap blobs, and labels.
- Do not copy real map screenshots.
- Do not connect to real map providers.
- Keep UI dense enough for operations screens, but readable for a competition demo.

## Korean Copy Rules

- User-facing UI copy should be Korean by default.
- Use product terms consistently:
  - 온길 스캔
  - 온길 점수
  - 온길 대시보드
  - 온길 리포트
  - 온길 루트
- Avoid claiming safety is guaranteed.
- Prefer wording such as "보행 위험 참고", "접근성 점수", "개선 우선순위", and "상대적으로 이동이 어려운 구간".

## Accessibility Rules

- Use semantic HTML whenever practical.
- Buttons and links need clear labels.
- Color cannot be the only way to communicate risk or status.
- Keep contrast strong for text, charts, chips, and map labels.
- Use visible focus styles.
- Preserve keyboard navigation for routed pages and controls.
- Mock route guidance should distinguish user types such as wheelchair users, visually impaired users, elderly users, stroller users, temporarily injured users, and vulnerable tourists.

## File Organization Rules

- Shared UI components: `src/components/common/`
- Citizen/mobile components: `src/components/mobile/`
- Admin dashboard components: `src/components/admin/`
- Abstract map components: `src/components/maps/`
- Citizen/mobile pages: `src/pages/mobile/`
- Admin pages: `src/pages/admin/`
- Global styles: `src/styles/`
- Mock data: `src/data/mockData.ts`
- Product and implementation docs: `docs/`

## Mock Data Rules

- Keep mock data realistic for Busan.
- Use locations such as 감천문화마을, 부산역, 초량이바구길, 산복도로, 자갈치시장, 병원, 복지관, 관광지, 행사장.
- Mock risk types can include stairs, curbs, tactile paving damage, bollards, broken pavement, poor lighting, construction zones, crosswalk risk, steep slopes, and shelter gaps.
- Do not imply the data is real unless a future task explicitly adds a verified source.
- Keep AI results as mock classification labels and confidence values only.

## Validation Commands

Run these before finishing UI or harness work:

```bash
npm install
npm run build
npm run lint
```

Use `npm.cmd` on Windows PowerShell if the local execution policy blocks `npm`.

## Review Checklist

- Routes load without blank screens.
- `/` redirects to `/mobile`.
- Mobile and admin areas have distinct navigation.
- Korean UI labels are present.
- Mock data is imported from `src/data/mockData.ts`.
- No backend, database, auth, real AI, or real map API was added.
- Build passes.
- Lint passes or any limitation is documented.
- UI stays within the civic-tech visual direction.

## Definition Of Done

- The requested screen, component, or harness change is implemented.
- The project still builds.
- Lint is run when configured.
- Any assumptions or limitations are documented in the final response.
- The next developer can understand where to add pages, components, styles, and mock data.
