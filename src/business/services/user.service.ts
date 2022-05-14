import prisma from '../../db'
import { USER_NOT_FOUND } from '../../app/errors/errorTypes'
import { create } from '../../repo/account.repository'

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

export { findOne, createUser }
