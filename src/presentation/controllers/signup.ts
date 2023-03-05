import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers';
import type {
	Controller,
	EmailValidator,
	HttpRequest,
	HttpResponse,
} from '../protocols';

export class SignupController implements Controller {
	constructor(private readonly emailValidator: EmailValidator) {}

	handle(httpRequest: HttpRequest): HttpResponse {
		try {
			const requiredFields = [
				'name',
				'email',
				'password',
				'passwordConfirmation',
			];

			for (const field of requiredFields) {
				if (!httpRequest.body[field]) {
					return badRequest(new MissingParamError(field));
				}
			}

			if (!this.emailValidator.isValid(httpRequest.body.email)) {
				return badRequest(new InvalidParamError('email'));
			}

			return {
				body: new Error(),
				statusCode: 400,
			};
		} catch {
			return serverError();
		}
	}
}
