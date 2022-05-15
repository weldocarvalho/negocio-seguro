import { twoFAgenerateCode } from './twoFAgenerateCode.service'
import { findAccount } from '../account.service'

export const twoFactorAuthService = async (email: string, mobileNumber = null) => {
	try {
		if (mobileNumber) {
			await twoFAgenerateCode(mobileNumber)
		} else {
			const { mobilePhone } = await findAccount(email)

			if (!mobilePhone) {
				throw {
					statusCode: 422,
					message: 'MOBILE_NUMBER_NOT_FOUND',
				}
			}

			await twoFAgenerateCode(mobilePhone)
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}
