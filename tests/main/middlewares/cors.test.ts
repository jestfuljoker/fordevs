import request from 'supertest';

import { app } from '@main/config';

describe('Cors Middleware', () => {
	it('should enable cors', async () => {
		app.get('/test_cors', (_, response) => {
			response.send();
		});

		await request(app)
			.get('/test_cors')
			.expect('access-control-allow-origin', '*')
			.expect('access-control-allow-methods', '*')
			.expect('access-control-allow-headers', '*');
	});
});
