import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Text } from '@consta/uikit/Text'

import { TestSlice } from '@widgets/test'

export const Problems = () => {
  const { isAllBad } = useSelector(TestSlice.selectors.testResultsDetails)
  const testResults = useSelector(TestSlice.selectors.testResults)
  const { t } = useTranslation()

  const failedSteps = Object.entries(testResults ?? {}).filter(el => !el[1].isValid)
  console.log('testResults', testResults)

  if (isAllBad) {
    return (
      <>
        <Text>{t('testResults.allBadText')}</Text>
        <Text>{t('testResults.allBadSubText')}</Text>
      </>
    )
  }

  return (
    <>
      <Text>{t('testResults.somethingBadText')}</Text>
      <Text>{t('testResults.somethingBadText')}</Text>
      <Text>{t('testResults.allBadSubText')}</Text>
    </>
  )
}
