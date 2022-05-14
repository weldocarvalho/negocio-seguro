export interface IAccountModel {
	id: number
	name: string
	email: string
	password: string
}

export interface IUpdateAccountModelType {
	name?: string
	email?: string
	password?: string
	phone?: string
}
