import { Middleware } from 'koa';
import bodyParser from 'koa-bodyparser';

export const bodyParserMiddleware = (): Middleware => bodyParser();
