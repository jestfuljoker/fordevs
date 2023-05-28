import type { Request, Response } from 'express';

import type { Controller, HttpRequest } from '@presentation/protocols';

export function adaptRoute<TRequest = unknown, TResponse = unknown>(
	controller: Controller<TRequest, TResponse>,
) {
	return async (request: Request, response: Response) => {
		const httpRequest: HttpRequest<TRequest> = {
			body: request.body,
		};

		const httpResponse = await controller.handle(httpRequest);

		response.status(httpResponse.statusCode).json(httpRequest.body);
	};
}
