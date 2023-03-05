export class MissingParamError extends Error {
	constructor(readonly paramName: string) {
		super(`Missing param: ${paramName}`);
		this.name = 'MissingParamError';
	}
}
