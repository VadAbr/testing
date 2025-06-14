import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import type { InitialState } from './types'

const initialState: InitialState = {
  form: {
    name: '',
    password: '',
    age: 0,
    activityField: '',
    education: '',
    workExperience: 0,
    position: '',
    email: '',
    keyQuestionField: null,
    isChecked: false,
  },
  activeStep: 'form',
  isAuthModalActive: false,
}

// Selectors
const getState = (state: InitialState) => state
const getForm = createSelector(getState, state => state.form)
const getFormIsFilled = createSelector(getState, state => {
  return Object.values(state.form).every(field => Boolean(field))
})

export const RegistrationFormSlice = createSlice({
  name: 'registrationForm',
  initialState,
  reducers: {
    changeField: (state, action: PayloadAction<Partial<InitialState['form']>>) => {
      Object.assign(state.form, action.payload)
    },
    setStep: (state, action: PayloadAction<InitialState['activeStep']>) => {
      state.activeStep = action.payload
    },
    resetForm: state => {
      state.form = initialState.form
    },
  },
  selectors: {
    getForm,
    getFormIsFilled,
    getActiveStep: state => state.activeStep,
    getIsAuthModalActive: state => state.isAuthModalActive,
  },
})
