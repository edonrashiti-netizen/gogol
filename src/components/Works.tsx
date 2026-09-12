import { useRef } from 'react'
import { motion } from 'framer-motion'
import { projects, worksEyebrow } from '../data/content'
import './Works.css'

export function Works() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })
  }

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

        <div className="works__controls">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous projects">
            ←
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Next projects">
            →
          </button>
          <a href="#contact" className="ghost-btn works__view">
            View all
          </a>
        </div>
      </div>

      <div className="works__track" ref={trackRef}>
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            className="works__card"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="works__image">
              <img src={project.image} alt="" loading="lazy" />
            </div>
            <div className="works__meta">
              <h3>{project.title}</h3>
              <p>{project.tags.join(' · ')}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
