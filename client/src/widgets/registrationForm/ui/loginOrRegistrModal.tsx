import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { IconRevert } from '@consta/icons/IconRevert'
import { Button } from '@consta/uikit/Button'
import { Modal } from '@consta/uikit/Modal'

import { AuthSlice } from '@shared/store'
import { RegistrationFormSlice } from '@widgets/registrationForm'

import { LoginForm } from './login'
import { RegistrationForm } from './registrationForm'

import styles from './styles.css'

export const LoginOrRegistrModal = () => {
  const isOpen = useSelector(AuthSlice.selectors.getAuthModalOpen)
  const [isLogin, setIsLogin] = React.useState<boolean>(true)

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const changeText = !isLogin ? 'login.changeToLogin' : 'login.changeToRegistration'

  const onClose = () => {
    dispatch(AuthSlice.actions.setAuthModalOpen(false))
  }

  useEffect(() => {
    if (isOpen) {
      setIsLogin(true)
      dispatch(RegistrationFormSlice.actions.resetForm())
    }
  }, [dispatch, isOpen])

  return (
    <Modal className={styles.container} isOpen={isOpen} onClickOutside={onClose}>
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

      {isLogin ? <LoginForm onLogin={onClose} /> : <RegistrationForm onRegister={onClose} />}
    </Modal>
  )
}
