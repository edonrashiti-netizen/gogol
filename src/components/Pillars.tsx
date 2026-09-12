import { motion } from 'framer-motion'
import { pillars } from '../data/content'
import './Pillars.css'

function PillarIcon({ type }: { type: (typeof pillars)[number]['icon'] }) {
  if (type === 'brandbook') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <path d="M12 10h20a4 4 0 014 4v24H16a4 4 0 01-4-4V10z" stroke="currentColor" strokeWidth="2" />
        <path d="M16 10v28" stroke="currentColor" strokeWidth="2" />
        <path d="M22 18h10M22 24h10M22 30h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'logo') {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="10" y="12" width="28" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="20" r="2.5" fill="currentColor" />
      <path d="M14 30l6-6 4 4 8-8 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
