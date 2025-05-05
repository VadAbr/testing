import React, { Suspense } from 'react'
import { Outlet } from 'react-router'
import { Loader } from '@consta/uikit/Loader'

export const Layout = () => {
  return (
    <Suspense fallback={<Loader className="loaderFullContent" />}>
      <Outlet />
    </Suspense>
  )
}
