import axios from 'axios';

// Create an axios instance with predefined configurations
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',  // Base URL for the API
  timeout: 5000,  // Timeout setting for requests
  headers: {
    // Set Authorization header if auth tokens are available in localStorage
    'Authorization': localStorage.getItem('authTokens')
      ? 'Bearer ' + JSON.parse(localStorage.getItem('authTokens')).access
      : null,
    'Content-Type': 'application/json',  // Content type for requests
    'accept': 'application/json',  // Accept header for responses
  },
});

// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  response => response,  // Pass through successful responses
  async error => {
    const originalRequest = error.config;  // Capture the original request

    // Check if the error is due to unauthorized status
    if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
      // Retrieve the refresh token from localStorage
      const refreshToken = JSON.parse(localStorage.getItem('authTokens')).refresh;
      if (refreshToken) {
        try {
          // Request new tokens using the refresh token
          const tokenResponse = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
          
          // Store the new tokens in localStorage
          localStorage.setItem('authTokens', JSON.stringify(tokenResponse.data));
          
          // Update Authorization header with the new access token
          axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + tokenResponse.data.access;
          originalRequest.headers['Authorization'] = 'Bearer ' + tokenResponse.data.access;
          
          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        } catch (tokenError) {
          // Handle refresh token errors (optional)
          console.error('Token refresh failed:', tokenError);
        }
      }
    }

    // Reject the promise with the error
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default axiosInstance;
