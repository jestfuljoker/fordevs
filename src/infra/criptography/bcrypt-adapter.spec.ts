import bcrypt from 'bcrypt';

import { faker } from '@faker-js/faker';

import { BcryptAdapter } from './bcrypt-adapter';

const SALT = 12;

jest.mock('bcrypt', () => ({
	async hash(): Promise<string> {
		return 'hash';
	},
}));

function makeSut(): BcryptAdapter {
	const sut = new BcryptAdapter(SALT);

	return sut;
}

describe('Bcrypt Adapter', () => {
	it('should call bcrypt with correct value', async () => {
		const password = faker.internet.password();

		const sut = makeSut();

		const hashSpy = jest.spyOn(bcrypt, 'hash');

		await sut.encrypt(password);

		expect(hashSpy).toBeCalledWith(password, SALT);
	});

	it('should return a hash on success', async () => {
		const sut = makeSut();

		const hash = await sut.encrypt('hash');

		expect(hash).toBe('hash');
	});
});
