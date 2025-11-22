// types/index.ts

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

export interface Project {
  _id: string
  title: string
  description: string
  image: string
  githubLink?: string
  liveLink?: string
  techStack?: string[] | string
  link?: string              // ✅ added for project-form.tsx
  createdAt: string
  updatedAt: string
}

// Matches backend: { success, message, token }
export interface LoginResponse {
  success: boolean
  message: string
  token: string
}

// optional, if used elsewhere
export interface AuthTokens {
  access_token: string
  token_type: string
}

export interface Analytics {
  totalProjects: number
  totalBlogs: number
  totalMessages: number
  totalTestimonials: number
  pageViews: number
}

// Blog
export interface Blog {
  _id: string
  title: string
  slug: string
  content: string
  description?: string   // already added
  author?: string        // already added
  excerpt?: string
  image?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

// Testimonial
export interface Testimonial {
  _id: string
  name: string
  role?: string
  company?: string
  message: string
  rating?: number
  position?: string      // ✅ for testimonial-form.tsx
  image?: string         // ✅ for testimonial-form.tsx (photo/avatar)
  createdAt: string
  updatedAt: string
}

// Contact message
export interface Message {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  isRead?: boolean
  createdAt: string
  updatedAt?: string
}
