import { DbAddAccount } from '@data/useCases/add-account';
import { BcryptAdapter } from '@infra/cryptography';
import { AccountMongoRepository } from '@infra/db/mongodb';
import { LogControllerDecorator } from '@main/decorators';
import type {
	AccountModel,
	Controller,
	SignUpParams,
} from '@presentation/controllers/signup';
import { SignupController } from '@presentation/controllers/signup';
import { EmailValidatorAdapter } from '@utils/email-validator-adapter';

const SALT = 12;

export function makeSignupController(): Controller<SignUpParams, AccountModel> {
	const emailValidatorAdapter = new EmailValidatorAdapter();
	const encrypter = new BcryptAdapter(SALT);
	const accountMongoRepository = new AccountMongoRepository();
	const dbAddAccount = new DbAddAccount(encrypter, accountMongoRepository);

	const signupController = new SignupController(
		emailValidatorAdapter,
		dbAddAccount,
	);

	return new LogControllerDecorator(signupController);
}
