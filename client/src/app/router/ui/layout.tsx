import React, { Suspense } from 'react'
import { Outlet } from 'react-router'
import { useLocation } from 'react-router-dom'
import { Loader } from '@consta/uikit/Loader'
import { cnMixScrollBar } from '@consta/uikit/MixScrollBar'

import { PATHS } from '@shared/constants'
import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'

const URLS_FOR_FOOTER = [PATHS.root, PATHS.info]

export const Layout = () => {
  const { pathname } = useLocation()
  const isFooterActive = URLS_FOR_FOOTER.includes(pathname)

  return (
    <>
      <Header />

      <Suspense fallback={<Loader className="loaderFullContent" />}>
        <div
          ref={el => el?.scroll(0, 0)}
          className={cnMixScrollBar()}
          style={{ height: '100%', overflowY: 'auto' }}>
          <Outlet />
          {isFooterActive && <Footer />}
        </div>
      </Suspense>
    </>
  )
}
