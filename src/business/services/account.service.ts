import prisma from '../../db'
import { USER_NOT_FOUND } from '../../app/errors/errorTypes'
import { create, update } from '../../repo/account.repository'
import { IUpdateAccount } from '../protocols/account.protocol'

const createAccount = async (name: string, email: string, hashedPassword: string) => {
	try {
		await create({ name, email, hashedPassword })
	} catch (error) {
		console.error(error)
		throw error
	}
}

// TODO: move to account.repository
const findAccount = async (email: string) => {
	const user = await prisma.account.findFirst({
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

const updateAccount = async (email: string, userData: IUpdateAccount) => {
	update(email, userData)
}

export { findAccount, createAccount, updateAccount }
