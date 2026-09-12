import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { WorksProvider } from './context/WorksContext'
import { ScrollToHash } from './components/ScrollToHash'
import { HomePage } from './pages/HomePage'
import { WorkGroupPage } from './pages/WorkGroupPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminCategoryProjectsPage } from './pages/admin/AdminCategoryProjectsPage'
import { AdminCategorySettingsPage } from './pages/admin/AdminCategorySettingsPage'

function LegacyGroupRedirect() {
  const { groupId } = useParams()
  return <Navigate to={`/admin/categories/${groupId}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <WorksProvider>
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<WorkGroupPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/categories/:categoryId" element={<AdminCategoryProjectsPage />} />
          <Route
            path="/admin/categories/:categoryId/settings"
            element={<AdminCategorySettingsPage />}
          />
          <Route path="/admin/groups/:groupId" element={<LegacyGroupRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </WorksProvider>
    </BrowserRouter>
  )
}
