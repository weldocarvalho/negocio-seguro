import { compareSync } from 'bcryptjs'
import { INVALID_EMAIL, PASSWORD_DOES_NOT_MATCH } from '../../app/errors/errorTypes'
import { generateTokenJWT } from '../../utils/tokenJWT'
import { emailValidator } from '../../utils/validator'
import { twoFactorAuthService } from './twoFactorAuth/twoFactorAuth.service'
import { findAccount } from './account.service'

const signinService = async (email: string, password: string, isFromSignup = false) => {
	if (!emailValidator(email)) {
		throw {
			statusCode: 400,
			message: `${INVALID_EMAIL}`,
		}
	}

	try {
		const account = await findAccount(email)
		const hashPassword = account.password

		if (!passwordConfirmation(password, hashPassword)) {
			throw {
				statusCode: 400,
				message: `${PASSWORD_DOES_NOT_MATCH}`,
			}
		}

		const token = generateTokenJWT(account.id, account.email)

		if (!isFromSignup) {
			await twoFactorAuthService(email)
			return { token, codeReceiptConfirmation: true }
		}

		return { token }
	} catch (error: any) {
		console.error(error)
		throw error
	}
}

const passwordConfirmation = (password: string, hashPassword: string) => {
	return compareSync(password, hashPassword)
}

export { signinService }
