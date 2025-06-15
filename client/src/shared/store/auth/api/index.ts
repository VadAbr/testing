import { apiSlice, axiosInstance } from '@shared/api'
import { STORAGE_KEYS } from '@shared/constants'
import { AuthSlice } from '@shared/store'

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

type Response = {
  token: string
  isAdmin: boolean
  userInfo: {
    id: string
    email: string
    name: string
  }
}

const PATHS = {
  login: 'auth/login',
  register: 'auth/register',
  tryAuth: 'auth/tryAuth',
}

export const AuthApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<Response, LoginArgs>({
      queryFn: async (creds, api) => {
        try {
          const data = await axiosInstance
            .post<Response>(PATHS.login, creds)
            .then(data => data.data)
          localStorage.setItem(STORAGE_KEYS.token, data.token)

          api.dispatch(AuthSlice.actions.setUser(data.userInfo))
          api.dispatch(AuthSlice.actions.setIsAdmin(data.isAdmin))

          return {
            data,
          }
        } catch (error) {
          return {
            error,
          }
        }
      },
    }),
    register: build.mutation<Response, RegisterArgs>({
      queryFn: async (newUser, api) => {
        try {
          const data = await axiosInstance
            .post<Response>(PATHS.register, newUser)
            .then(data => data.data)
          localStorage.setItem(STORAGE_KEYS.token, data.token)

          api.dispatch(AuthSlice.actions.setUser(data.userInfo))
          api.dispatch(AuthSlice.actions.setIsAdmin(data.isAdmin))

          return {
            data,
          }
        } catch (error) {
          return {
            error,
          }
        }
      },
    }),

    tryAuth: build.query<Response, void>({
      queryFn: async (_, api) => {
        try {
          const data = await axiosInstance.get<Response>(PATHS.tryAuth).then(data => data.data)
          localStorage.setItem(STORAGE_KEYS.token, data.token)

          api.dispatch(AuthSlice.actions.setUser(data.userInfo))
          api.dispatch(AuthSlice.actions.setIsAdmin(data.isAdmin))

          return {
            data,
          }
        } catch (error) {
          return {
            error,
            meta: {
              isMessageDisabled: true,
            },
          }
        }
      },
    }),
  }),
})
