import React, { useEffect, useRef } from 'react'
import { Loader } from '@consta/uikit/Loader'

import { AuthApi } from '@shared/store'

type TAuthProvider = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: TAuthProvider) => {
  const isFired = useRef(false)
  const { isFetching } = AuthApi.useTryAuthQuery(undefined, { skip: isFired.current })

  useEffect(() => {
    if (isFetching) {
      isFired.current = true
    }
  }, [isFetching])

  if (isFetching) {
    return <Loader className="loaderFullContent" />
  }

  return children
}
