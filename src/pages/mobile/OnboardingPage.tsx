import { CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { userTypes } from '../../data/mockData';

export function OnboardingPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="온길 시작"
        title="이동 유형 선택"
        description="선택한 유형에 따라 경사, 계단, 단차, 점자블록, 쉼터 가중치를 다르게 보여줍니다."
      />

      <div className="space-y-3">
        {userTypes.map((type, index) => (
          <article
            key={type.id}
            className={`rounded-2xl border p-4 shadow-sm ${
              index === 0 ? 'border-civic-500 bg-civic-50' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-navy-950">{type.label}</h2>
                <p className="mt-1 text-sm leading-5 text-slate-600">{type.description}</p>
              </div>
              {index === 0 ? <CheckCircle2 className="h-5 w-5 text-civic-700" aria-hidden="true" /> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {type.priorityFactors.map((factor) => (
                <span key={factor} className="soft-chip">
                  {factor}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
