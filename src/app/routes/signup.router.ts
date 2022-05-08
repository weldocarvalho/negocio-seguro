import { Router } from 'express'
import { expressRouteAdapter } from '../adapters/expressRoute.adapter'
import { signupController } from '../controllers/signup.controller'

export const signupRoutes = (router: Router): void => {
	router.post('/signup', expressRouteAdapter(signupController))
}
