import { Router } from 'express'
import { expressRouteAdapter } from '../config/expressRoute.adapter'
import { singinController } from '../controllers/signin.controller'

export const signinRoutes = (router: Router): void => {
	router.post('/auth', expressRouteAdapter(singinController))
}
