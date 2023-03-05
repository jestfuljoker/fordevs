export class ServerError extends Error {
	constructor() {
		super('An internal error occurred.');
		this.name = 'ServerError';
	}
}
