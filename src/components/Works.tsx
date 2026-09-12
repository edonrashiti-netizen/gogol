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

        {data.groups.length > 0 && (
          <div className="works__featured">
            {data.groups.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
      </div>
    </section>
  )
}
