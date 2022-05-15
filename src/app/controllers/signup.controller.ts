import { signupService } from '../../business/services/signup.service'
import { MISSING_PARAM } from '../errors/errorTypes'
import { IController } from '../protocols/controller.protocol'
import { IHttpRequest, IHttpResponse } from '../protocols/http.protocol'

export const signupController: IController = {
	handle: async (req: IHttpRequest): Promise<IHttpResponse> => {
		const requiredFields = ['email', 'password']
		const errors: string[] = []

		// TODO: add empty string validation
		for (const field of requiredFields) {
			if (!req.body[field]) {
				errors.push(`${MISSING_PARAM}${field}`)
			}
		}

		if (errors.length > 0) {
			return {
				statusCode: 400,
				body: errors,
			}
		}

		const { email, password } = req.body

		try {
			const { token } = await signupService(email, password)

			return {
				statusCode: 201,
				body: { email, token },
			}
		} catch (error: any) {
			console.error(error)
			return {
				statusCode: error.statusCode,
				body: error.message,
			}
		}
	},
}
