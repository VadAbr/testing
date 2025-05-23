import { matchRoutes, useLocation } from 'react-router-dom'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { routes } from '@app/router'

/**
 * Получить объект роутинга для активной или переданной страницы
 * @param locationPath
 * @returns {{parentRoute, currentRoute}} объект с текущим роутом и родительским
 */
export function useGetRoute(locationPath?: string) {
  const { pathname } = useLocation()
  const routePath = locationPath || pathname
  const matches = matchRoutes(routes, location)
  const currentRoute = matches?.findLast(route => route.pathname === routePath) ?? null

  console.log(matches)
  return {
    currentRoute,
  }
}

export * from './store'
