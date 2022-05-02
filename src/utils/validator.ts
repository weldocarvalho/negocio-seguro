import validator from 'validator'

export const emailValidator = (email: string): boolean => {
	return validator.isEmail(email)
}
