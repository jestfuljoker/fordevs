import { faker } from '@faker-js/faker';
import type {
	Controller,
	HttpRequest,
	HttpResponse,
} from '@presentation/protocols';
import { HttpStatusCode } from '@presentation/protocols';

export class ControllerStub implements Controller<unknown, unknown> {
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
