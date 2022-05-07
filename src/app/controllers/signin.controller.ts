import { signinService } from '../../business/services/signin.service'
import { MISSING_PARAM } from '../errors/errorTypes'
import { IController } from '../protocols/controller.protocol'
import { IHttpRequest, IHttpResponse } from '../protocols/http.protocol'

export const singinController: IController = {
	handle: async (req: IHttpRequest): Promise<IHttpResponse> => {
		const requiredFields = ['email', 'password']
		const errors: string[] = []

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
			const user = await signinService(email, password)
			return {
				statusCode: 200,
				body: user,
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
