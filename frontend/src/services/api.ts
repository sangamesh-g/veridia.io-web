import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh_token: refreshToken,
          });
          
          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (data: {
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
    phone: string;
  }) => {
    const response = await api.post('/auth/register/', {
      ...data,
      user_type: 'applicant',
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login/', { email, password });
    if (response.data.success) {
      localStorage.setItem('access_token', response.data.data.access_token);
      localStorage.setItem('refresh_token', response.data.data.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        await api.post('/auth/logout/', { refresh_token: refreshToken });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },
};

// Applicant API
export const applicantAPI = {
  getDashboardStats: async () => {
    const response = await api.get('/applicant/dashboard/stats/');
    return response.data;
  },

  getApplications: async (params?: { status?: string; page?: number; page_size?: number }) => {
    const response = await api.get('/applicant/applications/', { params });
    return response.data;
  },

  getApplication: async (id: number) => {
    const response = await api.get(`/applicant/applications/${id}/`);
    return response.data;
  },

  submitApplication: async (formData: FormData) => {
    const response = await api.post('/applicant/applications/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  withdrawApplication: async (id: number) => {
    const response = await api.delete(`/applicant/applications/${id}/`);
    return response.data;
  },
};

// Admin API
export const adminAPI = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard/stats/');
    return response.data;
  },

  getApplications: async (params?: {
    status?: string;
    department?: string;
    position?: string;
    search?: string;
    page?: number;
    page_size?: number;
    ordering?: string;
  }) => {
    const response = await api.get('/admin/applications/', { params });
    return response.data;
  },

  getApplication: async (id: number) => {
    const response = await api.get(`/admin/applications/${id}/`);
    return response.data;
  },

  updateApplication: async (id: number, data: any) => {
    const response = await api.patch(`/admin/applications/${id}/`, data);
    return response.data;
  },

  updateApplicationStatus: async (id: number, data: {
    status: string;
    interview_date?: string;
    notes?: string;
    comment?: string;
  }) => {
    const response = await api.patch(`/admin/applications/${id}/status/`, data);
    return response.data;
  },

  deleteApplication: async (id: number) => {
    const response = await api.delete(`/admin/applications/${id}/`);
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get('/admin/analytics/');
    return response.data;
  },

  getRecentActivity: async (limit?: number) => {
    const response = await api.get('/admin/activity/', { params: { limit } });
    return response.data;
  },

  getUpcomingInterviews: async () => {
    const response = await api.get('/admin/interviews/upcoming/');
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/profile/');
    return response.data;
  },

  updateProfile: async (data: FormData | any) => {
    const headers = data instanceof FormData
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' };
    
    const response = await api.patch('/profile/', data, { headers });
    return response.data;
  },
};

// Common API
export const commonAPI = {
  getDepartments: async () => {
    const response = await api.get('/departments/');
    return response.data;
  },

  getPositions: async () => {
    const response = await api.get('/positions/');
    return response.data;
  },
};

export default api;

