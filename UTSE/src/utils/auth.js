// utils/auth.js

import { authApi } from './api';

export const authUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('touristSafetyToken');
  },

  // Get user role from token
  getUserRole: () => {
    const token = localStorage.getItem('touristSafetyToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  },

  // Get user ID from token
  getUserId: () => {
    const token = localStorage.getItem('touristSafetyToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  },

  // Get user data from token
  getUserData: () => {
    const token = localStorage.getItem('touristSafetyToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        name: payload.name || null,
        iat: payload.iat,
        exp: payload.exp,
      };
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired: () => {
    const token = localStorage.getItem('touristSafetyToken');
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      console.error('Error checking token expiration:', e);
      return true;
    }
  },

  // Refresh the authentication token
  refreshToken: async () => {
    try {
      const response = await authApi.refreshToken();
      localStorage.setItem('touristSafetyToken', response.data.token);
      return response.data.token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      localStorage.removeItem('touristSafetyToken');
      throw error;
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem('touristSafetyToken', response.data.token);
      return response.data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('touristSafetyToken');
    // You might also want to clear any other user-related data
  },

  // Check if user has a specific permission
  hasPermission: (requiredPermission) => {
    const userData = authUtils.getUserData();
    if (!userData) return false;

    // In a real app, you would have a more sophisticated permission system
    // This is a simplified example
    if (userData.role === 'admin') return true;
    if (userData.role === 'authority') {
      return requiredPermission === 'view_authority_dashboard' ||
             requiredPermission === 'manage_incidents' ||
             requiredPermission === 'view_tourist_data';
    }
    if (userData.role === 'tourist') {
      return requiredPermission === 'view_tourist_dashboard' ||
             requiredPermission === 'view_safe_routes' ||
             requiredPermission === 'view_safety_info';
    }

    return false;
  },

  // Get all permissions for the current user
  getPermissions: () => {
    const userData = authUtils.getUserData();
    if (!userData) return [];

    // In a real app, you would fetch this from your API
    // This is a simplified example
    if (userData.role === 'admin') {
      return [
        'view_authority_dashboard',
        'manage_incidents',
        'view_tourist_data',
        'manage_response_teams',
        'view_analytics',
        'manage_risk_assessment'
      ];
    }
    if (userData.role === 'authority') {
      return [
        'view_authority_dashboard',
        'manage_incidents',
        'view_tourist_data',
        'manage_response_teams',
        'view_analytics'
      ];
    }
    if (userData.role === 'tourist') {
      return [
        'view_tourist_dashboard',
        'view_safe_routes',
        'view_safety_info',
        'view_emergency_help',
        'view_travel_guide'
      ];
    }

    return [];
  },

  // Check if user is an admin
  isAdmin: () => {
    const userData = authUtils.getUserData();
    return userData && userData.role === 'admin';
  },

  // Check if user is an authority
  isAuthority: () => {
    const userData = authUtils.getUserData();
    return userData && (userData.role === 'authority' || userData.role === 'admin');
  },

  // Check if user is a tourist
  isTourist: () => {
    const userData = authUtils.getUserData();
    return userData && userData.role === 'tourist';
  },

  // Get user's full name
  getUserName: () => {
    const userData = authUtils.getUserData();
    return userData?.name || 'User';
  },

  // Get user's email
  getUserEmail: () => {
    const userData = authUtils.getUserData();
    return userData?.email || null;
  },

  // Get user's profile picture URL
  getUserProfilePicture: () => {
    const userData = authUtils.getUserData();
    // In a real app, you would return the actual profile picture URL
    // This is a simplified example
    if (userData?.role === 'admin') return 'https://via.placeholder.com/150/000000/FFFFFF?text=A';
    if (userData?.role === 'authority') return 'https://via.placeholder.com/150/000000/FFFFFF?text=P';
    if (userData?.role === 'tourist') return 'https://via.placeholder.com/150/000000/FFFFFF?text=T';
    return 'https://via.placeholder.com/150/000000/FFFFFF?text=U';
  },

  // Get user's role name
  getUserRoleName: () => {
    const userData = authUtils.getUserData();
    if (userData?.role === 'admin') return 'Administrator';
    if (userData?.role === 'authority') return 'Authority';
    if (userData?.role === 'tourist') return 'Tourist';
    return 'User';
  },

  // Get user's role color
  getUserRoleColor: () => {
    const userData = authUtils.getUserData();
    if (userData?.role === 'admin') return 'bg-red-500';
    if (userData?.role === 'authority') return 'bg-blue-500';
    if (userData?.role === 'tourist') return 'bg-green-500';
    return 'bg-gray-500';
  },

  // Get user's role icon
  getUserRoleIcon: () => {
    const userData = authUtils.getUserData();
    if (userData?.role === 'admin') return 'fas fa-user-shield';
    if (userData?.role === 'authority') return 'fas fa-user-tie';
    if (userData?.role === 'tourist') return 'fas fa-user';
    return 'fas fa-user';
  },
};