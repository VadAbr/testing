import { useAppSelector } from '@shared/hooks'

import { AuthSlice } from '../model'

export const useUserInfo = () => {
  return useAppSelector(AuthSlice.selectors.getUser)
}
