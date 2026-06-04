import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Database,
  FileText,
  Gauge,
  Layers,
  RefreshCw,
  Save,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  accessibilityLayerItems,
  adminExportProfiles,
  adminNotificationRules,
  adminReviewToggles,
  adminSettingCategories,
  adminSettingSummaries,
  adminSettingThresholds,
  userTypes,
} from '../../data/mockData';
import type {
  AdminSettingSummary,
  AdminSettingThreshold,
} from '../../data/mockData';

const summaryToneClass: Record<AdminSettingSummary['tone'], { icon: string; caption: string }> = {
  blue: { icon: 'bg-blue-50 text-action-600', caption: 'text-action-600' },
  cyan: { icon: 'bg-civic-50 text-civic-700', caption: 'text-civic-700' },
  emerald: { icon: 'bg-emerald-50 text-emerald-600', caption: 'text-emerald-600' },
  amber: { icon: 'bg-amber-50 text-amber-600', caption: 'text-amber-600' },
};

const thresholdToneClass: Record<AdminSettingThreshold['tone'], string> = {
  blue: 'bg-action-500',
  cyan: 'bg-civic-500',
  amber: 'bg-amber-400',
  rose: 'bg-rose-500',
};

const categoryIcons: Record<string, LucideIcon> = {
  operation: SlidersHorizontal,
  scan: ShieldCheck,
  notification: Bell,
  export: FileText,
};

const layerIconClass = {
  cyan: 'bg-cyan-50 text-cyan-600',
  blue: 'bg-blue-50 text-action-600',
  orange: 'bg-orange-50 text-orange-500',
  violet: 'bg-violet-50 text-violet-500',
  emerald: 'bg-emerald-50 text-emerald-600',
  rose: 'bg-rose-50 text-rose-500',
  sky: 'bg-sky-50 text-sky-500',
  amber: 'bg-amber-50 text-amber-500',
};

function ToggleSwitch({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <button
      type="button"
      aria-label={`${label} ${enabled ? '켜짐' : '꺼짐'}`}
      className={[
        'relative h-6 w-11 shrink-0 rounded-full transition',
        enabled ? 'bg-civic-500' : 'bg-slate-200',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition',
          enabled ? 'left-6' : 'left-1',
        ].join(' ')}
      />
    </button>
  );
}

function SummaryCard({ item, icon: Icon }: { item: AdminSettingSummary; icon: LucideIcon }) {
  const tone = summaryToneClass[item.tone];

  return (
    <article className="grid min-h-[92px] grid-cols-[44px_minmax(0,1fr)] items-center gap-4 rounded-[18px] border border-blue-100/70 bg-white px-5 shadow-[0_14px_30px_rgba(33,91,145,0.07)]">
      <span className={`grid h-11 w-11 place-items-center rounded-[15px] ${tone.icon}`}>
        <Icon className="h-[19px] w-[19px]" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-black text-slate-400">{item.label}</p>
        <strong className="mt-1 block truncate text-[24px] font-black leading-none tracking-normal text-navy-950">{item.value}</strong>
        <p className={`mt-1.5 truncate text-[10px] font-black ${tone.caption}`}>{item.caption}</p>
      </div>
    </article>
  );
}

function SectionHeader({ icon: Icon, title, caption }: { icon: LucideIcon; title: string; caption: string }) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-blue-50 text-action-600">
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <h2 className="truncate text-[20px] font-black tracking-normal text-navy-950">{title}</h2>
        </div>
        <p className="mt-2 text-[12px] font-semibold leading-5 text-slate-500">{caption}</p>
      </div>
    </header>
  );
}

function ThresholdCard({ item }: { item: AdminSettingThreshold }) {
  return (
    <article className="rounded-[16px] border border-blue-100 bg-slate-50/80 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-[14px] font-black text-navy-950">{item.label}</h3>
          <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500">{item.description}</p>
        </div>
        <strong className="shrink-0 rounded-full bg-white px-3 py-1 text-[12px] font-black text-navy-950 shadow-sm">
          {item.value}
          {item.unit}
        </strong>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
        <span className={`block h-full rounded-full ${thresholdToneClass[item.tone]}`} style={{ width: `${Math.min(item.value, 100)}%` }} />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        defaultValue={item.value}
        aria-label={`${item.label} 기준값`}
        className="mt-3 h-2 w-full accent-civic-600"
      />
    </article>
  );
}

