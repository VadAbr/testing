import type React from 'react'

type TAuthProvider = {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: TAuthProvider) => {
  return children
}
