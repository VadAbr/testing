import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IconRestart } from '@consta/icons/IconRestart'
import { IconSendMessage } from '@consta/icons/IconSendMessage'
import { Button } from '@consta/uikit/Button'
import { cnMixFlex } from '@consta/uikit/MixFlex'

import { TestApi } from '@entities/test'
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
  const currentTestId = useSelector(TestSlice.selectors.currentTestId)

  const [askForHelp, { isLoading, data }] = TestApi.useAskForHelpMutation()

  const restartTest = () => {
    dispatch(TestSlice.actions.resetTest())
    dispatch(RegistrationFormSlice.actions.setStep('payment'))
    navigate(PATHS.test, { replace: true })
  }

  const ask = () => {
    askForHelp({ testId: currentTestId })
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
          size="l"
          disabled={data}
          loading={isLoading}
          view="secondary"
          iconLeft={IconSendMessage}
          label={t('testResults.contactToUs')}
          onClick={ask}
        />
      )}
    </div>
  )
}
