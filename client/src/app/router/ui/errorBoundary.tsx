import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteError } from 'react-router-dom'
import { IconRestart } from '@consta/icons/IconRestart'
import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { Responses500 } from '@consta/uikit/Responses500'

import { PageContent } from '@shared/ui'

const reloadPage = () => {
  window.location.reload()
}

export const ErrorBoundary = () => {
  const { t } = useTranslation()
  const error = useRouteError()
  console.error(error)

  return (
    <PageContent>
      <Layout style={{ height: '100%' }}>
        <Responses500
          size="l"
          title={t('errorBoundary.title')}
          description={t('errorBoundary.description')}
          actions={
            <Button
              label={t('errorBoundary.reload')}
              size="m"
              iconLeft={IconRestart}
              iconSize="s"
              view="ghost"
              onClick={reloadPage}
            />
          }
        />
      </Layout>
    </PageContent>
  )
}
