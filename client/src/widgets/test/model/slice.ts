import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import { Questions_STEP_1, Questions_STEP_2, Questions_STEP_3, STEPS } from '../constants'
import { shuffleArray } from '../libs'

import type { CategoryResult, InitialState, QuestionItem } from './types'

const initialState: InitialState = {
  activeStep: STEPS[0],
  //TODO: вернуть рандом
  questions: [...Questions_STEP_1, ...Questions_STEP_2, ...Questions_STEP_3],
  testResults: null,
}

// Selectors
const getState = (state: InitialState) => state
const getQuestions = createSelector(getState, (state: InitialState) => state.questions)
const questionById = createSelector(
  getQuestions,
  (_: InitialState, questionId: string) => questionId,
  (questions, questionId: string) => questions.find(el => el.id === questionId),
)
const testResults = createSelector(getState, state => state.testResults)
const testResultsDetails = createSelector(getState, state => {
  const stepsResults = Object.values(state.testResults ?? {})
  const allProblems = stepsResults.reduce<CategoryResult[]>((acc, step) => {
    return acc.concat(step.categories)
  }, [])

  const isAllCool = allProblems.every(el => el.isValid)
  const isSomethingBad = allProblems.some(el => !el.isValid)
  const isAllBad = allProblems.every(el => !el.isValid)

  return {
    isAllCool,
    isSomethingBad,
    isAllBad,
  }
})

export const TestSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<InitialState['testResults']>) => {
      state.testResults = action.payload
    },
    changeQuestion: (state, action: PayloadAction<QuestionItem>) => {
      const question = state.questions.find(el => el.id === action.payload.id)

      if (!question) {
        return
      }

      Object.assign(question, action.payload)
    },
    resetTest: state => {
      state.testResults = initialState.testResults
      //TODO: вернуть рандом
      state.questions = initialState.questions
    },
  },
  selectors: {
    isFirstStep: state => state.activeStep.label === STEPS[0].label,
    isLastStep: state => state.activeStep.label === STEPS[STEPS.length - 1].label,
    activeStep: state => state.activeStep,
    testResults,
    testResultsDetails,
    questionById,
    getQuestions,
  },
})
