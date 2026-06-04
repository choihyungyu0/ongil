import {
  BarChart3,
  CalendarCheck,
  Camera,
  FileDown,
  FileText,
  Layers,
  LayoutDashboard,
  MapPinned,
  Route,
  Wrench,
} from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/admin', label: '대시보드', icon: LayoutDashboard, end: true },
  { to: '/admin/zones', label: '위험구간', icon: MapPinned },
  { to: '/admin/reports', label: '시민제보', icon: FileText },
  { to: '/admin/analysis', label: '분석', icon: BarChart3 },
  { to: '/admin/photo-analysis', label: 'AI 사진 분석', icon: Camera },
  { to: '/admin/routes', label: '루트 패키지', icon: Route },
  { to: '/admin/improvements', label: '개선 우선순위', icon: Wrench },
  { to: '/admin/field-survey', label: '현장조사', icon: CalendarCheck },
  { to: '/admin/layers', label: '지도 레이어', icon: Layers },
  { to: '/admin/report-export', label: '리포트 내보내기', icon: FileDown },
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-navy-950 p-5 text-white lg:block">
          <div className="rounded-2xl bg-white/8 p-4">
            <p className="text-sm font-bold text-cyan-200">Busan On-gil AI</p>
            <h1 className="mt-2 text-xl font-bold tracking-normal">온길 관리자 대시보드</h1>
            <p className="mt-2 text-xs leading-5 text-slate-300">
              지자체·관광기관용 보행접근성 데이터 관제 프로토타입
            </p>
          </div>

          <nav className="mt-6 space-y-1" aria-label="관리자 화면">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold',
                    isActive ? 'bg-white text-navy-950' : 'text-slate-300 hover:bg-white/10 hover:text-white',
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
            <strong className="text-sm text-navy-950">온길 관리자 대시보드</strong>
            <nav className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="관리자 좁은 화면 메뉴">
              {navItems.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    [
                      'shrink-0 rounded-full px-3 py-1.5 text-xs font-bold',
                      isActive ? 'bg-civic-100 text-civic-700' : 'bg-slate-100 text-slate-600',
                    ].join(' ')
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </header>

          <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
