import type { AccountModel } from '@domain/models';
import type { AddAccountModel } from '@domain/useCases';

export interface AddAccountRepository {
	add(account: AddAccountModel): Promise<AccountModel>;
}
