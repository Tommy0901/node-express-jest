import type Route from './route'
import TodoRoute from './todo'
import RootRoute from './root'

export const router: Route[] = [
  new TodoRoute(),
  new RootRoute()
]
