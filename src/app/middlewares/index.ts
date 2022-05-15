import express, { Express } from 'express'
import cors from './cors.middleware'

const setupMiddlewares = (app: Express): void => {
	app.use(cors)
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
}

export default setupMiddlewares
