import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@consta/uikit/TextField'

import { useAppDispatch, useAppSelector } from '@shared/hooks'

import type { Props, QuestionItem, TextQuestion as TextQuestionType } from '../../model'
import { TestSlice } from '../../model'

import { Question } from './utils'

export const TextQuestion = ({ id, index }: Props) => {
  const question = useAppSelector(state => TestSlice.selectors.questionById(state, id))
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  if (!isTextQuestion(question)) return null

  const onChange = (value: string | null) => {
    const weight = question.getWeight?.(value ?? '') ?? 0
    dispatch(TestSlice.actions.changeQuestion({ ...question, id, value: value ?? '', weight }))
  }

  return (
    <Question text={question.text} number={index} htmlFor={question.id}>
      <TextField
        id={question.id}
        type={question.valueType}
        size="m"
        min={0}
        placeholder={question.placeholder || t('test.textPlaceholder')}
        withClearButton={true}
        value={question.value ?? ''}
        onChange={onChange}
      />
    </Question>
  )
}

const isTextQuestion = (item?: QuestionItem): item is TextQuestionType => {
  return Boolean(item && item.type === 'text')
}
