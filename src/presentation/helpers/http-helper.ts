import type { HttpResponse } from '../protocols';

export function badRequest(error: Error): HttpResponse {
	return {
		statusCode: 400,
		body: error,
	};
}

export function serverError(error: Error): HttpResponse {
	return {
		statusCode: 500,
		body: error,
	};
}
