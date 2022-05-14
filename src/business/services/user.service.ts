import prisma from '../../db'
import { ISignupAccountModel } from '../../app/protocols/signupAccount.protocol'
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from '../../app/errors/errorTypes'

const createUser = async ({ name, email, hashedPassword }: ISignupAccountModel) => {
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
			password: hashedPassword,
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
