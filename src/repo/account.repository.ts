import { USER_ALREADY_EXISTS } from '../app/errors/errorTypes'
import { ISignupAccountModel } from '../app/protocols/signupAccount.protocol'
import prisma from '../db'

const create = async ({ name, email, hashedPassword }: ISignupAccountModel) => {
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

export { create }
