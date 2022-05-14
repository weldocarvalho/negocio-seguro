import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/expressRoute.adapter'
import { singinController } from '../controllers/signin.controller'

export const signinRoutes = (router: Router): void => {
	router.post('/signin', expressRouteAdapter(singinController))
}
