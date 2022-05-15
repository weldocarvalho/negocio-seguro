import { USER_ALREADY_EXISTS } from '../app/errors/errorTypes'
import { ISignupAccount } from '../app/protocols/signupAccount.protocol'
import { IUpdateAccount } from '../business/protocols/account.protocol'
import prisma from '../db'

const create = async ({ name, email, hashedPassword }: ISignupAccount) => {
	const account = await prisma.account.findFirst({
		where: { email },
	})

	if (account) {
		throw {
			statusCode: 422,
			message: USER_ALREADY_EXISTS,
		}
	}

	await prisma.account.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})
}

const update = async (email: string, userData: IUpdateAccount) => {
	await prisma.account.update({
		where: { email },
		data: userData,
	})
}

export { create, update }
