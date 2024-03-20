import { type Request, type Response, type NextFunction } from 'express'

export function apiErrorMsg (err: Error, req: Request, res: Response, next: NextFunction): void {
  'status' in err && typeof err.status === 'number'
    ? res.status(err.status).json({
      status: 'error',
      message: err.message
    })
    : res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : err
    })
  next(err)
}
