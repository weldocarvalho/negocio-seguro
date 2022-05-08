import { Router } from 'express'
import { homeRoutes } from './home'
import { signinRoutes } from './signin.router'
import { signupRoutes } from './signup.router'
import { userRoutes } from './user.router'

const router = Router()

signupRoutes(router)
signinRoutes(router)
homeRoutes(router)
userRoutes(router)

export { router }
