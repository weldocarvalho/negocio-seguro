import { twoFactorAuthService } from '../../business/services/twoFactorAuth/twoFactorAuth.service'
import { updateUser } from '../../business/services/user.service'
import { emailValidator, mobilePhoneValidator } from '../../utils/validator'
import { INVALID_EMAIL, INVALID_MOBILE_PHONE, MISSING_PARAM } from '../errors/errorTypes'
import { IController } from '../protocols/controller.protocol'
import { IHttpRequest, IHttpResponse } from '../protocols/http.protocol'

export const twoFactorAuthController: IController = {
	handle: async (req: IHttpRequest): Promise<IHttpResponse> => {
		const { email, mobileNumber } = req.body
		const requiredFields = ['email', 'mobileNumber']
		const errors: string[] = []

		// TODO: refactor this part

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

		if (!emailValidator(email)) {
			errors.push(INVALID_EMAIL)
		}

		// TODO: improve phone number validation (add locales and more)
		if (!mobilePhoneValidator(mobileNumber)) {
			errors.push(INVALID_MOBILE_PHONE)
		}

		if (errors.length > 0) {
			return {
				statusCode: 400,
				body: errors,
			}
		}

		await updateUser(email, {
			phone: mobileNumber,
		})

		try {
			await twoFactorAuthService(email, mobileNumber)
			return {
				statusCode: 200,
				body: { codeReceiptConfirmation: true },
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
