import React from 'react'
import { Slider } from '@consta/uikit/Slider'

import { useAppDispatch, useAppSelector } from '@shared/hooks'

import type { Props, QuestionItem, RatingQuestion as RatingQuestionType } from '../../model'
import { TestSlice } from '../../model'

import { Question } from './utils'

export const RatingQuestion = ({ id, index }: Props) => {
  const question = useAppSelector(state => TestSlice.selectors.questionById(state, id))
  const dispatch = useAppDispatch()

  if (!isRatingQuestion(question)) return null

  const onChange = (value: number) => {
    const weight = question.getWeight(value)
    dispatch(TestSlice.actions.changeQuestion({ ...question, id, value, weight }))
  }

  return (
    <Question text={question.text} number={index} htmlFor={question.id}>
      <Slider
        id={question.id}
        style={{ padding: '0 0.5rem' }}
        view="division"
        step={1}
        value={question.value ?? question.min}
        max={question.max}
        min={question.min}
        onChange={onChange}
      />
    </Question>
  )
}

const isRatingQuestion = (item?: QuestionItem): item is RatingQuestionType => {
  return Boolean(item && item.type === 'rating')
}
