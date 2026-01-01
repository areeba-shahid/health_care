import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
const api = axios.create({
  // If production, use relative path; else use local backend
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
