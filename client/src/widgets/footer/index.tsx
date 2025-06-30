import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@consta/uikit/Button'
import { cnMixFlex } from '@consta/uikit/MixFlex'

import { PATHS } from '@shared/constants'

import PDF from './serviceAgreement.pdf'

import styles from './styles.css'

export const Footer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const goToContacts = () => {
    navigate(PATHS.contacts)
  }

  const download = () => {
    const link = document.createElement('a')
    link.href = PDF as string
    link.download = t('footer.serviceAgreement')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={cnMixFlex({ align: 'center', justify: 'center', gap: 's' }, [styles.footer])}>
      <Button label={t('footer.contacts')} view="clear" onClick={goToContacts} />
      <Button label={t('footer.serviceAgreement')} view="clear" onClick={download} />
    </div>
  )
}
