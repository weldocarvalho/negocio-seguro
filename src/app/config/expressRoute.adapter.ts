import { Request, Response } from 'express'
import { IController } from '../protocols/controller.protocol'
import { IHttpRequest } from '../protocols/http.protocol'

export const expressRouteAdapter = (controller: IController) => {
	return async (req: Request, res: Response) => {
		const httpRequest: IHttpRequest = { body: req.body }
		const httpResponse = await controller.handle(httpRequest)

		res.status(httpResponse.statusCode).json(httpResponse.body)
	}
}
