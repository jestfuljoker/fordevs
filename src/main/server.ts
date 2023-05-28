import { MongoHelper } from '@infra/db/mongodb/helpers';
import { app, env } from '@main/config';

MongoHelper.connect(env.MONGO_URL)
	.then(() => {
		app.listen(env.PORT, () =>
			console.log(`Server's running at http://localhost:${env.PORT}`),
		);
	})
	.catch(console.error);
