import { Router } from 'express'
import { userController } from '../controllers/user.controller'

export const userRoutes = (router: Router): void => {
	router.get('/user', userController.find)
	router.post('/user', userController.create)
}
