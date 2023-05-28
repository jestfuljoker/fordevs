import { faker } from '@faker-js/faker';
import type {
	Controller,
	HttpRequest,
	HttpResponse,
} from '@presentation/protocols';
import { HttpStatusCode } from '@presentation/protocols';

import { LogControllerDecorator } from './log';

class ControllerStub implements Controller<unknown, unknown> {
	async handle(
		_httpRequest: HttpRequest<unknown>,
	): Promise<HttpResponse<unknown>> {
		const httpResponse: HttpResponse = {
			statusCode: HttpStatusCode.ok,
			body: {
				name: faker.name.fullName(),
			},
		};

		return httpResponse;
	}
}

describe('Log Controller Decorator', () => {
	it('should call controller handler', async () => {
		const controllerStub = new ControllerStub();
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

		const sut = new LogControllerDecorator(controllerStub);
		await sut.handle(httpRequest);

		expect(handleSpy).toHaveBeenCalledWith(httpRequest);
	});
});
