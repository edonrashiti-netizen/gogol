import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { WorksProvider } from './context/WorksContext'
import { ScrollToHash } from './components/ScrollToHash'
import { HomePage } from './pages/HomePage'
import { WorkGroupPage } from './pages/WorkGroupPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminGroupEditPage } from './pages/admin/AdminGroupEditPage'

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
          <Route path="/admin/groups/:groupId" element={<AdminGroupEditPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </WorksProvider>
    </BrowserRouter>
  )
}
