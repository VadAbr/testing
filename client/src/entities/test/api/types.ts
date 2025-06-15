// eslint-disable-next-line import/no-internal-modules
import type { TestResult } from '@widgets/test/model'

export type GetTestResponse = string

export type GetAllTestsResponse = {
  id: string
  result?: TestResult
  user: User
  userId: string
  status: 'success' | 'pending'
  isAskedForHelp?: boolean
  createdAt: Date
}[]

export type CompleteTestResponse = boolean

type User = {
  id: string
  name: string
  password: string
  age: number
  email: string
  workExperience: number
  position: string
  isSatisfied: boolean
  isAdmin?: boolean
}
