const API_BASE = '/api/v1';

/**
 * Universal request wrapper with authorization and error handling
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('student_hub_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && endpoint !== '/auth/login' && endpoint !== '/auth/register') {
      localStorage.removeItem('student_hub_token');
      localStorage.removeItem('student_hub_user');
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    const errorMsg = data.error || data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Authentication
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getMe: () => request('/auth/me'),

  logout: () =>
    request('/auth/logout', { method: 'POST' }).finally(() => {
      localStorage.removeItem('student_hub_token');
      localStorage.removeItem('student_hub_user');
    }),

  changePassword: (passwords) =>
    request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwords),
    }),

  forgotPassword: (email) =>
    request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  // Dashboard
  getDashboardStats: () => request('/dashboard/stats'),
  getStudyHours: (period = 'week') => request(`/dashboard/study-hours?period=${period}`),
  getPerformanceTrends: () => request('/dashboard/performance'),
  getDashboardOverview: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/dashboard/overview${query ? `?${query}` : ''}`);
  },

  // Courses
  getCourses: () => request('/courses'),
  getCourseById: (id) => request(`/courses/${id}`),
  enrollCourse: (id) => request(`/courses/${id}/enroll`, { method: 'POST' }),

  // Assignments
  getAssignments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/assignments${query ? `?${query}` : ''}`);
  },
  getAssignmentById: (id) => request(`/assignments/${id}`),
  updateAssignmentStatus: (id, status) =>
    request(`/assignments/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  submitAssignment: (id, data) =>
    request(`/assignments/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Grades
  getGrades: () => request('/grades'),

  // Calendar & Events
  getEvents: () => request('/events'),
  createEvent: (eventData) =>
    request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),
  deleteEvent: (id) => request(`/events/${id}`, { method: 'DELETE' }),

  // Notifications
  getNotifications: () => request('/notifications'),
  markNotificationRead: (id) => request(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllNotificationsRead: () => request('/notifications/read-all', { method: 'PATCH' }),

  // Profile
  getProfile: () => request('/profile'),
  updateProfile: (profileData) =>
    request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  // Chat
  getMessages: () => request('/chat/messages'),
  sendMessage: (msg) =>
    request('/chat/messages', {
      method: 'POST',
      body: JSON.stringify(msg),
    }),
};

export default api;
