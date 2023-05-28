import { MongoHelper } from '@infra/db/mongodb/helpers';
import { env } from '@main/config';

MongoHelper.connect(env.MONGO_URL)
	.then(async () => {
		const { app } = await import('./config/app');

		app.listen(env.PORT, () =>
			console.log(`Server's running at http://localhost:${env.PORT}`),
		);
	})
	.catch(console.log);
