import { FileText, Home, Navigation, Route, Search, UserRound } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/mobile', label: '홈', icon: Home, end: true },
  { to: '/mobile/search', label: '검색', icon: Search },
  { to: '/mobile/routes', label: '루트', icon: Route },
  { to: '/mobile/navigation', label: '안내', icon: Navigation },
  { to: '/mobile/report', label: '제보', icon: FileText },
  { to: '/mobile/profile', label: '내 정보', icon: UserRound },
];

export function MobileLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d9f3f5,transparent_35%),linear-gradient(135deg,#f8fbff,#e8f2f7)] px-4 py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-start lg:justify-center">
        <aside className="hidden w-72 rounded-2xl bg-navy-950 p-6 text-white shadow-card lg:block">
          <p className="text-sm font-bold text-cyan-200">Busan On-gil AI</p>
          <h1 className="mt-3 text-3xl font-bold tracking-normal">보행약자를 위한 부산형 접근성 데이터</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            시민 앱은 이동 유형별 위험 참고와 안전한 우회 동선을 mock data로 시연합니다.
          </p>
          <NavLink
            to="/admin"
            className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-navy-950"
          >
            관리자 화면
          </NavLink>
        </aside>

        <main className="mx-auto flex min-h-[760px] w-full max-w-[430px] flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-slate-50 shadow-2xl">
          <div className="flex items-center justify-between bg-navy-950 px-5 py-4 text-white">
            <div>
              <p className="text-xs font-bold text-cyan-200">부산 온길 AI</p>
              <p className="text-sm text-slate-300">시민용 접근성 안내</p>
            </div>
            <NavLink to="/admin" className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
              Admin
            </NavLink>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <Outlet />
          </div>

          <nav className="grid grid-cols-6 border-t border-slate-200 bg-white px-2 py-2" aria-label="모바일 화면">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    'flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-bold',
                    isActive ? 'bg-civic-100 text-civic-700' : 'text-slate-500 hover:bg-slate-100 hover:text-navy-900',
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </main>
      </div>
    </div>
  );
}
