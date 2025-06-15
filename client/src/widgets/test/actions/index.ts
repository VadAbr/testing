import { createAsyncThunk } from '@reduxjs/toolkit'

import { TestApi } from '@entities/test'
import { AuthSlice } from '@shared/store'

import { calculateTest, getWeight_BMI } from '../libs'
import { TestSlice } from '../model'

export const calculateTestResult = createAsyncThunk(
  'test/calculateTestResult',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState
    const isAdmin = AuthSlice.selectors.getIsAdmin(state)
    let questions = TestSlice.selectors.getQuestions(state)

    const weightQ = questions.find(el => el.id === 'weight')
    const heightQ = questions.find(el => el.id === 'height')

    const weightValue = Number(weightQ?.value)
    const heightValue = Number(heightQ?.value)

    // Подсчет индекса массы тела
    if (weightQ && heightQ && weightValue && heightValue) {
      const resultWeight = getWeight_BMI(weightValue, heightValue)
      questions = questions.concat({ ...heightQ, id: 'bmi', weight: resultWeight })
    }

    try {
      const testResult = calculateTest(questions)
      const testId = state.test.currentTestId

      dispatch(TestSlice.actions.setResults(testResult))
      await dispatch(TestApi.endpoints.completeTest.initiate({ testId, testResult }))
    } catch (e) {
      console.error(e)
    }
  },
)
