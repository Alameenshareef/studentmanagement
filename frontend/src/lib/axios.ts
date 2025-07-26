import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

const apiKeyInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": API_KEY,
  },
})

const bearerInstance = axios.create({
  baseURL: BASE_URL,
})

bearerInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { apiKeyInstance, bearerInstance }
