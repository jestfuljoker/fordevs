import type { AccountModel } from '@domain/models';
import type { AddAccount, AddAccountModel } from '@domain/useCases';

export class AddAccountStub implements AddAccount {
	async add(_account: AddAccountModel): Promise<AccountModel> {
		const fakeAccount = {
			id: 'valid_id',
			name: 'valid_name',
			email: 'valid_email@mail.com',
			password: 'valid_password',
		};

		return fakeAccount;
	}
}
