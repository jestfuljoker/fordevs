import { ServerError } from '../errors';
import type { HttpResponse } from '../protocols';

export function badRequest(error: Error): HttpResponse {
	return {
		statusCode: 400,
		body: error,
	};
}

export function serverError(): HttpResponse {
	return {
		statusCode: 500,
		body: new ServerError(),
	};
}

export function success<T = unknown>(body: T): HttpResponse {
	return {
		statusCode: 200,
		body,
	};
}
