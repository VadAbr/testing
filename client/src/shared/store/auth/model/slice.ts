import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type User = {
  id: string
  name: string
  email: string
}

type TInitialState = {
  user: User | null
  isAdmin: boolean
  isAuthModalActive: boolean
}

const initialState: TInitialState = {
  user: null,
  isAdmin: false,
  isAuthModalActive: false,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
    clearUser: state => {
      state.user = initialState.user
    },
    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalActive = action.payload
    },
  },
  selectors: {
    getUser: (state: TInitialState) => state.user,
    getAuthModalOpen: (state: TInitialState) => state.isAuthModalActive,
    getIsAdmin: (state: TInitialState) => state.isAdmin,
  },
})
