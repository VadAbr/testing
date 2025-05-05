import React from 'react'
import { useTranslation } from 'react-i18next'

export const MainPage = () => {
  const { t } = useTranslation()

  return <h1>{t('testHello')}</h1>
}
