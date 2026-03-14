/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format time ago (e.g. "2 hours ago")
 */
export const formatTimeAgo = (date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now - new Date(date)) / (1000 * 60))
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hours ago`
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} days ago`
}

/**
 * Truncate text to a given length
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Parse a comma-separated string into a trimmed array
 */
export const parseCommaSeparated = (str) => {
  if (!str) return []
  return str.split(',').map((s) => s.trim()).filter(Boolean)
}

/**
 * Convert array to comma-separated string
 */
export const arrayToCommaSeparated = (arr) => {
  if (!Array.isArray(arr)) return ''
  return arr.join(', ')
}

/**
 * Get YouTube embed URL from various YouTube URL formats
 */
export const getYouTubeEmbedUrl = (url) => {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

/**
 * Get Vimeo embed URL
 */
export const getVimeoEmbedUrl = (url) => {
  if (!url) return null
  const match = url.match(/vimeo\.com\/(\d+)/)
  return match ? `https://player.vimeo.com/video/${match[1]}` : null
}

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Clamp a number between min and max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * Debounce a function
 */
export const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
