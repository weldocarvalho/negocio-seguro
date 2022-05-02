import { Request, Response } from 'express'
import { createUser } from '../../business/services/user.service'

export const signupController = {
	handle: async (req: Request, res: Response) => {
		const requiredFields = ['name', 'email', 'password']

		for (const field of requiredFields) {
			if (!req.body[field]) {
				return res.status(400).send(`Missing param error: ${field}`)
			}
		}

		const newUser = await createUser(req.body)
		return res.status(201).json({ newUser })
	},
}
