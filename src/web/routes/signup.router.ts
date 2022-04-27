import { Router } from 'express'
import { expressRouteAdapter } from '../config/expressRoute.adapter'
import { signupController } from '../controllers/signup.controller'

export const signupRoutes = (router: Router): void => {
	router.post('/signup', expressRouteAdapter(signupController))
}
