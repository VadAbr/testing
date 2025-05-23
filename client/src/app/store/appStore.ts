import type { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { apiSlice } from '@shared/api'

import { rootReducer } from './rootReducer'

function createStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }).concat([apiSlice.middleware]),
  })

  setupListeners(store.dispatch)

  return store
}

export const appStore = createStore()

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
