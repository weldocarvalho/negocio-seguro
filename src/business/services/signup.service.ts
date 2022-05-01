import { emailValidator } from '../../utils/validator'

const signupService = (name: string, email: string, password: string) => {
	const requiredFields = [name, email, password]
	const errors: string[] = []

	// TODO: refactor to return the field value (it's returning Missing param errror: undefined)
	for (const field of requiredFields) {
		if (!field) {
			errors.push(`Missing param error: ${field}`)
		}
	}

	if (!emailValidator(email)) {
		errors.push('Invalid email')
	}

	if (errors.length > 0) {
		throw errors
	}

	return { name, email, password }
}

export { signupService }
