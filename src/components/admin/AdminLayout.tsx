import { CalendarDays, ClipboardCheck, FileDown, FileText, LayoutDashboard, ListChecks, MapPinned, Route, ScanSearch, Settings, Smartphone } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import onGilLogo from '../../../asset/1.png';

const navItems = [
  { to: '/admin', label: '대시보드', icon: LayoutDashboard, end: true },
  { to: '/admin/zones', label: '위험구간 관리', icon: MapPinned },
  { to: '/admin/improvements', label: '개선 관리', icon: ClipboardCheck },
  { to: '/admin/field-survey', label: '현장조사 일정', icon: CalendarDays },
  { to: '/admin/priorities', label: '우선순위 관리', icon: ListChecks },
  { to: '/admin/reports', label: '제보 관리', icon: FileText },
  { to: '/admin/photo-analysis', label: 'AI 분석', icon: ScanSearch },
  { to: '/admin/report-export', label: '리포트 출력', icon: FileDown },
  { to: '/admin/routes', label: '온길 루트', icon: Route },
  { to: '/admin/safe-route', label: '시민 안전경로', icon: Smartphone },
  { to: '/admin/settings', label: '설정', icon: Settings },
];

export function AdminLayout() {
  return (
    <div className="admin-shell-fit bg-[#eef5fb]">
      <div className="admin-shell-fit flex">
        <aside className="hidden w-[155px] shrink-0 border-r border-blue-100/70 bg-white px-3 pb-4 pt-7 text-slate-700 shadow-[8px_0_24px_rgba(33,91,145,0.04)] md:flex md:flex-col">
          <div className="flex items-center gap-2 px-1">
            <img src={onGilLogo} alt="" className="h-6 w-6 shrink-0 object-contain" />
            <p className="text-[11px] font-black text-navy-950">
              부산 <span className="text-civic-600">온길</span> AI
            </p>
          </div>

          <nav className="mt-7 space-y-2" aria-label="관리자 화면">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'flex h-9 items-center gap-2 rounded-[10px] px-2 text-[10px] font-black transition',
                    isActive ? 'bg-blue-50 text-action-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-navy-950',
                  ].join(' ')
                }
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-cyan-100 bg-civic-50/70 p-3">
            <p className="text-[11px] font-black text-navy-800">On-gil Dashboard</p>
            <p className="mt-1.5 text-[10px] font-semibold leading-4 text-slate-500">
              보행취약지역 탐지, 제보 및 접근성 점수와 행정 리포트를 한 화면으로 제공합니다.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-blue-100 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
            <strong className="text-sm text-navy-950">부산 온길 AI</strong>
            <nav className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="관리자 주요 화면 메뉴">
              {navItems.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    [
                      'shrink-0 rounded-full px-3 py-1.5 text-xs font-extrabold',
                      isActive ? 'bg-blue-50 text-action-600' : 'bg-slate-100 text-slate-600',
                    ].join(' ')
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </header>

          <div className="w-full min-w-0 max-w-full overflow-x-hidden px-4 py-2 md:pl-5 md:pr-2 md:pt-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
