'use client'
import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Eye, Upload, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import RoleGuard from '../../components/auth/RoleGuard'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

export default function AdminPortfolio() {
  const { token, hasRole, hasPermission } = useAuth()
  const [portfolioItems, setPortfolioItems] = useState({ video: [], graphics: [] })
  const [filteredItems, setFilteredItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: 'video',
    thumbnail: '',
    videoUrl: '',
    description: '',
    client: '',
    duration: '',
    tags: '',
    year: new Date().getFullYear(),
    software: '',
    featured: false
  })

  // API call with authorization — handles empty responses (e.g. DELETE 204)
  const apiCall = async (endpoint, options = {}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || token || '',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const text = await response.text()
    return text ? JSON.parse(text) : {}
  }

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [portfolioItems, searchQuery, filterType, filterCategory])

  const fetchPortfolioItems = async () => {
    try {
      setLoading(true)
      const data = await apiCall('/portfolio')
      setPortfolioItems(data)
    } catch (error) {
      console.error('Error fetching portfolio items:', error)
      setPortfolioItems({
        video: [
          {
            _id: '1',
            title: "Corporate Brand Video",
            category: "Commercial",
            type: "video",
            thumbnail: "/images/portfolio/video (1).png",
            videoUrl: "https://youtu.be/w2sF4IqGY04",
            description: "A dynamic corporate brand video showcasing company values and culture.",
            client: "TechCorp Solutions",
            duration: "2:30",
            tags: ["Motion Graphics", "Corporate", "Brand Identity"],
            year: "2024",
            software: ["After Effects", "Premiere Pro", "Photoshop"],
            featured: true
          }
        ],
        graphics: [
          {
            _id: '7',
            title: "Animated Logo Design",
            category: "Motion Graphics",
            type: "graphics",
            thumbnail: "/images/portfolio/graph (1).png",
            videoUrl: "https://vimeo.com/789012345",
            description: "Sleek animated logo reveal with particle effects.",
            client: "StartupX",
            duration: "0:15",
            tags: ["Logo Animation", "2D Animation", "Brand Identity"],
            year: "2023",
            software: ["After Effects", "Illustrator"],
            featured: false
          }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    const allItems = [...(portfolioItems.video || []), ...(portfolioItems.graphics || [])]

    const filtered = allItems.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType =
        filterType === 'all' ||
        (filterType === 'video' && item.type === 'video') ||
        (filterType === 'graphics' && item.type === 'graphics')

      const matchesCategory =
        filterCategory === 'all' ||
        item.category.toLowerCase() === filterCategory.toLowerCase()

      return matchesSearch && matchesType && matchesCategory
    })

    setFilteredItems(filtered)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const itemData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        software: formData.software.split(',').map(sw => sw.trim()).filter(sw => sw)
      }

      if (editingItem) {
        // FIX: use _id (MongoDB) with fallback to id
        const itemId = editingItem._id || editingItem.id
        await apiCall(`/portfolio/${itemId}`, {
          method: 'PATCH',
          body: JSON.stringify(itemData),
        })
      } else {
        await apiCall('/portfolio', {
          method: 'POST',
          body: JSON.stringify(itemData),
        })
      }

      await fetchPortfolioItems()
      handleCloseModal()
    } catch (error) {
      console.error('Error saving portfolio item:', error)
      alert('Error saving item. Please try again.')
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item) // store full item so _id is available in handleSubmit
    setFormData({
      title: item.title || '',
      category: item.category || '',
      type: item.type || 'video',
      thumbnail: item.thumbnail || '',
      videoUrl: item.videoUrl || '',
      description: item.description || '',
      client: item.client || '',
      duration: item.duration || '',
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '',
      year: item.year || new Date().getFullYear(),
      software: Array.isArray(item.software) ? item.software.join(', ') : item.software || '',
      featured: item.featured || false
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await apiCall(`/portfolio/${id}`, { method: 'DELETE' })
        await fetchPortfolioItems()
      } catch (error) {
        console.error('Error deleting item:', error)
        alert('Error deleting item. Please try again.')
      }
    }
  }

  const handleAdd = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      category: '',
      type: 'video',
      thumbnail: '',
      videoUrl: '',
      description: '',
      client: '',
      duration: '',
      tags: '',
      year: new Date().getFullYear(),
      software: '',
      featured: false
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
  }

  const categories = [
    'all', 'commercial', 'music video', 'documentary', 'motion graphics',
    'social media', 'educational', '3d graphics', 'ui/ux', 'event', 'wedding', 'travel'
  ]

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
          <h1 className="text-3xl font-bold text-white">Portfolio Management</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio items, videos, and graphics</p>
        </div>

        <RoleGuard requiredRole="editor" requiredPermission="portfolio:create">
          <Button onClick={handleAdd} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </Button>
        </RoleGuard>
      </div>

      {/* Filters */}
      <Card className="bg-gray-900 border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search portfolio items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="all">All Types</option>
            <option value="video">Video</option>
            <option value="graphics">Graphics</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {(portfolioItems.video?.length || 0) + (portfolioItems.graphics?.length || 0)}
            </div>
            <div className="text-gray-400 text-sm">Total Items</div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">{portfolioItems.video?.length || 0}</div>
            <div className="text-gray-400 text-sm">Video Projects</div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{portfolioItems.graphics?.length || 0}</div>
            <div className="text-gray-400 text-sm">Graphics Projects</div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-700 p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {filteredItems.filter(item => item.featured).length}
            </div>
            <div className="text-gray-400 text-sm">Featured Items</div>
          </div>
        </Card>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const itemId = item._id || item.id
          return (
            <Card key={itemId} className="bg-gray-900 border-gray-700 overflow-hidden">
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                {item.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4">
                  <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {item.category}
                  </span>
                </div>

                {item.duration && (
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                      {item.duration}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{item.description}</p>

                {item.client && (
                  <p className="text-purple-400 text-sm mb-4">Client: {item.client}</p>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <RoleGuard requiredRole="editor" requiredPermission="portfolio:update">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </RoleGuard>

                    <RoleGuard requiredRole="admin" requiredPermission="portfolio:delete">
                      <button
                        onClick={() => handleDelete(itemId)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </RoleGuard>

                    <button
                      onClick={() => window.open(item.videoUrl, '_blank')}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-gray-500 text-sm">{item.year}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card className="bg-gray-900 border-gray-700 p-12 text-center">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No portfolio items found</h3>
          <p className="text-gray-400 mb-6">
            {searchQuery || filterType !== 'all' || filterCategory !== 'all'
              ? 'Try adjusting your filters or search query'
              : 'Get started by adding your first portfolio item'
            }
          </p>
          <RoleGuard requiredRole="editor" requiredPermission="portfolio:create">
            <Button onClick={handleAdd}>Add Portfolio Item</Button>
          </RoleGuard>
        </Card>
      )}

      {/* Modal */}
      {showModal && (
        <RoleGuard
          requiredRole="editor"
          requiredPermission={editingItem ? "portfolio:update" : "portfolio:create"}
          fallback={
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="bg-gray-900 border-gray-700 w-full max-w-md">
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Access Denied</h3>
                  <p className="text-gray-400 mb-6">You don't have permission to {editingItem ? 'edit' : 'create'} portfolio items.</p>
                  <Button onClick={handleCloseModal}>Close</Button>
                </div>
              </Card>
            </div>
          }
        >
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-gray-900 border-gray-700 w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                  </h3>
                  <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                      <input
                        type="text" name="title" value={formData.title} onChange={handleInputChange} required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Project title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Client</label>
                      <input
                        type="text" name="client" value={formData.client} onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Client name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                    <textarea
                      name="description" value={formData.description} onChange={handleInputChange} required rows={4}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Project description"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Type *</label>
                      <select
                        name="type" value={formData.type} onChange={handleInputChange} required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      >
                        <option value="video">Video</option>
                        <option value="graphics">Graphics</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                      <select
                        name="category" value={formData.category} onChange={handleInputChange} required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      >
                        <option value="">Select Category</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Music Video">Music Video</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Motion Graphics">Motion Graphics</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Educational">Educational</option>
                        <option value="3D Graphics">3D Graphics</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Event">Event</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Travel">Travel</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                      <input
                        type="text" name="duration" value={formData.duration} onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="e.g., 2:30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail URL</label>
                      <input
                        type="text" name="thumbnail" value={formData.thumbnail} onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Video/Project URL</label>
                      <input
                        type="text" name="videoUrl" value={formData.videoUrl} onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                      <input
                        type="text" name="tags" value={formData.tags} onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Motion Graphics, Brand Identity, 3D"
                      />
                      <p className="text-gray-500 text-sm mt-1">Separate tags with commas</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Software Used</label>
                      <input
                        type="text" name="software" value={formData.software} onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="After Effects, Premiere Pro, Photoshop"
                      />
                      <p className="text-gray-500 text-sm mt-1">Separate software with commas</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                    <input
                      type="number" name="year" value={formData.year} onChange={handleInputChange}
                      min="2020" max="2030"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange}
                        className="rounded bg-gray-800 border-gray-700 text-purple-600 focus:ring-purple-600"
                      />
                      <span className="text-gray-300">Featured Project</span>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
                    <Button type="button" variant="outline" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingItem ? 'Update Project' : 'Create Project'}
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
        </RoleGuard>
      )}
    </div>
  )
}