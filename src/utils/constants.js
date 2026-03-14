export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1'

export const PORTFOLIO_TYPES = {
  VIDEO: 'video',
  GRAPHICS: 'graphics',
}

export const SKILL_CATEGORIES = {
  TECHNICAL: 'Technical Skills',
  VIDEO_EDITING: 'Video Editing',
  MOTION_GRAPHICS: 'Motion Graphics',
  CREATIVE: 'Creative Skills',
  GRAPHICS: 'Graphics',
  WORKFLOW: 'Workflow Skills',
  AUDIO: 'Audio',
}

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
}

export const TESTIMONIAL_STATUS = {
  PUBLISHED: 'published',
  PENDING: 'pending',
  DRAFT: 'draft',
}

export const PORTFOLIO_CATEGORIES = [
  'Commercial',
  'Music Video',
  'Documentary',
  'Motion Graphics',
  'Social Media',
  'Educational',
  '3D Graphics',
  'UI/UX',
  'Event',
  'Wedding',
  'Travel',
]
