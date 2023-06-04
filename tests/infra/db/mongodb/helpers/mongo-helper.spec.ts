import { MongoHelper as sut } from '@infra/db/mongodb/helpers/mongo-helper';
import { env } from '@main/config';

describe('Mongo Helper', () => {
	beforeAll(async () => {
		await sut.connect(env.MONGO_URL);
	});

	afterAll(async () => {
		await sut.disconnect();
	});

	it('should reconnect if mongodb is down', async () => {
		let accountsCollection = await sut.getCollection('accounts');

		expect(accountsCollection).toBeTruthy();

		await sut.disconnect();

		accountsCollection = await sut.getCollection('accounts');

		expect(accountsCollection).toBeTruthy();
	});
});
