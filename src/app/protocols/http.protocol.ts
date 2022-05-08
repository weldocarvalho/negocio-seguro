export interface IHttpRequest {
	body?: any
	param?: any
	headers?: any
}

export interface IHttpResponse {
	statusCode: number
	body: any
}
