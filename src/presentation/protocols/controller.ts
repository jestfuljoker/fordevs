import type { HttpRequest, HttpResponse } from './http';

export interface Controller<TRequest, TResponse> {
	handle(
		httpRequest: HttpRequest<TRequest>,
	): Promise<HttpResponse<TResponse | Error>>;
}
