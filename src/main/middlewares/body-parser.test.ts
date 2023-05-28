import request from 'supertest';

import { app } from '../config';

describe('Body Parser Middleware', () => {
	it('should parse body as JSON', async () => {
		app.post('/test_body_parser', (request, response) => {
			response.send(request.body);
		});

		await request(app)
			.post('/test_body_parser')
			.send({ name: 'Christofer' })
			.expect({ name: 'Christofer' });
	});
});
