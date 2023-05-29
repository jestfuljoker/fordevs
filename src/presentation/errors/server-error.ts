export class ServerError extends Error {
	constructor(stack: string) {
		super('An internal error occurred.');
		this.name = 'ServerError';
		this.stack = stack;
	}
}
