import { compareSync } from 'bcryptjs'
import { INVALID_EMAIL, PASSWORD_DOES_NOT_MATCH } from '../../app/errors/errorTypes'
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
		const user = await findUserByEmail(email)
		const hashPassword = user.password

		if (!passwordConfirmation(password, hashPassword)) {
			throw {
				statusCode: 400,
				message: `${PASSWORD_DOES_NOT_MATCH}`,
			}
		}

		return user
	} catch (error: any) {
		console.error(error)
		throw {
			statusCode: error.statusCode,
			message: error.message,
		}
	}
}

const findUserByEmail = async (email: string) => {
	return await findOne(email)
}

const passwordConfirmation = (password: string, hashPassword: string) => {
	return compareSync(password, hashPassword)
}

export { signinService }
