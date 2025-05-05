import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { presetGpnDefault, Theme } from '@consta/uikit/Theme'

import '../i18n'

import { appRouter } from '../router'
import { appStore } from '../store'

import '../styles/reset.css'
import '../styles/global.css'

export const App = () => (
  <Theme preset={presetGpnDefault}>
    <ReduxProvider store={appStore}>
      <RouterProvider router={appRouter} />
    </ReduxProvider>
  </Theme>
)
