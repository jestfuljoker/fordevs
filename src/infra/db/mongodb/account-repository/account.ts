import type { AddAccountRepository } from '@data/protocols';
import type { AccountModel } from '@domain/models';
import type { AddAccountModel } from '@domain/useCases';

import { MongoHelper } from '../helpers';

export class AccountMongoRepository implements AddAccountRepository {
	async add(account: AddAccountModel): Promise<AccountModel> {
		const accountCollection =
			MongoHelper.getCollection<AddAccountModel>('accounts');

		const { insertedId } = await accountCollection.insertOne({
			name: account.name,
			email: account.email,
			password: account.password,
		});

		return {
			...account,
			id: insertedId.toString(),
		};
	}
}
