import { generateId } from '@shared/libs'

import { getWeight_pressure, getWeight_tire } from '../libs'
import type { QuestionItem } from '../model'

const labelPrefix = 'test.step1.questions.question'
const choiceOptionsPrefix = 'test.choiceOptions.'
const selectOptionsPrefix = 'test.step1.selectOptions.'

const createBaseOptions = (yes = 2, partial = 0, no = -2) => [
  { label: `${choiceOptionsPrefix}yes`, weight: yes },
  { label: `${choiceOptionsPrefix}partial`, weight: partial },
  { label: `${choiceOptionsPrefix}no`, weight: no },
]

export const Questions_STEP_1: QuestionItem[] = [
  {
    id: generateId(),
    text: `${labelPrefix}2`,
    weight: 0,
    problemType: 'goalSetting',
    type: 'choice',
    options: createBaseOptions(),
  },
  {
    id: 'happy',
    text: `${labelPrefix}3`,
    problemType: 'goalSetting',
    type: 'choice',
    options: createBaseOptions(),
  },
  {
    id: generateId(),
    text: `${labelPrefix}4`,
    problemType: 'goalSetting',
    type: 'select',
    options: [
      { label: `${selectOptionsPrefix}4.option1`, weight: -1 },
      { label: `${selectOptionsPrefix}4.option2`, weight: -1 },
      { label: `${selectOptionsPrefix}4.option3`, weight: -1 },
      { label: `${selectOptionsPrefix}4.option4`, weight: -1 },
      { label: `${selectOptionsPrefix}4.option5`, weight: -1 },
    ],
  },
  {
    id: generateId(),
    text: `${labelPrefix}5`,
    problemType: 'goalSetting',
    type: 'choice',
    options: createBaseOptions(),
  },
  {
    id: generateId(),
    text: `${labelPrefix}6`,
    problemType: 'goalSetting',
    type: 'choice',
    options: createBaseOptions(),
  },
  {
    id: generateId(),
    text: `${labelPrefix}7`,
    problemType: 'goalSetting',
    type: 'choice',
    options: createBaseOptions(2, 1, 0),
  },
  {
    id: generateId(),
    text: `${labelPrefix}8`,
    problemType: 'goalSetting',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}9`,
    problemType: 'goalSetting',
    type: 'choice',
    options: createBaseOptions(),
  },
  {
    id: generateId(),
    text: `${labelPrefix}10`,
    problemType: 'goalSetting',
    type: 'select',
    options: [
      { label: `${selectOptionsPrefix}10.option1`, weight: 2 },
      { label: `${selectOptionsPrefix}10.option2`, weight: 1 },
      { label: `${selectOptionsPrefix}10.option3`, weight: 0 },
      { label: `${selectOptionsPrefix}10.option4`, weight: 0 },
      { label: `${selectOptionsPrefix}10.option5`, weight: 0 },
    ],
  },
  {
    id: generateId(),
    text: `${labelPrefix}11`,
    problemType: 'goalSetting',
    type: 'select',
    options: [
      { label: `${selectOptionsPrefix}11.option1`, weight: 3 },
      { label: `${selectOptionsPrefix}11.option2`, weight: 2 },
      { label: `${selectOptionsPrefix}11.option3`, weight: 0 },
      { label: `${selectOptionsPrefix}11.option4`, weight: 1 },
    ],
  },
  {
    id: generateId(),
    text: `${labelPrefix}12`,
    problemType: 'physiology',
    type: 'choice',
    options: createBaseOptions(2, -1, -2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}13`,
    problemType: 'physiology',
    type: 'select',
    options: [
      { label: `${selectOptionsPrefix}13.option1`, weight: 3 },
      { label: `${selectOptionsPrefix}13.option2`, weight: -1 },
      { label: `${selectOptionsPrefix}13.option3`, weight: -1 },
      { label: `${selectOptionsPrefix}13.option4`, weight: -1 },
      { label: `${selectOptionsPrefix}13.option5`, weight: -1 },
      { label: `${selectOptionsPrefix}13.option6`, weight: -1 },
      { label: `${selectOptionsPrefix}13.option7`, weight: -1 },
      { label: `${selectOptionsPrefix}13.option8`, weight: -1 },
    ],
  },
  {
    id: 'weight',
    text: `${labelPrefix}14`,
    problemType: 'physiology',
    type: 'text',
    valueType: 'number',
  },
  {
    id: 'height',
    text: `${labelPrefix}15`,
    problemType: 'physiology',
    type: 'text',
    valueType: 'number',
  },
  {
    id: 'pressure',
    text: `${labelPrefix}16`,
    problemType: 'physiology',
    type: 'text',
    valueType: 'text',
    placeholder: 'xxx/xx',
    getWeight: getWeight_pressure,
  },
  {
    id: generateId(),
    text: `${labelPrefix}17`,
    problemType: 'physiology',
    type: 'rating',
    getWeight: getWeight_tire,
    weight: 2,
    min: 1,
    max: 10,
  },
  {
    id: generateId(),
    text: `${labelPrefix}18`,
    problemType: 'anxiety',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}19`,
    problemType: 'anxiety',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}20`,
    problemType: 'anxiety',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}21`,
    problemType: 'anxiety',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}22`,
    problemType: 'anxiety',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}23`,
    problemType: 'burnout',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}24`,
    problemType: 'burnout',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}25`,
    problemType: 'burnout',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}26`,
    problemType: 'burnout',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}27`,
    problemType: 'burnout',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}28`,
    problemType: 'rigidity',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}29`,
    problemType: 'rigidity',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}30`,
    problemType: 'rigidity',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}31`,
    problemType: 'timeManagement',
    type: 'choice',
    options: createBaseOptions(2, 0, -2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}32`,
    problemType: 'timeManagement',
    type: 'choice',
    options: createBaseOptions(2, 0, -2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}33`,
    problemType: 'timeManagement',
    type: 'choice',
    options: createBaseOptions(2, 0, -2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}34`,
    problemType: 'timeManagement',
    type: 'choice',
    options: createBaseOptions(2, 0, -2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}35`,
    problemType: 'timeManagement',
    type: 'choice',
    options: createBaseOptions(2, 0, -2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}36`,
    problemType: 'motivation',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}37`,
    problemType: 'motivation',
    type: 'choice',
    options: createBaseOptions(2, 0, -2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}38`,
    problemType: 'motivation',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}39`,
    problemType: 'motivation',
    type: 'choice',
    options: createBaseOptions(-2, 0, 2),
  },
  {
    id: generateId(),
    text: `${labelPrefix}40`,
    problemType: 'motivation',
    type: 'choice',
    options: createBaseOptions(2, 0, -2),
  },
]
