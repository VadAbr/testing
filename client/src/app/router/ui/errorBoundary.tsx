import React from 'react'
import { useRouteError } from 'react-router-dom'
import { IconRestart } from '@consta/icons/IconRestart'
import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { Responses500 } from '@consta/uikit/Responses500'

const reloadPage = () => {
  window.location.reload()
}

export const ErrorBoundary = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <Layout style={{ height: '100%' }}>
      <Responses500
        size="m"
        title="Что-то сломалось"
        description="Попробуйте обновить страницу или зайдите позже"
        actions={
          <Button
            label="Перезагрузить страницу"
            size="s"
            iconLeft={IconRestart}
            iconSize="s"
            view="ghost"
            onClick={reloadPage}
          />
        }
      />
    </Layout>
  )
}
