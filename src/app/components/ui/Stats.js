'use client'
import { useState } from 'react'
import ScrollAnimation from '../animations/ScrollAnimation'
import Card from '../common/Card'

export default function Stats() {
  const [hasAnimated, setHasAnimated] = useState(false)

  const stats = [
    {
      number: '150+',
      label: 'Projects Completed',
      color: 'text-purple-400',
      bgColor: 'from-purple-600 to-purple-800'
    },
    {
      number: '50+',
      label: 'Happy Clients',
      color: 'text-pink-400',
      bgColor: 'from-pink-600 to-pink-800'
    },
    {
      number: '5+',
      label: 'Years Experience',
      color: 'text-blue-400',
      bgColor: 'from-blue-600 to-blue-800'
    },
    {
      number: '98%',
      label: 'Client Satisfaction',
      color: 'text-green-400',
      bgColor: 'from-green-600 to-green-800'
    }
  ]

  const handleInView = () => {
    if (!hasAnimated) {
      setHasAnimated(true)
    }
  }

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollAnimation onInView={handleInView}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className={`bg-gray-900 p-6 rounded-lg transform transition-all duration-700 hover:scale-110 hover:shadow-xl ${
                  hasAnimated ? 'animate-count-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`text-3xl font-bold ${stat.color} mb-2 animate-bounce-number`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
                
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-lg`}></div>
              </Card>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}