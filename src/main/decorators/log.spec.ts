import { faker } from '@faker-js/faker';
import { ControllerStub } from '@main/test';

import { LogControllerDecorator } from './log';

interface SutTypes {
	sut: LogControllerDecorator;
	controllerStub: ControllerStub;
}

function makeSut(): SutTypes {
	const controllerStub = new ControllerStub();

	const sut = new LogControllerDecorator(controllerStub);

	return {
		sut,
		controllerStub,
	};
}

describe('Log Controller Decorator', () => {
	it('should call controller handler', async () => {
		const { sut, controllerStub } = makeSut();

		const password = faker.internet.password();

		const httpRequest = {
			body: {
				email: faker.internet.email(),
				name: faker.name.fullName(),
				password,
				passwordConfirmation: password,
			},
		};

		const handleSpy = jest.spyOn(controllerStub, 'handle');

		await sut.handle(httpRequest);

		expect(handleSpy).toHaveBeenCalledWith(httpRequest);
	});
});
