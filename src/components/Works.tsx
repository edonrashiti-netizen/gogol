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

        <div className="works__grid">
          {data.groups.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/work/${category.slug}`} className="works__item">
                <span className="works__num">{categoryNumber(i)}</span>
                <span className="works__title">{category.name}</span>
                <span className="works__arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
          {!loading && data.groups.length === 0 && (
            <p className="works__status">Categories coming soon.</p>
          )}
        </div>
      </div>
    </section>
  )
}
