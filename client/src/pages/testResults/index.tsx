import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Card } from '@consta/uikit/Card'

import { PATHS } from '@shared/constants'
import { PageContent } from '@shared/ui'
import { TestSlice } from '@widgets/test'

import { AllCool } from './allCool'
import { Problems } from './problems'

import styles from './styles.css'

export const TestResultsPage = () => {
  const { isAllCool, isSomethingBad } = useSelector(TestSlice.selectors.testResultsDetails)
  const testResults = useSelector(TestSlice.selectors.testResults)

  if (!testResults) {
    return <Navigate to={PATHS.root} replace={true} />
  }

  return (
    <PageContent className={styles.container}>
      <div className={styles.content}>
        <Card className={styles.card} horizontalSpace="4xl" verticalSpace="4xl" form="round">
          {isAllCool && <AllCool />}
          {isSomethingBad && <Problems />}
        </Card>
      </div>
    </PageContent>
  )
}
