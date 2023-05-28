import request from 'supertest';

import { faker } from '@faker-js/faker';
import { MongoHelper } from '@infra/db/mongodb/helpers';

import { app } from '../config';

describe('Signup Routes', () => {
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
		const password = faker.internet.password();
		await request(app)
			.post('/api/signup')
			.send({
				name: faker.name.fullName(),
				email: faker.internet.email(),
				password,
				passwordConfirmation: password,
			})
			.expect(200);
	});
});
