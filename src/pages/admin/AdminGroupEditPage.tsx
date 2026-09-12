import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useWorks } from '../../context/WorksContext'
import { isAdminAuthenticated } from '../../lib/worksStorage'
import './Admin.css'

export function AdminGroupEditPage() {
  const { groupId = '' } = useParams()
  const { data, updateGroup, addItem, updateItem, deleteItem } = useWorks()
  const group = useMemo(() => data.groups.find((item) => item.id === groupId), [data.groups, groupId])

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage] = useState('')

  const [title, setTitle] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [image, setImage] = useState('')
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!group) return
    setName(group.name)
    setSlug(group.slug)
    setDescription(group.description)
    setCoverImage(group.coverImage)
  }, [group])

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  if (!group) {
    return (
      <div className="admin-shell">
        <p>Group not found.</p>
        <Link to="/admin">Back</Link>
      </div>
    )
  }

  const onSaveGroup = (e: FormEvent) => {
    e.preventDefault()
    try {
      updateGroup(group.id, { name, slug, description, coverImage })
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save group')
    }
  }

  const onSaveItem = (e: FormEvent) => {
    e.preventDefault()
    const payload = {
      title,
      description: itemDescription,
      website,
      image: image || undefined,
    }
    if (editingItemId) {
      updateItem(group.id, editingItemId, payload)
    } else {
      addItem(group.id, payload)
    }
    setTitle('')
    setItemDescription('')
    setWebsite('')
    setImage('')
    setEditingItemId(null)
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <Link to="/admin" className="admin-back">
            ← Groups
          </Link>
          <h1>{group.name}</h1>
        </div>
        <Link to={`/work/${group.slug}`} target="_blank">
          Open /work/{group.slug}
        </Link>
      </header>

      <section className="admin-card">
        <h2>Group settings</h2>
        <form className="admin-form" onSubmit={onSaveGroup}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Slug
            <input value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </label>
          <label>
            Description
            <input value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <label>
            Cover image URL
            <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} required />
          </label>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="ghost-btn">
            Save group
          </button>
        </form>
      </section>

      <section className="admin-card">
        <h2>{editingItemId ? 'Edit project' : 'Add project'}</h2>
        <form className="admin-form" onSubmit={onSaveItem}>
          <label>
            Title
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Small description
            <textarea
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
              rows={3}
            />
          </label>
          <label>
            Website
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
              placeholder="https://"
            />
          </label>
          <label>
            Image URL (optional)
            <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://" />
          </label>
          <div className="admin-form__row">
            <button type="submit" className="ghost-btn">
              {editingItemId ? 'Update project' : 'Add project'}
            </button>
            {editingItemId && (
              <button
                type="button"
                onClick={() => {
                  setEditingItemId(null)
                  setTitle('')
                  setItemDescription('')
                  setWebsite('')
                  setImage('')
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="admin-card">
        <h2>Projects</h2>
        <ul className="admin-list">
          {group.items.map((item) => (
            <li key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
                <a href={item.website} target="_blank" rel="noreferrer">
                  {item.website}
                </a>
              </div>
              <div className="admin-list__actions">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItemId(item.id)
                    setTitle(item.title)
                    setItemDescription(item.description)
                    setWebsite(item.website)
                    setImage(item.image || '')
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete “${item.title}”?`)) deleteItem(group.id, item.id)
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
