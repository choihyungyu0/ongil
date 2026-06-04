# Busan On-gil AI Product Spec

## Source Materials Reviewed

- `docs/busan_ongil_ai_final_revised_form.docx`
- `docs/부산창업경진대회 3차 ui.pdf`

The DOCX was readable and is the primary source for product scope. The PDF is present as a visual UI reference, but it appears to be image-based and did not expose useful text for local extraction in this environment.

## Product Summary

Busan On-gil AI is a Busan walking accessibility data platform for vulnerable pedestrians and public-sector operators. It detects walking-vulnerable areas, classifies sidewalk risks, scores accessibility, and presents the results through citizen-facing route guidance and admin-facing dashboards and reports.

The product does not position AI as a fully autonomous decision maker. AI is framed as a support layer for photo classification, report categorization, condition parsing, accessibility score assistance, and administrative summaries.

## Problem Context

Busan has steep hillside roads, stair-based pedestrian paths, old downtown streets, dense tourist areas, and neighborhoods where residential and tourism routes overlap. General map services often optimize for fast or short routes, but vulnerable pedestrians need to know whether a path is physically usable.

Important risk factors include:

- Stairs
- Curbs and level gaps
- Steep slopes
- Broken pavement
- Tactile paving damage or discontinuity
- Bollards and sidewalk obstacles
- Poor lighting
- Construction zones
- Unsafe crossings
- Lack of shelters or rest points

## Target Users

Direct citizen users:

- Wheelchair, power wheelchair, and mobility scooter users
- Visually impaired and low-vision users
- Elderly pedestrians and walking aid users
- Pregnant users, stroller users, and temporarily injured users
- Vulnerable tourists and first-time visitors

Buying or operating customers:

- Busan city government and district offices
- Public institutions
- Busan tourism organizations
- Tourist site operators
- Hospitals, welfare centers, disability organizations
- Festival and event operators

## Core Product Modules

### On-gil Scan

Photo-based risk classification for sidewalks and pedestrian environments. The prototype should show mock classifications for stairs, curbs, tactile paving damage, bollards, pavement damage, poor lighting, and construction zones.

### On-gil Score

Accessibility scoring by segment. The score can include slope, stairs, curbs, surface condition, tactile paving, crosswalk safety, lighting, shelters, and citizen-report confidence.

### On-gil Dashboard

Admin dashboard for local governments and tourism organizations. It should show abstract heatmaps, dangerous zones, report trends, risk type distribution, accessibility scores, and improvement priorities.

### On-gil Report

Report preview and export flow for accessibility diagnosis around tourist spots, hospitals, welfare centers, events, and walking-vulnerable zones.

### On-gil Route

Citizen-facing route guidance by user type. It should provide mock route options and risk explanations for wheelchair users, visually impaired users, elderly users, stroller users, temporarily injured users, and vulnerable tourists.

## MVP Area Direction

The product document recommends starting with one limited Busan area rather than all of Busan. Strong MVP candidates:

- 감천문화마을
- 부산역 - 초량이바구길 - 초량 산복도로

These areas combine steep slopes, stairs, tourist demand, and accessibility challenges.

## Business Direction

The business model emphasizes B2G and B2B data services rather than a paid consumer app. Potential revenue products:

- Walking accessibility diagnosis reports
- Dashboard subscription or SaaS
- Barrier-free tourism route packages
- Safe walking maps around hospitals and welfare centers
- Event accessibility consulting

## Prototype Guardrails

- This repository should not implement a backend.
- This repository should not implement real AI inference.
- This repository should not connect to real map APIs.
- Any AI result, score, heatmap, route, or report must be presented as mock/demo data.
- Safety copy should avoid guarantees and instead communicate relative risk and accessibility context.
