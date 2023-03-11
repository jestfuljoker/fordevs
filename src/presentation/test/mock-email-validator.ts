import type { EmailValidator } from '../protocols/email-validator';

export class EmailValidatorStub implements EmailValidator {
	isValid(_email: string): boolean {
		return true;
	}
}
