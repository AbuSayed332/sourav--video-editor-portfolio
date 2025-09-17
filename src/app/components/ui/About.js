'use client'
import Image from 'next/image'
import { Award, Users, Clock, Star, Download } from 'lucide-react'
import SectionTitle from '../common/SectionTitle'
import Button from '../common/Button'
import FadeInUp from '../animations/FadeInUp'
import { personalInfo } from '../../../data/personalInfo'

export default function About() {
  const achievements = [
    {
      icon: Award,
      title: 'Award Winner',
      description: 'Creative Excellence 2023',
      color: 'text-purple-400'
    },
    {
      icon: Users,
      title: 'Team Player',
      description: 'Collaborative Approach',
      color: 'text-pink-400'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'On-time Projects',
      color: 'text-blue-400'
    },
    {
      icon: Star,
      title: 'Quality Focus',
      description: 'Attention to Detail',
      color: 'text-yellow-400'
    }
  ]

  const handleDownloadCV = () => {
    // In a real app, this would trigger a file download
    console.log('Downloading CV...')
    alert('CV download feature would be implemented here')
  }

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <FadeInUp delay={0}>
              <SectionTitle 
                title="About Me"
                subtitle="Passionate creative professional with years of experience"
                align="left"
              />
            </FadeInUp>

            <FadeInUp delay={200}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {personalInfo.bio.paragraph1}
              </p>
            </FadeInUp>

            <FadeInUp delay={400}>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {personalInfo.bio.paragraph2}
              </p>
            </FadeInUp>
            
            <FadeInUp delay={600}>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                  >
                    <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                    <div>
                      <p className="font-bold text-white">{achievement.title}</p>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInUp>

            <FadeInUp delay={800}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  onClick={handleDownloadCV}
                  className="flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    const element = document.querySelector('#contact')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Let&apos;s Talk
                </Button>
              </div>
            </FadeInUp>
          </div>
          
          {/* Image */}
          <FadeInUp delay={400}>
            <div className="relative">
              <Image
                src="/images/work.jpg" 
                alt="Sourav Alam Prodhan at work"
                className="rounded-xl shadow-2xl w-full h-auto"
                width={600}
                height={800}
              />
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl shadow-lg">
                <p className="text-2xl font-bold text-white">{personalInfo.experience}+ Years</p>
                <p className="text-purple-200">Experience</p>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 p-3 rounded-full shadow-lg animate-bounce">
                <Star className="w-6 h-6" />
              </div>
              
              <div className="absolute top-1/4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-float">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </FadeInUp>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 pt-12 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FadeInUp delay={0}>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-3 text-purple-400">My Mission</h4>
                <p className="text-gray-300 leading-relaxed">
                  To create compelling visual stories that connect with audiences and drive meaningful results for my clients.
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={200}>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-3 text-pink-400">My Vision</h4>
                <p className="text-gray-300 leading-relaxed">
                  To be at the forefront of creative technology, pushing boundaries in video editing and design innovation.
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={400}>
              <div className="p-6">
                <h4 className="text-xl font-bold mb-3 text-blue-400">My Values</h4>
                <p className="text-gray-300 leading-relaxed">
                  Creativity, professionalism, collaboration, and delivering exceptional quality in every project.
                </p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}