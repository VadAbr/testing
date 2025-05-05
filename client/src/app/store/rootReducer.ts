import { combineReducers } from '@reduxjs/toolkit'

import { apiSlice } from '@shared/api'

export const rootReducer = combineReducers({
  api: apiSlice.reducer,
})
