import bcrypt from 'bcrypt';

import type { Encrypter } from '@data/protocols';

export class BcryptAdapter implements Encrypter {
	constructor(private readonly salt: number) {}

	async encrypt(value: string): Promise<string> {
		return bcrypt.hash(value, this.salt);
	}
}
