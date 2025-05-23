import type { StepsItemDefault } from '@consta/uikit/Steps'

export type InitialState = {
  activeStep: StepsItemDefault
  questions: QuestionItem[]
  testResults: TestResult | null
}

export type ProblemType =
  // step1
  | 'goalSetting'
  | 'physiology'
  | 'anxiety'
  | 'burnout'
  | 'rigidity'
  | 'timeManagement'
  | 'motivation'
  // step2
  | 'ethicalStandards'
  | 'appearance'
  | 'manners'
  | 'communication'
  // step3
  | 'externalCareer'
  | 'internalCareer'
  | 'careerSpace'

type BaseQuestion = {
  id: string
  text: string
  weight?: number
  problemType?: ProblemType
  isDisabled?: boolean
}

export type TextQuestion = BaseQuestion & {
  type: 'text'
  valueType?: 'number' | 'text'
  value?: string
  getWeight?: (value: string) => number
  placeholder?: string
}

export type RatingQuestion = {
  type: 'rating'
  value?: number
  min: number
  max: number
  getWeight: (value: number) => number
} & BaseQuestion

export type ChoiceQuestion = {
  type: 'choice'
  value?: QuestionOption
  options: QuestionOption[]
} & BaseQuestion

export type SelectQuestion = {
  type: 'select'
  value?: QuestionOption
  options: QuestionOption[]
} & BaseQuestion

export type QuestionOption = {
  label: string
  weight: number
}

export type QuestionItem = TextQuestion | RatingQuestion | ChoiceQuestion | SelectQuestion

export type Props = {
  id: string
  index: number
}

export type AnalysisCategoryItem = {
  minNormalWeight: number
  stepKey: StepKey
}

export type StepKey = 'step1' | 'step2' | 'step3'

type CategoryResult = {
  isValid: boolean
  totalScore: number
  category: ProblemType
}

export type TestResult = Record<
  StepKey,
  {
    isValid: boolean
    totalScore: number
    categories: CategoryResult[]
  }
>
