'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Play, ExternalLink, X } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import Card from '../common/Card'
import { portfolioItems } from '../../../data/portfolioItems'

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('video')
  const [selectedVideo, setSelectedVideo] = useState(null)

  // Helper function to extract video ID from URL
  const extractVideoId = (url, platform) => {
    if (!url) return null;
    
    if (platform === 'youtube') {
      // Handle various YouTube URL formats
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?v=([^&\n?#]+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
      }
    } else if (platform === 'vimeo') {
      // Handle Vimeo URL formats
      const match = url.match(/vimeo\.com\/(\d+)/);
      return match ? match[1] : null;
    }
    
    return null;
  };

  const handleItemClick = (item) => {
    if (activeTab === 'video' || activeTab === 'graphics') {
      setSelectedVideo(item)
    } else {
      // For other types, open external link if available
      if (item.link) {
        window.open(item.link, '_blank')
      }
    }
  }

  const closeVideoModal = () => {
    setSelectedVideo(null)
  }

  return (
    <>
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
                className={`group bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 animate-fade-in-up cursor-pointer`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => handleItemClick(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.thumbnail} 
                    alt={item.title} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {activeTab === 'video' ? (
                        <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                      ) : (
                        <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                          <ExternalLink className="w-8 h-8 text-white" />
                        </div>
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

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden">
            {/* Close Button */}
            <button 
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Video Container */}
            <div className="aspect-video">
              {(() => {
                const youtubeId = extractVideoId(selectedVideo.videoUrl, 'youtube');
                const vimeoId = extractVideoId(selectedVideo.videoUrl, 'vimeo');
                
                if (youtubeId) {
                  return (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                } else if (vimeoId) {
                  return (
                    <iframe
                      className="w-full h-full"
                      src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    />
                  );
                } else if (selectedVideo.videoUrl && (selectedVideo.videoUrl.endsWith('.mp4') || selectedVideo.videoUrl.endsWith('.mov') || selectedVideo.videoUrl.endsWith('.avi'))) {
                  // Direct video file
                  return (
                    <video 
                      className="w-full h-full object-cover" 
                      controls 
                      autoPlay
                      src={selectedVideo.videoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  );
                } else {
                  // Fallback: show thumbnail with message
                  return (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800">
                      <div className="text-center">
                        <Image
                          src={selectedVideo.thumbnail}
                          alt={selectedVideo.title}
                          width={400}
                          height={225}
                          className="rounded-lg mb-4"
                        />
                        <p className="text-white text-lg">Video preview not available</p>
                        <p className="text-gray-400">Contact for full video access</p>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
            
            {/* Video Info */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h3>
              <p className="text-gray-300 mb-4">{selectedVideo.description}</p>
              {selectedVideo.client && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Client:</span>
                  <span className="text-purple-400 font-medium">{selectedVideo.client}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}