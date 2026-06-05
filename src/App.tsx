import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminRoutesPage } from './pages/admin/AdminRoutesPage';
import { AnalysisPage } from './pages/admin/AnalysisPage';
import { FieldSurveyPage } from './pages/admin/FieldSurveyPage';
import { ImprovementsPage } from './pages/admin/ImprovementsPage';
import { PhotoAnalysisPage } from './pages/admin/PhotoAnalysisPage';
import { PriorityManagementPage } from './pages/admin/PriorityManagementPage';
import { ReportExportPage } from './pages/admin/ReportExportPage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { ZonesPage } from './pages/admin/ZonesPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="accessibility-comparison" element={<Navigate to="/admin/settings" replace />} />
        <Route path="zones" element={<ZonesPage />} />
        <Route path="priorities" element={<PriorityManagementPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="analysis" element={<AnalysisPage />} />
        <Route path="photo-analysis" element={<PhotoAnalysisPage />} />
        <Route path="routes" element={<AdminRoutesPage />} />
        <Route path="improvements" element={<ImprovementsPage />} />
        <Route path="field-survey" element={<FieldSurveyPage />} />
        <Route path="layers" element={<Navigate to="/admin/settings" replace />} />
        <Route path="report-export" element={<ReportExportPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
