import type { AddAccountRepository } from '@data/protocols';
import type { AccountModel } from '@domain/models';
import type { AddAccountModel } from '@domain/useCases';
import { faker } from '@faker-js/faker';

export class AddAccountRepositoryStub implements AddAccountRepository {
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
