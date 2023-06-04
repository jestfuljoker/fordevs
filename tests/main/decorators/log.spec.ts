/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import { LogControllerDecorator } from '@main/decorators/log';
import { serverError } from '@presentation/helpers';
import type { HttpResponse } from '@presentation/protocols';
import { HttpStatusCode } from '@presentation/protocols';

import { ControllerStub, LogErrorRepositoryStub } from '../test';

interface SutTypes {
	sut: LogControllerDecorator;
	controllerStub: ControllerStub;
	logErrorRepositoryStub: LogErrorRepositoryStub;
}

function makeSut(): SutTypes {
	const controllerStub = new ControllerStub();

	const logErrorRepositoryStub = new LogErrorRepositoryStub();

	const sut = new LogControllerDecorator(
		controllerStub,
		logErrorRepositoryStub,
	);

	return {
		sut,
		controllerStub,
		logErrorRepositoryStub,
	};
}

function makeFakeRequest() {
	const password = faker.internet.password();

	const httpRequest = {
		body: {
			email: faker.internet.email(),
			name: faker.name.fullName(),
			password,
			passwordConfirmation: password,
		},
	};

	return httpRequest;
}

function makeServerError(): HttpResponse<any> {
	const error = new Error();
	error.stack = 'any_stack';

	const internalError = serverError(error);
	return internalError;
}

describe('Log Controller Decorator', () => {
	it('should call controller handler', async () => {
		const { sut, controllerStub } = makeSut();

		const httpRequest = makeFakeRequest();

		const handleSpy = jest.spyOn(controllerStub, 'handle');

		await sut.handle(httpRequest);

		expect(handleSpy).toHaveBeenCalledWith(httpRequest);
	});

	it('should return the same result of the controller', async () => {
		const { sut } = makeSut();

		const httpRequest = makeFakeRequest();

		const httpResponse = await sut.handle(httpRequest);

		expect(httpResponse).toEqual({
			statusCode: HttpStatusCode.ok,
			body: {
				name: 'any_name',
			},
		});
	});

	it('should call LogErrorRepository with correct error if controller returns a server error', async () => {
		const { sut, controllerStub, logErrorRepositoryStub } = makeSut();

		const httpRequest = makeFakeRequest();

		const error = makeServerError();

		jest
			.spyOn(controllerStub, 'handle')
			.mockReturnValueOnce(Promise.resolve(error));

		const logSpy = jest.spyOn(logErrorRepositoryStub, 'log');

		await sut.handle(httpRequest);

		expect(logSpy).toHaveBeenCalledWith('any_stack');
	});
});
