import axios from 'axios'

import { apiSlice } from '@shared/api'

import { ApiPath } from './apiPath'
import type { CheckResponse, CreateResponse } from './types'

const API_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTlRnMU9UYz0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiIyNzA2Yjk0OWViZjNiMzRlNjc2N2Q5ZmZkOGVlMTZhZDc2MzZkYTQ4ZDVkYWNhMTlhNTk4ZTk0MTViZWZlNmM3IiwiZXhwIjo4ODE0OTQ5MTY0N30.wnBhWfhSZXnMcy6wKf1he9HmQOlbD0b1KpAyRlr2eyM'
const SHOP_ID = 'B85eYXUgZxj2jKx7'
const TEST_COST = 45

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Token ${API_TOKEN}`,
  },
})

export const ShopApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    createInvoice: build.mutation<CreateResponse, void>({
      queryFn: async () => {
        try {
          const data = await axiosInstance
            .post<CreateResponse>(ApiPath.createInvoice, {
              amount: TEST_COST,
              shop_id: SHOP_ID,
              currency: 'USD',
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
    checkInvoice: build.mutation<CheckResponse, string>({
      queryFn: async invoiceId => {
        try {
          const data = await axiosInstance
            .post<CheckResponse>(ApiPath.checkInvoice, {
              uuids: [invoiceId],
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
              uuid: invoiceId,
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
  }),
})
