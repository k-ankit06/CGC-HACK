// utils/api.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.touristsafety.example.com';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('touristSafetyToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('touristSafetyToken');
        window.location.href = '/login';
      }
      return Promise.reject(error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      return Promise.reject(new Error('Request setup error. Please try again.'));
    }
  }
);

// Auth API calls
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  refreshToken: () => api.post('/auth/refresh-token'),
  logout: () => api.post('/auth/logout'),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
};

// Tourist API calls
export const touristApi = {
  getProfile: () => api.get('/tourist/profile'),
  updateProfile: (profileData) => api.put('/tourist/profile', profileData),
  getTouristCard: () => api.get('/tourist/card'),
  updateTouristCard: (cardData) => api.put('/tourist/card', cardData),
  getSafeRoutes: (location) => api.get('/tourist/safe-routes', { params: { location } }),
  getSafetyInfo: (location) => api.get('/tourist/safety-info', { params: { location } }),
  getEmergencyContacts: () => api.get('/tourist/emergency-contacts'),
  getTravelGuide: (location) => api.get('/tourist/travel-guide', { params: { location } }),
  getLanguageTranslations: (text, targetLanguage) => api.post('/tourist/translate', { text, targetLanguage }),
  getRegistrationStatus: () => api.get('/tourist/registration-status'),
  completeRegistration: (registrationData) => api.post('/tourist/complete-registration', registrationData),
};

// Authority API calls
export const authorityApi = {
  getDashboardStats: () => api.get('/authority/dashboard-stats'),
  getRiskAssessment: (location) => api.get('/authority/risk-assessment', { params: { location } }),
  updateRiskAssessment: (assessmentData) => api.put('/authority/risk-assessment', assessmentData),
  getIncidentReports: (filters) => api.get('/authority/incidents', { params: filters }),
  createIncidentReport: (incidentData) => api.post('/authority/incidents', incidentData),
  updateIncidentReport: (id, incidentData) => api.put(`/authority/incidents/${id}`, incidentData),
  getEmergencyResponseTeams: () => api.get('/authority/response-teams'),
  createResponseTeam: (teamData) => api.post('/authority/response-teams', teamData),
  updateResponseTeam: (id, teamData) => api.put(`/authority/response-teams/${id}`, teamData),
  getTouristMonitoringData: (filters) => api.get('/authority/tourist-monitoring', { params: filters }),
  getSmartIDSystemData: () => api.get('/authority/smart-id-system'),
  getAnalyticsData: (filters) => api.get('/authority/analytics', { params: filters }),
};

// Location API calls
export const locationApi = {
  getCurrentLocation: () => api.get('/location/current'),
  getLocationSafetyScore: (location) => api.get('/location/safety-score', { params: { location } }),
  getSafeRoutes: (location) => api.get('/location/safe-routes', { params: { location } }),
  getNearbyServices: (location, serviceType) => api.get('/location/nearby-services', { params: { location, serviceType } }),
  getWeatherData: (location) => api.get('/location/weather', { params: { location } }),
  getAirQuality: (location) => api.get('/location/air-quality', { params: { location } }),
  getCrowdDensity: (location) => api.get('/location/crowd-density', { params: { location } }),
};

// Emergency API calls
export const emergencyApi = {
  createEmergencyRequest: (requestData) => api.post('/emergency/requests', requestData),
  getEmergencyRequests: (filters) => api.get('/emergency/requests', { params: filters }),
  updateEmergencyRequest: (id, requestData) => api.put(`/emergency/requests/${id}`, requestData),
  getEmergencyContacts: () => api.get('/emergency/contacts'),
  getEmergencyProtocols: (incidentType) => api.get('/emergency/protocols', { params: { incidentType } }),
  getEmergencyResources: (location) => api.get('/emergency/resources', { params: { location } }),
};

// Utility functions
export const apiUtils = {
  handleApiError: (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.status, error.response.data);
      return error.response.data.message || 'An error occurred while processing your request.';
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error: No response received', error.request);
      return 'Network error. Please check your connection and try again.';
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
      return 'An unexpected error occurred. Please try again later.';
    }
  },

  formatApiError: (error) => {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message || 'An error occurred',
        details: error.response.data.details || null,
      };
    } else if (error.request) {
      return {
        status: 0,
        message: 'Network error. Please check your connection.',
        details: null,
      };
    } else {
      return {
        status: 0,
        message: 'An unexpected error occurred. Please try again later.',
        details: error.message,
      };
    }
  },

  isApiError: (error) => {
    return error && (error.response || error.request);
  },

  getErrorMessage: (error) => {
    if (error.response) {
      return error.response.data.message || 'An error occurred';
    } else if (error.request) {
      return 'Network error. Please check your connection.';
    } else {
      return error.message || 'An unexpected error occurred';
    }
  },
};

// Export the axios instance for direct use if needed
export default api;