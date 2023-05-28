import request from 'supertest';

import { MongoHelper } from '@infra/db/mongodb/helpers';

import { app } from '../config/app';

describe('Signup Routes', () => {
	beforeAll(async () => {
		await MongoHelper.connect(process.env.MONGO_URL as string);
	});

	afterAll(async () => {
		await MongoHelper.disconnect();
	});

	beforeEach(async () => {
		await MongoHelper.getCollection('accounts').deleteMany({});
	});

	it('should return an account on success', async () => {
		await request(app)
			.post('/api/signup')
			.send({
				name: 'Christofer',
				email: 'chris.f.assis18@gmail.com',
				password: '123',
				passwordConfirmation: '123',
			})
			.expect(200);
	});
});
