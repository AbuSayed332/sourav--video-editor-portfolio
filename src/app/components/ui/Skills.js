'use client'
import { useState, useEffect } from 'react'
import SectionTitle from '../common/SectionTitle'
import ScrollAnimation from '../animations/ScrollAnimation'
import { Loader } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1'

export default function Skills() {
  const [skills, setSkills] = useState({ video: [], graphics: [] })
  const [loading, setLoading] = useState(true)
  const [visibleSkills, setVisibleSkills] = useState(false)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch(`${API_BASE}/skills`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        // API returns { technicalSkills, creativeSkills, workflowSkills }
        // Map to video/graphics for display
        const videoSkills = [
          ...(data.technicalSkills || []),
          ...(data.workflowSkills || []),
        ]
        const graphicsSkills = [
          ...(data.creativeSkills || []),
        ]
        setSkills({ video: videoSkills, graphics: graphicsSkills })
      } catch (err) {
        console.error('Skills fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const handleInView = () => setVisibleSkills(true)

  if (loading) {
    return (
      <section className="py-20 bg-gray-800">
        <div className="flex justify-center py-20">
          <Loader className="w-10 h-10 text-purple-400 animate-spin" />
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Professional tools and technologies I work with"
        />

        <ScrollAnimation onInView={handleInView}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Video / Technical Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-purple-400 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-purple-600 mr-4 rounded"></div>
                Video Editing
              </h3>
              <div className="space-y-6">
                {skills.video.length === 0 && (
                  <p className="text-gray-500">No video skills added yet.</p>
                )}
                {skills.video.map((skill, index) => (
                  <div key={skill._id || skill.id || index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-white group-hover:text-purple-400 transition-colors flex items-center gap-2">
                        {skill.icon && <span>{skill.icon}</span>}
                        {skill.name}
                      </span>
                      <span className="text-gray-400">{skill.proficiency}%</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: visibleSkills ? `${skill.proficiency}%` : '0%',
                          transitionDelay: `${index * 150}ms`
                        }}
                      ></div>
                    </div>
                    {skill.description && (
                      <p className="text-sm text-gray-500 mt-1">{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Graphics / Creative Skills */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-pink-400 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-pink-400 to-pink-600 mr-4 rounded"></div>
                Graphics Design
              </h3>
              <div className="space-y-6">
                {skills.graphics.length === 0 && (
                  <p className="text-gray-500">No graphics skills added yet.</p>
                )}
                {skills.graphics.map((skill, index) => (
                  <div key={skill._id || skill.id || index} className="group">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-white group-hover:text-pink-400 transition-colors flex items-center gap-2">
                        {skill.icon && <span>{skill.icon}</span>}
                        {skill.name}
                      </span>
                      <span className="text-gray-400">{skill.proficiency}%</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-pink-600 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: visibleSkills ? `${skill.proficiency}%` : '0%',
                          transitionDelay: `${(index + skills.video.length) * 150}ms`
                        }}
                      ></div>
                    </div>
                    {skill.description && (
                      <p className="text-sm text-gray-500 mt-1">{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Additional Skills Tags */}
        {[...skills.video, ...skills.graphics].length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-center mb-8 text-gray-300">All Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[...skills.video, ...skills.graphics].map((skill, index) => (
                <div
                  key={skill._id || skill.id || index}
                  className="bg-gray-900 px-4 py-2 rounded-full text-gray-300 font-medium hover:bg-gray-700 transition-colors duration-300 hover:scale-105 transform text-sm"
                >
                  {skill.icon && <span className="mr-1">{skill.icon}</span>}
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}