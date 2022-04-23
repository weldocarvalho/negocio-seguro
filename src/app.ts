import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.listen(process.env.PORT, () => {
	console.log(`SERVER IS RUNNING AT http://localhost:${process.env.PORT}`)
})

app.get('/', (req: Request, res: Response) => {
	res.send('alive')
})
