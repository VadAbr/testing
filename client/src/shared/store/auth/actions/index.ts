import { createAsyncThunk } from '@reduxjs/toolkit'

import { STORAGE_KEYS } from '@shared/constants'
import { AuthSlice } from '@shared/store'

export const logout = createAsyncThunk<void>('logout', (_, api) => {
  localStorage.removeItem(STORAGE_KEYS.token)
  api.dispatch(AuthSlice.actions.clearUser())
})
