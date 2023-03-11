import { EncrypterStub } from '@data/test';
import { faker } from '@faker-js/faker';

import type { Encrypter, AddAccountModel } from './add-db-account-protocols';
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

function makeAccountData(): AddAccountModel {
	return {
		name: faker.name.fullName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
	};
}

describe('DbAddAccount UseCase', () => {
	it('should call Encrypter with correct password', async () => {
		const { encrypterStub, sut } = makeSut();
		const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

		const accountData = makeAccountData();

		await sut.add(accountData);

		expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
	});

	it('should throw an Exception if Encrypter throws an Exception', async () => {
		const { encrypterStub, sut } = makeSut();

		jest
			.spyOn(encrypterStub, 'encrypt')
			.mockReturnValueOnce(Promise.reject(new Error()));

		const accountData = makeAccountData();

		const promise = sut.add(accountData);

		await expect(promise).rejects.toThrow();
	});
});
