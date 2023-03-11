import bcrypt from 'bcrypt';

import { faker } from '@faker-js/faker';

import { BcryptAdapter } from './bcrypt-adapter';

describe('Bcrypt Adapter', () => {
	it('should call bcrypt with correct value', async () => {
		const password = faker.internet.password();
		const salt = 12;

		const sut = new BcryptAdapter(salt);

		const hashSpy = jest.spyOn(bcrypt, 'hash');

		await sut.encrypt(password);

		expect(hashSpy).toBeCalledWith(password, salt);
	});
});
