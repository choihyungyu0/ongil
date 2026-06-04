export type RiskLevel = '낮음' | '주의' | '높음' | '매우 높음';

export type ReportStatus = '검토 필요' | '접수' | '긴급' | '조치 예정' | '모니터링';

export type ImprovementStage = '검토 대기' | '예산 협의' | '공사 진행' | '완료';

export type UserType = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  priorityFactors: string[];
  avoidFactors: string[];
};

export type RiskType = {
  id: string;
  label: string;
  level: RiskLevel;
  description: string;
};

export type DestinationShortcut = {
  id: string;
  label: string;
  description: string;
  example: string;
};

export type DangerZone = {
  id: string;
  name: string;
  district: string;
  address: string;
  score: number;
  level: RiskLevel;
  priority: number;
  primaryRisks: string[];
  reports: number;
  confidence: number;
  improvementStatus: ImprovementStage;
  recommendedAction: string;
  criteria: string[];
  fieldPhotos: string[];
};

export type CitizenReport = {
  id: string;
  location: string;
  reporterType: string;
  riskType: string;
  status: ReportStatus;
  severity: RiskLevel;
  confidence: number;
  createdAt: string;
  assignedTeam: string;
  summary: string;
};

export type ReportReviewItem = {
  id: string;
  receivedAt: string;
  location: string;
  aiTags: string[];
  confidence: number;
  duplicates: number;
  managementStatus: '검수 필요' | '접수' | '긴급' | '검토' | '조치 예정' | '모니터링';
  photoKey: 'busNight' | 'tactileDamage' | 'treeWalkway' | 'tactilePath' | 'busStop' | 'bollard';
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
  riskCount: number;
  slope: string;
  recommendationReason: string;
  highlights: string[];
  cautions: string[];
  tags: string[];
  color: string;
  recommended?: boolean;
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

export type PhotoDetection = {
  label: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export const dashboardStats = [
  { label: '전체 위험구간', value: '128', delta: '+14', tone: 'text-rose-600' },
  { label: '오늘 신규 제보', value: '37', delta: '+9', tone: 'text-action-600' },
  { label: '조치 완료', value: '64건', delta: '+6건', tone: 'text-civic-700' },
  { label: '평균 위험도', value: '주의', delta: '72점', tone: 'text-amber-600' },
];

export const userTypes: UserType[] = [
  {
    id: 'wheelchair',
    label: '휠체어 이용자',
    shortLabel: '휠체어',
    description: '계단, 단차, 급경사, 좁은 보도를 우선 회피합니다.',
    priorityFactors: ['계단 없는 길', '낮은 경사', '넓은 보도'],
    avoidFactors: ['계단', '높은 단차', '폭 좁은 보도'],
  },
  {
    id: 'visual',
    label: '시각장애·저시력',
    shortLabel: '시각장애',
    description: '점자블록 연속성, 볼라드, 음향신호, 횡단 안전성을 우선 확인합니다.',
    priorityFactors: ['점자블록', '음향신호', '장애물 회피'],
    avoidFactors: ['점자블록 단절', '볼라드 밀집', '공사 가림막'],
  },
  {
    id: 'elderly',
    label: '고령자',
    shortLabel: '고령자',
    description: '완만한 경사, 쉼터, 야간 조도, 짧은 보행 피로도를 중요하게 반영합니다.',
    priorityFactors: ['쉼터 경유', '밝은 길', '낮은 피로도'],
    avoidFactors: ['급경사', '긴 계단', '야간 어두운 길'],
  },
  {
    id: 'stroller',
    label: '유모차 동반',
    shortLabel: '유모차',
    description: '단차와 계단을 줄이고 엘리베이터나 우회 동선이 있는 길을 추천합니다.',
    priorityFactors: ['엘리베이터', '단차 회피', '넓은 보도'],
    avoidFactors: ['높은 턱', '계단', '혼잡한 시장길'],
  },
  {
    id: 'injured',
    label: '일시적 부상자',
    shortLabel: '부상자',
    description: '짧고 무리 없는 이동과 위험요소 사전 안내를 우선합니다.',
    priorityFactors: ['짧은 거리', '계단 회피', '휴식 지점'],
    avoidFactors: ['미끄러운 노면', '급경사', '장거리 우회'],
  },
  {
    id: 'tourist',
    label: '관광약자',
    shortLabel: '관광약자',
    description: '초행 관광지의 경사, 계단, 접근 가능한 편의시설을 함께 안내합니다.',
    priorityFactors: ['관광지 접근성', '쉬운 안내', '쉼터 정보'],
    avoidFactors: ['정보 부족 골목', '급계단', '혼잡 구간'],
  },
];

export const riskTypes: RiskType[] = [
  {
    id: 'steep-slope',
    label: '급경사',
    level: '매우 높음',
    description: '경사가 높아 휠체어, 고령자, 유모차 이동 부담이 큰 구간입니다.',
  },
  {
    id: 'stairs',
    label: '계단',
    level: '매우 높음',
    description: '휠체어, 유모차, 보행보조기 이용자가 통과하기 어려운 구간입니다.',
  },
  {
    id: 'curb',
    label: '단차',
    level: '높음',
    description: '보도와 차도 또는 시설 진입부의 높이 차이가 있는 지점입니다.',
  },
  {
    id: 'tactile',
    label: '점자블록 훼손',
    level: '높음',
    description: '점자블록 단절, 훼손, 장애물 점유가 발견된 구간입니다.',
  },
  {
    id: 'bollard',
    label: '볼라드',
    level: '주의',
    description: '보행 폭을 좁히거나 시각장애인에게 충돌 위험을 줄 수 있는 장애물입니다.',
  },
  {
    id: 'surface',
    label: '노면 파손',
    level: '높음',
    description: '보도블록 파손, 미끄럼, 울퉁불퉁한 포장 상태가 있는 구간입니다.',
  },
  {
    id: 'lighting',
    label: '조도 부족',
    level: '주의',
    description: '야간 보행 시 보도 경계와 장애물 인지가 어려운 어두운 길입니다.',
  },
  {
    id: 'construction',
    label: '공사구간',
    level: '높음',
    description: '임시 보행로, 우회 동선, 노면 변화가 있는 구간입니다.',
  },
];

export const destinationShortcuts: DestinationShortcut[] = [
  { id: 'hospital', label: '병원', description: '진료·재활 방문', example: '부산의료원' },
  { id: 'welfare', label: '복지관', description: '복지시설 주변 안전동선', example: '동구장애인복지관' },
  { id: 'market', label: '전통시장', description: '혼잡·노면 위험 참고', example: '자갈치시장' },
  { id: 'tour', label: '관광지', description: '무장애 관광 경로', example: '감천문화마을' },
  { id: 'subway', label: '지하철역', description: '엘리베이터 연결', example: '부산역' },
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
    address: '부산 사하구 감천동 산복도로 진입부',
    score: 46,
    level: '매우 높음',
    priority: 96,
    primaryRisks: ['급경사', '계단', '쉼터 부족'],
    reports: 39,
    confidence: 91,
    improvementStatus: '예산 협의',
    recommendedAction: '계단 없는 우회 안내 사인과 중간 쉼터 후보지를 우선 검토',
    criteria: ['교통약자 제보 반복', '관광약자 방문 수요 높음', '경사도 위험 가중치 높음'],
    fieldPhotos: ['경사로 전경', '계단 연결부', '쉼터 공백 지점'],
  },
  {
    id: 'zone-002',
    name: '초량이바구길 산복도로 연결부',
    district: '동구',
    address: '부산 동구 초량동 이바구길 연결 계단 주변',
    score: 52,
    level: '높음',
    priority: 89,
    primaryRisks: ['급경사', '노면 파손', '조도 부족'],
    reports: 28,
    confidence: 87,
    improvementStatus: '검토 대기',
    recommendedAction: '노면 정비와 야간 조명 보강을 함께 검토',
    criteria: ['야간 제보 증가', '고령자 이동 부담', '관광 동선과 생활 동선 중첩'],
    fieldPhotos: ['파손 보도블록', '어두운 골목길', '버스정류장 연결부'],
  },
  {
    id: 'zone-003',
    name: '부산역 복지관 진입 보도',
    district: '동구',
    address: '부산 동구 부산역 7번 출구 인근',
    score: 64,
    level: '주의',
    priority: 78,
    primaryRisks: ['단차', '볼라드', '점자블록 단절'],
    reports: 21,
    confidence: 82,
    improvementStatus: '공사 진행',
    recommendedAction: '단차 완화와 보행 장애물 재배치',
    criteria: ['복지관 이용자 영향', '점자블록 단절', '대중교통 접근성 중요'],
    fieldPhotos: ['출구 앞 단차', '볼라드 밀집', '점자블록 끊김'],
  },
  {
    id: 'zone-004',
    name: '자갈치시장 횡단 연결부',
    district: '중구',
    address: '부산 중구 자갈치해안로 시장 입구',
    score: 69,
    level: '주의',
    priority: 72,
    primaryRisks: ['횡단 대기공간 부족', '혼잡', '노면 미끄럼'],
    reports: 17,
    confidence: 76,
    improvementStatus: '완료',
    recommendedAction: '혼잡 시간대 안내와 미끄럼 방지 포장 검토',
    criteria: ['방문객 밀집', '노면 미끄럼 제보', '상권 보행량 높음'],
    fieldPhotos: ['시장 입구 횡단부', '습윤 노면', '보행 혼잡'],
  },
  {
    id: 'zone-005',
    name: '부산시민공원 남문 보도',
    district: '부산진구',
    address: '부산 부산진구 시민공원 남문',
    score: 73,
    level: '낮음',
    priority: 55,
    primaryRisks: ['볼라드', '자전거 혼재'],
    reports: 9,
    confidence: 68,
    improvementStatus: '완료',
    recommendedAction: '보행·자전거 동선 분리 안내 유지',
    criteria: ['개선 후 제보 감소', '공원 이용자 지속 모니터링'],
    fieldPhotos: ['남문 보행로', '볼라드 재배치', '안내 표지'],
  },
  {
    id: 'zone-006',
    name: '해운대 구남로 횡단부',
    district: '해운대구',
    address: '부산 해운대구 구남로 해수욕장 진입부',
    score: 67,
    level: '주의',
    priority: 69,
    primaryRisks: ['혼잡', '횡단 대기공간 부족', '시각 안내 부족'],
    reports: 16,
    confidence: 74,
    improvementStatus: '검토 대기',
    recommendedAction: '관광 성수기 임시 보행 안내와 횡단 대기공간 분산 검토',
    criteria: ['관광객 밀집', '초행자 비율 높음', '횡단 대기 불편 제보'],
    fieldPhotos: ['구남로 횡단부', '해수욕장 진입 동선', '보행 혼잡 지점'],
  },
  {
    id: 'zone-007',
    name: '서면 지하상가 엘리베이터 연결부',
    district: '부산진구',
    address: '부산 부산진구 서면역 지하상가 연결 통로',
    score: 70,
    level: '주의',
    priority: 66,
    primaryRisks: ['엘리베이터 우회', '혼잡', '안내 부족'],
    reports: 14,
    confidence: 72,
    improvementStatus: '예산 협의',
    recommendedAction: '엘리베이터 접근 안내와 혼잡 시간대 우회 표지 보강',
    criteria: ['대중교통 환승 수요', '유모차 이용 제보', '안내 정보 부족'],
    fieldPhotos: ['엘리베이터 연결부', '지하상가 통로', '혼잡 안내판'],
  },
  {
    id: 'zone-008',
    name: '동래시장 보도블록 구간',
    district: '동래구',
    address: '부산 동래구 동래시장 입구 보행로',
    score: 60,
    level: '높음',
    priority: 81,
    primaryRisks: ['노면 파손', '단차', '혼잡'],
    reports: 25,
    confidence: 83,
    improvementStatus: '검토 대기',
    recommendedAction: '보도블록 보수와 적치물 정리 협업 요청',
    criteria: ['노면 파손 사진 반복', '시장 이용 고령자 많음', '혼잡 시간대 낙상 우려'],
    fieldPhotos: ['파손 보도블록', '시장 입구 단차', '적치물 구간'],
  },
  {
    id: 'zone-009',
    name: '부산의료원 버스정류장 연결부',
    district: '연제구',
    address: '부산 연제구 부산의료원 정문 앞',
    score: 65,
    level: '주의',
    priority: 75,
    primaryRisks: ['쉼터 부족', '단차', '횡단 안전'],
    reports: 18,
    confidence: 79,
    improvementStatus: '공사 진행',
    recommendedAction: '정류장-병원 입구 사이 단차 완화와 쉼터 위치 검토',
    criteria: ['병원 방문 보행약자 영향', '정류장 접근성 중요', '반복 제보'],
    fieldPhotos: ['정류장 연결부', '병원 입구 단차', '횡단 대기 지점'],
  },
  {
    id: 'zone-010',
    name: '영도 흰여울문화마을 골목',
    district: '영도구',
    address: '부산 영도구 흰여울길 관광 동선',
    score: 49,
    level: '매우 높음',
    priority: 93,
    primaryRisks: ['급경사', '계단', '좁은 보도'],
    reports: 32,
    confidence: 88,
    improvementStatus: '검토 대기',
    recommendedAction: '관광약자 우회 동선과 위험 안내 사인을 우선 배치',
    criteria: ['급경사 관광지', '계단 기반 골목', '관광약자 문의 증가'],
    fieldPhotos: ['급경사 골목', '계단 연결부', '좁은 보행로'],
  },
];

export const citizenReports: CitizenReport[] = [
  {
    id: 'R-2401',
    location: '감천문화마을 전망대 앞',
    reporterType: '관광약자',
    riskType: '계단',
    status: '검토 필요',
    severity: '매우 높음',
    confidence: 94,
    createdAt: '2026-05-21',
    assignedTeam: '사하구 보행환경팀',
    summary: '휠체어 접근 가능한 우회 안내가 부족하다는 제보입니다.',
  },
  {
    id: 'R-2402',
    location: '부산역 7번 출구 주변',
    reporterType: '시각장애·저시력',
    riskType: '점자블록 훼손',
    status: '조치 예정',
    severity: '높음',
    confidence: 89,
    createdAt: '2026-05-23',
    assignedTeam: '동구 도로관리팀',
    summary: '점자블록 위 적치물과 단절 구간이 함께 발견되었습니다.',
  },
  {
    id: 'R-2403',
    location: '초량 산복도로 버스정류장',
    reporterType: '고령자',
    riskType: '조도 부족',
    status: '긴급',
    severity: '높음',
    confidence: 78,
    createdAt: '2026-05-26',
    assignedTeam: '동구 생활안전팀',
    summary: '야간 이동 시 보도 경계 확인이 어렵다는 제보입니다.',
  },
  {
    id: 'R-2404',
    location: '자갈치시장 입구 횡단보도',
    reporterType: '유모차 동반',
    riskType: '노면 파손',
    status: '접수',
    severity: '주의',
    confidence: 74,
    createdAt: '2026-05-27',
    assignedTeam: '중구 교통행정팀',
    summary: '횡단 대기 중 바닥 미끄럼과 보도블록 흔들림을 제보했습니다.',
  },
  {
    id: 'R-2405',
    location: '부산역 엘리베이터 연결 통로',
    reporterType: '휠체어 이용자',
    riskType: '단차',
    status: '모니터링',
    severity: '주의',
    confidence: 81,
    createdAt: '2026-05-29',
    assignedTeam: '동구 보행환경팀',
    summary: '개선 후에도 일부 턱이 남아 있어 현장 확인이 필요합니다.',
  },
];

export const reportReviewItems: ReportReviewItem[] = [
  {
    id: '#R-2048',
    receivedAt: '오늘 09:42',
    location: '감천문화마을 입구',
    aiTags: ['계단', '단차'],
    confidence: 0.91,
    duplicates: 12,
    managementStatus: '검수 필요',
    photoKey: 'tactilePath',
  },
  {
    id: '#R-2041',
    receivedAt: '오늘 08:15',
    location: '부산역 중앙대로',
    aiTags: ['점자블록 파손'],
    confidence: 0.87,
    duplicates: 8,
    managementStatus: '접수',
    photoKey: 'tactileDamage',
  },
  {
    id: '#R-2035',
    receivedAt: '어제 18:21',
    location: '초량 산복도로',
    aiTags: ['급경사', '쉼터 부족'],
    confidence: 0.86,
    duplicates: 15,
    managementStatus: '긴급',
    photoKey: 'treeWalkway',
  },
  {
    id: '#R-2029',
    receivedAt: '어제 14:10',
    location: '남포동 횡단보도',
    aiTags: ['횡단보도 위험'],
    confidence: 0.82,
    duplicates: 5,
    managementStatus: '검토',
    photoKey: 'bollard',
  },
  {
    id: '#R-2018',
    receivedAt: '05.19 11:30',
    location: '자갈치시장 앞',
    aiTags: ['볼라드 간격'],
    confidence: 0.79,
    duplicates: 3,
    managementStatus: '조치 예정',
    photoKey: 'busStop',
  },
  {
    id: '#R-2011',
    receivedAt: '05.18 16:12',
    location: '영도 흰여울 계단길',
    aiTags: ['계단'],
    confidence: 0.78,
    duplicates: 9,
    managementStatus: '모니터링',
    photoKey: 'busNight',
  },
  {
    id: '#R-2007',
    receivedAt: '05.18 10:24',
    location: '부산역 복지관 진입로',
    aiTags: ['보행폭 부족', '단차'],
    confidence: 0.76,
    duplicates: 6,
    managementStatus: '검수 필요',
    photoKey: 'tactileDamage',
  },
  {
    id: '#R-1998',
    receivedAt: '05.17 20:05',
    location: '초량시장 버스정류장',
    aiTags: ['야간 조도', '노면 파손'],
    confidence: 0.74,
    duplicates: 4,
    managementStatus: '접수',
    photoKey: 'busNight',
  },
];

export const routeOptions: RouteOption[] = [
  {
    id: 'route-fast',
    title: '빠른 길',
    userType: '일반 비교',
    from: '부산역',
    to: '초량이바구길',
    minutes: 12,
    distance: '850m',
    score: 58,
    riskCount: 7,
    slope: '높음',
    recommendationReason: '가장 짧지만 계단과 급경사 구간이 포함되어 보행약자에게 부담이 큽니다.',
    highlights: ['최단 거리', '대중교통 출구와 가까움'],
    cautions: ['급경사 2곳', '계단 1곳', '점자블록 단절 1곳'],
    tags: ['급경사', '계단', '단차'],
    color: '#ef4444',
  },
  {
    id: 'route-safe',
    title: '안전한 길',
    userType: '시각장애·고령자',
    from: '부산역',
    to: '초량이바구길',
    minutes: 18,
    distance: '1.2km',
    score: 86,
    riskCount: 2,
    slope: '보통',
    recommendationReason: '횡단 안전과 조도가 양호하고 시민제보 위험이 적어 추천합니다.',
    highlights: ['횡단보도 대기공간 확보', '야간 조도 양호', '복지관 앞 쉼터 경유'],
    cautions: ['마지막 120m 완만한 오르막'],
    tags: ['조도 양호', '쉼터', '횡단 안전'],
    color: '#2477ff',
    recommended: true,
  },
  {
    id: 'route-stair-free',
    title: '계단 없는 길',
    userType: '휠체어·유모차',
    from: '부산역',
    to: '초량이바구길',
    minutes: 21,
    distance: '1.4km',
    score: 82,
    riskCount: 3,
    slope: '보통',
    recommendationReason: '거리는 늘어나지만 계단을 회피하고 보도 폭이 넓은 구간을 우선합니다.',
    highlights: ['계단 없음', '넓은 보도', '엘리베이터 연결'],
    cautions: ['볼라드 간격 확인 필요', '우회 거리 증가'],
    tags: ['계단 없음', '단차 낮음', '넓은 보도'],
    color: '#0d8794',
  },
  {
    id: 'route-gentle',
    title: '완만한 길',
    userType: '고령자·부상자',
    from: '감천문화마을 입구',
    to: '전망대',
    minutes: 24,
    distance: '920m',
    score: 78,
    riskCount: 4,
    slope: '낮음',
    recommendationReason: '급경사를 피하고 벤치 2곳을 경유해 피로도를 낮춥니다.',
    highlights: ['쉼터 2곳', '급계단 회피', '관광안내소 경유'],
    cautions: ['주말 혼잡 가능성', '일부 노면 파손'],
    tags: ['완만한 경사', '쉼터', '혼잡 주의'],
    color: '#10b981',
  },
];

export const monthlyTrend = [
  { label: '1월', reports: 38, improvements: 12 },
  { label: '2월', reports: 46, improvements: 18 },
  { label: '3월', reports: 59, improvements: 23 },
  { label: '4월', reports: 71, improvements: 31 },
  { label: '5월', reports: 84, improvements: 37 },
  { label: '6월', reports: 92, improvements: 44 },
];

export const riskSummary = [
  { label: '급경사', count: 34, value: 82 },
  { label: '계단', count: 29, value: 76 },
  { label: '단차', count: 24, value: 68 },
  { label: '점자블록 훼손', count: 18, value: 52 },
  { label: '조도 부족', count: 13, value: 39 },
];

export const photoAnalysis = {
  imageTitle: '부산역 7번 출구 보도 제보 사진',
  location: '부산역 7번 출구 주변',
  detections: [
    { label: '점자블록 훼손', confidence: 91, x: 11, y: 52, width: 36, height: 18 },
    { label: '단차', confidence: 84, x: 56, y: 45, width: 25, height: 14 },
    { label: '볼라드', confidence: 76, x: 72, y: 20, width: 12, height: 34 },
  ] satisfies PhotoDetection[],
  resultBars: [
    { label: '점자블록 훼손', value: 91 },
    { label: '단차 위험', value: 84 },
    { label: '보행폭 부족', value: 63 },
    { label: '야간 조도', value: 42 },
  ],
  recommendations: ['점자블록 단절 구간 보수', '출입구 단차 완화판 설치', '볼라드 간격 현장 확인'],
  checklist: ['제보 중복 확인', 'AI 분류 검수', '현장조사 배정', '개선요청 등록'],
};

export const improvementPriorities = [
  {
    id: 'I-129',
    area: '감천문화마을 입구',
    action: '경사로 정비 필요',
    impact: '관광약자와 고령자의 접근성 점수 개선',
    urgency: '개선 검토',
    owner: '사하구 보행환경팀',
    stage: '검토 대기' as ImprovementStage,
    district: '사하구 감천동',
    targetUser: '관광약자·고령자',
    budget: '2.4억',
    due: '2026.07 검토',
    progress: 32,
  },
  {
    id: 'I-130',
    area: '부산역 북항 산책도로',
    action: '손잡이 정비',
    impact: '휠체어 이용자와 임시 부상자의 이동 부담 완화',
    urgency: '개선 검토',
    owner: '동구 도로관리팀',
    stage: '검토 대기' as ImprovementStage,
    district: '동구 초량동',
    targetUser: '휠체어 이용자',
    budget: '1.8억',
    due: '2026.07 검토',
    progress: 28,
  },
  {
    id: 'I-128',
    area: '초량 이바구길',
    action: '쉼터 설치 필요',
    impact: '고령자와 관광약자의 휴식 간격 개선',
    urgency: '개선 필요',
    owner: '동구 생활안전팀',
    stage: '예산 협의' as ImprovementStage,
    district: '동구 초량동',
    targetUser: '고령자·관광약자',
    budget: '3.1억',
    due: '2026.08 협의',
    progress: 48,
  },
  {
    id: 'I-124',
    area: '남항시장 주변',
    action: '횡단보도턱 개선',
    impact: '유모차 동반자와 휠체어 이용자의 단차 부담 완화',
    urgency: '개선 필요',
    owner: '영도구 교통행정팀',
    stage: '예산 협의' as ImprovementStage,
    district: '영도구 남항동',
    targetUser: '유모차 동반자',
    budget: '1.6억',
    due: '2026.08 협의',
    progress: 52,
  },
  {
    id: 'I-126',
    area: '영도 보행로',
    action: '보도블록 교체 공사',
    impact: '파손 포장으로 인한 넘어짐 위험 참고도 개선',
    urgency: '개선 필요',
    owner: '영도구 도로관리팀',
    stage: '공사 진행' as ImprovementStage,
    district: '영도구 봉래동',
    targetUser: '고령자·시각장애인',
    budget: '2.9억',
    due: '2026.09 공사',
    progress: 72,
  },
  {
    id: 'I-125',
    area: '대청동 보도',
    action: '볼라드 간격 조정',
    impact: '휠체어 이용자의 보행폭 확보',
    urgency: '개선 필요',
    owner: '중구 교통행정팀',
    stage: '공사 진행' as ImprovementStage,
    district: '중구 대청동',
    targetUser: '휠체어 이용자',
    budget: '0.9억',
    due: '2026.09 공사',
    progress: 78,
  },
  {
    id: 'I-121',
    area: '부전동 횡단보도',
    action: '점자 블록 정비 완료',
    impact: '시각장애 보행자의 접근성 점수 개선',
    urgency: '개선 완료',
    owner: '부산진구 도로관리팀',
    stage: '완료' as ImprovementStage,
    district: '부산진구 부전동',
    targetUser: '시각장애인',
    budget: '1.2억',
    due: '2026.05 완료',
    progress: 100,
  },
];

export const fieldSurveyAssignments = [
  {
    id: 'S-01',
    area: '감천문화마을 입구',
    inspector: '현장조사 A팀',
    date: '2026-06-08',
    focus: ['경사도 측정', '쉼터 후보', '계단 우회'],
  },
  {
    id: 'S-02',
    area: '부산역 7번 출구',
    inspector: '현장조사 B팀',
    date: '2026-06-09',
    focus: ['점자블록', '단차', '볼라드 간격'],
  },
  {
    id: 'S-03',
    area: '초량 산복도로 정류장',
    inspector: '야간조사 C팀',
    date: '2026-06-10',
    focus: ['조도', '노면 파손', '버스정류장 연결'],
  },
];

export const districtScores = [
  { district: '동구', score: 68, zones: 31 },
  { district: '사하구', score: 61, zones: 24 },
  { district: '중구', score: 73, zones: 17 },
  { district: '부산진구', score: 79, zones: 14 },
  { district: '해운대구', score: 82, zones: 11 },
];

export const mapLayers = [
  { id: 'slope', label: '경사도', enabled: true, description: 'DEM 기반 경사 위험 mock layer' },
  { id: 'stairs', label: '계단', enabled: true, description: '계단·급계단 제보와 현장조사' },
  { id: 'curbs', label: '단차', enabled: true, description: '보도 턱과 진입부 높이 차이' },
  { id: 'tactile', label: '점자블록', enabled: true, description: '점자블록 연속성 및 훼손' },
  { id: 'reports', label: '시민제보', enabled: true, description: '사진 제보와 검수 상태' },
  { id: 'lighting', label: '야간 조도', enabled: false, description: '어두운 보행 구간' },
  { id: 'shelters', label: '쉼터', enabled: false, description: '벤치·쉼터 접근성' },
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

export type PriorityDangerZone = {
  id: string;
  rank: number;
  name: string;
  location: string;
  risks: string[];
  accessScore: number;
  duplicateReports: number;
  improvementNeed: number;
  status: '긴급' | '검토' | '접수' | '예정' | '모니터링';
};

export const priorityDangerZones: PriorityDangerZone[] = [
  {
    id: 'priority-001',
    rank: 1,
    name: '초량이바구길 급경사',
    location: '동구 초량동 865',
    risks: ['급경사', '쉼터 부족'],
    accessScore: 42,
    duplicateReports: 38,
    improvementNeed: 92,
    status: '긴급',
  },
  {
    id: 'priority-002',
    rank: 2,
    name: '감천문화마을 입구',
    location: '사하구 감내2로',
    risks: ['계단', '횡단보도'],
    accessScore: 46,
    duplicateReports: 32,
    improvementNeed: 88,
    status: '긴급',
  },
  {
    id: 'priority-003',
    rank: 3,
    name: '부산역 중앙대로',
    location: '동구 중앙대로 206',
    risks: ['점자블록', '단차'],
    accessScore: 53,
    duplicateReports: 28,
    improvementNeed: 78,
    status: '검토',
  },
  {
    id: 'priority-004',
    rank: 4,
    name: '남포동 보행로',
    location: '중구 광복로',
    risks: ['횡단보도', '야간 조도'],
    accessScore: 57,
    duplicateReports: 22,
    improvementNeed: 74,
    status: '검토',
  },
  {
    id: 'priority-005',
    rank: 5,
    name: '영도 봉래동 계단길',
    location: '영도구 봉래나루로',
    risks: ['계단', '단차'],
    accessScore: 59,
    duplicateReports: 18,
    improvementNeed: 70,
    status: '검토',
  },
  {
    id: 'priority-006',
    rank: 6,
    name: '부산대병원 진입로',
    location: '서구 구덕로',
    risks: ['보도블록'],
    accessScore: 64,
    duplicateReports: 15,
    improvementNeed: 55,
    status: '접수',
  },
  {
    id: 'priority-007',
    rank: 7,
    name: '자갈치시장 앞 보행로',
    location: '중구 자갈치해안로',
    risks: ['볼라드'],
    accessScore: 68,
    duplicateReports: 12,
    improvementNeed: 50,
    status: '접수',
  },
  {
    id: 'priority-008',
    rank: 8,
    name: '부산시민공원 북문',
    location: '부산진구 시민공원로',
    risks: ['점자블록'],
    accessScore: 71,
    duplicateReports: 10,
    improvementNeed: 46,
    status: '예정',
  },
  {
    id: 'priority-009',
    rank: 9,
    name: '광안리 해변로',
    location: '수영구 광안해변로',
    risks: ['횡단보도'],
    accessScore: 73,
    duplicateReports: 9,
    improvementNeed: 40,
    status: '모니터링',
  },
  {
    id: 'priority-010',
    rank: 10,
    name: '해운대 구남로',
    location: '해운대구 구남로',
    risks: ['보도블록'],
    accessScore: 75,
    duplicateReports: 8,
    improvementNeed: 36,
    status: '모니터링',
  },
];

export type AccessibilityLayerItem = {
  id: string;
  label: string;
  dateLabel: string;
  enabled: boolean;
  tone: 'cyan' | 'blue' | 'orange' | 'violet' | 'emerald' | 'rose' | 'sky' | 'amber';
};

export type AccessibilityComparisonSummary = {
  label: string;
  value: string;
  caption: string;
  trend: string;
  tone: 'cyan' | 'blue' | 'rose' | 'emerald';
};

export type AccessibilityDistrictComparison = {
  rank: number;
  district: string;
  issue: string;
  score: number;
};

export type AccessibilityRiskShare = {
  label: string;
  value: number;
  color: string;
};

export type AccessibilityUserImpact = {
  label: string;
  value: number;
  color: string;
};

export const accessibilityLayerItems: AccessibilityLayerItem[] = [
  { id: 'dem', label: 'DEM 고도·경사도', dateLabel: '2025.05.20', enabled: true, tone: 'cyan' },
  { id: 'road', label: '도로망·보행로', dateLabel: '2025.05.19', enabled: true, tone: 'blue' },
  { id: 'crosswalk', label: '횡단보도·신호등', dateLabel: '2025.05.18', enabled: true, tone: 'orange' },
  { id: 'facility', label: '장애인 편의시설', dateLabel: '2025.05.18', enabled: true, tone: 'violet' },
  { id: 'survey', label: '현장조사 사진', dateLabel: '오늘 07건', enabled: true, tone: 'emerald' },
  { id: 'report-density', label: '시민제보 밀도', dateLabel: '최근 30일', enabled: true, tone: 'rose' },
  { id: 'shelter', label: '쉼터·벤치 위치', dateLabel: '검수 필요', enabled: false, tone: 'sky' },
  { id: 'lighting', label: '야간 조도 데이터', dateLabel: '대기', enabled: false, tone: 'amber' },
];

export const accessibilityComparisonSummary: AccessibilityComparisonSummary[] = [
  { label: '분석 구간', value: '12,248', caption: '전체', trend: '전월 대비 +8.3%', tone: 'cyan' },
  { label: '평균 접근성', value: '62.4점', caption: '부산시 평균', trend: '전월 대비 +2.1', tone: 'blue' },
  { label: '고위험 구간', value: '1,248', caption: '관리 우선', trend: '전월 대비 +4.0%', tone: 'rose' },
  { label: '개선 완료', value: '632', caption: '올해 누적', trend: '전월 대비 +8.7%', tone: 'emerald' },
];

export const accessibilityDistrictComparisons: AccessibilityDistrictComparison[] = [
  { rank: 1, district: '중구', issue: '급경사·계단 밀집', score: 58 },
  { rank: 2, district: '서구', issue: '감천문화마을 단차', score: 61 },
  { rank: 3, district: '동구', issue: '산복도로 접근성', score: 64 },
  { rank: 4, district: '영도구', issue: '보도블록 파손', score: 67 },
  { rank: 5, district: '부산진구', issue: '볼라드 간격', score: 69 },
];

export const accessibilityRiskShares: AccessibilityRiskShare[] = [
  { label: '급경사', value: 31, color: '#ff4d55' },
  { label: '계단·단차', value: 24, color: '#ff8a2a' },
  { label: '점자블록', value: 18, color: '#7b61ff' },
  { label: '보도파손', value: 15, color: '#2477ff' },
  { label: '쉼터부족', value: 12, color: '#18c5ad' },
];

export const accessibilityUserImpacts: AccessibilityUserImpact[] = [
  { label: '휠체어', value: 91, color: '#18c5ad' },
  { label: '고령자', value: 84, color: '#2477ff' },
  { label: '시각장애', value: 72, color: '#7b61ff' },
  { label: '유모차', value: 68, color: '#ff8a2a' },
  { label: '관광약자', value: 63, color: '#22c55e' },
];

export const accessibilityMapDistricts = [
  { district: '중구', score: 58, tone: 'rose' },
  { district: '서구', score: 61, tone: 'orange' },
  { district: '동구', score: 64, tone: 'amber' },
  { district: '영도구', score: 67, tone: 'blue' },
  { district: '남구', score: 72, tone: 'emerald' },
];

export type AdminSettingSummary = {
  label: string;
  value: string;
  caption: string;
  tone: 'blue' | 'cyan' | 'emerald' | 'amber';
};

export type AdminSettingCategory = {
  id: string;
  label: string;
  description: string;
  status: string;
};

export type AdminSettingThreshold = {
  id: string;
  label: string;
  value: number;
  unit: string;
  description: string;
  tone: 'blue' | 'cyan' | 'amber' | 'rose';
};

export type AdminReviewToggle = {
  id: string;
  title: string;
  description: string;
  tag: string;
  enabled: boolean;
};

export type AdminNotificationRule = {
  id: string;
  event: string;
  target: string;
  timing: string;
  channel: string;
  enabled: boolean;
};

export type AdminExportProfile = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

export const adminSettingSummaries: AdminSettingSummary[] = [
  { label: '기본 관할', value: '부산광역시', caption: '16개 구·군 mock 범위', tone: 'blue' },
  { label: '온길 점수 기준', value: '62점', caption: '주의 표시 시작값', tone: 'cyan' },
  { label: '검수 대기', value: '28건', caption: '오늘 접수 기준', tone: 'amber' },
  { label: '리포트 서식', value: '4종', caption: '행정 공유용', tone: 'emerald' },
];

export const adminSettingCategories: AdminSettingCategory[] = [
  { id: 'operation', label: '운영 기준', description: '관할 구역과 온길 점수 표시 기준', status: '적용 중' },
  { id: 'scan', label: '온길 스캔', description: 'mock 분류 신뢰도와 검수 흐름', status: '검수 필요' },
  { id: 'notification', label: '알림', description: '긴급 제보와 현장조사 안내', status: '3개 규칙' },
  { id: 'export', label: '리포트', description: '온길 리포트 기본 출력 옵션', status: '행정용' },
];

export const adminSettingThresholds: AdminSettingThreshold[] = [
  {
    id: 'score-warning',
    label: '주의 구간 표시',
    value: 62,
    unit: '점 이하',
    description: '온길 점수가 낮은 구간을 보행 위험 참고 구간으로 표시합니다.',
    tone: 'blue',
  },
  {
    id: 'confidence',
    label: 'mock 분류 신뢰도',
    value: 78,
    unit: '% 이상',
    description: '사진 제보 분류 라벨을 검수 목록에 올리는 참고 기준입니다.',
    tone: 'cyan',
  },
  {
    id: 'duplicate',
    label: '중복 제보 경보',
    value: 6,
    unit: '건 이상',
    description: '같은 위치 제보가 반복될 때 담당팀 확인 대상으로 묶습니다.',
    tone: 'amber',
  },
  {
    id: 'urgent-risk',
    label: '긴급 검토 기준',
    value: 85,
    unit: '% 이상',
    description: '급경사·계단·횡단 위험이 높은 구간의 우선 확인 기준입니다.',
    tone: 'rose',
  },
];

export const adminReviewToggles: AdminReviewToggle[] = [
  {
    id: 'field-review',
    title: '현장조사 전 검수',
    description: '온길 스캔 결과를 담당자가 확인한 뒤 일정에 배정합니다.',
    tag: '온길 스캔',
    enabled: true,
  },
  {
    id: 'priority-sync',
    title: '개선 우선순위 자동 반영',
    description: '중복 제보와 접근성 점수 변동을 우선순위 관리 화면에 반영합니다.',
    tag: '개선 우선순위',
    enabled: true,
  },
  {
    id: 'tourist-guide',
    title: '관광약자 안내 문구 포함',
    description: '리포트와 온길 루트 요약에 관광약자 참고 문구를 포함합니다.',
    tag: '온길 루트',
    enabled: true,
  },
  {
    id: 'public-source',
    title: '외부 데이터 표시',
    description: '현재 프로토타입에서는 실제 외부 데이터 출처를 화면에 표시하지 않습니다.',
    tag: '시연 제한',
    enabled: false,
  },
];

export const adminNotificationRules: AdminNotificationRule[] = [
  { id: 'urgent-report', event: '긴급 제보 접수', target: '구·군 담당팀', timing: '즉시', channel: '대시보드 배지', enabled: true },
  { id: 'survey-due', event: '현장조사 하루 전', target: '현장조사 A/B팀', timing: '전일 17:00', channel: '일정 알림', enabled: true },
  { id: 'weekly-report', event: '주간 리포트 준비', target: '행정 검토자', timing: '매주 금요일', channel: '리포트 출력', enabled: true },
  { id: 'low-score', event: '온길 점수 급락', target: '운영 관리자', timing: '검수 후', channel: '검토 목록', enabled: false },
];

export const adminExportProfiles: AdminExportProfile[] = [
  { id: 'summary', label: '요약 리포트', description: '핵심 지표와 개선 우선순위 중심', enabled: true },
  { id: 'district', label: '구·군 공유본', description: '담당 구역별 위험구간과 제보 묶음', enabled: true },
  { id: 'survey', label: '현장조사 첨부본', description: '조사 일정과 사진 검수 결과 포함', enabled: true },
  { id: 'public-brief', label: '대외 발표용', description: 'mock 데이터 안내 문구와 비식별 요약', enabled: false },
];
