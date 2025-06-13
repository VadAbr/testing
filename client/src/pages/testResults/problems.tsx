import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import type { IconComponent } from '@consta/icons/Icon'
import { IconCommentDeleteFilled } from '@consta/icons/IconCommentDeleteFilled'
import { IconLineAndBarChart } from '@consta/icons/IconLineAndBarChart'
import { IconTeam } from '@consta/icons/IconTeam'
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

      <Text weight="semibold" size="l">
        {t('testResults.somethingBadText')}
      </Text>

      <div className={styles.problemsContainer}>
        {failedSteps.map((el, i) => {
          const categories = el[1].categories.filter(el => !el.isValid).map(el => el.category)
          return <Problem key={i} categories={categories} step={el[0]} />
        })}
      </div>

      <AgainButton />
    </div>
  )
}

type Props = {
  step: string
  categories: string[]
}

const icons: Record<string, IconComponent> = {
  step1: IconTeam,
  step2: IconCommentDeleteFilled,
  step3: IconLineAndBarChart,
}

const Problem = ({ step, categories }: Props) => {
  const { t } = useTranslation()
  const Icon = step in icons ? icons[step] : IconWarning

  return (
    <div className={styles.problem}>
      <Icon view="warning" className={styles.icon} />

      <div className={styles.problemText}>
        <Text weight="medium" size="l">
          {t(`testResults.${step}`)}
        </Text>
        <ul className={styles.categories}>
          {categories.map((el, i) => (
            <li key={i}>
              <Text size="m">{t(`testResults.problems.${el}`)}</Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
