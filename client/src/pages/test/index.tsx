import React from 'react'
import { useSelector } from 'react-redux'

import { PageContent } from '@shared/ui'
import { RegistrationForm, RegistrationFormSlice } from '@widgets/registrationForm'
import { Test } from '@widgets/test'

import styles from './styles.css'

export const TestPage = () => {
  const isAllReadyFilled = useSelector(RegistrationFormSlice.selectors.isAllReadyFilled)

  if (!isAllReadyFilled) {
    return (
      <PageContent className={styles.wrapper}>
        <div className={styles.formContainer}>
          <RegistrationForm />
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
