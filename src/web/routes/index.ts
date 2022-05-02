import { Request, Response, Router } from 'express'
import { userController } from '../controllers/user.controller'

const router = Router()

router.get('/', (req: Request, res: Response) => {
	res.send('alive')
})

router.post('/user', userController.create)
router.get('/user', userController.find)

export { router }
