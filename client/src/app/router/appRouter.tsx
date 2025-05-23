import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { InfoPage } from '@pages/info'
import { MainPage } from '@pages/main'
import { NotFoundPage } from '@pages/notFound'
import { TestPage } from '@pages/test'
import { TestResultsPage } from '@pages/testResults'
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
        element: <MainPage />,
        handle: {
          noWrapper: true,
        },
      },
      {
        path: PATHS.info,
        element: <InfoPage />,
        handle: {
          noWrapper: true,
        },
      },
      {
        path: PATHS.test,
        element: <TestPage />,
      },
      {
        path: PATHS.testResult,
        element: <TestResultsPage />,
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
