import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@consta/uikit/Card'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Text } from '@consta/uikit/Text'

import { PageContent } from '@shared/ui'

import styles from './styles.css'

export const ContactsPage = () => {
  const { t } = useTranslation()

  return (
    <PageContent className={styles.container}>
      <div style={{ height: '100%' }} className={cnMixFlex({ align: 'center', justify: 'center' })}>
        <Card className={styles.card}>
          <Text size="3xl" align="center" weight="semibold" style={{ marginBottom: '2rem' }}>
            {t('footer.contacts')}
          </Text>

          <Text align="center">
            {'Email: '}
            <Text view="link" as="span">
              careerfailures13@gmail.com
            </Text>
          </Text>
        </Card>
      </div>
    </PageContent>
  )
}
