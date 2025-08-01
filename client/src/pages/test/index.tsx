import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '@consta/uikit/Loader'

import { TestApi } from '@entities/test'
import { AuthSlice } from '@shared/store'
import { PageContent } from '@shared/ui'
import { PaymentForm } from '@widgets/paymentForm'
import { LoginOrRegistrForm } from '@widgets/registrationForm'
import { Test } from '@widgets/test'

import styles from './styles.css'

export const TestPage = () => {
  const [activeStep, setActiveStep] = React.useState<'form' | 'payment' | 'test'>('form')
  const user = useSelector(AuthSlice.selectors.getUser)

  const { data, isFetching, isError } = TestApi.useGetCurrentTestQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  useLayoutEffect(() => {
    if (!user) {
      setActiveStep('form')
      return
    }

    if (isError) {
      setActiveStep('payment')
      return
    }

    if (data) {
      setActiveStep('test')
      return
    }
  }, [data, user, isError])

  if (isFetching) {
    return (
      <PageContent>
        <Loader className="loaderFullContent" />
      </PageContent>
    )
  }

  if (activeStep === 'form') {
    return (
      <PageContent className={styles.wrapper}>
        <div className={styles.formContainer}>
          <LoginOrRegistrForm
            onSuccess={() => {
              setActiveStep('payment')
            }}
          />
        </div>
      </PageContent>
    )
  }

  if (activeStep === 'payment') {
    return (
      <PageContent className={styles.wrapper}>
        <div className={styles.formContainer}>
          <PaymentForm
            onSuccess={() => {
              setActiveStep('test')
            }}
          />
        </div>
      </PageContent>
    )
  }

  return (
    <PageContent className={styles.testWrapper}>
      <div className={styles.testContainer}>
        <Test />
      </div>
    </PageContent>
  )
}
