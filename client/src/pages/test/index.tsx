import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { PATHS } from '@shared/constants'
import { PageContent } from '@shared/ui'
import { PaymentForm } from '@widgets/paymentForm'
import { RegistrationForm, RegistrationFormSlice } from '@widgets/registrationForm'
import { Test } from '@widgets/test'

import styles from './styles.css'

export const TestPage = () => {
  const activeStep = useSelector(RegistrationFormSlice.selectors.getActiveStep)

  if (activeStep === 'payment') {
    return (
      <PageContent className={styles.wrapper}>
        <div className={styles.formContainer}>
          <PaymentForm />
        </div>
      </PageContent>
    )
  }

  if (activeStep === 'form') {
    return (
      <PageContent className={styles.wrapper}>
        <div className={styles.formContainer}>
          <RegistrationForm />
        </div>
      </PageContent>
    )
  }

  if (activeStep === 'test') {
    return (
      <PageContent>
        <div className={styles.testContainer}>
          <Test />
        </div>
      </PageContent>
    )
  }

  return <Navigate to={PATHS.root} />
}
