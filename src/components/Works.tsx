import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { worksEyebrow } from '../data/content'
import { useWorks } from '../context/WorksContext'
import './Works.css'

export function Works() {
  const { data, loading } = useWorks()

  return (
    <section className="section works" id="works">
      <div className="container works__head">
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
      </div>

      <div className="container works__groups">
        {loading && <p className="works__status">Loading…</p>}
        {!loading && data.groups.length === 0 && (
          <p className="works__status">Work groups coming soon.</p>
        )}
        {data.groups.map((group, i) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={`/work/${group.slug}`} className="works__group">
              <div className="works__image">
                <img src={group.coverImage} alt="" loading="lazy" />
              </div>
              <div className="works__meta">
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <span className="works__count">
                  {group.items.length} {group.items.length === 1 ? 'project' : 'projects'} →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
