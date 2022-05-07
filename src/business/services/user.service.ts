import prisma from '../../db'
import { IAccountModel } from '../../business/protocols/account.protocol'
import { ISignupAccountModel } from '../../app/protocols/signupAccount.protocol'
import { hashPassword } from '../../utils/encrypter'
import { USER_ALREADY_EXISTS, USER_NOT_FOUND } from '../../app/errors/errorTypes'

const createUser = async (userData: ISignupAccountModel): Promise<IAccountModel> => {
	const { name, email, password } = userData
	const user = await prisma.users.findFirst({
		where: { email },
	})

	if (user) {
		throw {
			statusCode: 422,
			message: USER_ALREADY_EXISTS,
		}
	}

	// TODO: password must not return !
	return await prisma.users.create({
		data: { name, email, password: hashPassword(password) },
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
