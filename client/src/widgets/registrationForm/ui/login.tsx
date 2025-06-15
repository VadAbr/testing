import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { IconMail } from '@consta/icons/IconMail'
import { Button } from '@consta/uikit/Button'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Text } from '@consta/uikit/Text'
import { TextField } from '@consta/uikit/TextField'

import { useAppDispatch } from '@shared/hooks'
import { AuthApi } from '@shared/store'
import { RegistrationFormSlice } from '@widgets/registrationForm'

import styles from './styles.css'

type Props = {
  onLogin?: () => void
}

export const LoginForm = ({ onLogin }: Props) => {
  const form = useSelector(RegistrationFormSlice.selectors.getForm)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [login, { isLoading }] = AuthApi.useLoginMutation()

  const changeEmail = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ email: value ?? '' }))
  }

  const changePassword = (value: string | null) => {
    dispatch(RegistrationFormSlice.actions.changeField({ password: value ?? '' }))
  }

  const submit = () => {
    login({ email: form.email, password: form.password })
      .unwrap()
      .then(() => {
        onLogin?.()
      })
      .catch(console.error)
  }

  return (
    <div>
      <Text weight="semibold" size="3xl" align="center">
        {t('login.title')}
      </Text>

      <form autoComplete="off" id="registrationForm" className={styles.form}>
        <div className={styles.row}>
          <TextField
            label={t('authorization.emailField')}
            value={form.email}
            autoComplete="off"
            autoFocus={true}
            leftSide={IconMail}
            onChange={changeEmail}
          />
          <TextField
            autoComplete="new-password"
            label={t('authorization.password')}
            value={form.password}
            type="password"
            onChange={changePassword}
          />
        </div>

        <div className={cnMixFlex({ justify: 'flex-end' })}>
          <Button
            type="submit"
            label={t('login.submit')}
            loading={isLoading}
            disabled={!form.email.trim() || !form.password.trim() || isLoading}
            onClick={submit}
          />
        </div>
      </form>
    </div>
  )
}
