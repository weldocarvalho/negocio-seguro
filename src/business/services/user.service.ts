import prisma from '../../db'

const createUser = async (payload: any) => {
	let user = await findOne(payload.email)

	// TODO: refactor to "user already exists"
	if (!user) {
		const { name, email, password } = payload
		user = await prisma.users.create({
			data: { name, email, password },
		})
	}

	return user
}

const findOne = async (email: string) => {
	return await prisma.users.findFirst({
		where: { email },
	})
}

export { findOne, createUser }
