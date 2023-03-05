import type { HttpResponse } from '../protocols';

export function badRequest(error: Error): HttpResponse {
	return {
		statusCode: 400,
		body: error,
	};
}
