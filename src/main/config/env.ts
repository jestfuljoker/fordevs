export const env = {
	PORT: Number(process.env.PORT) || 3333,
	MONGO_URL:
		process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
};
