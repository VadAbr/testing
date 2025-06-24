import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tabs } from '@consta/uikit/Tabs'

import { LanguageSwitch } from '@features/languageSwitch'
import { LoginBtn } from '@features/loginBtn'
import { PATHS } from '@shared/constants'
import { useUserInfo } from '@shared/store'
import { Toolbar } from '@shared/ui'

import styles from './styles.css'

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.toolbarWrapper}>
        <Toolbar className={styles.toolbar} left={<Left />} right={<Right />} />
      </div>
    </div>
  )
}

const Right = () => {
  return (
    <div className={styles.right}>
      <LanguageSwitch />

      <LoginBtn />
    </div>
  )
}

type TabItem = {
  path: string
  label: string
}

const ITEMS: TabItem[] = [
  { path: PATHS.root, label: 'mainPageLabel' },
  { path: PATHS.info, label: 'infoPageLabel' },
  { path: PATHS.demo, label: 'demoPageLabel' },
  { path: PATHS.test, label: 'testPageLabel' },
]

const ADMIN_ITEMS: TabItem[] = [{ path: PATHS.adminPanel, label: 'adminPanel' }]

const Left = () => {
  const [isHidden, setIsHidden] = useState(false)
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isAdmin } = useUserInfo()

  const routes = isAdmin ? [...ITEMS, ...ADMIN_ITEMS] : ITEMS

  useEffect(() => {
    // искусственно анмаунтим табы для корректного ререндера с новым текстом
    setIsHidden(true)
    const timer = setTimeout(() => {
      setIsHidden(false)
    }, 0)

    return () => {
      clearTimeout(timer)
    }
  }, [i18n.language])

  const value = routes.find(el => el.path === pathname)

  const onClick = (item: TabItem) => {
    navigate(item.path)
  }

  if (isHidden) {
    return null
  }

  return (
    <Tabs
      className={styles.menu}
      view="clear"
      items={routes}
      value={value}
      getItemLabel={item => t(`navigation.${item.label}`)}
      onChange={onClick}
    />
  )
}
