import { combineReducers } from '@reduxjs/toolkit'

import { apiSlice } from '@shared/api'
import { AuthSlice, NotificationSlice } from '@shared/store'
import { RegistrationFormSlice } from '@widgets/registrationForm'
import { TestSlice } from '@widgets/test'

export const rootReducer = combineReducers({
  api: apiSlice.reducer,
  test: TestSlice.reducer,
  registrationForm: RegistrationFormSlice.reducer,
  notification: NotificationSlice.reducer,
  auth: AuthSlice.reducer,
})
