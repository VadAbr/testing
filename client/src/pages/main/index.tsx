import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IconEdit } from '@consta/icons/IconEdit'
import { IconLineAndBarChart } from '@consta/icons/IconLineAndBarChart'
import { IconSearchStroked } from '@consta/icons/IconSearchStroked'
import { Button } from '@consta/uikit/Button'
import { Text } from '@consta/uikit/Text'

import { PATHS } from '@shared/constants'
import { PageContent } from '@shared/ui'

import styles from './styles.css'

export const MainPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const openInfo = () => {
    navigate(PATHS.info)
  }

  const openTest = () => {
    navigate(PATHS.test)
  }

  return (
    <PageContent className={styles.container}>
      <div className={styles.page}>
        <Text size="5xl" weight="semibold">
          {t('mainPageContent.text1')}
        </Text>

        <Text size="xl" view="secondary" weight="semibold" style={{ maxWidth: 800 }}>
          {t('mainPageContent.text1subText')}
        </Text>

        <div className={styles.info}>
          <IconLineAndBarChart size="l" view="link" />
          <Text weight="medium" size="l" style={{ maxWidth: 800 }}>
            {t('mainPageContent.text2')}
          </Text>
        </div>

        <Text size="3xl" weight="semibold">
          {t('mainPageContent.text4')}
        </Text>

        <div className={styles.btns}>
          <Button
            iconLeft={IconSearchStroked}
            size="l"
            label={t('mainPageContent.goToInfo1')}
            onClick={openInfo}
          />

          <Button
            iconLeft={IconEdit}
            size="l"
            view="secondary"
            label={t('mainPageContent.goToTest1')}
            onClick={openTest}
          />
        </div>
      </div>
    </PageContent>
  )
}
