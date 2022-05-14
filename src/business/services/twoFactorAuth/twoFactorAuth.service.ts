import { twoFAgenerateCode } from './twoFAgenerateCode.service'
import { findOne } from '../user.service'

export const twoFactorAuthService = async (email: string, mobileNumber = null) => {
	try {
		// pedido de envio do código/token para o celular
		if (mobileNumber) {
			await twoFAgenerateCode(mobileNumber)
		} else {
			const { phone } = await findOne(email)

			if (!phone) {
				throw {
					statusCode: 422,
					message: 'MOBILE_NUMBER_NOT_FOUND',
				}
			}

			await twoFAgenerateCode(phone)
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}
