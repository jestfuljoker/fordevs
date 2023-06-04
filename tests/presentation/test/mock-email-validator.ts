import type { EmailValidator } from '@presentation/protocols/email-validator';

export class EmailValidatorStub implements EmailValidator {
	isValid(_email: string): boolean {
		return true;
	}
}
