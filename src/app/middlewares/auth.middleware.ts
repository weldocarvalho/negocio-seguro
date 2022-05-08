import { verifyTokenJWT } from '../../utils/tokenJWT'
import { INVALID_OR_EXPIRATED_TOKEN, LOGIN_REQUIRED } from '../errors/errorTypes'
import { IHttpRequest, IHttpResponse } from '../protocols/http.protocol'
import { IMiddleware } from '../protocols/middleware.protocol'

export const authMiddleware: IMiddleware = {
	handle: async (req: IHttpRequest): Promise<IHttpResponse> => {
		const { authorization } = req.headers

		if (!authorization) {
			return {
				statusCode: 403,
				body: LOGIN_REQUIRED,
			}
		}
		const [, token] = authorization.split(' ')

		try {
			const result = verifyTokenJWT(token)
			return {
				statusCode: 200,
				body: { result },
			}
		} catch (error) {
			return {
				statusCode: 403,
				body: INVALID_OR_EXPIRATED_TOKEN,
			}
		}
	},
}
