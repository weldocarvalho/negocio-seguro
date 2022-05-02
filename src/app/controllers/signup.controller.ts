import { signupService } from '../../business/services/signup.service'
import { createUser } from '../../business/services/user.service'
import { IController } from '../protocols/controller.protocol'
import { IHttpRequest, IHttpResponse } from '../protocols/http.protocol'

export const signupController: IController = {
	handle: async (req: IHttpRequest): Promise<IHttpResponse> => {
		const { name, email, password } = req.body

		try {
			const userData = signupService(name, email, password)
			const newUser = await createUser(userData)

			return {
				statusCode: 201,
				body: newUser,
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
