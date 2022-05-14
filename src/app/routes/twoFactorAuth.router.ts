import { Router } from 'express'
import { expressMiddlewareAdapter } from '../adapters/expressMiddleware.adapter'
import { expressRouteAdapter } from '../adapters/expressRoute.adapter'
import { twoFactorAuthController } from '../controllers/twoFactorAuth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

export const twoFactorAuthRouter = (router: Router): void => {
	router.post(
		'/twofactorauth',
		expressMiddlewareAdapter(authMiddleware),
		expressRouteAdapter(twoFactorAuthController)
	)
}
