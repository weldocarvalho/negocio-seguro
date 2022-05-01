import { Request, Response } from 'express'
import { findOne, createUser } from '../../business/services/user.service'

// TODO: implements route adapter for this controller also
const userController = {
	create: async (req: Request, res: Response) => {
		const user = await createUser(req.body)
		return res.status(200).json({ user })
	},
	// TODO: update to methods findById, findByEmail...
	find: async (req: Request, res: Response) => {
		const { email } = req.body
		const user = await findOne(email)
		return res.status(200).json({ user })
	},
}

export { userController }
