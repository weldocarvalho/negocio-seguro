import express, { Express } from 'express'
import { router } from '../routes'

const setupMiddlewares = (app: Express): void => {
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use(router)
}

export default setupMiddlewares
