import type { AccountModel } from '@domain/models';
import type { AddAccount, AddAccountModel } from '@domain/useCases';
import { faker } from '@faker-js/faker';

export class AddAccountStub implements AddAccount {
	async add(account: AddAccountModel): Promise<AccountModel> {
		const fakeAccount = {
			id: faker.datatype.uuid(),
			name: account.name,
			email: account.email,
			password: account.password,
		};

		return fakeAccount;
	}
}
