import { createAsyncThunk } from '@reduxjs/toolkit'

import { calculateTest } from '../libs'
import { TestSlice } from '../model'

export const calculateTestResult = createAsyncThunk(
  'test/calculateTestResult',
  (_, { dispatch, getState }) => {
    const state = getState() as RootState
    const questions = TestSlice.selectors.getQuestions(state)

    try {
      dispatch(TestSlice.actions.setResults(calculateTest(questions)))
    } catch (e) {
      console.error(e)
    }
  },
)
