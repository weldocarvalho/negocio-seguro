import { Request, Response, Router } from 'express'
import { signupController } from '../controllers/signup.controller'
import { userController } from '../controllers/user.controller'

const router = Router()

// home
router.get('/', (req: Request, res: Response) => {
	res.send('alive')
})

// user
router.post('/user', userController.create)
router.get('/user', userController.find)

// signup
router.post('/signup', signupController.handle)

export { router }
