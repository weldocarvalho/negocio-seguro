import validator from 'validator'

export const emailValidator = (email: string): boolean => {
	return validator.isEmail(email)
}

export const mobilePhoneValidator = (phone: string) => {
	return validator.isMobilePhone(phone)
}
