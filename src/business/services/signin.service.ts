import { compareSync } from 'bcryptjs'
import { INVALID_EMAIL, PASSWORD_DOES_NOT_MATCH } from '../../app/errors/errorTypes'
import { generateTokenJWT } from '../../utils/tokenJWT'
import { emailValidator } from '../../utils/validator'
import { findOne } from './user.service'

const signinService = async (email: string, password: string) => {
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

		return { token: generateTokenJWT(user.id, user.email) }
	} catch (error: any) {
		console.error(error)
		throw error
	}
}

const passwordConfirmation = (password: string, hashPassword: string) => {
	return compareSync(password, hashPassword)
}

export { signinService }
