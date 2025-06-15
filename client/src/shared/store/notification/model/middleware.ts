import { createListenerMiddleware, isAsyncThunkAction, isRejected } from '@reduxjs/toolkit'

import { getServerErrorMessage } from '../libs'

import type { Item } from './slice'
import { NotificationSlice } from './slice'
import type { TApiAction } from './types'

export const NotificationMiddleware = createListenerMiddleware()

/**
 * Отслеживание событий apiSlice на успешные/ошибочные запросы к серверу и добавление уведомлений об этом
 */
NotificationMiddleware.startListening({
  predicate: action => {
    return isAsyncThunkAction(action)
  },
  effect: (action, api) => {
    const apiAction = action as typeof action & TApiAction
    const { message: customMessage, isMessageDisabled = false } = apiAction.meta.baseQueryMeta ?? {}
    const { payload = {} } = apiAction

    if (isMessageDisabled) {
      return
    }

    const serverErrorMessage = getServerErrorMessage(payload)

    if (!customMessage && !serverErrorMessage) {
      return
    }

    const message = customMessage || serverErrorMessage || 'notification.someError'

    const newNotification: Item = {
      key: apiAction.meta.requestId,
      showProgress: 'line',
      autoClose: 2,
      message,
      status: isRejected(apiAction) ? 'alert' : 'success',
      onClose: () =>
        api.dispatch(NotificationSlice.actions.deleteNotification(apiAction.meta.requestId)),
    }
    api.dispatch(NotificationSlice.actions.addNotification(newNotification))
  },
})
