import axios from 'axios'
import type { AxiosError } from 'axios'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

const router = useRouter()
const token = Cookies.get('token') || undefined

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
})

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data)
      if (error.response.status === 401) {
        // Token expired → redirect to login
        router.push('/login')
      }
    } else if (error.request) {
      console.error('Network Error:', error.message)
    }
    return Promise.reject(error)
  },
)

export default apiClient
