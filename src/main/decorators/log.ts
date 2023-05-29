import type { LogErrorRepository } from '@data/protocols';
import type {
	Controller,
	HttpRequest,
	HttpResponse,
} from '@presentation/protocols';
import { HttpStatusCode } from '@presentation/protocols';

export class LogControllerDecorator<TRequest = unknown, TResponse = unknown>
	implements Controller<TRequest, TResponse>
{
	constructor(
		private readonly controller: Controller<TRequest, TResponse>,
		private readonly logErrorRepository: LogErrorRepository,
	) {}

	async handle(
		httpRequest: HttpRequest<TRequest>,
	): Promise<HttpResponse<TResponse | Error>> {
		const httpResponse = await this.controller.handle(httpRequest);

		if (httpResponse.statusCode === HttpStatusCode.serverError) {
			const { stack } = httpResponse.body as Error;

			await this.logErrorRepository.log(stack);
		}

		return httpResponse;
	}
}
