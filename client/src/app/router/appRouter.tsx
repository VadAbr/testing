import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { NotFoundPage } from '@pages/notFound'
import { PATHS } from '@shared/constants'
import type { TRouteObjectWithMeta } from '@shared/types'

import { ErrorBoundary, Layout } from './ui'

export const routes: TRouteObjectWithMeta[] = [
  {
    path: PATHS.root,
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <div>test</div>,
      },
    ],
  },
  {
    path: PATHS.other,
    element: <Layout />,
    children: [
      {
        path: PATHS.other,
        element: <NotFoundPage />,
      },
    ],
  },
]

export const appRouter = createBrowserRouter(routes)
