import { motion } from 'framer-motion'
import { services, servicesEyebrow } from '../data/content'
import './Services.css'

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-rule" />
          <h2 className="section-title">Services.</h2>
          <p className="section-eyebrow">{servicesEyebrow}</p>
        </motion.div>

        <div className="services__grid">
          {services.map((service, i) => (
            <motion.a
              key={service.title}
              href="#contact"
              className="services__item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="services__num">{service.number}</span>
              <span className="services__title">{service.title}</span>
              <span className="services__arrow" aria-hidden="true">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
