import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError, success } from '../../helpers';
import type {
	Controller,
	EmailValidator,
	HttpRequest,
	HttpResponse,
	AddAccount,
} from './signup-protocols';

export class SignupController implements Controller {
	constructor(
		private readonly emailValidator: EmailValidator,
		private readonly addAccount: AddAccount,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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

			const account = await this.addAccount.add({
				name,
				email,
				password,
			});

			return success(account);
		} catch {
			return serverError();
		}
	}
}
