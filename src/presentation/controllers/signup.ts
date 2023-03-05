import { MissingParamError } from '../errors';
import { badRequest } from '../helpers';
import type { HttpRequest, HttpResponse } from '../protocols';

export class SignupController {
	handle(httpRequest: HttpRequest): HttpResponse {
		if (!httpRequest.body.name) {
			return badRequest(new MissingParamError('name'));
		}

		if (!httpRequest.body.email) {
			return badRequest(new MissingParamError('email'));
		}

		return {
			statusCode: 400,
			body: new Error('Missing param: name'),
		};
	}
}
