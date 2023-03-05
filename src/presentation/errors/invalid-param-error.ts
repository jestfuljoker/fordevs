export class InvalidParamError extends Error {
	constructor(readonly fieldName: string) {
		super(`Invalid param "${fieldName}".`);
		this.name = 'InvalidParamError';
	}
}
