import { motion } from 'framer-motion'
import { servicesCopy, servicesEyebrow } from '../data/content'
import './Services.css'

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="container services__layout">
        <motion.div
          className="services__intro"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-rule" />
          <h2 className="section-title">Services.</h2>
          <p className="section-eyebrow">{servicesEyebrow}</p>
          <p className="services__lead">{servicesCopy.lead}</p>
        </motion.div>

        <div className="services__points">
          {servicesCopy.points.map((point, i) => (
            <motion.article
              key={point.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
