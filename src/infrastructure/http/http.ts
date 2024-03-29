import { Server } from 'http';
import Koa from 'koa';
import { config } from '../config/config.js';
import { logger } from '../logger/logger.js';
import { loggerMiddleware } from './middlewares/logger.middleware.js';
import { notFoundHandler } from './handlers/not-found.handler.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { helmetMiddleware } from './middlewares/helmet.middleware.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';
import { bodyParserMiddleware } from './middlewares/body-parser.middleware.js';

export const http = new Koa();

http.use(loggerMiddleware());
http.use(errorMiddleware());
http.use(helmetMiddleware());
http.use(corsMiddleware());
http.use(bodyParserMiddleware());

export const listen = async () => {
  http.use(notFoundHandler);

  return await new Promise<Server>((resolve) => {
    const server = http.listen(config.HTTP_PORT, config.HTTP_HOST, undefined, () => {
      logger.info(`Http server is listening on ${config.HTTP_HOST}:${config.HTTP_PORT.toString()}.`);
      resolve(server);
    });
  });
};
