import { Router } from 'express'
import { signupController } from '../controllers/signup.controller'

export const signupRoutes = (router: Router): void => {
	router.post('/signup', signupController.handle)
}
