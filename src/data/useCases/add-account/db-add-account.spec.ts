import type { Encrypter } from '../../protocols';
import { DbAddAccount } from './db-add-account';

type SutTypes = {
	sut: DbAddAccount;
	encrypterStub: Encrypter;
};

function makeSut(): SutTypes {
	class EncrypterStub implements Encrypter {
		async encrypt(_value: string): Promise<string> {
			return 'hashed_password';
		}
	}

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
});
