import { genSaltSync, hashSync } from 'bcryptjs'

export const hashPassword = (password: string): string => {
	return hashSync(password, genSaltSync(10))
}
