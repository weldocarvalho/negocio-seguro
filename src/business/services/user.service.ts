import prisma from '../../db'
import { ISignupAccountModel } from '../../app/protocols/signupAccount.protocol'
import { hashPassword } from '../../utils/encrypter'
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from '../../app/errors/errorTypes'

// I don't know if it is correct return void for a Promise
const createUser = async (userCredentials: ISignupAccountModel) => {
	const { name, email, password, phone } = userCredentials
	const user = await prisma.users.findFirst({
		where: { email },
	})

	if (user) {
		throw {
			statusCode: 422,
			message: USER_ALREADY_EXISTS,
		}
	}

	await prisma.users.create({
		data: {
			name,
			email,
			password: hashPassword(password),
			phone,
		},
	})
}

const findOne = async (email: string) => {
	const user = await prisma.users.findFirst({
		where: { email },
	})

	if (user === null) {
		throw {
			statusCode: 422,
			message: USER_NOT_FOUND,
		}
	}

	return user
}

export { findOne, createUser }
