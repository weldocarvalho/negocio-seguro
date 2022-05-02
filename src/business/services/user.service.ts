import prisma from '../../db'
import { IAccountModel } from '../../business/protocols/account.protocol'
import { ISignupAccountModel } from '../../app/protocols/signupAccount.protocol'
import { hashPassword } from '../../utils/encrypter'
import { USER_ALREADY_EXISTS } from '../../app/errors/errorTypes'

const createUser = async (userData: ISignupAccountModel): Promise<IAccountModel> => {
	const { name, email, password } = userData
	const user = await findOne(email)

	if (user) {
		// eslint-disable-next-line no-throw-literal
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
	return await prisma.users.findFirst({
		where: { email },
	})
}

export { findOne, createUser }
