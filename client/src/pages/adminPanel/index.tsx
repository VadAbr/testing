import React from 'react'
import { Navigate } from 'react-router-dom'
import { Loader } from '@consta/uikit/Loader'

import { TestApi } from '@entities/test'
import { PATHS } from '@shared/constants'
import { useUserInfo } from '@shared/store'
import { PageContent } from '@shared/ui'
import { TestList } from '@widgets/testList'

export const AdminPanel = () => {
  const { data, isFetching } = TestApi.useGetAllTestQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const { isAdmin } = useUserInfo()

  if (!isAdmin) {
    return <Navigate to={PATHS.root} />
  }

  if (isFetching) {
    return (
      <PageContent>
        <Loader className="loaderFullContent" />
      </PageContent>
    )
  }

  return (
    <PageContent>
      <TestList tests={data ?? []} />
    </PageContent>
  )
}
