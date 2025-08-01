import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

import { STORAGE_KEYS } from '../constants'

export const axiosInstance = axios.create()

const setupConfig = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(STORAGE_KEYS.token)
  config.headers.authorization = `Bearer ${token ?? ''}`
  config.baseURL = process.env.REACT_APP_API_URL

  return config
}

axiosInstance.interceptors.request.use(setupConfig)
