import { IHttpRequest } from './http.protocol'

export interface IController {
	handle(httpRequest: IHttpRequest): any
}
