import express from 'express'
import dotenv from 'dotenv'
import setupMiddlewares from './middlewares'
import { router } from './routes'
dotenv.config()

const app = express()
app.listen(process.env.APP_PORT, () => {
	console.log(`SERVER IS RUNNING AT http://localhost:${process.env.APP_PORT}`)
})

setupMiddlewares(app)
app.use(router)
