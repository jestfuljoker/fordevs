import { faker } from '@faker-js/faker';

import type { Encrypter } from '../protocols';

export class EncrypterStub implements Encrypter {
	async encrypt(_value: string): Promise<string> {
		return faker.random.word();
	}
}
