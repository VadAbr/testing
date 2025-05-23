import React, { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@consta/uikit/Loader'

import { Header } from '@widgets/header'

export const Layout = () => {
  return (
    <>
      <Header />

      <Suspense fallback={<Loader className="loaderFullContent" />}>
        <Outlet />
      </Suspense>
    </>
  )
}
