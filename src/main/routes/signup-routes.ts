import type { Router } from 'express';

import { makeSignupController } from '@main/factories';

import { adaptRoute } from '../adapters/express-route-adapter';

export default (router: Router) => {
	router.post('/signup', adaptRoute(makeSignupController()));
};
