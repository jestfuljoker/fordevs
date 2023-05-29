import type { LogErrorRepository } from '@data/protocols';

export class LogErrorRepositoryStub implements LogErrorRepository {
	async log(_stack: string): Promise<void> {}
}
