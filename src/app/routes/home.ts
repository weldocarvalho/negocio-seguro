import { Router } from 'express'
import { expressMiddlewareAdapter } from '../adapters/expressMiddleware.adapter'
import { authMiddleware } from '../middlewares/auth.middleware'

export const homeRoutes = (router: Router): void => {
	router.get('/', expressMiddlewareAdapter(authMiddleware))
}
