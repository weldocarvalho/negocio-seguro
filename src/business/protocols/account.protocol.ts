export interface IAccount {
	id: number
	name: string
	email: string
	password: string
	mobilePhone?: string
}

export interface IUpdateAccount {
	name?: string
	email?: string
	password?: string
	mobilePhone?: string
}
