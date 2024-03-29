import { Middleware } from 'koa';
import { NotFoundError } from '../errors/not-found.error.js';

export const notFoundHandler: Middleware = () => {
  throw new NotFoundError();
};
