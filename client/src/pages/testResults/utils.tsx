import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IconRestart } from '@consta/icons/IconRestart'
import { IconSendMessage } from '@consta/icons/IconSendMessage'
import { Button } from '@consta/uikit/Button'
import { cnMixFlex } from '@consta/uikit/MixFlex'

import { PATHS } from '@shared/constants'
import { useAppDispatch } from '@shared/hooks'
import { RegistrationFormSlice } from '@widgets/registrationForm'
import { TestSlice } from '@widgets/test'

type Props = {
  isAllBad?: boolean
}

export const AgainButton = ({ isAllBad }: Props) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const restartTest = () => {
    dispatch(TestSlice.actions.resetTest())
    dispatch(RegistrationFormSlice.actions.setStep('payment'))
    navigate(PATHS.test, { replace: true })
  }

  return (
    <div className={cnMixFlex({ align: 'center', gap: 'm' })}>
      <Button
        size="l"
        iconLeft={IconRestart}
        label={t('testResults.again')}
        onClick={restartTest}
      />
      {isAllBad && (
        <Button
          as="a"
          href="mailto:youremail@example.com"
          size="l"
          view="secondary"
          iconLeft={IconSendMessage}
          label={t('testResults.contactToUs')}
        />
      )}
    </div>
  )
}
