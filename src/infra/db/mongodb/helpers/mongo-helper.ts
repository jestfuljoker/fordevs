import { MongoClient } from 'mongodb';
import type { Collection, Document, OptionalId } from 'mongodb';

interface SaveOptions<T = unknown> {
	collectionName: string;
	data: OptionalId<T>;
}

export class MongoHelper {
	private static client: MongoClient | null;

	private static uri: string;

	private constructor() {}

	static async connect(uri: string): Promise<void> {
		this.uri = uri;
		this.client = await MongoClient.connect(uri);
	}

	static async disconnect(): Promise<void> {
		await this.client.close();
		this.client = null;
	}

	static async getCollection<T extends Document>(
		name: string,
	): Promise<Collection<T>> {
		if (!this.client) {
			await this.connect(this.uri);
		}

		return this.client.db().collection(name);
	}

	static async save<R, T = unknown>({
		collectionName,
		data,
	}: SaveOptions<T>): Promise<R> {
		const accountCollection = await MongoHelper.getCollection(collectionName);

		await accountCollection.insertOne(data);

		const { _id, ...dataWithoutId } = data;

		return {
			...dataWithoutId,
			id: _id,
		} as R;
	}
}
