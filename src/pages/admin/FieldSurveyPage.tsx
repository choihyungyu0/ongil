import { CalendarCheck, ClipboardList } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { ProgressBar } from '../../components/common/ProgressBar';
import { MockMapPanel } from '../../components/maps/MockMapPanel';
import { fieldSurveyAssignments, scoreFactors, userTypes } from '../../data/mockData';

export function FieldSurveyPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="현장조사 일정" title="조사 배정과 체크리스트" description="MVP 구간 현장조사 일정, 조사 항목, 사용자 유형별 위험 가중치를 정리합니다." />

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <MockMapPanel title="현장조사 대상 지도" subtitle="감천·초량·부산역 집중 조사 구간" />

        <div className="app-card p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
            <CalendarCheck className="h-5 w-5 text-action-600" aria-hidden="true" />
            조사 배정
          </h2>
          <div className="mt-4 space-y-3">
            {fieldSurveyAssignments.map((assignment) => (
              <article key={assignment.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm text-navy-950">{assignment.area}</strong>
                  <span className="text-xs font-bold text-action-600">{assignment.date}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{assignment.inspector}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {assignment.focus.map((item) => (
                    <span key={item} className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="app-card p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-navy-950">
            <ClipboardList className="h-5 w-5 text-civic-700" aria-hidden="true" />
            조사 체크리스트
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {scoreFactors.slice(0, 6).map((factor) => (
              <article key={factor.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <strong className="text-sm text-navy-950">{factor.label}</strong>
                <p className="mt-2 text-xs leading-5 text-slate-600">사진, 위치, 수치, 관리자 메모를 mock으로 기록합니다.</p>
              </article>
            ))}
          </div>
        </div>

        <div className="app-card p-5">
          <h2 className="text-lg font-bold text-navy-950">사용자 유형별 위험 가중치</h2>
          <div className="mt-5 space-y-4">
            {userTypes.slice(0, 5).map((type, index) => (
              <ProgressBar key={type.id} label={type.label} value={92 - index * 9} tone={index % 2 === 0 ? 'teal' : 'blue'} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
