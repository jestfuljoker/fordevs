import type { AddAccount } from '../../domain/useCases';
import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers';
import type {
	Controller,
	EmailValidator,
	HttpRequest,
	HttpResponse,
} from '../protocols';

export class SignupController implements Controller {
	constructor(
		private readonly emailValidator: EmailValidator,
		private readonly addAccount: AddAccount,
	) {}

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

			const { name, email, password, passwordConfirmation } = httpRequest.body;

			if (password !== passwordConfirmation) {
				return badRequest(new InvalidParamError('passwordConfirmation'));
			}

			if (!this.emailValidator.isValid(email)) {
				return badRequest(new InvalidParamError('email'));
			}

			this.addAccount.add({
				name,
				email,
				password,
			});

			return serverError();
		} catch {
			return serverError();
		}
	}
}
