import { Bell, ShieldCheck, UserRound } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { userTypes } from '../../data/mockData';

export function ProfilePage() {
  const currentType = userTypes[0];

  return (
    <div className="space-y-5">
      <PageHeader eyebrow="내 온길" title="이동 설정" description="사용자 유형과 경로 회피 조건을 저장한 상태로 보여주는 mock 화면입니다." />

      <section className="app-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-civic-100">
            <UserRound className="h-6 w-6 text-civic-700" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold text-navy-950">{currentType.label}</h2>
            <p className="text-sm text-slate-500">계단 없는 경로 우선</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {[
          { icon: ShieldCheck, label: '안전 문구', value: '위험 참고 정보로 표시' },
          { icon: Bell, label: '위험 알림', value: '높음 이상 구간 알림' },
        ].map(({ icon: Icon, label, value }) => (
          <article key={label} className="app-card flex items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-action-600" aria-hidden="true" />
              <span className="text-sm font-bold text-navy-950">{label}</span>
            </div>
            <span className="text-xs font-bold text-slate-500">{value}</span>
          </article>
        ))}
      </section>

      <section className="app-card p-4">
        <h2 className="text-base font-bold text-navy-950">우선 조건</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {currentType.priorityFactors.map((factor) => (
            <span key={factor} className="soft-chip">
              {factor}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
