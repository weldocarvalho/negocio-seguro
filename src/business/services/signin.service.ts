import { compareSync } from 'bcryptjs'
import { INVALID_EMAIL, PASSWORD_DOES_NOT_MATCH } from '../../app/errors/errorTypes'
import { generateTokenJWT } from '../../utils/tokenJWT'
import { emailValidator } from '../../utils/validator'
import { twoFactorAuthService } from './twoFactorAuth/twoFactorAuth.service'
import { findOne } from './user.service'

const signinService = async (email: string, password: string, isFromSignup = false) => {
	if (!emailValidator(email)) {
		throw {
			statusCode: 400,
			message: `${INVALID_EMAIL}`,
		}
	}

	try {
		const user = await findOne(email)
		const hashPassword = user.password

		if (!passwordConfirmation(password, hashPassword)) {
			throw {
				statusCode: 400,
				message: `${PASSWORD_DOES_NOT_MATCH}`,
			}
		}

		const token = generateTokenJWT(user.id, user.email)

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
