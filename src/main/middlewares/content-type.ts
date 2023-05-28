import type { NextFunction, Request, Response } from 'express';

export function contentType(
	_: Request,
	response: Response,
	next: NextFunction,
): void {
	response.type('json');

	next();
}
