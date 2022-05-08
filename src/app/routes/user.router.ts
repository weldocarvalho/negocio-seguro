import { Router } from 'express'
import { userController } from '../controllers/user.controller'

export const userRoutes = (router: Router): void => {
	router.post('/user/find', userController.find)
	router.post('/user/create', userController.create)
}
