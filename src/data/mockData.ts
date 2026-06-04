export type RiskLevel = '낮음' | '주의' | '높음' | '매우 높음';

export type UserType = {
  id: string;
  label: string;
  description: string;
  priorityFactors: string[];
};

export type RiskType = {
  id: string;
  label: string;
  level: RiskLevel;
  description: string;
};

export type DangerZone = {
  id: string;
  name: string;
  district: string;
  score: number;
  level: RiskLevel;
  primaryRisks: string[];
  reports: number;
  confidence: number;
  recommendedAction: string;
};

export type CitizenReport = {
  id: string;
  location: string;
  riskType: string;
  status: '접수' | '검토 중' | '개선 요청' | '완료';
  confidence: number;
  createdAt: string;
  summary: string;
};

export type RouteOption = {
  id: string;
  title: string;
  userType: string;
  from: string;
  to: string;
  minutes: number;
  distance: string;
  score: number;
  highlights: string[];
  cautions: string[];
};

export type ReportPreview = {
  id: string;
  title: string;
  area: string;
  score: number;
  period: string;
  keyFindings: string[];
  exportType: string;
};

export const dashboardStats = [
  { label: '위험구간', value: '128', delta: '+14', tone: 'text-rose-600' },
  { label: '평균 접근성', value: '72점', delta: '+3점', tone: 'text-civic-700' },
  { label: '시민제보', value: '842', delta: '+51', tone: 'text-action-600' },
  { label: '개선 우선순위', value: '24건', delta: '긴급 6', tone: 'text-amber-600' },
];

export const userTypes: UserType[] = [
  {
    id: 'wheelchair',
    label: '휠체어 이용자',
    description: '계단, 단차, 급경사, 좁은 보도를 우선 회피',
    priorityFactors: ['계단 없음', '낮은 경사', '넓은 보도'],
  },
  {
    id: 'visual',
    label: '시각장애·저시력',
    description: '점자블록 연속성, 볼라드, 횡단 안전성을 우선 확인',
    priorityFactors: ['점자블록', '음향신호', '장애물 회피'],
  },
  {
    id: 'elderly',
    label: '고령자·보행보조기',
    description: '완만한 경사, 쉼터, 야간 조도를 중요하게 반영',
    priorityFactors: ['쉼터', '조명', '낮은 피로도'],
  },
  {
    id: 'stroller',
    label: '유모차 동반',
    description: '단차와 계단을 줄이고 우회 가능한 동선을 추천',
    priorityFactors: ['엘리베이터', '단차 회피', '넓은 보도'],
  },
  {
    id: 'injured',
    label: '일시적 부상자',
    description: '짧고 무리 없는 이동과 위험요소 안내를 우선',
    priorityFactors: ['짧은 거리', '계단 회피', '휴식 지점'],
  },
  {
    id: 'tourist',
    label: '관광약자',
    description: '초행 관광지의 경사, 계단, 접근 가능한 동선을 안내',
    priorityFactors: ['관광지 접근성', '위험 알림', '쉬운 안내'],
  },
];

export const riskTypes: RiskType[] = [
  {
    id: 'stairs',
    label: '계단',
    level: '매우 높음',
    description: '휠체어, 유모차, 보행보조기 이용자가 통과하기 어려운 구간',
  },
  {
    id: 'curb',
    label: '단차',
    level: '높음',
    description: '보도와 차도 또는 시설 진입부의 높이 차이',
  },
  {
    id: 'tactile',
    label: '점자블록 손상',
    level: '높음',
    description: '점자블록 단절, 훼손, 장애물 점유가 있는 구간',
  },
  {
    id: 'bollard',
    label: '볼라드',
    level: '주의',
    description: '보행 폭을 좁히거나 시각장애인에게 충돌 위험을 주는 장애물',
  },
  {
    id: 'surface',
    label: '노면 파손',
    level: '높음',
    description: '보도블록 파손, 미끄럼, 울퉁불퉁한 포장 상태',
  },
  {
    id: 'lighting',
    label: '조도 부족',
    level: '주의',
    description: '야간 보행 시 위험 인지가 어려운 어두운 길',
  },
  {
    id: 'construction',
    label: '공사구간',
    level: '높음',
    description: '임시 보행로, 우회 동선, 노면 변화가 있는 구간',
  },
];

export const scoreFactors = [
  { label: '경사도', value: 62 },
  { label: '계단 회피', value: 54 },
  { label: '단차 안정성', value: 68 },
  { label: '점자블록', value: 71 },
  { label: '횡단 안전', value: 76 },
  { label: '야간 조도', value: 83 },
  { label: '쉼터 접근', value: 58 },
  { label: '제보 신뢰도', value: 88 },
];

