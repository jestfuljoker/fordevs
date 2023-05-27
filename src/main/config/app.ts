import express from 'express';

import setupMiddlewares from './middlewares';

export const app = express();

setupMiddlewares(app);
