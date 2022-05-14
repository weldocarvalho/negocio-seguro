import prisma from '../../db'
import { USER_NOT_FOUND } from '../../app/errors/errorTypes'
import { create, update } from '../../repo/account.repository'
import { IUpdateAccountModelType } from '../protocols/account.protocol'

const createUser = async (name: string, email: string, hashedPassword: string) => {
	try {
		await create({ name, email, hashedPassword })
	} catch (error) {
		console.error(error)
		throw error
	}
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

const updateUser = async (email: string, userData: IUpdateAccountModelType) => {
	update(email, userData)
}

export { findOne, createUser, updateUser }
