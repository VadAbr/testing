import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IconCommentDeleteFilled } from '@consta/icons/IconCommentDeleteFilled'
import { IconLineAndBarChart } from '@consta/icons/IconLineAndBarChart'
import { IconTarget } from '@consta/icons/IconTarget'
import { IconTeam } from '@consta/icons/IconTeam'
import { Button } from '@consta/uikit/Button'
import { Text } from '@consta/uikit/Text'

import { PATHS } from '@shared/constants'
import { PageContent } from '@shared/ui'

import styles from './styles.css'

export const InfoPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const openTest = () => {
    navigate(PATHS.test)
  }

  return (
    <PageContent className={styles.container}>
      <div className={styles.page}>
        <Text size="3xl" weight="semibold" className={styles.title}>
          {t('infoPageContent.text1')}
        </Text>

        <div className={styles.problemsWrapper}>
          <div className={styles.problem}>
            <IconTeam size="l" view="link" />
            <div>
              <Text size="xl" weight="semibold">
                {t('infoPageContent.problem1')}
              </Text>
              <Text>{t('infoPageContent.problemText1')}</Text>
            </div>
          </div>

          <div className={styles.problem}>
            <IconLineAndBarChart size="l" view="link" />
            <div>
              <Text size="xl" weight="semibold">
                {t('infoPageContent.problem2')}
              </Text>
              <Text>{t('infoPageContent.problemText2')}</Text>
            </div>
          </div>

          <div className={styles.problem}>
            <IconCommentDeleteFilled size="l" view="link" />
            <div>
              <Text size="xl" weight="semibold">
                {t('infoPageContent.problem3')}
              </Text>
              <Text>{t('infoPageContent.problemText3')}</Text>
            </div>
          </div>

          <div className={styles.problem}>
            <IconTarget size="l" view="link" />
            <div>
              <Text size="xl" weight="semibold">
                {t('infoPageContent.problem4')}
              </Text>
              <Text>{t('infoPageContent.problemText4')}</Text>
            </div>
          </div>
        </div>

        <Text size="l" weight="semibold" style={{ maxWidth: 835, whiteSpace: 'pre-line' }}>
          {t('infoPageContent.text2')}
        </Text>

        <div className={styles.btn}>
          <Button size="l" label={t('infoPageContent.goToTest')} onClick={openTest} />
        </div>
      </div>
    </PageContent>
  )
}
