'use client'
import { useState, useEffect } from 'react'
import SectionTitle from '../common/SectionTitle'
import ScrollAnimation from '../animations/ScrollAnimation'
const skills = {
  video: {
    'Adobe Premiere Pro': { level: 90, description: 'Expert level editing with complex timelines and effects.' },
    'Final Cut Pro': { level: 85, description: 'Proficient in Apple\'s professional video editing software.' },
    'DaVinci Resolve': { level: 75, description: 'Experienced in color grading and advanced video editing.' }
  },
  graphics: {
    'Adobe Photoshop': { level: 80, description: 'Skilled in image manipulation, retouching, and graphic design.' },
    'Adobe Illustrator': { level: 70, description: 'Competent in vector graphics creation and logo design.' },
    'Figma': { level: 60, description: 'Familiar with UI/UX design and collaborative design workflows.' }
  }
}

export default function Skills() {
  const [visibleSkills, setVisibleSkills] = useState(false)

  const handleInView = () => {
    setVisibleSkills(true)
  }

  return (
    <section className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle 
          title="Skills & Expertise"
          subtitle="Professional tools and technologies I work with"
        />
        
        <ScrollAnimation onInView={handleInView}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Video Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-purple-400 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-purple-600 mr-4 rounded"></div>
                Video Editing
              </h3>
              <div className="space-y-6">
                {Object.entries(skills.video || {}).map(([skillName, skillData], index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {skillName}
                      </span>
                      <span className="text-gray-400">{skillData.level}%</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-1500 ease-out ${
                          visibleSkills ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ 
                          width: visibleSkills ? `${skillData.level}%` : '0%',
                          transitionDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{skillData.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Graphics Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-pink-400 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-pink-400 to-pink-600 mr-4 rounded"></div>
                Graphics Design
              </h3>
              <div className="space-y-6">
                {Object.entries(skills.graphics || {}).map(([skillName, skillData], index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-white group-hover:text-pink-400 transition-colors">
                        {skillName}
                      </span>
                      <span className="text-gray-400">{skillData.level}%</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r from-pink-600 to-purple-600 h-3 rounded-full transition-all duration-1500 ease-out ${
                          visibleSkills ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ 
                          width: visibleSkills ? `${skillData.level}%` : '0%',
                          transitionDelay: `${(index + Object.keys(skills.video || {}).length) * 200}ms`
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{skillData.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Additional Skills Grid */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-center mb-8 text-gray-300">Additional Expertise</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Motion Graphics', 'Color Grading', 'Sound Design', 'Brand Strategy', '3D Animation', 'UI/UX Design', 'Photography', 'Project Management'].map((skill, index) => (
              <div 
                key={skill}
                className="bg-gray-900 p-4 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300 hover:scale-105 transform"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-gray-300 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}