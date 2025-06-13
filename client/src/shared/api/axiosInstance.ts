import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

import { STORAGE_KEYS } from '../constants'

export const axiosInstance = axios.create()

const API_TOKEN = ''

const setupConfig = (config: InternalAxiosRequestConfig) => {
  config.headers.authorization = `Token ${API_TOKEN}`

  return config
}

axiosInstance.interceptors.request.use(setupConfig)
