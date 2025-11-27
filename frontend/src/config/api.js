// API base URL configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function for API calls
export const apiCall = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
};