export const dangerZones: DangerZone[] = [
  {
    id: 'zone-001',
    name: '감천문화마을 입구 경사로',
    district: '사하구',
    score: 46,
    level: '매우 높음',
    primaryRisks: ['급경사', '계단', '쉼터 부족'],
    reports: 39,
    confidence: 91,
    recommendedAction: '우회 동선 안내와 쉼터 후보지 검토',
  },
  {
    id: 'zone-002',
    name: '초량이바구길 산복도로 연결부',
    district: '동구',
    score: 52,
    level: '높음',
    primaryRisks: ['급경사', '노면 파손', '조도 부족'],
    reports: 28,
    confidence: 87,
    recommendedAction: '노면 정비와 야간 조명 개선 우선',
  },
  {
    id: 'zone-003',
    name: '부산역 복지관 진입 보도',
    district: '동구',
    score: 64,
    level: '주의',
    primaryRisks: ['단차', '볼라드', '점자블록 단절'],
    reports: 21,
    confidence: 82,
    recommendedAction: '단차 완화와 보행 장애물 재배치',
  },
  {
    id: 'zone-004',
    name: '자갈치시장 횡단 연결부',
    district: '중구',
    score: 69,
    level: '주의',
    primaryRisks: ['횡단 대기공간 부족', '혼잡', '노면 미끄럼'],
    reports: 17,
    confidence: 76,
    recommendedAction: '혼잡 시간대 안내와 미끄럼 방지 포장 검토',
  },
];

export const citizenReports: CitizenReport[] = [
  {
    id: 'R-2401',
    location: '감천문화마을 전망대 앞',
    riskType: '계단',
    status: '검토 중',
    confidence: 94,
    createdAt: '2026-05-21',
    summary: '휠체어 접근 가능한 우회 안내가 부족하다는 제보',
  },
  {
    id: 'R-2402',
    location: '부산역 7번 출구 주변',
    riskType: '점자블록 손상',
    status: '개선 요청',
    confidence: 89,
    createdAt: '2026-05-23',
    summary: '점자블록 위 적치물과 단절 구간이 함께 발견됨',
  },
  {
    id: 'R-2403',
    location: '초량 산복도로 버스정류장',
    riskType: '조도 부족',
    status: '접수',
    confidence: 78,
    createdAt: '2026-05-26',
    summary: '야간 이동 시 보도 경계 확인이 어렵다는 제보',
  },
];

export const routeOptions: RouteOption[] = [
  {
    id: 'route-001',
    title: '완만한 우회길',
    userType: '휠체어 이용자',
    from: '부산역',
    to: '초량이바구길',
    minutes: 18,
    distance: '1.2km',
    score: 82,
    highlights: ['계단 없는 구간 중심', '횡단보도 대기공간 확보', '복지관 앞 쉼터 경유'],
    cautions: ['마지막 120m 완만한 오르막', '볼라드 간격 확인 필요'],
  },
  {
    id: 'route-002',
    title: '점자블록 연속길',
    userType: '시각장애·저시력',
    from: '부산역',
    to: '초량이바구길',
    minutes: 15,
    distance: '950m',
    score: 76,
    highlights: ['점자블록 연속 구간 우선', '음향신호 횡단 포함', '공사구간 회피'],
    cautions: ['시장 입구 혼잡 시간대 주의', '볼라드 밀집 구간 1곳'],
  },
  {
    id: 'route-003',
    title: '쉼터 경유길',
    userType: '고령자·보행보조기',
    from: '감천문화마을 입구',
    to: '전망대',
    minutes: 22,
    distance: '780m',
    score: 71,
    highlights: ['벤치 2곳 경유', '급계단 회피', '관광안내소 근처 휴식 가능'],
    cautions: ['일부 경사 높음', '주말 혼잡 구간 포함'],
  },
];

export const reportPreviews: ReportPreview[] = [
  {
    id: 'report-001',
    title: '감천문화마을 보행접근성 진단',
    area: '사하구 감천동',
    score: 58,
    period: '2026년 5월',
    keyFindings: ['급경사 구간 집중', '계단 우회 정보 부족', '쉼터 간격 개선 필요'],
    exportType: '관광지 리포트',
  },
  {
    id: 'report-002',
    title: '부산역 복지관 주변 안전동선',
    area: '동구 초량동',
    score: 74,
    period: '2026년 5월',
    keyFindings: ['단차 제보 반복', '점자블록 단절 2곳', '횡단 안전성 양호'],
    exportType: '복지기관 리포트',
  },
];

export const mapLayers = [
  { id: 'slope', label: '경사도', enabled: true },
  { id: 'stairs', label: '계단', enabled: true },
  { id: 'curbs', label: '단차', enabled: true },
  { id: 'tactile', label: '점자블록', enabled: true },
  { id: 'reports', label: '시민제보', enabled: true },
  { id: 'lighting', label: '야간 조도', enabled: false },
  { id: 'shelters', label: '쉼터', enabled: false },
];

export const improvementPriorities = [
  {
    id: 'P-01',
    area: '감천문화마을 입구',
    action: '계단 없는 우회 안내 사인 설치',
    impact: '관광약자 접근성 개선',
    urgency: '긴급',
  },
  {
    id: 'P-02',
    area: '부산역 7번 출구',
    action: '점자블록 단절 구간 보수',
    impact: '시각장애 보행 안전 참고도 향상',
    urgency: '높음',
  },
  {
    id: 'P-03',
    area: '초량 산복도로 정류장',
    action: '야간 조명 보강',
    impact: '고령자 야간 보행 위험 완화',
    urgency: '높음',
  },
];
