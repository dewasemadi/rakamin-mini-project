import axios, {AxiosError, AxiosResponse} from 'axios'
import {getTokenFromLocalStorage, removeTokenFromLocalStorage} from 'utils/tokenManager'

/**
 * Axios instance config
 */
const api = axios.create({
  baseURL: 'https://todo-api-18-140-52-65.rakamin.com',
  timeout: 10 * 1000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request interceptor
 */
const onRequestSuccess = (config: any) => {
  const token = getTokenFromLocalStorage()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error)

/**
 * Response interceptor
 */
const onResponseSuccess = (response: AxiosResponse): AxiosResponse => response.data
const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response?.status === 401) removeTokenFromLocalStorage() // remove token for unauthorized user
  return Promise.reject(error.response ? error.response.data : error)
}

/**
 * Middleware
 */
api.interceptors.request.use(onRequestSuccess, onRequestError)
api.interceptors.response.use(onResponseSuccess, onResponseError)

export default api
