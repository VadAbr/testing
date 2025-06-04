import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { IconWarning } from '@consta/icons/IconWarning'
import { Text } from '@consta/uikit/Text'

import { TestSlice } from '@widgets/test'

import { AllBad } from './allBad'
import { AgainButton } from './utils'

import styles from './styles.css'

export const Problems = () => {
  const { isAllBad } = useSelector(TestSlice.selectors.testResultsDetails)
  const testResults = useSelector(TestSlice.selectors.testResults)
  const { t } = useTranslation()

  const failedSteps = Object.entries(testResults ?? {}).filter(el =>
    el[1].categories.some(category => !category.isValid),
  )

  if (isAllBad) {
    return <AllBad />
  }

  return (
    <div className={styles.cool}>
      <IconWarning size="l" view="warning" className={styles.icon} />

      <div className={styles.problemsContainer}>
        {failedSteps.map((el, i) => {
          const categories = el[1].categories.filter(el => !el.isValid).map(el => el.category)
          return (
            <Problem
              key={i}
              categories={categories}
              step={el[0]}
              isFirst={i === 0}
              isLast={i === failedSteps.length - 1}
            />
          )
        })}
      </div>

      <Text weight="medium" size="l">
        {t(
          failedSteps.length === 1
            ? 'testResults.somethingBadSubText'
            : 'testResults.somethingBadSubTextMany',
        )}
      </Text>

      <AgainButton />
    </div>
  )
}

type Props = {
  step: string
  categories: string[]
  isFirst: boolean
  isLast: boolean
}

const Problem = ({ step, categories, isFirst, isLast }: Props) => {
  const { t } = useTranslation()
  const problems = categories.map(el => t(`testResults.problems.${el}`)).join(', ')
  // eslint-disable-next-line no-nested-ternary
  const startText = isFirst
    ? 'somethingBadTextFirst'
    : isLast
      ? 'somethingBadTextLast'
      : 'somethingBadText'

  return (
    <div className={styles.problem}>
      <Text weight="regular" size="l" align="left">
        {t(`testResults.${startText}`, { problem: t(`testResults.${step}`) })}{' '}
        {t(`testResults.${step}Description`, { problems })}
      </Text>
    </div>
  )
}
