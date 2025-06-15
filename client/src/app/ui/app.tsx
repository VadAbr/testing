import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { presetGpnDefault, Theme } from '@consta/uikit/Theme'

import { AuthProvider } from '@app/provider'
import { withNotifications } from '@shared/store'
import { LoginOrRegistrModal } from '@widgets/registrationForm'

import '../i18n'

import { appRouter } from '../router'
import { appStore } from '../store'

import '../styles/reset.css'
import '../styles/global.css'

const AppWithNotifications = withNotifications(<RouterProvider router={appRouter} />)

console.log('ads', process.env.REACT_APP_API_URL)
export const App = () => (
  <Theme preset={presetGpnDefault}>
    <ReduxProvider store={appStore}>
      <AuthProvider>
        <AppWithNotifications />
        <LoginOrRegistrModal />
      </AuthProvider>
    </ReduxProvider>
  </Theme>
)