export function SettingsPage() {
  const summaryIcons = [Settings, Gauge, ShieldCheck, FileText];

  return (
    <div className="settings-screen-fit flex flex-col gap-5">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[12px] font-black leading-4 text-civic-700">온길 대시보드 · 운영 설정</p>
          <h1 className="mt-1 text-[31px] font-black leading-9 tracking-normal text-navy-950">설정</h1>
          <p className="mt-2 max-w-3xl text-[13px] font-semibold leading-5 text-slate-500">
            온길 스캔, 온길 점수, 온길 리포트에 적용되는 시연용 운영 기준을 관리합니다.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 text-[12px] font-black text-navy-800 shadow-sm">
            <RefreshCw className="h-4 w-4 text-slate-400" aria-hidden="true" />
            초기화
          </button>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-action-500 px-5 text-[12px] font-black text-white shadow-[0_12px_20px_rgba(36,119,255,0.25)] hover:bg-action-600">
            <Save className="h-4 w-4" aria-hidden="true" />
            설정 저장
          </button>
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-4" aria-label="설정 핵심 지표">
        {adminSettingSummaries.map((item, index) => (
          <SummaryCard key={item.label} item={item} icon={summaryIcons[index]} />
        ))}
      </section>

      <div className="grid min-h-0 gap-5 xl:grid-cols-[300px_minmax(0,1fr)_360px]">
        <aside className="rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
          <h2 className="text-[18px] font-black text-navy-950">설정 분류</h2>
          <div className="mt-4 grid gap-3">
            {adminSettingCategories.map((category) => {
              const Icon = categoryIcons[category.id] ?? Settings;

              return (
                <button
                  key={category.id}
                  type="button"
                  className="grid min-h-[78px] grid-cols-[40px_minmax(0,1fr)] items-center gap-3 rounded-[16px] border border-blue-100 bg-slate-50/80 px-3 text-left transition hover:border-civic-100 hover:bg-civic-50/70"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-white text-action-600 shadow-sm">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center justify-between gap-2">
                      <strong className="truncate text-[13px] font-black text-navy-950">{category.label}</strong>
                      <span className="shrink-0 text-[10px] font-black text-civic-700">{category.status}</span>
                    </span>
                    <span className="mt-1 block text-[11px] font-semibold leading-4 text-slate-500">{category.description}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-[18px] border border-cyan-100 bg-civic-50/70 p-4">
            <p className="text-[11px] font-black text-civic-700">현재 적용 범위</p>
            <strong className="mt-1 block text-[20px] font-black text-navy-950">부산 보행접근성 mock</strong>
            <p className="mt-2 text-[11px] font-semibold leading-4 text-slate-500">
              실제 지도 API나 외부 시민 데이터 연동 없이 화면 표시용 기준만 사용합니다.
            </p>
          </div>
        </aside>

        <main className="grid min-h-0 gap-5">
          <section className="rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
            <SectionHeader icon={SlidersHorizontal} title="운영 기준" caption="온길 점수와 제보 검수 기준을 구·군 담당자가 이해하기 쉬운 값으로 맞춥니다." />

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <label className="block rounded-[16px] border border-blue-100 bg-slate-50/80 p-4">
                <span className="text-[12px] font-black text-navy-950">기본 관할 구역</span>
                <span className="relative mt-3 block">
                  <select
                    defaultValue="busan"
                    className="h-11 w-full appearance-none rounded-[14px] border border-blue-100 bg-white px-4 pr-10 text-[13px] font-bold text-slate-700 outline-none focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
                  >
                    <option value="busan">부산광역시 전체</option>
                    <option value="dong">동구 산복도로 권역</option>
                    <option value="saha">사하구 관광지 권역</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                </span>
              </label>

              <label className="block rounded-[16px] border border-blue-100 bg-slate-50/80 p-4">
                <span className="text-[12px] font-black text-navy-950">기본 담당 조직명</span>
                <input
                  type="text"
                  defaultValue="부산시 보행환경 운영팀"
                  className="mt-3 h-11 w-full rounded-[14px] border border-blue-100 bg-white px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-action-500 focus:ring-2 focus:ring-action-500/20"
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {adminSettingThresholds.map((item) => (
                <ThresholdCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
              <SectionHeader icon={ShieldCheck} title="검수 흐름" caption="온길 스캔 결과를 운영 화면에서 어떻게 표시할지 정합니다." />
              <div className="mt-5 grid gap-3">
                {adminReviewToggles.map((item) => (
                  <article key={item.id} className="grid min-h-[70px] grid-cols-[minmax(0,1fr)_52px] items-center gap-4 rounded-[16px] border border-blue-100 bg-slate-50/80 px-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <strong className="text-[13px] font-black text-navy-950">{item.title}</strong>
                        <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-civic-700 shadow-sm">{item.tag}</span>
                      </div>
                      <p className="mt-1 text-[11px] font-semibold leading-4 text-slate-500">{item.description}</p>
                    </div>
                    <ToggleSwitch enabled={item.enabled} label={item.title} />
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
              <SectionHeader icon={Users} title="이용자 유형" caption="온길 루트 안내에 반영할 기본 대상입니다." />
              <div className="mt-5 grid grid-cols-2 gap-3">
                {userTypes.map((type) => (
                  <label key={type.id} className="flex min-h-[48px] items-center gap-2 rounded-[14px] border border-blue-100 bg-slate-50/80 px-3">
                    <input type="checkbox" defaultChecked className="h-4 w-4 shrink-0 accent-civic-600" />
                    <span className="min-w-0 truncate text-[12px] font-black text-navy-950">{type.shortLabel}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        </main>

        <aside className="grid gap-5">
          <section className="rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
            <SectionHeader icon={Layers} title="레이어 기본값" caption="지도 화면에 처음 표시할 접근성 데이터 레이어입니다." />
            <div className="mt-5 grid gap-3">
              {accessibilityLayerItems.slice(0, 6).map((layer) => (
                <article key={layer.id} className="grid min-h-[54px] grid-cols-[36px_minmax(0,1fr)_46px] items-center gap-3 rounded-[14px] border border-blue-100 bg-slate-50/80 px-3">
                  <span className={`grid h-9 w-9 place-items-center rounded-[13px] ${layerIconClass[layer.tone]}`}>
                    <Database className="h-[17px] w-[17px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <strong className="block truncate text-[12px] font-black text-navy-950">{layer.label}</strong>
                    <span className="mt-0.5 block truncate text-[10px] font-bold text-slate-400">{layer.dateLabel}</span>
                  </span>
                  <ToggleSwitch enabled={layer.enabled} label={`${layer.label} 레이어`} />
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
            <SectionHeader icon={Bell} title="알림 규칙" caption="긴급 제보와 리포트 준비 상태를 운영 화면에 표시합니다." />
            <div className="mt-5 grid gap-3">
              {adminNotificationRules.map((rule) => (
                <article key={rule.id} className="rounded-[14px] border border-blue-100 bg-slate-50/80 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <strong className="block truncate text-[12px] font-black text-navy-950">{rule.event}</strong>
                      <span className="mt-1 block truncate text-[10px] font-bold text-slate-400">{rule.target} · {rule.timing}</span>
                    </div>
                    <ToggleSwitch enabled={rule.enabled} label={`${rule.event} 알림`} />
                  </div>
                  <p className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-action-600 shadow-sm">{rule.channel}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] border border-blue-100/70 bg-white p-5 shadow-[0_18px_38px_rgba(33,91,145,0.08)]">
            <SectionHeader icon={FileText} title="리포트 출력" caption="온길 리포트 생성 시 기본 포함 항목입니다." />
            <div className="mt-5 grid gap-3">
              {adminExportProfiles.map((profile) => (
                <label key={profile.id} className="grid min-h-[58px] grid-cols-[20px_minmax(0,1fr)] items-start gap-3 rounded-[14px] border border-blue-100 bg-slate-50/80 px-3 py-3">
                  <input type="checkbox" defaultChecked={profile.enabled} className="mt-1 h-4 w-4 accent-civic-600" />
                  <span className="min-w-0">
                    <span className="block text-[12px] font-black text-navy-950">{profile.label}</span>
                    <span className="mt-1 block text-[10px] font-bold leading-4 text-slate-500">{profile.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] border border-cyan-100 bg-civic-50/75 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-white text-civic-700 shadow-sm">
                <CheckCircle2 className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-[14px] font-black text-navy-950">저장 대기 없음</h2>
                <p className="mt-1 text-[11px] font-semibold text-slate-500">마지막 검토: 오늘 09:30</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
