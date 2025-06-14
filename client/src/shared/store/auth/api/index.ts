import { apiSlice, axiosInstance } from '@shared/api'
import { STORAGE_KEYS } from '@shared/constants'

type LoginArgs = {
  password: string
  email: string
}

type RegisterArgs = {
  name: string
  password: string
  age: number
  email: string
  workExperience: number
  position: string
  isSatisfied: boolean
}

const PATHS = {
  login: '/login',
  register: '/register',
}

export const AuthApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<string, LoginArgs>({
      queryFn: async creds => {
        try {
          const token = await axiosInstance.post<string>(PATHS.login, creds).then(data => data.data)
          localStorage.setItem(STORAGE_KEYS.token, token)

          return {
            data: token,
          }
        } catch (error) {
          return {
            error,
          }
        }
      },
    }),
    register: build.mutation<string, RegisterArgs>({
      queryFn: async newUser => {
        try {
          const token = await axiosInstance
            .post<string>(PATHS.register, newUser)
            .then(data => data.data)
          localStorage.setItem(STORAGE_KEYS.token, token)

          return {
            data: token,
          }
        } catch (error) {
          return {
            error,
          }
        }
      },
    }),
  }),
})
