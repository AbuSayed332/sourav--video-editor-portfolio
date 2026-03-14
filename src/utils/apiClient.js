// API Client for NestJS backend with API key authentication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1'

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  // Get admin API key from env (for protected endpoints)
  getApiKey() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_api_key') || process.env.NEXT_PUBLIC_ADMIN_API_KEY || ''
    }
    return process.env.NEXT_PUBLIC_ADMIN_API_KEY || ''
  }

  // Get auth token from localStorage
  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token')
    }
    return null
  }

  // Helper method to make requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const token = this.getAuthToken()
    const apiKey = this.getApiKey()

    const config = {
      headers: {
        ...this.defaultHeaders,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(apiKey && { 'x-api-key': apiKey }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      let data
      const contentType = response.headers.get('content-type')

      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        data = await response.text()
      }

      if (!response.ok) {
        const error = new Error()
        error.status = response.status
        error.statusText = response.statusText

        if (data && typeof data === 'object') {
          error.message = Array.isArray(data.message)
            ? data.message.join(', ')
            : data.message || data.error || `HTTP ${response.status}`
          error.details = data
        } else {
          error.message = data || `HTTP ${response.status}`
        }

        throw error
      }

      return data
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`API request failed: ${config.method || 'GET'} ${url}`, error)
      }

      if (error.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_data')
        if (!error.message?.toLowerCase().includes('auth')) {
          error.message = 'Authentication required. Please login again.'
        }
      }

      throw error
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null))
    ).toString()
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    return this.request(url, { method: 'GET' })
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  // Portfolio API methods
  async getPortfolioItems(type = null) {
    const endpoint = type ? `/portfolio/type/${type}` : '/portfolio'
    return this.get(endpoint)
  }
  async getFeaturedPortfolio() { return this.get('/portfolio/featured') }
  async getPortfolioByCategory(category) { return this.get(`/portfolio/category/${category}`) }
  async getPortfolioById(id) { return this.get(`/portfolio/${id}`) }
  async createPortfolioItem(data) { return this.post('/portfolio', data) }
  async updatePortfolioItem(id, data) { return this.patch(`/portfolio/${id}`, data) }
  async deletePortfolioItem(id) { return this.delete(`/portfolio/${id}`) }

  // Testimonials API methods
  async getTestimonials() { return this.get('/testimonials') }
  async getFeaturedTestimonials() { return this.get('/testimonials/featured') }
  async getTestimonialsByRating(minRating = 5) { return this.get('/testimonials/rating', { min: minRating }) }
  async getTestimonialById(id) { return this.get(`/testimonials/${id}`) }
  async createTestimonial(data) { return this.post('/testimonials', data) }
  async updateTestimonial(id, data) { return this.patch(`/testimonials/${id}`, data) }
  async deleteTestimonial(id) { return this.delete(`/testimonials/${id}`) }

  // Skills API methods
  async getSkills() { return this.get('/skills') }
  async getTopSkills(limit = 10) { return this.get('/skills/top', { limit }) }
  async getSkillsByCategory(category) { return this.get(`/skills/category/${category}`) }
  async getSkillById(id) { return this.get(`/skills/${id}`) }
  async createSkill(data) { return this.post('/skills', data) }
  async updateSkill(id, data) { return this.patch(`/skills/${id}`, data) }
  async deleteSkill(id) { return this.delete(`/skills/${id}`) }

  // Contact API methods
  async sendContactMessage(data) { return this.post('/contact', data) }

  // Profile API methods
  async getProfile() { return this.get('/profile') }
  async updateProfile(data) { return this.patch('/profile', data) }
  async seedProfile() { return this.post('/profile/seed') }

  // Auth methods
  async login(email, password) { return this.post('/auth/login', { email, password }) }
  async register(userData) { return this.post('/auth/register', userData) }
  async logout() { return this.post('/auth/logout') }
  async getAuthProfile() { return this.get('/auth/profile') }
  async forgotPassword(email) { return this.post('/auth/forgot-password', { email }) }
  async resetPassword(token, password) { return this.post('/auth/reset-password', { token, password }) }
}

// Singleton instance
const apiClient = new ApiClient()
export default apiClient

export const portfolioApi = {
  getAll: (type) => apiClient.getPortfolioItems(type),
  getFeatured: () => apiClient.getFeaturedPortfolio(),
  getByCategory: (category) => apiClient.getPortfolioByCategory(category),
  getById: (id) => apiClient.getPortfolioById(id),
  create: (data) => apiClient.createPortfolioItem(data),
  update: (id, data) => apiClient.updatePortfolioItem(id, data),
  delete: (id) => apiClient.deletePortfolioItem(id),
}

export const testimonialsApi = {
  getAll: () => apiClient.getTestimonials(),
  getFeatured: () => apiClient.getFeaturedTestimonials(),
  getByRating: (rating) => apiClient.getTestimonialsByRating(rating),
  getById: (id) => apiClient.getTestimonialById(id),
  create: (data) => apiClient.createTestimonial(data),
  update: (id, data) => apiClient.updateTestimonial(id, data),
  delete: (id) => apiClient.deleteTestimonial(id),
}

export const skillsApi = {
  getAll: () => apiClient.getSkills(),
  getTop: (limit) => apiClient.getTopSkills(limit),
  getByCategory: (category) => apiClient.getSkillsByCategory(category),
  getById: (id) => apiClient.getSkillById(id),
  create: (data) => apiClient.createSkill(data),
  update: (id, data) => apiClient.updateSkill(id, data),
  delete: (id) => apiClient.deleteSkill(id),
}

export const contactApi = {
  send: (data) => apiClient.sendContactMessage(data),
}

export const profileApi = {
  get: () => apiClient.getProfile(),
  update: (data) => apiClient.updateProfile(data),
  seed: () => apiClient.seedProfile(),
}

export const authApi = {
  login: (email, password) => apiClient.login(email, password),
  register: (userData) => apiClient.register(userData),
  logout: () => apiClient.logout(),
  getProfile: () => apiClient.getAuthProfile(),
  forgotPassword: (email) => apiClient.forgotPassword(email),
  resetPassword: (token, password) => apiClient.resetPassword(token, password),
}
