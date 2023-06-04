import { faker } from '@faker-js/faker';

import type { Encrypter } from '../protocols';

export class EncrypterStub implements Encrypter {
	hashedPassword: string;

	async encrypt(_value: string): Promise<string> {
		const hashedPassword = faker.random.word();

		this.hashedPassword = hashedPassword;

		return hashedPassword;
	}
}
