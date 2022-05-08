import { sign, verify } from 'jsonwebtoken'

export const generateTokenJWT = (id: number, email: string) => {
	return sign({ id, email }, process.env.TOKEN_SECRET as string, {
		expiresIn: process.env.TOKEN_EXPIRATION,
	})
}

export const verifyTokenJWT = (token: string) => {
	return verify(token, process.env.TOKEN_SECRET as string)
}
