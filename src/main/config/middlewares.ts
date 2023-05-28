import type { Express } from 'express';

import { bodyParser, cors } from '@main/middlewares';

export default (app: Express): void => {
	app.use(bodyParser);
	app.use(cors);
};
