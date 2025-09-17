'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'
import { testimonials } from '../../../data/testimonials'

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }

  const goToTestimonial = (index) => {
    if (isAnimating || index === currentTestimonial) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTestimonial(index)
      setIsAnimating(false)
    }, 300)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionTitle 
          title="What Clients Say"
          subtitle="Testimonials from satisfied clients and collaborators"
        />
        
        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-700">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-purple-400/30">
              <Quote className="w-12 h-12" />
            </div>
            
            {/* Navigation Buttons */}
            <div className="absolute top-6 right-6 flex space-x-2">
              <button
                onClick={prevTestimonial}
                disabled={isAnimating}
                className="p-2 bg-gray-700 hover:bg-purple-600 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                disabled={isAnimating}
                className="p-2 bg-gray-700 hover:bg-purple-600 rounded-full transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Testimonial Content */}
            <div className={`transition-all duration-500 ${
              isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
            }`}>
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-6 h-6 text-yellow-400 fill-current transform transition-all duration-300"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-xl md:text-2xl text-gray-200 mb-8 italic text-center leading-relaxed">
                "{testimonials[currentTestimonial]?.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={testimonials[currentTestimonial]?.avatar} 
                  alt={testimonials[currentTestimonial]?.name}
                  className="w-16 h-16 rounded-full border-3 border-purple-400 shadow-lg"
                />
                <div className="text-center">
                  <p className="font-bold text-lg text-white">
                    {testimonials[currentTestimonial]?.name}
                  </p>
                  <p className="text-purple-400 font-medium">
                    {testimonials[currentTestimonial]?.role}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {testimonials[currentTestimonial]?.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* Additional Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-purple-400"
                  />
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-purple-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic">
                  "{testimonial.text.length > 100 ? `${testimonial.text.slice(0, 100)}...` : testimonial.text}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}