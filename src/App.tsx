import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/admin/AdminLayout';
import { MobileLayout } from './components/mobile/MobileLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminRoutesPage } from './pages/admin/AdminRoutesPage';
import { AnalysisPage } from './pages/admin/AnalysisPage';
import { ImprovementsPage } from './pages/admin/ImprovementsPage';
import { LayersPage } from './pages/admin/LayersPage';
import { ReportExportPage } from './pages/admin/ReportExportPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { ZonesPage } from './pages/admin/ZonesPage';
import { MobileHomePage } from './pages/mobile/MobileHomePage';
import { NavigationPage } from './pages/mobile/NavigationPage';
import { OnboardingPage } from './pages/mobile/OnboardingPage';
import { ProfilePage } from './pages/mobile/ProfilePage';
import { ReportPage } from './pages/mobile/ReportPage';
import { RoutesPage } from './pages/mobile/RoutesPage';
import { SearchPage } from './pages/mobile/SearchPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mobile" replace />} />

      <Route path="/mobile" element={<MobileLayout />}>
        <Route index element={<MobileHomePage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="routes" element={<RoutesPage />} />
        <Route path="navigation" element={<NavigationPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="zones" element={<ZonesPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="analysis" element={<AnalysisPage />} />
        <Route path="routes" element={<AdminRoutesPage />} />
        <Route path="improvements" element={<ImprovementsPage />} />
        <Route path="layers" element={<LayersPage />} />
        <Route path="report-export" element={<ReportExportPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/mobile" replace />} />
    </Routes>
  );
}
