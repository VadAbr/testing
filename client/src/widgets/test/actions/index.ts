import { createAsyncThunk } from '@reduxjs/toolkit'

import { calculateTest, getWeight_BMI } from '../libs'
import { TestSlice } from '../model'

export const calculateTestResult = createAsyncThunk(
  'test/calculateTestResult',
  (_, { dispatch, getState }) => {
    const state = getState() as RootState
    let questions = TestSlice.selectors.getQuestions(state)

    const weightQ = questions.find(el => el.id === 'weight')
    const heightQ = questions.find(el => el.id === 'height')

    const weightValue = Number(weightQ.value)
    const heightValue = Number(heightQ.value)

    // Подсчет индекса массы тела
    if (weightQ && heightQ && weightValue && heightValue) {
      const resultWeight = getWeight_BMI(weightValue, heightValue)
      questions = questions.concat({ ...heightQ, id: 'bmi', weight: resultWeight })
    }

    try {
      dispatch(TestSlice.actions.setResults(calculateTest(questions)))
    } catch (e) {
      console.error(e)
    }
  },
)
