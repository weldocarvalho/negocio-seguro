import { createUser } from '../../business/services/user.service'
import { IController } from '../protocols/controller.protocol'
import { IHttpRequest, IHttpResponse } from '../protocols/http.protocol'

export const signupController: IController = {
	handle: async (req: IHttpRequest): Promise<IHttpResponse> => {
		const requiredFields = ['name', 'email', 'password']

		for (const field of requiredFields) {
			if (!req.body[field]) {
				return {
					statusCode: 400,
					body: `Missing param error: ${field}`,
				}
			}
		}

		const newUser = await createUser(req.body)
		return {
			statusCode: 201,
			body: newUser,
		}
	},
}
