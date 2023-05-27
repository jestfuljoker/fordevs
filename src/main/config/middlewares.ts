import type { Express } from 'express';

import { bodyParser } from '@main/middlewares';

export default (app: Express): void => {
	app.use(bodyParser);
};
