import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import { Questions_STEP_1, Questions_STEP_2, Questions_STEP_3, STEPS } from '../constants'
import { shuffleArray } from '../libs'

import type { InitialState, QuestionItem } from './types'

const initialState: InitialState = {
  activeStep: STEPS[0],
  questions: shuffleArray([...Questions_STEP_1, ...Questions_STEP_2, ...Questions_STEP_3]),
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
  const results = Object.values(state.testResults ?? {})
  const isAllCool = results.every(el => el.isValid)
  const isSomethingBad = results.some(el => !el.isValid)
  const isAllBad = results.every(el => !el.isValid)

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
    stepBack: state => {
      const currentIndex = STEPS.findIndex(step => step.label === state.activeStep.label)
      state.activeStep = STEPS[Math.max(currentIndex - 1, 0)]
    },
    stepForward: state => {
      const currentIndex = STEPS.findIndex(step => step.label === state.activeStep.label)
      state.activeStep = STEPS[Math.min(currentIndex + 1, STEPS.length - 1)]
    },
    setStep: (state, action: PayloadAction<InitialState['activeStep']>) => {
      state.activeStep = action.payload
    },
    setResults: (state, action: PayloadAction<InitialState['testResults']>) => {
      state.testResults = action.payload
    },
    changeQuestion: (state, action: PayloadAction<QuestionItem>) => {
      const question = state.questions.find(el => el.id === action.payload.id)

      if (question) {
        Object.assign(question, action.payload)
      }
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
