import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { IconExit } from '@consta/icons/IconExit'
import { IconIntroduction } from '@consta/icons/IconIntroduction'
import { Button } from '@consta/uikit/Button'
import { Popover } from '@consta/uikit/Popover'
import { User } from '@consta/uikit/User'

import { apiSlice } from '@shared/api'
import { useAppDispatch } from '@shared/hooks'
import { AuthSlice, logout } from '@shared/store'

import styles from './styles.css'

export const LoginBtn = () => {
  const [showUserPopover, setShowUserPopover] = useState(false)
  const userInfoRef = useRef<HTMLDivElement | null>(null)

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const user = useSelector(AuthSlice.selectors.getUser)

  const openAuthModal = () => {
    dispatch(AuthSlice.actions.setAuthModalOpen(true))
  }

  const onUserInfoClick = () => {
    setShowUserPopover(prevState => !prevState)
  }

  const exit = () => {
    dispatch(logout())
    dispatch(apiSlice.util.resetApiState())
  }

  if (!user) {
    return (
      <Button
        label={t('navigation.login')}
        form="round"
        view="secondary"
        iconRight={IconIntroduction}
        onClick={openAuthModal}
      />
    )
  }

  return (
    <>
      <User
        ref={userInfoRef}
        style={{ cursor: 'pointer' }}
        withArrow={true}
        name={user.name}
        onlyAvatar={false}
        size="m"
        onClick={onUserInfoClick}
      />

      {showUserPopover && (
        <Popover
          anchorRef={userInfoRef}
          direction="downStartRight"
          onClickOutside={() => {
            setShowUserPopover(false)
          }}>
          <div className={styles.popover}>
            <Button
              iconLeft={IconExit}
              iconSize="s"
              label="Выйти"
              size="s"
              view="clear"
              width="full"
              onClick={exit}
            />
          </div>
        </Popover>
      )}
    </>
  )
}
