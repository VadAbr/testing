import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconRevert } from '@consta/icons/IconRevert'
import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'

import { LoginForm } from './login'
import { RegistrationForm } from './registrationForm'

import styles from './styles.css'

type Props = {
  onSuccess?: () => void
}

export const LoginOrRegistrForm = ({ onSuccess }: Props) => {
  const [isLogin, setIsLogin] = React.useState<boolean>(true)

  const { t } = useTranslation()

  const changeText = !isLogin ? 'login.changeToLogin' : 'login.changeToRegistration'

  return (
    <Card className={styles.container} form="round">
      <div>
        <Button
          iconLeft={IconRevert}
          view="clear"
          label={t(changeText)}
          onClick={() => {
            setIsLogin(!isLogin)
          }}
        />
      </div>

      {isLogin ? <LoginForm onLogin={onSuccess} /> : <RegistrationForm onRegister={onSuccess} />}
    </Card>
  )
}
