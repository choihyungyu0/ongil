export type ReportInboxStatus = '검수중' | '접수' | '긴급' | '병합' | '현장확인' | '조치예정';

export type ReportInboxItem = {
  id: string;
  location: string;
  riskType: string;
  reporter: string;
  confidence: number;
  status: ReportInboxStatus;
  createdAt: string;
  duplicateCount: number;
  title: string;
  summary: string;
  photoKey: 'treeWalkway' | 'tactileDamage' | 'tactilePath' | 'busStop' | 'bollard' | 'busNight';
  riskTags: string[];
  accessScore: number;
  riskScore: number;
  priorityLabel: string;
  managementNote: string;
};

export const reportInboxStats = [
  { label: '신규 제보', value: '87', caption: 'AI 검수 대기 포함', trend: '▲ 12.1%' },
  { label: '검수 대기', value: '24', caption: '관리자 확인 필요', trend: '전일 대비 +6건' },
  { label: '중복 병합', value: '32건', caption: '동일 위치 묶음', trend: '최근 7일 기준' },
  { label: '평균 신뢰도', value: '0.86', caption: '사진 기반 mock 분류', trend: '▲ 18.0%' },
];

export const reportInboxItems: ReportInboxItem[] = [
  {
    id: 'R-129',
    location: '감천문화마을 입구',
    riskType: '계단·단차',
    reporter: '김서아',
    confidence: 0.86,
    status: '검수중',
    createdAt: '05.20',
    duplicateCount: 12,
    title: '감천문화마을 입구 보행취약구간',
    summary: '보도 폭이 좁고 나무 주변 단차가 있어 휠체어 사용자와 고령 보행자가 상대적으로 이동이 어려운 구간입니다.',
    photoKey: 'treeWalkway',
    riskTags: ['보도블록 파손', '단차', '보행 폭 협소'],
    accessScore: 46,
    riskScore: 92,
    priorityLabel: '검수 승인',
    managementNote: '사진과 위치가 기존 감천문화마을 입구 제보 묶음과 일치합니다. 현장 확인 전 중복 병합을 권장합니다.',
  },
  {
    id: 'R-128',
    location: '초량이바구길',
    riskType: '급경사',
    reporter: '관광객',
    confidence: 0.91,
    status: '긴급',
    createdAt: '05.20',
    duplicateCount: 18,
    title: '초량이바구길 급경사 보행 참고 구간',
    summary: '관광 동선과 생활 보행 동선이 겹치는 급경사 구간으로, 쉼터 안내와 우회 경로 안내가 함께 필요합니다.',
    photoKey: 'tactilePath',
    riskTags: ['급경사', '쉼터 부족', '관광 동선'],
    accessScore: 51,
    riskScore: 88,
    priorityLabel: '긴급 검토',
    managementNote: '반복 제보가 많아 담당 부서 배정 전 신뢰도와 위치 오차를 함께 확인합니다.',
  },
  {
    id: 'R-127',
    location: '부산역 복지관 앞',
    riskType: '점자블록',
    reporter: '시각',
    confidence: 0.83,
    status: '검수중',
    createdAt: '05.19',
    duplicateCount: 9,
    title: '부산역 복지관 앞 점자블록 파손',
    summary: '출입구 주변 점자블록 일부가 훼손되어 시각장애인과 고령 보행자의 보행 위험 참고가 필요한 지점입니다.',
    photoKey: 'tactileDamage',
    riskTags: ['점자블록 파손', '단차', '복지관 접근'],
    accessScore: 58,
    riskScore: 81,
    priorityLabel: '검수 승인',
    managementNote: '복지관 접근 동선과 겹치므로 현장조사 일정에 우선 편성합니다.',
  },
  {
    id: 'R-126',
    location: '영도 절영로',
    riskType: '보도파손',
    reporter: '유모차',
    confidence: 0.78,
    status: '병합',
    createdAt: '05.19',
    duplicateCount: 7,
    title: '영도 절영로 보도블록 파손 구간',
    summary: '해안 산책 동선 일부에 표면 파손이 반복 제보되어 유모차와 임시 부상자의 이동 부담이 커지는 구간입니다.',
    photoKey: 'busStop',
    riskTags: ['보도블록 파손', '표면 불량', '유모차 동선'],
    accessScore: 62,
    riskScore: 76,
    priorityLabel: '중복 병합',
    managementNote: '위치가 같은 사진 제보 7건을 동일 묶음으로 관리합니다.',
  },
  {
    id: 'R-125',
    location: '대청로 보도',
    riskType: '볼라드',
    reporter: '김서아',
    confidence: 0.74,
    status: '현장확인',
    createdAt: '05.18',
    duplicateCount: 4,
    title: '대청로 보도 볼라드 간격 확인',
    summary: '볼라드 간격이 좁다는 제보가 있어 휠체어 사용자 통과 가능 여부를 현장에서 확인해야 합니다.',
    photoKey: 'bollard',
    riskTags: ['볼라드 간격', '보도 폭', '휠체어 통과'],
    accessScore: 68,
    riskScore: 70,
    priorityLabel: '현장 확인',
    managementNote: '사진만으로 통과 폭 판단이 어려워 현장 확인 상태로 유지합니다.',
  },
  {
    id: 'R-124',
    location: '부산의료원 주변',
    riskType: '횡단위험',
    reporter: '고령자',
    confidence: 0.88,
    status: '접수',
    createdAt: '05.18',
    duplicateCount: 11,
    title: '부산의료원 주변 횡단보도 위험 참고 구간',
    summary: '병원 방문 보행자가 많은 구간으로, 횡단 대기 공간과 보행 신호 인지가 함께 검토되어야 합니다.',
    photoKey: 'busNight',
    riskTags: ['횡단보도 위험', '조도 부족', '고령자 동선'],
    accessScore: 55,
    riskScore: 84,
    priorityLabel: '접수',
    managementNote: '동일 구간 야간 제보가 있어 시간대별 검토가 필요합니다.',
  },
  {
    id: 'R-123',
    location: '복수동 평생학습관',
    riskType: '단차',
    reporter: '관광약자',
    confidence: 0.81,
    status: '검수중',
    createdAt: '05.17',
    duplicateCount: 6,
    title: '평생학습관 입구 단차 확인',
    summary: '시설 진입부 단차가 사진으로 확인되어 보행 보조기 이용자의 접근성 점수 하락 요인으로 분류됩니다.',
    photoKey: 'tactilePath',
    riskTags: ['단차', '시설 진입', '접근성 점수'],
    accessScore: 61,
    riskScore: 77,
    priorityLabel: '검수 승인',
    managementNote: '건물 진입부 개선 요청 후보로 유지합니다.',
  },
  {
    id: 'R-122',
    location: '광안리 입구',
    riskType: '쉼터부족',
    reporter: '고령자',
    confidence: 0.7,
    status: '병합',
    createdAt: '05.17',
    duplicateCount: 5,
    title: '광안리 입구 쉼터 부족 제보',
    summary: '관광객과 고령 보행자가 많은 입구 구간에 휴식 지점이 부족하다는 반복 제보입니다.',
    photoKey: 'treeWalkway',
    riskTags: ['쉼터 부족', '관광지', '고령자'],
    accessScore: 66,
    riskScore: 69,
    priorityLabel: '보류',
    managementNote: '시설 배치 검토 전 계절성 제보 여부를 추가 확인합니다.',
  },
];
