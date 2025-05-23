import { createAsyncThunk } from '@reduxjs/toolkit'

import type { Item } from '../model'
import { NotificationSlice } from '../model'

type AddNotificationArgs = {
  message: string
  status: 'alert' | 'success'
  id?: string
}

export const addNotification = createAsyncThunk<void, AddNotificationArgs>(
  'addNotification',
  ({ id, message, status }, api) => {
    const dispatch = api.dispatch
    const notificationId = id || self.crypto.randomUUID()
    const notification: Item = {
      key: notificationId,
      showProgress: 'line',
      autoClose: 2,
      message,
      status,
      onClose: () => dispatch(NotificationSlice.actions.deleteNotification(notificationId)),
    }
    dispatch(NotificationSlice.actions.addNotification(notification))
  },
)
