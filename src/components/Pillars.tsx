import { motion } from 'framer-motion'
import { pillars } from '../data/content'
import './Pillars.css'

function PillarIcon({ type }: { type: (typeof pillars)[number]['icon'] }) {
  if (type === 'vision') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="28" width="6" height="12" stroke="currentColor" strokeWidth="2" />
        <rect x="18" y="20" width="6" height="20" stroke="currentColor" strokeWidth="2" />
        <rect x="28" y="12" width="6" height="28" stroke="currentColor" strokeWidth="2" />
        <rect x="38" y="18" width="6" height="22" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
  if (type === 'product') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M24 8l4 12h12l-10 7 4 12-10-7-10 7 4-12-10-7h12l4-12z" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
      <path d="M24 10v14l10 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function Pillars() {
  return (
    <section className="pillars" aria-label="What we focus on">
      <div className="pillars__grid">
        {pillars.map((item, i) => (
          <motion.article
            key={item.title}
            className="pillars__item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pillars__icon">
              <PillarIcon type={item.icon} />
            </div>
            <div className="section-rule" />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
