import { INVALID_EMAIL } from '../../app/errors/errorTypes'
import { hashPassword } from '../../utils/encrypter'
import { emailValidator } from '../../utils/validator'
import { signinService } from './signin.service'
import { createUser } from './user.service'

const signupService = async (email: string, password: string) => {
	const errors: string[] = []

	if (!emailValidator(email)) {
		errors.push(INVALID_EMAIL)
	}

	if (errors.length > 0) {
		throw {
			statusCode: 400,
			message: errors,
		}
	}

	const [name] = email.split('@')
	const hashedPassword = hashPassword(password)

	try {
		await createUser({ name, email, hashedPassword })
		return await signinService(email, password, true)
	} catch (error: any) {
		console.error(error)
		throw error
	}
}

export { signupService }
