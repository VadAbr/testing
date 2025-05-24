import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconSmileStroked } from '@consta/icons/IconSmileStroked'
import { Text } from '@consta/uikit/Text'

import { AgainButton } from './utils'

import styles from './styles.css'

export const AllCool = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.cool}>
      <IconSmileStroked className={styles.icon} size="l" view="link" />
      <Text size="l" style={{ maxWidth: 805 }}>
        {t('testResults.allCoolText')}
      </Text>

      <AgainButton />
    </div>
  )
}
