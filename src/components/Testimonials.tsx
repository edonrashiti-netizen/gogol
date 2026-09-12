import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { testimonials } from '../data/content'
import './Testimonials.css'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const item = testimonials[index]

  const go = (dir: 1 | -1) => {
    setIndex((current) => (current + dir + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section testimonials" aria-label="Client testimonials">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-rule" />
          <h2 className="section-title">What clients say.</h2>
          <p className="section-eyebrow">Brand-first work that lands</p>
        </motion.div>

        <div className="testimonials__panel">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>“{item.quote}”</p>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="testimonials__nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial">
              ←
            </button>
            <div className="testimonials__dots" role="tablist" aria-label="Testimonial slides">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  className={i === index ? 'is-active' : undefined}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
