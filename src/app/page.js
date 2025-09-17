'use client'
import Navigation from './components/ui/Navigation'
import Hero from './components/ui/Hero'
import Stats from './components/ui/Stats'
import Portfolio from './components/ui/Portfolio'
import Skills from './components/ui/Skills'
import Testimonials from './components/ui/Testimonials'
import About from './components/ui/About'
import Contact from './components/ui/Contact'
import Footer from './components/ui/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      <Hero />
      <Stats />
      <Portfolio />
      <Skills />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}