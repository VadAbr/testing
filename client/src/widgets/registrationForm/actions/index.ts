import { createAsyncThunk } from '@reduxjs/toolkit'

import { addNotification, AuthApi } from '@shared/store'

import { RegistrationFormSlice } from '../model'

export const submitForm = createAsyncThunk(
  'registrationForm/submitForm',
  (_, { dispatch, getState }) => {
    const state = getState() as RootState
    const form = RegistrationFormSlice.selectors.getForm(state)
    const isFormInvalid = Object.values(form).some(el => !el)

    if (isFormInvalid) {
      dispatch(addNotification({ message: 'notification.emptyForm', status: 'alert' }))
      throw new Error('Form is invalid')
    }

    dispatch(
      AuthApi.endpoints.register.initiate({ ...form, isSatisfied: Boolean(form.keyQuestionField) }),
    )
  },
)
