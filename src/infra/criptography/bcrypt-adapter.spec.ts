import bcrypt from 'bcrypt';

import { faker } from '@faker-js/faker';

import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
	async hash(): Promise<string> {
		return 'hash';
	},
}));

describe('Bcrypt Adapter', () => {
	it('should call bcrypt with correct value', async () => {
		const password = faker.internet.password();
		const salt = 12;

		const sut = new BcryptAdapter(salt);

		const hashSpy = jest.spyOn(bcrypt, 'hash');

		await sut.encrypt(password);

		expect(hashSpy).toBeCalledWith(password, salt);
	});

	it('should return a hash on success', async () => {
		const salt = 12;

		const sut = new BcryptAdapter(salt);

		const hash = await sut.encrypt('hash');

		expect(hash).toBe('hash');
	});
});
