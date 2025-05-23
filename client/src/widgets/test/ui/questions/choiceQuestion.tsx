import React from 'react'
import { useTranslation } from 'react-i18next'
import { RadioGroup } from '@consta/uikit/RadioGroup'

import { useAppDispatch, useAppSelector } from '@shared/hooks'

import type {
  ChoiceQuestion as ChoiceQuestionType,
  Props,
  QuestionItem,
  QuestionOption,
} from '../../model'
import { TestSlice } from '../../model'

import { Question } from './utils'

export const ChoiceQuestion = ({ id, index }: Props) => {
  const question = useAppSelector(state => TestSlice.selectors.questionById(state, id))
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  if (!isChoiceQuestion(question)) return null

  const onChange = (value: QuestionOption | null) => {
    dispatch(TestSlice.actions.changeQuestion({ ...question, id, value: value ?? undefined }))
  }

  return (
    <Question text={question.text} number={index} htmlFor={question.id}>
      <RadioGroup
        id={question.id}
        direction="row"
        value={question.value}
        size="m"
        items={question.options}
        getItemLabel={item => t(item.label)}
        onChange={onChange}
      />
    </Question>
  )
}

const isChoiceQuestion = (item?: QuestionItem): item is ChoiceQuestionType => {
  return Boolean(item && item.type === 'choice')
}
