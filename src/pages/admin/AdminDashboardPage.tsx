import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useWorks } from '../../context/WorksContext'
import { isAdminAuthenticated, setAdminAuthenticated } from '../../lib/worksStorage'
import './Admin.css'

export function AdminDashboardPage() {
  const { data, loading, addGroup, deleteGroup, exportData, publishData, resetToPublished } =
    useWorks()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [message, setMessage] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  const onAddGroup = (e: FormEvent) => {
    e.preventDefault()
    addGroup({ name, description, coverImage })
    setName('')
    setDescription('')
    setCoverImage('')
    setShowAdd(false)
    setMessage('Category created. Open it to add projects.')
  }

  const onPublish = async () => {
    const result = await publishData()
    if (result.ok) {
      setMessage('Published. Everyone will see the latest works.')
      return
    }
    exportData()
    if (result.reason === 'blob') {
      setMessage(
        'Draft saved here. JSON downloaded — replace public/works-data.json and redeploy to publish for everyone (or connect Vercel Blob).',
      )
      return
    }
    setMessage('Publish failed. Draft saved and JSON downloaded.')
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <p className="admin-kicker">Gogol admin</p>
          <h1>Categories</h1>
        </div>
        <div className="admin-top__actions">
          <Link to="/">View site</Link>
          <button type="button" onClick={() => exportData()}>
            Download JSON
          </button>
          <button type="button" onClick={() => void onPublish()}>
            Publish
          </button>
          <button
            type="button"
            onClick={() => {
              void resetToPublished()
              setMessage('Reset to published data.')
            }}
          >
            Reset draft
          </button>
          <button
            type="button"
            onClick={() => {
              setAdminAuthenticated(false)
              window.location.href = '/admin/login'
            }}
          >
            Log out
          </button>
        </div>
      </header>

      {message && <p className="admin-banner">{message}</p>}

      <section className="admin-card">
        <div className="admin-card__head">
          <h2>All categories</h2>
          <button type="button" className="ghost-btn" onClick={() => setShowAdd((v) => !v)}>
            {showAdd ? 'Cancel' : 'Add category'}
          </button>
        </div>

        {showAdd && (
          <form className="admin-form admin-form--spaced" onSubmit={onAddGroup}>
            <label>
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Logo design"
              />
            </label>
            <label>
              Description
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Distinctive marks built to scale"
              />
            </label>
            <label>
              Cover image URL
              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                required
                placeholder="https://..."
              />
            </label>
            <button type="submit" className="ghost-btn">
              Create category
            </button>
          </form>
        )}

        {loading && <p>Loading…</p>}
        {!loading && data.groups.length === 0 && <p>No categories yet.</p>}
        <ul className="admin-list">
          {data.groups.map((group) => (
            <li key={group.id}>
              <div>
                <Link to={`/admin/categories/${group.id}`} className="admin-list__title">
                  {group.name}
                </Link>
                <span>
                  /work/{group.slug} · {group.items.length}{' '}
                  {group.items.length === 1 ? 'project' : 'projects'}
                </span>
              </div>
              <div className="admin-list__actions">
                <Link to={`/admin/categories/${group.id}`}>Projects</Link>
                <Link to={`/admin/categories/${group.id}/settings`}>Edit category</Link>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete category “${group.name}”?`)) deleteGroup(group.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
