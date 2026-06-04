import { LocateFixed, Search } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { userTypes } from '../../data/mockData';

const avoidOptions = ['계단 회피', '급경사 완화', '점자블록 우선', '쉼터 경유', '야간 조도'];

export function SearchPage() {
  return (
    <div className="space-y-5">
      <PageHeader eyebrow="온길 루트" title="목적지 검색" description="부산역, 감천문화마을, 복지관, 병원 주변 동선을 mock으로 비교합니다." />

      <section className="app-card p-4">
        <label className="text-sm font-bold text-navy-950" htmlFor="destination">
          목적지
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
          <Search className="h-5 w-5 text-slate-400" aria-hidden="true" />
          <input
            id="destination"
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
            placeholder="초량이바구길"
            defaultValue="초량이바구길"
          />
          <LocateFixed className="h-5 w-5 text-action-600" aria-hidden="true" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-navy-950">이동 유형</h2>
        <div className="grid grid-cols-2 gap-2">
          {userTypes.slice(0, 4).map((type, index) => (
            <button
              key={type.id}
              type="button"
              className={`rounded-2xl border p-3 text-left text-sm font-bold ${
                index === 0 ? 'border-civic-500 bg-civic-50 text-civic-700' : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-navy-950">회피·우선 조건</h2>
        <div className="flex flex-wrap gap-2">
          {avoidOptions.map((option, index) => (
            <button
              key={option}
              type="button"
              className={`rounded-full border px-3 py-2 text-xs font-bold ${
                index < 2 ? 'border-action-500 bg-action-500 text-white' : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
