import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Nav } from '../components/Nav'
import { Footer } from '../components/Footer'
import { ProjectGallery } from '../components/ProjectGallery'
import { useWorks } from '../context/WorksContext'
import './WorkGroupPage.css'

export function WorkGroupPage() {
  const { slug = '' } = useParams()
  const { getGroupBySlug, loading } = useWorks()
  const group = getGroupBySlug(slug)

  return (
    <>
      <Nav variant="solid" />
      <main className="work-page">
        <div className="container">
          <Link to="/#works" className="work-page__back">
            ← All works
          </Link>

          {loading && <p className="work-page__status">Loading…</p>}

          {!loading && !group && (
            <div className="work-page__empty">
              <h1>Category not found</h1>
              <p>This work category does not exist yet.</p>
              <Link to="/#works" className="ghost-btn">
                Back to works
              </Link>
            </div>
          )}

          {!loading && group && (
            <>
              <motion.header
                className="work-page__header"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="section-rule" />
                <h1 className="section-title">{group.name}.</h1>
                <p className="work-page__desc">{group.description}</p>
              </motion.header>

              <div className="work-page__grid">
                {group.items.length === 0 && (
                  <p className="work-page__status">No projects in this category yet.</p>
                )}
                {group.items.map((item, i) => (
                  <motion.article
                    key={item.id}
                    className="work-page__card"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.55 }}
                  >
                    <ProjectGallery images={item.images} title={item.title} />
                    <div className="work-page__body">
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      {item.website ? (
                        <a href={item.website} target="_blank" rel="noreferrer">
                          Visit website →
                        </a>
                      ) : null}
                    </div>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
