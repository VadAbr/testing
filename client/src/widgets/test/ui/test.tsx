import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconAllDone } from '@consta/icons/IconAllDone'
import { IconInfo } from '@consta/icons/IconInfo'
import { IconWarning } from '@consta/icons/IconWarning'
import { Button } from '@consta/uikit/Button'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { cnMixScrollBar } from '@consta/uikit/MixScrollBar'
import { Text } from '@consta/uikit/Text'
import cn from 'classnames'

import { PATHS } from '@shared/constants'
import { useAppDispatch } from '@shared/hooks'
import { useUserInfo } from '@shared/store'

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

type TestProps = {
  mode?: 'demo'
  onFinishDemo?: (resultMode: 'allCool' | 'allBad' | 'someThingBad') => void
}

export const Test = ({ mode, onFinishDemo }: TestProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const questions = useSelector(TestSlice.selectors.getQuestions)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAdmin } = useUserInfo()

  const isDemo = mode === 'demo'

  useEffect(() => {
    if (isDemo) {
      dispatch(TestSlice.actions.setDemoQuestions())
    } else {
      dispatch(TestSlice.actions.setQuestions(isAdmin))
    }
  }, [isDemo, dispatch, isAdmin])

  const finish = () => {
    setIsLoading(true)
    dispatch(calculateTestResult())
      .unwrap()
      .then(() => {
        navigate(PATHS.testResult)
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className={styles.container}>
      <div className={cn(styles.questions, scrollBarStyles)}>
        {questions.map(renderQuestion)}

        {!isDemo && (
          <div className={buttonWrapper}>
            <Button
              loading={isLoading}
              label={t('test.submit')}
              view="primary"
              form="round"
              size="m"
              iconRight={IconAllDone}
              onClick={finish}
            />
          </div>
        )}

        {isDemo && (
          <div className={cnMixFlex({ direction: 'column', align: 'center', gap: 's' })}>
            <Text align="center" weight="medium" size="l">
              {t('demo.resultTitle')}
            </Text>

            <div
              className={cnMixFlex({ align: 'center', gap: 's', justify: 'center' }, [
                styles.demoBtns,
              ])}>
              <Button
                label={t('demo.allBadBtn')}
                view="primary"
                form="round"
                size="m"
                iconRight={IconWarning}
                onClick={() => onFinishDemo?.('allBad')}
              />

              <Button
                label={t('demo.someThingBadBtn')}
                view="primary"
                form="round"
                size="m"
                iconRight={IconInfo}
                onClick={() => {
                  dispatch(calculateTestResult(isDemo))
                  onFinishDemo?.('someThingBad')
                }}
              />

              <Button
                label={t('demo.allCoolBtn')}
                view="primary"
                form="round"
                size="m"
                iconRight={IconAllDone}
                onClick={() => onFinishDemo?.('allCool')}
              />
            </div>
          </div>
        )}
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
