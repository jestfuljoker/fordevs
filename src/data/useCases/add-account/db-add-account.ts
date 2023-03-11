import type { AccountModel } from '../../../domain/models';
import type { AddAccount, AddAccountModel } from '../../../domain/useCases';
import type { Encrypter } from '../../protocols';

export class DbAddAccount implements AddAccount {
	constructor(private readonly encrypter: Encrypter) {}

	async add(account: AddAccountModel): Promise<AccountModel> {
		await this.encrypter.encrypt(account.password);

		return {} as AccountModel;
	}
}
