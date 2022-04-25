import { Request, Response } from 'express'
import { findOne, create } from '../../business/services/user.service'

const userController = {
	create: async (req: Request, res: Response) => {
		const user = await create(req.body)
		return res.status(200).json({ user })
	},
	find: async (req: Request, res: Response) => {
		const { userId } = req.body
		const user = await findOne(userId)
		return res.status(200).json({ user })
	},
}

export { userController }
