import { InvalidParamError, MissingParamError, ServerError } from '../errors';
import type { EmailValidator } from '../protocols';
import { SignupController } from './signup';

class EmailValidatorStub implements EmailValidator {
	isValid(_email: string): boolean {
		return true;
	}
}

type SutTypes = {
	sut: SignupController;
	emailValidatorStub: EmailValidatorStub;
};

function makeSut(): SutTypes {
	const emailValidatorStub = new EmailValidatorStub();
	const sut = new SignupController(emailValidatorStub);

	return {
		sut,
		emailValidatorStub,
	};
}

describe('SignUpController', () => {
	it('should return 400 if no name is provided', () => {
		const { sut } = makeSut();

		const httpRequest = {
			body: {
				email: 'any_email@mail.com',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			},
		};

		const httpResponse = sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('name'));
	});

	it('should return 400 if no email is provided', () => {
		const { sut } = makeSut();

		const httpRequest = {
			body: {
				name: 'any_name',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			},
		};

		const httpResponse = sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('email'));
	});

	it('should return 400 if no password is provided', () => {
		const { sut } = makeSut();

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'any_email@mail.com',
				passwordConfirmation: 'any_password',
			},
		};

		const httpResponse = sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError('password'));
	});

	it('should return 400 if no passwordConfirmation is provided', () => {
		const { sut } = makeSut();

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'any_email@mail.com',
				password: 'any_password',
			},
		};

		const httpResponse = sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(
			new MissingParamError('passwordConfirmation'),
		);
	});

	it('should return 400 if email is invalid', () => {
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

		const httpResponse = sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new InvalidParamError('email'));
	});

	it('should call EmailValidator with correct email', () => {
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

		sut.handle(httpRequest);

		expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
	});

	it('should return 500 if EmailValidator throws an exception', () => {
		class EmailValidatorStub implements EmailValidator {
			isValid(_email: string): boolean {
				throw new Error();
			}
		}

		const emailValidatorStub = new EmailValidatorStub();
		const sut = new SignupController(emailValidatorStub);

		const httpRequest = {
			body: {
				name: 'any_name',
				email: 'any_email@mail.com',
				password: 'any_password',
				passwordConfirmation: 'any_password',
			},
		};

		const httpResponse = sut.handle(httpRequest);

		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.body).toEqual(new ServerError());
	});
});
