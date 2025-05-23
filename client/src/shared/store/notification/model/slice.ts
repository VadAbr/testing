import type { SnackBarItemDefault } from '@consta/uikit/SnackBar'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

export type Item = Omit<SnackBarItemDefault, 'message'> & { message: string }

type TInitialState = {
  items: Record<string, Item>
}

const initialState: TInitialState = {
  items: {},
}

const getState = (state: TInitialState) => state
const getNotifications = createSelector(getState, state => state.items)

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Item>) => {
      state.items[action.payload.key] = action.payload
    },
    deleteNotification: (state, action: PayloadAction<Item['key']>) => {
      /* C Map работать не будет, дока RTK советуют не использовать Несериализуемые значения
       * https://redux.js.org/style-guide/#do-not-put-non-serializable-values-in-state-or-actions
       * */
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete state.items[action.payload]
    },
  },
  selectors: {
    getNotifications,
  },
})
