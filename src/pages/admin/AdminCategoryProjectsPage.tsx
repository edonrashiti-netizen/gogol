import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useWorks } from '../../context/WorksContext'
import { filesToDataUrls } from '../../lib/imageUpload'
import { isAdminAuthenticated } from '../../lib/worksStorage'
import { MAX_PROJECT_IMAGES } from '../../types/works'
import './Admin.css'

export function AdminCategoryProjectsPage() {
  const { categoryId = '' } = useParams()
  const { data, addItem, updateItem, deleteItem } = useWorks()
  const category = useMemo(
    () => data.groups.find((item) => item.id === categoryId),
    [data.groups, categoryId],
  )
  const formRef = useRef<HTMLElement>(null)

  const [showForm, setShowForm] = useState(false)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [urlDraft, setUrlDraft] = useState('')
  const [uploading, setUploading] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (!showForm) return
    const frame = window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      const titleInput = formRef.current?.querySelector('input')
      if (titleInput instanceof HTMLInputElement) titleInput.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [showForm, editingItemId])

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

  const resetForm = () => {
    setTitle('')
    setItemDescription('')
    setWebsite('')
    setImages([])
    setUrlDraft('')
    setEditingItemId(null)
    setShowForm(false)
    setFormError('')
  }

  const openAdd = () => {
    setEditingItemId(null)
    setTitle('')
    setItemDescription('')
    setWebsite('')
    setImages([])
    setUrlDraft('')
    setFormError('')
    setShowForm(true)
  }

  const openEdit = (itemId: string) => {
    const item = category.items.find((entry) => entry.id === itemId)
    if (!item) return
    setEditingItemId(item.id)
    setTitle(item.title)
    setItemDescription(item.description)
    setWebsite(item.website || '')
    setImages(item.images || [])
    setUrlDraft('')
    setFormError('')
    setShowForm(true)
  }

  const onUpload = async (fileList: FileList | null) => {
    if (!fileList?.length) return
    if (images.length >= MAX_PROJECT_IMAGES) {
      setFormError(`Maximum ${MAX_PROJECT_IMAGES} photos per project.`)
      return
    }
    setUploading(true)
    setFormError('')
    try {
      const added = await filesToDataUrls(fileList, images.length)
      setImages((current) => [...current, ...added].slice(0, MAX_PROJECT_IMAGES))
    } catch {
      setFormError('Could not upload one or more images.')
    } finally {
      setUploading(false)
    }
  }

  const addImageUrl = () => {
    const url = urlDraft.trim()
    if (!url) return
    if (images.length >= MAX_PROJECT_IMAGES) {
      setFormError(`Maximum ${MAX_PROJECT_IMAGES} photos per project.`)
      return
    }
    setImages((current) => [...current, url].slice(0, MAX_PROJECT_IMAGES))
    setUrlDraft('')
    setFormError('')
  }

  const removeImage = (index: number) => {
    setImages((current) => current.filter((_, i) => i !== index))
  }

  const onSaveItem = (e: FormEvent) => {
    e.preventDefault()
    const payload = {
      title,
      description: itemDescription,
      website: website.trim() || undefined,
      images,
    }
    if (editingItemId) {
      updateItem(category.id, editingItemId, payload)
    } else {
      addItem(category.id, payload)
    }
    resetForm()
  }

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <Link to="/admin" className="admin-back">
            ← Categories
          </Link>
          <h1>{category.name}</h1>
          <p className="admin-subtitle">
            {category.items.length} {category.items.length === 1 ? 'project' : 'projects'} in this
            category
          </p>
        </div>
        <div className="admin-top__actions">
          <Link to={`/admin/categories/${category.id}/settings`}>Edit category</Link>
          <Link to={`/work/${category.slug}`} target="_blank">
            View page
          </Link>
          <button type="button" className="ghost-btn" onClick={openAdd}>
            Add project
          </button>
        </div>
      </header>

      {showForm && (
        <section className="admin-card" ref={formRef} id="project-form">
          <div className="admin-card__head">
            <h2>{editingItemId ? 'Edit project' : 'Add project'}</h2>
            <button type="button" onClick={resetForm}>
              Close
            </button>
          </div>
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
              Website (optional)
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https:// — leave blank to hide Visit website"
              />
            </label>

            <div className="admin-photos">
              <div className="admin-card__head">
                <h2>Photos ({images.length}/{MAX_PROJECT_IMAGES})</h2>
              </div>
              <p className="admin-hint">Upload up to {MAX_PROJECT_IMAGES} photos, or paste image URLs.</p>

              <div className="admin-photos__grid">
                {images.map((src, index) => (
                  <div key={`${src.slice(0, 24)}-${index}`} className="admin-photos__item">
                    <img src={src} alt="" />
                    <button type="button" onClick={() => removeImage(index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {images.length < MAX_PROJECT_IMAGES && (
                <>
                  <label className="admin-upload">
                    <span>{uploading ? 'Uploading…' : 'Upload photos'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={uploading}
                      onChange={(e) => {
                        void onUpload(e.target.files)
                        e.target.value = ''
                      }}
                    />
                  </label>

                  <div className="admin-form__row admin-form__row--url">
                    <input
                      value={urlDraft}
                      onChange={(e) => setUrlDraft(e.target.value)}
                      placeholder="Or paste image URL"
                    />
                    <button type="button" onClick={addImageUrl}>
                      Add URL
                    </button>
                  </div>
                </>
              )}
            </div>

            {formError && <p className="admin-error">{formError}</p>}
            <div className="admin-form__row">
              <button type="submit" className="ghost-btn" disabled={uploading}>
                {editingItemId ? 'Save project' : 'Add project'}
              </button>
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="admin-card">
        <div className="admin-card__head">
          <h2>Projects</h2>
          {!showForm && (
            <button type="button" className="ghost-btn" onClick={openAdd}>
              Add project
            </button>
          )}
        </div>

        {category.items.length === 0 ? (
          <div className="admin-empty">
            <p>No projects in this category yet.</p>
            <button type="button" className="ghost-btn" onClick={openAdd}>
              Add project
            </button>
          </div>
        ) : (
          <ul className="admin-list">
            {category.items.map((item) => (
              <li key={item.id}>
                <div className="admin-list__project">
                  {item.images[0] && (
                    <img className="admin-list__thumb" src={item.images[0]} alt="" />
                  )}
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                    <span>
                      {item.images.length} {item.images.length === 1 ? 'photo' : 'photos'}
                      {item.website ? ` · ${item.website}` : ' · no website'}
                    </span>
                  </div>
                </div>
                <div className="admin-list__actions">
                  <button type="button" onClick={() => openEdit(item.id)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete “${item.title}”?`)) deleteItem(category.id, item.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
