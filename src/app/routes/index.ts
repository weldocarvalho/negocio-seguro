import { Request, Response, Router } from 'express'
import { signupRoutes } from './signup.router'
import { userRoutes } from './user.router'

const router = Router()

// home
router.get('/', (req: Request, res: Response) => {
	res.send('alive')
})

userRoutes(router)
signupRoutes(router)

export { router }
