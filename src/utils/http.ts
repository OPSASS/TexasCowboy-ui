import { Notification } from '@/components/AppRedux/AppRedux'
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const html = axios.create({
  baseURL: import.meta.env.VITE_SERVICE_ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const setAccessToken = (token: string | null) => {
  if (token) {
    html.defaults.headers.common['authorization'] = `Bearer ${token}`
    localStorage.setItem('accdfw2qyb13a4', token)
  } else {
    delete html.defaults.headers.common['authorization']
    localStorage.removeItem('accdfw2qyb13a4')
  }
}

// Hàm để thực hiện refresh token
const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('rff636edtg7rf1')
    const response = await html.get('/auth/refresh-token?token=' + refreshToken)
    const { accessToken, refreshToken: newRefreshToken } = response.data
    setAccessToken(accessToken)
    localStorage.setItem('rff636edtg7rf1', newRefreshToken)
    return accessToken
  } catch (error) {
    console.error('Failed to refresh token', error)
    return null
  }
}

// Intercept trước khi gửi request
html.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accdfw2qyb13a4')

    // Thêm token vào header nếu có
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken.replace(/"/g, '')}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercept sau khi nhận response
html.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401) {
      if (error.response.data.name === 'JsonWebTokenError') {
        try {
          const newAccessToken = await refreshToken()

          if (newAccessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken.replace(/"/g, '')}`
            return html(originalRequest)
          }
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }
    }

    if (error.response && error.response.data) {
      Notification(
        error.response.status >= 400 ? 'error' : 'warning',
        error.response.data.message || error.response.data.errorMessage,
        error.response.data.type || error.response.data.errorType
      )

      return Promise.reject(error.response.data)
    }

    return Promise.reject(error)
  }
)
export default html
