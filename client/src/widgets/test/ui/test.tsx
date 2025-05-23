import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconAllDone } from '@consta/icons/IconAllDone'
import { Button } from '@consta/uikit/Button'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { cnMixScrollBar } from '@consta/uikit/MixScrollBar'
import cn from 'classnames'

import { PATHS } from '@shared/constants'
import { useAppDispatch } from '@shared/hooks'

import { calculateTestResult } from '../actions'
import type { Props, QuestionItem } from '../model'
import { TestSlice } from '../model'

import { ChoiceQuestion, RatingQuestion, SelectQuestion, TextQuestion } from './questions'

import styles from './styles.css'

const scrollBarStyles = cnMixScrollBar()
const buttonWrapper = cnMixFlex({ direction: 'row', align: 'center', justify: 'flex-end' })

const QUESTION_COMPONENTS: Record<QuestionItem['type'], (args: Props) => React.ReactNode> = {
  text: TextQuestion,
  rating: RatingQuestion,
  choice: ChoiceQuestion,
  select: SelectQuestion,
}

export const Test = () => {
  const questions = useSelector(TestSlice.selectors.getQuestions)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const finish = () => {
    dispatch(calculateTestResult())
      .unwrap()
      .then(() => {
        navigate(PATHS.testResult)
      })
  }

  return (
    <div className={styles.container}>
      <div className={cn(styles.questions, scrollBarStyles)}>
        {questions.map(renderQuestion)}
        <div className={buttonWrapper}>
          <Button
            label={t('test.submit')}
            view="primary"
            form="round"
            size="m"
            iconRight={IconAllDone}
            onClick={finish}
          />
        </div>
      </div>
    </div>
  )
}

const renderQuestion = (
  { id, type }: { id: string; type: QuestionItem['type'] },
  index: number,
) => {
  const Component = QUESTION_COMPONENTS[type]
  return <Component key={id} id={id} index={index + 1} />
}
