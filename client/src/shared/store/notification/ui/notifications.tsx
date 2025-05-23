import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { SnackBar } from '@consta/uikit/SnackBar'
import { presetGpnDefault, Theme } from '@consta/uikit/Theme'

import { NotificationSlice } from '../model'

import styles from './styles.css'

export const Notifications = () => {
  const { t } = useTranslation()
  const items = useSelector(NotificationSlice.selectors.getNotifications)
  const translatedItems = Object.values(items).map(el => ({ ...el, message: t(el.message) }))

  return (
    <Theme preset={presetGpnDefault}>
      <div className={styles.notificationContainer}>
        <SnackBar className={styles.notifications} items={translatedItems} />
      </div>
    </Theme>
  )
}
