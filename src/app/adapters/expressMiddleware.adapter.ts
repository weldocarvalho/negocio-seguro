import { NextFunction, Request, Response } from 'express'
import { IHttpRequest } from '../protocols/http.protocol'
import { IMiddleware } from '../protocols/middleware.protocol'
import { jwtPayload } from '../protocols/jwtPayload.protocol'

export const expressMiddlewareAdapter = (middleware: IMiddleware) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const httpRequest: IHttpRequest = { headers: req.headers }
		const httpResponse = await middleware.handle(httpRequest)

		if (httpResponse.statusCode === 200) {
			const jwtPayload: jwtPayload = httpResponse.body.result
			const { id, email } = jwtPayload

			req.id = id
			req.email = email

			next()
		} else {
			res.status(httpResponse.statusCode).json(httpResponse.body)
		}
	}
}
