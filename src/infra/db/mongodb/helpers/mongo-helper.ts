import type { Collection, Document } from 'mongodb';
import { MongoClient } from 'mongodb';

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
}
