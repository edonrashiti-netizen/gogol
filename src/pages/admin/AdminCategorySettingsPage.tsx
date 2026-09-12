import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useWorks } from '../../context/WorksContext'
import { isAdminAuthenticated } from '../../lib/worksStorage'
import './Admin.css'

export function AdminCategorySettingsPage() {
  const { categoryId = '' } = useParams()
  const navigate = useNavigate()
  const { data, updateGroup } = useWorks()
  const category = useMemo(
    () => data.groups.find((item) => item.id === categoryId),
    [data.groups, categoryId],
  )

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!category) return
    setName(category.name)
    setSlug(category.slug)
    setDescription(category.description)
    setCoverImage(category.coverImage)
  }, [category])

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  if (!category) {
    return (
      <div className="admin-shell">
        <p>Category not found.</p>
        <Link to="/admin">Back to categories</Link>
      </div>
    )
  }

  const onSave = (e: FormEvent) => {
    e.preventDefault()
    try {
      updateGroup(category.id, { name, slug, description, coverImage })
      setError('')
      setSaved(true)
      window.setTimeout(() => {
        navigate(`/admin/categories/${category.id}`)
      }, 400)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save category')
      setSaved(false)
    }
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <Link to={`/admin/categories/${category.id}`} className="admin-back">
            ← Back to projects
          </Link>
          <h1>Edit category</h1>
          <p className="admin-subtitle">Name, slug, description, and cover only</p>
        </div>
      </header>

      <section className="admin-card">
        <h2>Category details</h2>
        <form className="admin-form" onSubmit={onSave}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Slug (URL)
            <input value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </label>
          <p className="admin-hint">Page URL: /work/{slug || '…'}</p>
          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
            />
          </label>
          <label>
            Cover image URL
            <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} required />
          </label>
          {error && <p className="admin-error">{error}</p>}
          {saved && <p className="admin-success">Saved.</p>}
          <div className="admin-form__row">
            <button type="submit" className="ghost-btn">
              Save category
            </button>
            <Link to={`/admin/categories/${category.id}`}>Cancel</Link>
          </div>
        </form>
      </section>
    </div>
  )
}
