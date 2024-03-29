import { Middleware } from 'koa';
import { logger } from '../../logger/logger.js';

export const loggerMiddleware =
  (): Middleware =>
  async ({ request, response }, next) => {
    const start = performance.now();

    await next();

    logger.info(
      `${request.method} ${request.url} ${response.status.toString()} ${Math.ceil(
        performance.now() - start,
      ).toString()}ms`,
    );
  };
