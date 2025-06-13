import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconWarning } from '@consta/icons/IconWarning'
import { Text } from '@consta/uikit/Text'

import { AgainButton } from './utils'

import styles from './styles.css'

export const AllBad = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.cool}>
      <IconWarning size="l" view="alert" className={styles.icon} />
      <Text size="l">{t('testResults.allBadText')}</Text>
      <Text size="l">{t('testResults.allBadSubText')}</Text>

      <AgainButton isAllBad={true} />
    </div>
  )
}
