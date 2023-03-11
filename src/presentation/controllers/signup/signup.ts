import type { SignUpParams } from '@domain/useCases';
import { InvalidParamError, MissingParamError } from '@presentation/errors';
import { badRequest, serverError, success } from '@presentation/helpers';

import type {
	Controller,
	EmailValidator,
	HttpRequest,
	HttpResponse,
	AddAccount,
	AccountModel,
} from './signup-protocols';

export class SignupController
	implements Controller<SignUpParams, AccountModel>
{
	constructor(
		private readonly emailValidator: EmailValidator,
		private readonly addAccount: AddAccount,
	) {}

	async handle(
		httpRequest: HttpRequest<SignUpParams>,
	): Promise<HttpResponse<AccountModel>> {
		try {
			const requiredFields = [
				'name',
				'email',
				'password',
				'passwordConfirmation',
			] as (keyof SignUpParams)[];

			for (const field of requiredFields) {
				if (!httpRequest.body || !httpRequest.body[field]) {
					return badRequest(new MissingParamError(field));
				}
			}

			const { name, email, password, passwordConfirmation } =
				httpRequest.body as SignUpParams;

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
