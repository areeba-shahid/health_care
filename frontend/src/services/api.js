import axios from "axios";

const API = axios.create({
  // Use relative path '/api' in production so it points to the Render URL
  // Use 'http://localhost:5000/api' only during local development
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:5000/api",
});

// Add token to requests
API.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

export default API;
