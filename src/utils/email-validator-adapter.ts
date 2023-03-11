import validator from 'validator';

import type { EmailValidator } from '@presentation/protocols/email-validator';

export class EmailValidatorAdapter implements EmailValidator {
	isValid(email: string): boolean {
		return validator.isEmail(email);
	}
}
