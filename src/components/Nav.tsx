import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../data/content'
import './Nav.css'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__logo" aria-label="Gogol home">
          <img src="/logo/gogol-white.svg" alt="Gogol" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav__cta ghost-btn">
          Get started
        </a>

        <button
          type="button"
          className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              className="ghost-btn"
              onClick={() => setOpen(false)}
            >
              Get started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
