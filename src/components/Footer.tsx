import { navLinks } from '../data/content'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#top" className="footer__logo" aria-label="Gogol home">
          <img src="/logo/gogol-white.svg" alt="Gogol" />
        </a>

        <nav className="footer__nav" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <p className="footer__copy">© Gogol {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  )
}
