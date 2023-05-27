import { MongoClient } from 'mongodb';
import type { Collection, Document, OptionalId } from 'mongodb';

interface SaveOptions<T = unknown> {
	collectionName: string;
	data: OptionalId<T>;
}

export class MongoHelper {
	private static client: MongoClient;

	private constructor() {}

	static async connect(uri: string): Promise<void> {
		this.client = await MongoClient.connect(uri);
	}

	static async disconnect(): Promise<void> {
		await this.client.close();
	}

	static getCollection<T extends Document>(name: string): Collection<T> {
		return this.client.db().collection(name);
	}

	static async save<R, T = unknown>({
		collectionName,
		data,
	}: SaveOptions<T>): Promise<R> {
		const accountCollection = MongoHelper.getCollection(collectionName);

		await accountCollection.insertOne(data);

		const { _id, ...dataWithoutId } = data;

		return {
			...dataWithoutId,
			id: _id,
		} as R;
	}
}
