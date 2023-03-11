import type {
	AddAccount,
	Encrypter,
	AccountModel,
	AddAccountModel,
} from './add-db-account-protocols';

export class DbAddAccount implements AddAccount {
	constructor(private readonly encrypter: Encrypter) {}

	async add(account: AddAccountModel): Promise<AccountModel> {
		await this.encrypter.encrypt(account.password);

		return {} as AccountModel;
	}
}
