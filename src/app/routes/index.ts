import { Router } from 'express'
import { homeRoutes } from './home'
import { signinRoutes } from './signin.router'
import { signupRoutes } from './signup.router'
import { twoFactorAuthRouter } from './twoFactorAuth.router'

const router = Router()

signupRoutes(router)
signinRoutes(router)
twoFactorAuthRouter(router)
homeRoutes(router)

export { router }
