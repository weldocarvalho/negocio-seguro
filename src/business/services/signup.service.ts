import { INVALID_EMAIL, MISSING_PARAM } from '../../app/errors/errorTypes'
import { emailValidator } from '../../utils/validator'

const signupService = (name: string, email: string, password: string) => {
	const requiredFields = [name, email, password]
	const errors: string[] = []

	// TODO: refactor to return the field value (it's returning Missing param errror: undefined)
	for (const field of requiredFields) {
		if (!field) {
			errors.push(`${MISSING_PARAM}${field}`)
		}
	}

	try {
		emailValidator(email)
	} catch (error) {
		console.error(error)
		errors.push(INVALID_EMAIL)
	}

	if (errors.length > 0) {
		throw {
			statusCode: 400,
			message: errors,
		}
	}

	return { name, email, password }
}

export { signupService }
