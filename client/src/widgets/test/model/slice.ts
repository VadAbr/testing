import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import { ShopApi } from '@entities/payment'
import { TestApi } from '@entities/test'

import { Questions_STEP_1, Questions_STEP_2, Questions_STEP_3, STEPS } from '../constants'
import { shuffleArray } from '../libs'

import type { CategoryResult, InitialState, QuestionItem } from './types'

const DEMO_QUESTIONS = [
  ...Questions_STEP_1.slice(0, 5),
  ...Questions_STEP_2.slice(0, 5),
  ...Questions_STEP_3.slice(0, 5),
]

const ALL_QUESTIONS = [...Questions_STEP_1, ...Questions_STEP_2, ...Questions_STEP_3]

const initialState: InitialState = {
  activeStep: STEPS[0],
  questions: [],
  testResults: null,
  currentTestId: '',
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
    setDemoQuestions: state => {
      state.questions = shuffleArray(DEMO_QUESTIONS)
    },
    setQuestions: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.questions = ALL_QUESTIONS
        return
      }
      state.questions = shuffleArray(ALL_QUESTIONS)
    },
    changeQuestion: (state, action: PayloadAction<QuestionItem>) => {
      const question = state.questions.find(el => el.id === action.payload.id)

      if (!question) {
        return
      }

      Object.assign(question, action.payload)
    },
    setCurrentTest: (state, action: PayloadAction<string>) => {
      state.currentTestId = action.payload
    },
    resetTest: state => {
      state.testResults = initialState.testResults
      state.questions = initialState.questions
    },
  },
  extraReducers: builder => {
    builder.addMatcher(TestApi.endpoints.getCurrentTest.matchFulfilled, (state, action) => {
      state.currentTestId = action.payload
    })
    builder.addMatcher(TestApi.endpoints.createFreeTest.matchFulfilled, (state, action) => {
      state.currentTestId = action.payload
    })
    builder.addMatcher(ShopApi.endpoints.checkInvoice.matchFulfilled, (state, action) => {
      state.currentTestId = action.payload.testId ?? ''
    })
  },
  selectors: {
    isFirstStep: state => state.activeStep.label === STEPS[0].label,
    isLastStep: state => state.activeStep.label === STEPS[STEPS.length - 1].label,
    activeStep: state => state.activeStep,
    currentTestId: state => state.currentTestId,
    testResults,
    testResultsDetails,
    questionById,
    getQuestions,
  },
})
