import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Pillars } from './components/Pillars'
import { Services } from './components/Services'
import { Works } from './components/Works'
import { About } from './components/About'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Pillars />
        <Services />
        <Works />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
