import JWT from 'jsonwebtoken'

export const generateTokenJWT = (id: number, email: string) => {
	return JWT.sign({ id, email }, process.env.TOKEN_SECRET as string, {
		expiresIn: process.env.TOKEN_EXPIRATION,
	})
}
