import { INVALID_EMAIL, INVALID_MOBILE_PHONE } from '../../app/errors/errorTypes'
import { emailValidator, mobilePhoneValidator } from '../../utils/validator'
import { createUser } from './user.service'

const signupService = async (email: string, password: string, phone: string) => {
	const errors: string[] = []

	if (!emailValidator(email)) {
		errors.push(INVALID_EMAIL)
	}

	// TODO: improve phone number validation (add locales)
	if (!mobilePhoneValidator(phone)) {
		errors.push(INVALID_MOBILE_PHONE)
	}

	if (errors.length > 0) {
		throw {
			statusCode: 400,
			message: errors,
		}
	}

	const [name] = email.split('@')

	const userCredentials = {
		name,
		email,
		password,
		phone,
	}

	try {
		await createUser(userCredentials)
	} catch (error: any) {
		console.error(error)
		throw error
	}
}

export { signupService }
