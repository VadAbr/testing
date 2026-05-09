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

    exportAllTest: build.mutation<void, void>({
      queryFn: async () => {
        try {
          const response = await axiosInstance.get(ApiPath.exportAllTest, {
            responseType: 'blob',
          })

          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `tests_export_${Date.now()}.xlsx`)
          document.body.appendChild(link)
          link.click()
          link.remove()
          window.URL.revokeObjectURL(url)

          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
    }),
  }),
})
