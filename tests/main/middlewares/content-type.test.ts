import request from 'supertest';

import { app } from '@main/config';

describe('Content Type Middleware', () => {
	it('should return default content type as JSON', async () => {
		app.get('/test_content_type', (_, response) => {
			response.send();
		});

		await request(app).get('/test_content_type').expect('content-type', /json/);
	});

	it('should return XML content type when forced', async () => {
		app.get('/test_content_type_xml', (_, response) => {
			response.type('xml');
			response.send();
		});

		await request(app)
			.get('/test_content_type_xml')
			.expect('content-type', /xml/);
	});
});
