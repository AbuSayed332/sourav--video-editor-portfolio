'use client'
import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import Button from '../common/Button'
import FadeInUp from '../animations/FadeInUp'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToPortfolio = () => {
    const element = document.querySelector('#portfolio')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!mounted) return null

  return (
    <section 
      id="home" 
      className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900 relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
        <FadeInUp delay={0}>
          <div className="mb-8">
            <img 
              src="/images/sourav.jpg" 
              alt="Alex Creative Profile" 
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-purple-400 shadow-2xl animate-float"
            />
          </div>
        </FadeInUp>

        <FadeInUp delay={200}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Video Editor & Graphics Designer
          </h1>
        </FadeInUp>

        <FadeInUp delay={400}>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Bringing stories to life through creative video editing and stunning visual design. 
            Transforming ideas into compelling visual experiences that captivate and inspire.
          </p>
        </FadeInUp>

        <FadeInUp delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={scrollToPortfolio}
              className="animate-glow"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={scrollToContact}
            >
              Get In Touch
            </Button>
          </div>
        </FadeInUp>

        {/* Scroll Indicator */}
        <FadeInUp delay={800}>
          <div className="animate-bounce">
            <button 
              onClick={scrollToPortfolio}
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <ArrowDown size={32} />
            </button>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}