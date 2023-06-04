import { faker } from '@faker-js/faker';
import { AccountMongoRepository } from '@infra/db/mongodb/account-repository/account';
import { MongoHelper } from '@infra/db/mongodb/helpers';

function makeSut(): AccountMongoRepository {
	const sut = new AccountMongoRepository();

	return sut;
}

describe('Account MongoDB Repository', () => {
	beforeAll(async () => {
		await MongoHelper.connect(process.env.MONGO_URL as string);
	});

	afterAll(async () => {
		await MongoHelper.disconnect();
	});

	beforeEach(async () => {
		const accountsCollection = await MongoHelper.getCollection('accounts');
		await accountsCollection.deleteMany({});
	});

	it('should return an account on success', async () => {
		const sut = makeSut();

		const accountData = {
			name: faker.name.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		const account = await sut.add(accountData);

		expect(account).toBeTruthy();
		expect(account.id).toBeTruthy();
		expect(account.name).toBe(accountData.name);
		expect(account.email).toBe(accountData.email);
		expect(account.password).toBe(accountData.password);
	});
});
