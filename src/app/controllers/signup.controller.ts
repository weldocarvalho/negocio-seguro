import { createUser } from '../../business/services/user.service'
import { emailValidator } from '../../utils/validator'
import { IController } from '../protocols/controller.protocol'
import { IHttpRequest, IHttpResponse } from '../protocols/http.protocol'

export const signupController: IController = {
	handle: async (req: IHttpRequest): Promise<IHttpResponse> => {
		const requiredFields = ['name', 'email', 'password']
		const errors: string[] = []

		for (const field of requiredFields) {
			if (!req.body[field]) {
				errors.push(`Missing param error: ${field}`)
			}
		}

		if (!emailValidator(req.body.email)) {
			errors.push('Invalid email')
		}

		if (errors.length > 0) {
			return {
				statusCode: 400,
				body: errors,
			}
		}

		const newUser = await createUser(req.body)
		return {
			statusCode: 201,
			body: newUser,
		}
	},
}
