import type { UnknownAction } from '@reduxjs/toolkit'
import type { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import type {
  FulfilledAction,
  MutationThunk,
  QueryThunk,
  RejectedAction,
} from '@reduxjs/toolkit/src/query/core/buildThunks'
import type { EndpointDefinition } from '@reduxjs/toolkit/src/query/endpointDefinitions'

type TQuery = QueryThunk | MutationThunk
type TEndpointDefinition = EndpointDefinition<unknown, BaseQueryFn, string, unknown>

type ApiActionMeta = {
  message?: string
  isMessageDisabled?: boolean
}

export type TApiAction = (
  | (RejectedAction<TQuery, TEndpointDefinition> & UnknownAction)
  | (FulfilledAction<TQuery, TEndpointDefinition> & UnknownAction)
) & { meta: { baseQueryMeta?: ApiActionMeta } }
