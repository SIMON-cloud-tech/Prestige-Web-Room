const API_BASE = '/api';

export const api = {
  // Projects
  getProjects: () => fetch(`${API_BASE}/projects`).then(res => res.json()),
  getProject: (slug) => fetch(`${API_BASE}/projects/${slug}`).then(res => res.json()),
  getFeaturedProjects: () => fetch(`${API_BASE}/projects/featured`).then(res => res.json()),
};