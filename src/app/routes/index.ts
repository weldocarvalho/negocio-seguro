import { Request, Response, Router } from 'express'
import { signinRoutes } from './signin.router'
import { signupRoutes } from './signup.router'
import { userRoutes } from './user.router'

const router = Router()

// home
router.get('/', (req: Request, res: Response) => {
	res.send('alive')
})

signupRoutes(router)
signinRoutes(router)
userRoutes(router)

export { router }
