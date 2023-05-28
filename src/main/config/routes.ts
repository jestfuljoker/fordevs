import type { Express } from 'express';
import { Router } from 'express';
import { sync } from 'fast-glob';

export default (app: Express): void => {
	const router = Router();

	app.use('/api', router);

	sync('**/src/main/routes/**routes.ts').map(async file =>
		(await import(`../../../${file}`)).default(router),
	);
};
