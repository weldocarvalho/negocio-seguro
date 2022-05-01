import prisma from '../../db'
import { IAccountModel } from '../../business/protocols/account.protocol'
import { ISignupAccountModel } from '../../app/protocols/signupAccount.protocol'

const createUser = async (userData: ISignupAccountModel): Promise<IAccountModel> => {
	const { name, email, password } = userData
	const user = await findOne(email)

	// TODO: refactor 'cause it's returning an empty object (everything all right on console tough)
	if (user) {
		throw new Error('User already exists')
	}

	// TODO: password must not return !
	return await prisma.users.create({
		data: { name, email, password },
	})
}

const findOne = async (email: string) => {
	return await prisma.users.findFirst({
		where: { email },
	})
}

export { findOne, createUser }
