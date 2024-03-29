import { Middleware } from 'koa';
import { P, match } from 'ts-pattern';
import { NotFoundError } from '../errors/not-found.error.js';
import { ValidationError } from '../errors/validation.error.js';
import { BadRequestError } from '../errors/bad-request.error.js';
import { logger } from '../../logger/logger.js';

export const errorMiddleware =
  (): Middleware =>
  async ({ response }, next) => {
    await next().catch((error: unknown) => {
      match(error)
        .with(P.instanceOf(BadRequestError), (error) => {
          response.body = { error: 'bad-request', message: error.message };
          response.status = 400;
        })
        .with(P.instanceOf(ValidationError), (error) => {
          response.body = { error: 'validation', section: error.section, validation: error.zodError };
          response.status = 400;
        })
        .with(P.instanceOf(NotFoundError), () => {
          response.body = { error: 'not-found' };
          response.status = 404;
        })
        .otherwise((error: unknown) => {
          logger.error('Http error', { error });
          response.body = { error: 'server' };
          response.status = 500;
        });
    });
  };
