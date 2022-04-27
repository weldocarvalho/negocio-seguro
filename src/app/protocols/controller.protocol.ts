import { IHttpRequest, IHttpResponse } from './http.protocol'

export interface IController {
	handle(httpRequest: IHttpRequest): Promise<IHttpResponse>
}
