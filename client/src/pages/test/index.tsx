import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { AuthSlice } from '@shared/store'
import { PageContent } from '@shared/ui'
import { PaymentForm } from '@widgets/paymentForm'
import { LoginOrRegistrForm } from '@widgets/registrationForm'
import { Test } from '@widgets/test'

import styles from './styles.css'

export const TestPage = () => {
  const [activeStep, setActiveStep] = React.useState<'form' | 'payment' | 'test'>('form')
  const user = useSelector(AuthSlice.selectors.getUser)

  useEffect(() => {
    if (user) {
      setActiveStep('payment')
    }
  }, [user])

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
    <PageContent>
      <div className={styles.testContainer}>
        <Test />
      </div>
    </PageContent>
  )
}
