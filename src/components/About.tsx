import { motion } from 'framer-motion'
import { aboutFocus } from '../data/content'
import './About.css'

export function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <motion.div
          className="about__intro"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-rule" />
          <h2 className="section-title">About.</h2>
          <p className="section-eyebrow">We're more than a digital agency</p>
          <p className="about__lead">
            Gogol partners with ambitious teams to build brands and digital products that feel
            intentional — from first sketch to launch day.
          </p>
        </motion.div>

        <div className="about__focus">
          {aboutFocus.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
            >
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </motion.article>
          ))}
        </div>

        <div className="about__columns">
          {[
            {
              title: 'Who we are',
              body: 'A compact studio of strategists, designers, and builders who care about craft as much as outcomes.',
            },
            {
              title: 'Our philosophy',
              body: 'Clarity beats clutter. We strip work down to what matters, then sharpen every detail until it sings.',
            },
            {
              title: 'How we work',
              body: 'Tight collaboration, transparent process, and momentum from day one — so ideas reach the world faster.',
            },
          ].map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
            >
              <h3>{col.title}</h3>
              <p>{col.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
