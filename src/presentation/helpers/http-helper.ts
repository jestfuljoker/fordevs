/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServerError } from '../errors';
import type { HttpResponse } from '../protocols';

export function badRequest(error: Error): HttpResponse<any> {
	return {
		statusCode: 400,
		body: error,
	};
}

export function serverError(): HttpResponse<any> {
	return {
		statusCode: 500,
		body: new ServerError(),
	};
}

export function success<T = unknown>(body: T): HttpResponse<T> {
	return {
		statusCode: 200,
		body,
	};
}
