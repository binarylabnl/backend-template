import { Middleware } from 'koa';
import helmet from 'koa-helmet';

export const helmetMiddleware = (): Middleware => helmet();
