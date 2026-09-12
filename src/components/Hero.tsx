import { motion, type Variants } from 'framer-motion'
import './Hero.css'

const easeOut = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.75, ease: easeOut },
  }),
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80"
          alt=""
        />
        <div className="hero__veil" />
      </div>

      <motion.span
        className="hero__dot hero__dot--a"
        aria-hidden="true"
        animate={{ y: [0, -14, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="hero__dot hero__dot--b"
        aria-hidden="true"
        animate={{ y: [0, 12, 0], opacity: [0.55, 0.95, 0.55] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      <div className="hero__content container">
        <motion.div className="section-rule" variants={fadeUp} initial="hidden" animate="show" custom={0} />
        <motion.img
          className="hero__brand"
          src="/logo/gogol-white.svg"
          alt="Gogol"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
        />
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={2}>
          Brandbooks, logos & social.
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3}>
          Gogol builds identity systems that look sharp and stay consistent — from the mark to the feed.
        </motion.p>
        <motion.a
          href="#contact"
          className="ghost-btn"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
        >
          Get started
        </motion.a>
      </div>
    </section>
  )
}
