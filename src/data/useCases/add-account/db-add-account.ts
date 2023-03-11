import type { Encrypter } from '@data/protocols';
import type { AccountModel } from '@domain/models';
import type { AddAccount, AddAccountModel } from '@domain/useCases';

export class DbAddAccount implements AddAccount {
	constructor(private readonly encrypter: Encrypter) {}

	async add(account: AddAccountModel): Promise<AccountModel> {
		await this.encrypter.encrypt(account.password);

		return {} as AccountModel;
	}
}
