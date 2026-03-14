'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star, Loader } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_BASE}/testimonials`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        // Only show published testimonials on public site
        const published = Array.isArray(data)
          ? data.filter(t => !t.status || t.status === 'published')
          : []
        setTestimonials(published)
      } catch (err) {
        console.error('Testimonials fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  const next = useCallback(() => {
    if (isAnimating || testimonials.length === 0) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }, [isAnimating, testimonials.length])

  const prev = useCallback(() => {
    if (isAnimating || testimonials.length === 0) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }, [isAnimating, testimonials.length])

  const goTo = useCallback((index) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsAnimating(false)
    }, 300)
  }, [isAnimating, currentIndex])

  useEffect(() => {
    if (testimonials.length === 0 || isAnimating) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isAnimating, next, testimonials.length])

  if (loading) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="flex justify-center py-20">
          <Loader className="w-10 h-10 text-purple-400 animate-spin" />
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) return null

  const current = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionTitle
          title="What Clients Say"
          subtitle="Testimonials from satisfied clients and collaborators"
        />

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700">
            <div className="absolute top-6 left-6 text-purple-400/30">
              <Quote className="w-12 h-12" />
            </div>

            <div className="absolute top-6 right-6 flex space-x-2">
              <button
                onClick={prev}
                disabled={isAnimating}
                className="p-2 bg-gray-700 hover:bg-purple-600 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                disabled={isAnimating}
                className="p-2 bg-gray-700 hover:bg-purple-600 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(current?.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-xl md:text-2xl text-gray-200 mb-8 italic text-center leading-relaxed">
                &quot;{current?.text}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                {current?.avatar ? (
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-16 h-16 rounded-full border-2 border-purple-400 shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full border-2 border-purple-400 bg-purple-900 flex items-center justify-center text-2xl font-bold text-white">
                    {current?.name?.charAt(0)}
                  </div>
                )}
                <div className="text-center">
                  <p className="font-bold text-lg text-white">{current?.name}</p>
                  <p className="text-purple-400 font-medium">{current?.position || current?.role}</p>
                  <p className="text-gray-400 text-sm">{current?.company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Testimonial Cards Grid */}
          {testimonials.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {testimonials.slice(0, 3).map((testimonial) => {
                const tId = testimonial._id || testimonial.id
                return (
                  <Card
                    key={tId}
                    className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="flex items-center mb-4">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4 border-2 border-purple-400 object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full mr-4 border-2 border-purple-400 bg-purple-900 flex items-center justify-center font-bold text-white">
                          {testimonial.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-white">{testimonial.name}</p>
                        <p className="text-purple-400 text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm italic">
                      &quot;{testimonial.text?.length > 100
                        ? `${testimonial.text.slice(0, 100)}...`
                        : testimonial.text}&quot;
                    </p>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}