import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { contactLead } from '../data/content'
import './Contact.css'

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-rule" />
          <h2 className="section-title">Let's talk?</h2>
          <p className="contact__lead">{contactLead}</p>
        </motion.div>

        <motion.form
          className="contact__form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {sent ? (
            <p className="contact__thanks" role="status">
              Thanks — we'll be in touch soon.
            </p>
          ) : (
            <>
              <label>
                <span>Your name *</span>
                <input name="name" type="text" required autoComplete="name" />
              </label>
              <label>
                <span>Your email *</span>
                <input name="email" type="email" required autoComplete="email" />
              </label>
              <label>
                <span>Subject *</span>
                <input name="subject" type="text" required />
              </label>
              <label>
                <span>Your message *</span>
                <textarea name="message" rows={5} required />
              </label>
              <button type="submit" className="ghost-btn contact__submit">
                Send message
              </button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  )
}
