import React from 'react'
import { useTranslation } from 'react-i18next'
import { IconWarning } from '@consta/icons/IconWarning'
import { Text } from '@consta/uikit/Text'

import { AgainButton, DemoButton } from './utils'

import styles from './styles.css'

type Props = {
  demoAction?: () => void
}

export const AllBad = ({ demoAction }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={styles.cool}>
      <IconWarning size="l" view="alert" className={styles.icon} />
      <Text size="l">{t('testResults.allBadText')}</Text>
      <Text size="l">{t('testResults.allBadSubText')}</Text>

      {demoAction ? <DemoButton onClick={demoAction} /> : <AgainButton isAllBad={true} />}
    </div>
  )
}
