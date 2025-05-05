import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { Responses403 } from '@consta/uikit/Responses403'

export const IndexPage = ({ errorMessage }: { errorMessage?: string }) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Responses403
        size="m"
        title="Нет доступа"
        description={errorMessage}
        actions={
          <Button
            label="Вернуться назад"
            size="s"
            view="ghost"
            data-testid="backBtn"
            onClick={goBack}
          />
        }
      />
    </Layout>
  )
}
