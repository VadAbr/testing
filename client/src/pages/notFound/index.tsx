import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { Responses404 } from '@consta/uikit/Responses404'

import { PageContent } from '@shared/ui'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const goBack = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    navigate(-1, { replace: true })
  }

  return (
    <PageContent>
      <Layout style={{ height: '100%', display: 'flex', flex: 1 }}>
        <Responses404
          size="l"
          title={t('404PageContent.title')}
          description={t('404PageContent.description')}
          actions={
            <Button label={t('404PageContent.back')} size="m" view="ghost" onClick={goBack} />
          }
        />
      </Layout>
    </PageContent>
  )
}
