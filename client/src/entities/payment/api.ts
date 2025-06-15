import { apiSlice, axiosInstance } from '@shared/api'

import { ApiPath } from './apiPath'
import type { CheckResponse, CreateResponse } from './types'

export const ShopApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    createInvoice: build.mutation<CreateResponse, void>({
      queryFn: async () => {
        try {
          const data = await axiosInstance
            .post<CreateResponse>(ApiPath.createInvoice)
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
    checkInvoice: build.mutation<CheckResponse, string>({
      queryFn: async invoiceId => {
        try {
          const data = await axiosInstance
            .post<CheckResponse>(ApiPath.checkInvoice, {
              invoiceId,
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
    cancelInvoice: build.mutation<boolean, string>({
      queryFn: async invoiceId => {
        try {
          const data = await axiosInstance
            .post<unknown>(ApiPath.cancelInvoice, {
              invoiceId,
            })
            .then(res => res.data)

          return {
            data: Boolean(data),
          }
        } catch (error) {
          return {
            error,
          }
        }
      },
    }),

    getLastPayment: build.query<CreateResponse, void>({
      queryFn: async () => {
        try {
          const data = await axiosInstance
            .get<CreateResponse>(ApiPath.getLastPayment)
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
  }),
})
