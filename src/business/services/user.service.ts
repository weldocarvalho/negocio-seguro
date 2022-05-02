import prisma from '../../db'

const create = async (payload: any) => {
	let user = await findOne(payload.id)

	if (!user) {
		const { name, email, password } = payload
		user = await prisma.users.create({
			data: { name, email, password },
		})
	}

	return user
}

const findOne = async (userId: any) => {
	return await prisma.users.findFirst({
		where: { id: userId },
	})
}

export { findOne, create }
