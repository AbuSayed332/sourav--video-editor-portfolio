'use client'
import { useState } from 'react'
import { Play, ExternalLink } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'
import { portfolioItems } from '../../../data/portfolioItems'

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('video')

  return (
    <section id="portfolio" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle 
          title="My Portfolio"
          subtitle="Showcasing creative projects and professional work"
        />
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 p-2 rounded-full shadow-lg">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'video' 
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Video Editing
            </button>
            <button
              onClick={() => setActiveTab('graphics')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'graphics' 
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              Graphics Design
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems[activeTab]?.map((item, index) => (
            <Card 
              key={item.id}
              className={`group bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 animate-fade-in-up`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {activeTab === 'video' ? (
                      <Play className="w-12 h-12 text-white animate-pulse" />
                    ) : (
                      <ExternalLink className="w-12 h-12 text-white animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm shadow-lg">
                    {item.category}
                  </span>
                </div>

                {/* Duration/Type Badge */}
                {item.duration && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                      {item.duration}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-3">
                  {item.description}
                </p>
                
                {item.client && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Client:</span>
                    <span className="text-purple-400 font-medium">{item.client}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}