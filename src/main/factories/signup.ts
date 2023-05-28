import { DbAddAccount } from '@data/useCases/add-account/db-add-account';
import { BcryptAdapter } from '@infra/cryptography/bcrypt-adapter';
import { AccountMongoRepository } from '@infra/db/mongodb/account-repository/account';
import { SignupController } from '@presentation/controllers/signup';
import { EmailValidatorAdapter } from '@utils/email-validator-adapter';

const SALT = 12;

export function makeSignupController(): SignupController {
	const emailValidatorAdapter = new EmailValidatorAdapter();
	const encrypter = new BcryptAdapter(SALT);
	const accountMongoRepository = new AccountMongoRepository();
	const dbAddAccount = new DbAddAccount(encrypter, accountMongoRepository);

	return new SignupController(emailValidatorAdapter, dbAddAccount);
}
