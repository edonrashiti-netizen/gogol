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

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  const onAddGroup = (e: FormEvent) => {
    e.preventDefault()
    addGroup({ name, description, coverImage })
    setName('')
    setDescription('')
    setCoverImage('')
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
          <h1>Work categories</h1>
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
        <h2>Add category</h2>
        <form className="admin-form" onSubmit={onAddGroup}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Website design" />
          </label>
          <label>
            Description
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Websites aligned with the brand system"
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
      </section>

      <section className="admin-card">
        <h2>Categories</h2>
        {loading && <p>Loading…</p>}
        {!loading && data.groups.length === 0 && <p>No categories yet.</p>}
        <ul className="admin-list">
          {data.groups.map((group) => (
            <li key={group.id}>
              <div>
                <strong>{group.name}</strong>
                <span>
                  /work/{group.slug} · {group.items.length} projects
                </span>
              </div>
              <div className="admin-list__actions">
                <Link to={`/admin/groups/${group.id}`}>Edit</Link>
                <Link to={`/work/${group.slug}`} target="_blank">
                  Open
                </Link>
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
