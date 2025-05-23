import React from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from '@consta/uikit/Select'

import { useAppDispatch, useAppSelector } from '@shared/hooks'

import type {
  Props,
  QuestionItem,
  QuestionOption,
  SelectQuestion as SelectQuestionType,
} from '../../model'
import { TestSlice } from '../../model'

import { Question } from './utils'

export const SelectQuestion = ({ id, index }: Props) => {
  const question = useAppSelector(state => TestSlice.selectors.questionById(state, id))
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  if (!isSelectQuestion(question)) return null

  const onChange = (value: QuestionOption | null) => {
    dispatch(TestSlice.actions.changeQuestion({ ...question, id, value: value ?? undefined }))
  }

  return (
    <Question text={question.text} number={index} htmlFor={question.id}>
      <Select
        id={question.id}
        size="m"
        value={question.value}
        placeholder={t('test.selectPlaceholder')}
        items={question.options}
        getItemLabel={item => t(item.label)}
        getItemKey={item => item.label}
        onChange={onChange}
      />
    </Question>
  )
}

const isSelectQuestion = (item?: QuestionItem): item is SelectQuestionType => {
  return Boolean(item && item.type === 'select')
}
