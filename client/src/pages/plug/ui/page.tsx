import React from 'react'
import { IconRestart } from '@consta/icons/IconRestart'
import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { Responses503 } from '@consta/uikit/Responses503'

const reloadPage = () => {
  window.location.reload()
}

export const Page = () => (
  <Layout style={{ height: '100%' }}>
    <Responses503
      size="m"
      title="Технические работы"
      description="Скорее всего, мы уже решаем проблему. Попробуйте зайти позже"
      actions={
        <Button
          label="Перезагрузить страницу"
          size="s"
          iconLeft={IconRestart}
          iconSize="s"
          view="ghost"
          data-testid="reloadBtn"
          onClick={reloadPage}
        />
      }
    />
  </Layout>
)
