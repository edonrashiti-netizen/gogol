import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useWorks } from '../../context/WorksContext'
import {
  ADMIN_PASSWORD,
  isAdminAuthenticated,
  setAdminAuthenticated,
} from '../../lib/worksStorage'
import './Admin.css'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const { reload } = useWorks()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAdminAuthenticated(true)
      await reload()
      navigate('/admin', { replace: true })
      return
    }
    setError('Wrong password')
  }

  return (
    <div className="admin-shell admin-shell--center">
      <form className="admin-card" onSubmit={onSubmit}>
        <Link to="/" className="admin-back">
          ← Site
        </Link>
        <h1>Admin login</h1>
        <p>Manage work groups and projects.</p>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" className="ghost-btn">
          Sign in
        </button>
      </form>
    </div>
  )
}
