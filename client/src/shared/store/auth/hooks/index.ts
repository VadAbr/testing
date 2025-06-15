import { useAppSelector } from '@shared/hooks'

import { AuthSlice } from '../model'

export const useUserInfo = () => {
  const userInfo = useAppSelector(AuthSlice.selectors.getUser)
  const isAdmin = useAppSelector(AuthSlice.selectors.getIsAdmin)

  return {
    userInfo,
    isAdmin,
  }
}
