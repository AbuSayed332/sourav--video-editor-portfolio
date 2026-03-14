'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Star, Edit, Trash2, CheckCircle, Clock, User } from 'lucide-react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { testimonialsApi } from '../../../utils/apiClient'

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [filteredTestimonials, setFilteredTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRating, setFilterRating] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)

  const initialTestimonialForm = {
    name: '',
    company: '',
    position: '',
    text: '',
    rating: 5,
    avatar: '',
    featured: false,
  }
  const [testimonialForm, setTestimonialForm] = useState(initialTestimonialForm)

  useEffect(() => { fetchTestimonials() }, [])

  useEffect(() => { filterTestimonials() }, [testimonials, searchQuery, filterRating, filterStatus])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const data = await testimonialsApi.getAll()
      setTestimonials(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials([
        {
          _id: '1',
          name: 'Sarah Johnson',
          company: 'Tech Innovations Inc.',
          position: 'Marketing Director',
          text: 'Outstanding work on our promotional video.',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
          status: 'published',
          featured: true,
        },
        {
          _id: '2',
          name: 'Mike Chen',
          company: 'Creative Studios',
          position: 'Creative Director',
          text: 'Delivered exceptional results on tight deadlines.',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
          status: 'pending',
          featured: false,
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const filterTestimonials = () => {
    const filtered = testimonials.filter(t => {
      const matchesSearch =
        t.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.text?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRating = filterRating === 'all' || t.rating >= parseInt(filterRating)
      const matchesStatus = filterStatus === 'all' || t.status === filterStatus
      return matchesSearch && matchesRating && matchesStatus
    })
    setFilteredTestimonials(filtered)
  }

  const handleAdd = () => {
    setEditingTestimonial(null)
    setTestimonialForm(initialTestimonialForm)
    setShowModal(true)
  }

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial)
    setTestimonialForm({
      name: testimonial.name || '',
      company: testimonial.company || '',
      position: testimonial.position || testimonial.role || '',
      text: testimonial.text || '',
      rating: testimonial.rating || 5,
      avatar: testimonial.avatar || '',
      featured: testimonial.featured || false,
    })
    setShowModal(true)
  }

  const handleTestimonialFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setTestimonialForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'rating' ? parseInt(value, 10) : value),
    }))
  }

  const handleTestimonialSubmit = async () => {
    try {
      const testimonialId = editingTestimonial?._id || editingTestimonial?.id
      if (editingTestimonial && testimonialId) {
        await testimonialsApi.update(testimonialId, testimonialForm)
      } else {
        await testimonialsApi.create(testimonialForm)
      }
      await fetchTestimonials()
      setShowModal(false)
      setEditingTestimonial(null)
    } catch (error) {
      console.error('Error saving testimonial:', error)
      alert(`Error: ${error.message || 'Failed to save testimonial.'}`)
    }
  }

  const handleStatusChange = async (testimonial, newStatus) => {
    const id = testimonial._id || testimonial.id
    try {
      await testimonialsApi.update(id, { status: newStatus })
      await fetchTestimonials()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (testimonial) => {
    const id = testimonial._id || testimonial.id
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await testimonialsApi.delete(id)
        await fetchTestimonials()
      } catch (error) {
        console.error('Error deleting testimonial:', error)
        alert(`Error: ${error.message}`)
      }
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      published: { color: 'bg-green-600', text: 'Published', icon: CheckCircle },
      pending: { color: 'bg-yellow-600', text: 'Pending', icon: Clock },
      draft: { color: 'bg-gray-600', text: 'Draft', icon: Edit }
    }
    const badge = badges[status] || badges.draft
    const Icon = badge.icon
    return (
      <span className={`${badge.color} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}>
        <Icon className="w-3 h-3" />
        <span>{badge.text}</span>
      </span>
    )
  }

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
      ))}
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Testimonials Management</h1>
          <p className="text-gray-400 mt-1">Manage client testimonials and reviews</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{testimonials.length}</div>
            <div className="text-gray-400 text-sm">Total Testimonials</div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{testimonials.filter(t => t.status === 'published').length}</div>
            <div className="text-gray-400 text-sm">Published</div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{testimonials.filter(t => t.status === 'pending').length}</div>
            <div className="text-gray-400 text-sm">Pending Review</div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">{testimonials.filter(t => t.featured).length}</div>
            <div className="text-gray-400 text-sm">Featured</div>
          </div>
        </Card>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {filteredTestimonials.map((testimonial) => {
          const tId = testimonial._id || testimonial.id
          return (
            <Card key={tId} className="bg-gray-900 border-gray-700 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-2 border-purple-400 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full border-2 border-purple-400 bg-purple-900 flex items-center justify-center text-xl font-bold text-white">
                      {testimonial.name?.charAt(0)}
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                      {testimonial.featured && (
                        <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">Featured</span>
                      )}
                      {getStatusBadge(testimonial.status)}
                    </div>
                    <p className="text-purple-400 font-medium">{testimonial.position || testimonial.role}</p>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                    <div className="flex items-center space-x-3 mt-2 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    <blockquote className="text-gray-300 italic">
                      &quot;{testimonial.text}&quot;
                    </blockquote>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {testimonial.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(testimonial, 'published')}
                      className="flex items-center space-x-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </Button>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTestimonial(testimonial)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredTestimonials.length === 0 && (
        <Card className="bg-gray-900 border-gray-700 p-12 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No testimonials found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery || filterRating !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your filters or search query'
              : 'Get started by adding your first testimonial'}
          </p>
          <Button onClick={handleAdd}>Add Testimonial</Button>
        </Card>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-gray-900 border-gray-700 w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                    <input
                      type="text" name="name" value={testimonialForm.name}
                      onChange={handleTestimonialFormChange} required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                    <input
                      type="text" name="company" value={testimonialForm.company}
                      onChange={handleTestimonialFormChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role/Position</label>
                  <input
                    type="text" name="position" value={testimonialForm.position}
                    onChange={handleTestimonialFormChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="Job title or role"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Testimonial Text *</label>
                  <textarea
                    name="text" value={testimonialForm.text}
                    onChange={handleTestimonialFormChange} rows={4} required
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    placeholder="Testimonial content"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                    <select
                      name="rating" value={testimonialForm.rating}
                      onChange={handleTestimonialFormChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Avatar URL</label>
                    <input
                      type="url" name="avatar" value={testimonialForm.avatar}
                      onChange={handleTestimonialFormChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox" name="featured" checked={testimonialForm.featured}
                      onChange={handleTestimonialFormChange}
                      className="rounded bg-gray-800 border-gray-700 text-purple-600"
                    />
                    <span className="text-gray-300">Featured Testimonial</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => { setShowModal(false); setEditingTestimonial(null) }}
                >
                  Cancel
                </Button>
                <Button onClick={handleTestimonialSubmit}>
                  {editingTestimonial ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}