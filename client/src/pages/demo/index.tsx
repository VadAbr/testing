import React from 'react'
import { Card } from '@consta/uikit/Card'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices,import/no-internal-modules
import { AllBad } from '@pages/testResults/allBad'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices,import/no-internal-modules
import { AllCool } from '@pages/testResults/allCool'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices,import/no-internal-modules
import { Problems } from '@pages/testResults/problems'
import { useAppDispatch } from '@shared/hooks'
import { PageContent } from '@shared/ui'
import { Test, TestSlice } from '@widgets/test'

import styles from './styles.css'

export const Demo = () => {
  const [result, setResult] = React.useState<'allCool' | 'allBad' | 'someThingBad' | null>(null)
  const dispatch = useAppDispatch()

  const resetResult = () => {
    setResult(null)
    dispatch(TestSlice.actions.resetTest())
  }

  if (result) {
    return (
      <PageContent className={styles.container}>
        <div className={styles.content}>
          <Card className={styles.card} horizontalSpace="4xl" verticalSpace="4xl" form="round">
            {result === 'allCool' && <AllCool mode="demo" demoAction={resetResult} />}
            {result === 'allBad' && <AllBad mode="demo" demoAction={resetResult} />}
            {result === 'someThingBad' && <Problems mode="demo" demoAction={resetResult} />}
          </Card>
        </div>
      </PageContent>
    )
  }

  return (
    <PageContent className={styles.container}>
      <div className={styles.testContainer}>
        <Test mode="demo" onFinishDemo={setResult} />
      </div>
    </PageContent>
  )
}
