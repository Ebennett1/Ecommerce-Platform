import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 5000,
  headers: {
    'Authorization': localStorage.getItem('authTokens')
      ? 'Bearer ' + JSON.parse(localStorage.getItem('authTokens')).access
      : null,
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
      const refreshToken = JSON.parse(localStorage.getItem('authTokens')).refresh;
      if (refreshToken) {
        const tokenResponse = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('authTokens', JSON.stringify(tokenResponse.data));
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + tokenResponse.data.access;
        originalRequest.headers['Authorization'] = 'Bearer ' + tokenResponse.data.access;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }

);

export default axiosInstance;
