import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { worksEyebrow } from '../data/content'
import { useWorks } from '../context/WorksContext'
import './Works.css'

function categoryNumber(index: number) {
  return `.${String(index + 1).padStart(2, '0')}`
}

export function Works() {
  const { data, loading } = useWorks()
  const featured = data.groups.slice(0, 3)
  const rest = data.groups.slice(3)

  return (
    <section className="section works" id="works">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-rule" />
          <h2 className="section-title">Works.</h2>
          <p className="section-eyebrow">{worksEyebrow}</p>
        </motion.div>

        {!loading && data.groups.length === 0 && (
          <p className="works__status">Categories coming soon.</p>
        )}

        {featured.length > 0 && (
          <div className="works__featured">
            {featured.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/work/${category.slug}`} className="works__thumb">
                  <div className="works__thumb-media">
                    <img src={category.coverImage} alt="" loading="lazy" />
                    <div className="works__thumb-veil" />
                  </div>
                  <div className="works__thumb-body">
                    <span className="works__num">{categoryNumber(i)}</span>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="works__thumb-cta">
                      {category.items.length}{' '}
                      {category.items.length === 1 ? 'project' : 'projects'} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="works__more">
            <p className="works__more-label">More categories</p>
            <div className="works__grid">
              {rest.map((category, i) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: (i % 3) * 0.05, duration: 0.5 }}
                >
                  <Link to={`/work/${category.slug}`} className="works__item">
                    <span className="works__num">{categoryNumber(i + 3)}</span>
                    <span className="works__title">{category.name}</span>
                    <span className="works__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
