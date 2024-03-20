import { type Request, type Response } from 'express'
import Route from './route'
import { apiErrorMsg } from '../middlewares/error-handler'

class RootRoute extends Route {
  constructor () {
    super()
    this.setRoutes()
  }

  protected setRoutes (): void {
    this.router.get('/',
      (req: Request, res: Response): Record<string, any> => res.send('Here is my home page')
    )
    this.router.use('/', apiErrorMsg)
  }
}

export default RootRoute
