'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, TrendingUp, Award } from 'lucide-react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { skillsApi } from '../../../utils/apiClient'

export default function AdminSkills() {
  // Skills API returns { technicalSkills, creativeSkills, workflowSkills }
  const [allSkills, setAllSkills] = useState([])
  const [filteredSkills, setFilteredSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)

  const initialFormData = {
    name: '',
    category: '',
    proficiency: 70,
    icon: '🎬',
    description: '',
    yearsOfExperience: 0,
  }
  const [formData, setFormData] = useState(initialFormData)

  useEffect(() => { fetchSkills() }, [])

  useEffect(() => { filterSkills() }, [allSkills, searchQuery, filterCategory])

  const fetchSkills = async () => {
    try {
      setLoading(true)
      const data = await skillsApi.getAll()
      // API returns { technicalSkills, creativeSkills, workflowSkills }
      const merged = [
        ...(data?.technicalSkills || []),
        ...(data?.creativeSkills || []),
        ...(data?.workflowSkills || []),
      ]
      setAllSkills(merged)
    } catch (error) {
      console.error('Error fetching skills:', error)
      setAllSkills([
        { _id: '1', name: 'Adobe Premiere Pro', category: 'Technical Skills', proficiency: 95, icon: '🎬', yearsOfExperience: 6, description: 'Professional video editing' },
        { _id: '2', name: 'After Effects', category: 'Motion Graphics', proficiency: 90, icon: '✨', yearsOfExperience: 5, description: 'Motion graphics and VFX' },
        { _id: '3', name: 'Storytelling', category: 'Creative Skills', proficiency: 92, icon: '📚', yearsOfExperience: 6, description: 'Compelling narrative crafting' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filterSkills = () => {
    let filtered = allSkills.filter(skill => {
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        filterCategory === 'all' ||
        skill.category.toLowerCase().includes(filterCategory.toLowerCase())

      return matchesSearch && matchesCategory
    })
    setFilteredSkills(filtered)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsApi.delete(id)
        await fetchSkills()
      } catch (error) {
        console.error('Error deleting skill:', error)
        alert(`Error deleting skill: ${error.message}`)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    const val = type === 'range' || type === 'number' ? parseInt(value, 10) : value
    setFormData(prev => ({ ...prev, [name]: val }))
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingSkill(null)
    setFormData(initialFormData)
  }

  const handleAdd = () => {
    setEditingSkill(null)
    setFormData(initialFormData)
    setShowModal(true)
  }

  const handleEdit = (skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      category: skill.category || '',
      proficiency: skill.proficiency,
      icon: skill.icon || '🎬',
      description: skill.description || '',
      yearsOfExperience: skill.yearsOfExperience || 0,
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const skillId = editingSkill?._id || editingSkill?.id
      if (editingSkill && skillId) {
        await skillsApi.update(skillId, formData)
      } else {
        await skillsApi.create(formData)
      }
      await fetchSkills()
      handleCloseModal()
    } catch (error) {
      console.error('Error saving skill:', error)
      alert(`Error: ${error.message || 'An unexpected error occurred.'}`)
    }
  }

  const getProficiencyColor = (p) => {
    if (p >= 90) return 'bg-gradient-to-r from-green-600 to-emerald-600'
    if (p >= 80) return 'bg-gradient-to-r from-blue-600 to-cyan-600'
    if (p >= 70) return 'bg-gradient-to-r from-yellow-600 to-orange-600'
    return 'bg-gradient-to-r from-red-600 to-pink-600'
  }

  const getProficiencyText = (p) => {
    if (p >= 90) return 'Expert'
    if (p >= 80) return 'Advanced'
    if (p >= 70) return 'Intermediate'
    return 'Beginner'
  }

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  const expertCount = allSkills.filter(s => s.proficiency >= 90).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Skills Management</h1>
          <p className="text-gray-400 mt-1">Manage your technical skills and expertise levels</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical Skills</option>
            <option value="creative">Creative Skills</option>
            <option value="workflow">Workflow Skills</option>
            <option value="motion">Motion Graphics</option>
            <option value="audio">Audio</option>
          </select>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{allSkills.length}</div>
            <div className="text-gray-400 text-sm">Total Skills</div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">{filteredSkills.length}</div>
            <div className="text-gray-400 text-sm">Showing</div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{expertCount}</div>
            <div className="text-gray-400 text-sm">Expert Level</div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {allSkills.length > 0
                ? Math.round(allSkills.reduce((sum, s) => sum + (s.proficiency || 0), 0) / allSkills.length)
                : 0}%
            </div>
            <div className="text-gray-400 text-sm">Avg Proficiency</div>
          </div>
        </Card>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map((skill) => {
          const skillId = skill._id || skill.id
          return (
            <Card key={skillId} className="bg-gray-900 border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{skill.icon || '🎬'}</span>
                    <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getProficiencyColor(skill.proficiency)}`}>
                      {getProficiencyText(skill.proficiency)}
                    </span>
                  </div>
                  <p className="text-purple-400 font-medium text-sm mb-2">{skill.category}</p>
                  {skill.description && <p className="text-gray-400 text-sm mb-2">{skill.description}</p>}
                  {skill.yearsOfExperience > 0 && (
                    <p className="text-gray-500 text-sm">{skill.yearsOfExperience} years of experience</p>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button onClick={() => handleEdit(skill)} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(skillId)} className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Proficiency</span>
                  <span className="text-gray-300">{skill.proficiency}%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${getProficiencyColor(skill.proficiency)}`}
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Level: {getProficiencyText(skill.proficiency)}</span>
                <div className="flex items-center space-x-1 text-green-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Growing</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <Card className="bg-gray-900 border-gray-700 p-12 text-center">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No skills found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery || filterCategory !== 'all' ? 'Try adjusting your filters' : 'Get started by adding your first skill'}
          </p>
          <Button onClick={handleAdd}>Add Skill</Button>
        </Card>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-700 w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name *</label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleInputChange} required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="e.g., Adobe Premiere Pro"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Icon (emoji)</label>
                    <input
                      type="text" name="icon" value={formData.icon} onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="🎬"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <input
                    type="text" name="category" value={formData.category} onChange={handleInputChange} required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="e.g., Technical Skills, Creative Skills, Motion Graphics"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    name="description" value={formData.description} onChange={handleInputChange} rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="Brief description of your expertise"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Proficiency Level ({formData.proficiency}%)
                    </label>
                    <input
                      type="range" name="proficiency" min="0" max="100" value={formData.proficiency}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Beginner</span><span>Expert</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
                    <input
                      type="number" name="yearsOfExperience" min="0" max="20" value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                  <Button type="submit">{editingSkill ? 'Update Skill' : 'Create Skill'}</Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
