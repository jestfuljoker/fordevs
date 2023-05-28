import type { Router } from 'express';

export default (router: Router) => {
	router.post('/signup', (request, response) => {
		response.json({ ok: 'ok' });
	});
};
