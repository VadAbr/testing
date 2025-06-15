import { apiSlice, axiosInstance } from '@shared/api'
// eslint-disable-next-line import/no-internal-modules
import type { TestResult } from '@widgets/test/model'

import { ApiPath } from './apiPath'
import type { CompleteTestResponse, GetAllTestsResponse, GetTestResponse } from './types'

export const TestApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getCurrentTest: build.query<GetTestResponse, void>({
      queryFn: async () => {
        try {
          const data = await axiosInstance
            .get<GetTestResponse>(ApiPath.currentTest)
            .then(res => res.data)

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
    completeTest: build.mutation<CompleteTestResponse, { testId: string; testResult: TestResult }>({
      queryFn: async ({ testId, testResult }) => {
        try {
          const data = await axiosInstance
            .post<CompleteTestResponse>(ApiPath.completeTest, {
              testId,
              testResult,
            })
            .then(res => res.data)

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
    createFreeTest: build.mutation<string, void>({
      queryFn: async () => {
        try {
          const data = await axiosInstance.post<string>(ApiPath.createTest).then(res => res.data)

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
    askForHelp: build.mutation<boolean, { testId: string }>({
      queryFn: async ({ testId }) => {
        try {
          const data = await axiosInstance
            .post<boolean>(ApiPath.askForHelp, {
              testId,
            })
            .then(res => res.data)

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
    getAllTest: build.query<GetAllTestsResponse, void>({
      queryFn: async () => {
        try {
          const data = await axiosInstance
            .get<GetAllTestsResponse>(ApiPath.getAllTests)
            .then(res => res.data)

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
  }),
})
