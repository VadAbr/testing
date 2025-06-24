import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconSmileStroked } from '@consta/icons/IconSmileStroked'
import { Text } from '@consta/uikit/Text'

import { AgainButton, DemoButton } from './utils'

import styles from './styles.css'

type Props = {
  demoAction?: () => void
}

export const AllCool = ({ demoAction }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={styles.cool}>
      <IconSmileStroked className={styles.icon} size="l" view="link" />
      <Text size="l" style={{ maxWidth: 805 }}>
        {t('testResults.allCoolText')}
      </Text>

      {demoAction ? <DemoButton onClick={demoAction} /> : <AgainButton />}
    </div>
  )
}
