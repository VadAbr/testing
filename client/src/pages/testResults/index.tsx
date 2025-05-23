import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Text } from '@consta/uikit/Text'

import { TestSlice } from '@widgets/test'

import { Problems } from './problems'

export const TestResultsPage = () => {
  const { isAllCool, isSomethingBad } = useSelector(TestSlice.selectors.testResultsDetails)
  const { t } = useTranslation()

  return (
    <div>
      {isAllCool && <Text>{t('testResults.allCoolText')}</Text>}
      {isSomethingBad && <Problems />}
    </div>
  )
}
