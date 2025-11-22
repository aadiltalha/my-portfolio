// src/utils/api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; // ✅ Removed localhost fallback

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // enable if you ever need cookies
});

/**
 * Download resume helper — opens resume in new tab (download)
 */
export function downloadResume() {
  const url = `${BASE_URL}/resume/resume.pdf`;
  window.open(url, "_blank");
}

/**
 * Public API wrappers
 */
export const getProjects = () => api.get("/projects");
export const getBlogs = () => api.get("/blogs");
export const getTestimonials = () => api.get("/testimonials");
export const postContact = (payload) => api.post("/contact", payload);

export default api;
