import type { Encrypter } from '@data/protocols';
import { EncrypterStub } from '@data/test';

import { DbAddAccount } from './db-add-account';

type SutTypes = {
	sut: DbAddAccount;
	encrypterStub: Encrypter;
};

function makeSut(): SutTypes {
	const encrypterStub = new EncrypterStub();
	const sut = new DbAddAccount(encrypterStub);

	return {
		sut,
		encrypterStub,
	};
}

describe('DbAddAccount UseCase', () => {
	it('should call Encrypter with correct password', async () => {
		const { encrypterStub, sut } = makeSut();

		const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

		const accountData = {
			name: 'valid_name',
			email: 'valid_email',
			password: 'valid_password',
		};

		await sut.add(accountData);

		expect(encryptSpy).toHaveBeenCalledWith('valid_password');
	});

	it('should throw an Exception if Encrypter throws an Exception', async () => {
		const { encrypterStub, sut } = makeSut();

		jest
			.spyOn(encrypterStub, 'encrypt')
			.mockReturnValueOnce(Promise.reject(new Error()));

		const accountData = {
			name: 'valid_name',
			email: 'valid_email',
			password: 'valid_password',
		};

		const promise = sut.add(accountData);

		await expect(promise).rejects.toThrow();
	});
});
