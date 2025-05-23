import type {
  IndexRouteObject as OldIndexRouteObject,
  NonIndexRouteObject as OldNonIndexRouteObject,
} from 'react-router-dom'

type TRouteMeta = {
  /** Название страницы */
  label?: string
  /** Страница администратора */
  isAdminRoute?: boolean
  noWrapper?: boolean
}

interface IndexRouteObject extends OldIndexRouteObject {
  handle?: TRouteMeta
  children?: undefined
}

interface NonIndexRouteObject extends OldNonIndexRouteObject {
  handle?: TRouteMeta
  children?: TRouteObjectWithMeta[]
}

export type TRouteObjectWithMeta = IndexRouteObject | NonIndexRouteObject
