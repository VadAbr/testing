import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import type { InitialState } from './types'

const initialState: InitialState = {
  form: {
    name: '',
    age: '',
    activityField: '',
    education: '',
    workExperience: '',
    position: '',
    email: '',
    keyQuestionField: null,
    isChecked: false,
  },
  activeStep: 'form',
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
    changeIsAllReadyFilled: (state, action: PayloadAction<boolean>) => {
      state.isAllReadyFilled = action.payload
    },
    setStep: (state, action: PayloadAction<InitialState['activeStep']>) => {
      state.activeStep = action.payload
    },
  },
  selectors: {
    getForm,
    getFormIsFilled,
    getActiveStep: state => state.activeStep,
  },
})
