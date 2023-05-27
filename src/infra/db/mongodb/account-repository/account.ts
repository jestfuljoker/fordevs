import type { AddAccountRepository } from '@data/protocols';
import type { AccountModel } from '@domain/models';
import type { AddAccountModel } from '@domain/useCases';

import { MongoHelper } from '../helpers';

export class AccountMongoRepository implements AddAccountRepository {
	async add(account: AddAccountModel): Promise<AccountModel> {
		const newAccount = await MongoHelper.save<AccountModel>({
			collectionName: 'accounts',
			data: account,
		});

		return newAccount;
	}
}
