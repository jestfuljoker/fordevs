import {
	InvalidParamError,
	MissingParamError,
	ServerError,
} from '../../errors';
import { SignupController } from './signup';
import type {
	EmailValidator,
	AddAccount,
	AddAccountModel,
	AccountModel,
} from './signup-protocols';

type SutTypes = {
	sut: SignupController;
	emailValidatorStub: EmailValidator;
	addAccountStub: AddAccount;
};

function makeEmailValidator(): EmailValidator {
	class EmailValidatorStub implements EmailValidator {
		isValid(_email: string): boolean {
			return true;
		}
	}

	return new EmailValidatorStub();
}

function makeAddAccount(): AddAccount {
	class AddAccountStub implements AddAccount {
		async add(_account: AddAccountModel): Promise<AccountModel> {
			const fakeAccount = {
				id: 'valid_id',
				name: 'valid_name',
				email: 'valid_email@mail.com',
				password: 'valid_password',
			};

			return Promise.resolve(fakeAccount);
		}
	}

	return new AddAccountStub();
}

function makeSut(): SutTypes {
	const emailValidatorStub = makeEmailValidator();
	const addAccountStub = makeAddAccount();
	const sut = new SignupController(emailValidatorStub, addAccountStub);

	return {
		sut,
		emailValidatorStub,
		addAccountStub,
	};
}

describe('SignUpController', () => {
	it('should return 400 if no name is provided', async () => {
		const { sut } = makeSut();

		const httpRequest = {
			body: {
				email: 'any_email@mail.com',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			},
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('name'));
	});

	it('should return 400 if no email is provided', async () => {
		const { sut } = makeSut();

		const httpRequest = {
			body: {
				name: 'any_name',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			},
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('email'));
	});

	it('should return 400 if no password is provided', async () => {
		const { sut } = makeSut();

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'any_email@mail.com',
				passwordConfirmation: 'any_password',
			},
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('password'));
	});

	it('should return 400 if no passwordConfirmation is provided', async () => {
		const { sut } = makeSut();

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'any_email@mail.com',
				password: 'any_password',
			},
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(
			new MissingParamError('passwordConfirmation'),
		);
	});

	it('should return 400 if email is invalid', async () => {
		const { sut, emailValidatorStub } = makeSut();

		jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'invalid_email@mail.com',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			},
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new InvalidParamError('email'));
	});

	it('should return 400 if passwordConfirmation fails', async () => {
		const { sut } = makeSut();

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'any_email@mail.com',
				password: 'any_password',
				passwordConfirmation: 'invalid_password',
			},
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(
			new InvalidParamError('passwordConfirmation'),
		);
	});

	it('should call EmailValidator with correct email', async () => {
		const { sut, emailValidatorStub } = makeSut();

		const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'any_email@mail.com',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			},
		};

		await sut.handle(httpRequest);

		expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
	});

	it('should return 500 if EmailValidator throws an exception', async () => {
		const { sut, emailValidatorStub } = makeSut();
		jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
			throw new Error('');
		});

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'any_email@mail.com',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			},
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.body).toEqual(new ServerError());
	});

	it('should return 500 if AddAccount throws an exception', async () => {
		const { sut, addAccountStub } = makeSut();
		jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
			return Promise.reject(new Error(''));
		});

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'any_email@mail.com',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			},
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.body).toEqual(new ServerError());
	});

	it('should call AddAccount with correct values', async () => {
		const { sut, addAccountStub } = makeSut();
		const addSpy = jest.spyOn(addAccountStub, 'add');

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'any_email@mail.com',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			},
		};

		await sut.handle(httpRequest);

		expect(addSpy).toHaveBeenCalledWith({
			name: 'any_name',
			email: 'any_email@mail.com',
			password: 'any_password',
		});
	});

	it('should return 200 if valid data is provided', async () => {
		const { sut } = makeSut();

		const httpRequest = {
			body: {
				name: 'valid_name',
				email: 'valid_email@mail.com',
				password: 'valid_password',
				passwordConfirmation: 'valid_password',
			},
		};

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(200);
		expect(httpResponse.body).toEqual({
			id: 'valid_id',
			name: 'valid_name',
			email: 'valid_email@mail.com',
			password: 'valid_password',
		});
	});
});
